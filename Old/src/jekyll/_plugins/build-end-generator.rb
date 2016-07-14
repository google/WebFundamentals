# Copyright 2014 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#    http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

module Jekyll

  # This generator should be used for final pieces of work once
  # ALL pages and added to site.pages and to the site.data['_context']
  # tree data structure.


  # Create pages for Jekyll to build and handle translations
  class BuildEndGenerator < Generator
    priority :lowest
    def generate(site)
      organisePageTree(site.data['_context'])

      generateFeeds(site)

      # Initialise the pageGroups mapping
      site.data['pageGroups'] = {}

      site.pages.each { |page|
        # Add pages to site.pageGroups
        if not page.data['pageGroups'].nil?
          page.data['pageGroups'].each { |pageGroup|
            pageGroup = pageGroup.downcase.strip

            site.data['pageGroups'][pageGroup] ||= []
            site.data['pageGroups'][pageGroup] << page
          }
        end

        # This should run as the end of all generators and will give pages a
        # chance to do any final work needed
        page.onBuildComplete()

        page.data['translations'].each { |langCode, translationPage|
          page.data.each { |key, value|
            if key != 'translators' and translationPage.data[key].nil? 
              translationPage.data[key] = value
            end
          }

          translationPage.onBuildComplete()
        }
      }


      site.data['pageGroups'].each { |key, group|
        group = group.sort do |a, b|
          a_order = a.data['order'] || a.data['published_on'] || 0
          b_order = b.data['order'] || b.data['published_on'] || 0
          a_order <=> b_order
        end

        site.data['pageGroups'][key] = group
      }

      generateSamples(site)
    end

    def organisePageTree(tree)
      tree['pages'] = tree['pages'].sort do |a, b|
        a_order = a.data['order'] || a.data['published_on'] || 0
        b_order = b.data['order'] || b.data['published_on'] || 0
        a_order <=> b_order
      end

      tree['pages'].each_with_index { |a, i|
        for j in (i+1).upto(tree['pages'].size - 1)
          if tree['pages'][j]['published'] != false
            a.data['_nextPage'] = tree['pages'][j]
            break
          end
        end
        if i > 0
          for j in (i-1).downto(0)
            if tree['pages'][j]['published'] != false
              a.data['_previousPage'] = tree['pages'][j]
              break
            end
          end
        elsif i == 0
          if not tree['index'].nil?
            if tree['index']['published'] != 'false'
              a.data['_previousPage'] = tree['index']
            else
              a.data['_previousPage'] = nil
            end
          else
            a.data['_previousPage'] = nil
          end
        else
          a.data['_previousPage'] = nil
        end
      }

      if (not tree['index'].nil?) && (tree['pages'].size > 0)
        for j in (0).upto(tree['pages'].size - 1)
          if tree['pages'][j]['published'] != false
            tree['index'].data['_nextPage'] = tree['pages'][j]
            break
          end
        end
      end

      tree['subdirectories'].each { |value|
        organisePageTree(value)
      }

      # This value is the default to make pages with no order to pushed to
      # the bottom allowing pages with an order to be at the top
      heavy_weight = 9999

      tree['subdirectories'] = tree['subdirectories'].sort do |a, b|
        a_order = 0
        b_order = 0

        if !a['index'].nil?
          a_order = a['index'].data['order'] || a['index'].data['published_on'] || heavy_weight
        end
        if !b['index'].nil?
          b_order = b['index'].data['order'] || b['index'].data['published_on'] || heavy_weight
        end

        if a_order.is_a?(Integer) & b_order.is_a?(Integer)
            a_order <=> b_order
        elsif a_order.is_a?(Date) & b_order.is_a?(Date)
            a_order <=> b_order
        else
          0 <=> 0
        end
      end
    end

    def generateSamples(site)
      sampleDirectories = []

      site.pages.each { |page|
        if page.path.nil?
          next
        end

        fileDir = File.dirname(page.path)
        codeDir = File.join(fileDir, "_code")
        if File.exist?(codeDir)
          sampleDirectories << codeDir
        end
      }
      sampleDirectories.uniq!

      sampleDirectories.each do |codeDir|
        Dir.glob(codeDir + "/*").each do |sampleFile|
          sampleFile = sampleFile.sub(codeDir + '/', '')
          if sampleFile =~ /\.html/
            # site.pages << WFSamplePage.new(site, codeDir, sampleFile)
          elsif sampleFile =~ /\.pxm/ || sampleFile =~ /\.psd/
            # no op
          else
            # site.static_files << WFSampleAsset.new(site, codeDir, "", sampleFile)
          end
        end
      end


    end

    def generateFeeds(site)
      rootContext = site.data['_context']
      sitemapPages = []

      rootContext['subdirectories'].each { |subdirectory|
        id = subdirectory['id']
        pagesToInclude = getPages(subdirectory)

        sitemapPages = sitemapPages + pagesToInclude
        site.pages << WFSitemapPage.new(site, sitemapPages)

        case subdirectory['id']
        when 'updates'
          site.pages << UpdatesFeedPage.new(site, id, site.data['curr_lang'], pagesToInclude, WFFeedPage.FEED_TYPE_RSS)
          site.pages << UpdatesFeedPage.new(site, id, site.data['curr_lang'], pagesToInclude, WFFeedPage.FEED_TYPE_ATOM)
        when 'shows'
          site.pages << ShowsFeedPage.new(site, id, site.data['curr_lang'], pagesToInclude, WFFeedPage.FEED_TYPE_RSS)
          site.pages << ShowsFeedPage.new(site, id, site.data['curr_lang'], pagesToInclude, WFFeedPage.FEED_TYPE_ATOM)
        when 'resources'
        when 'tools'
        when 'showcase'
          # NOOP
        when 'fundamentals'
          site.pages << WFFeedPage.new(site, id, site.data['curr_lang'], pagesToInclude, WFFeedPage.FEED_TYPE_RSS)
          site.pages << WFFeedPage.new(site, id, site.data['curr_lang'], pagesToInclude, WFFeedPage.FEED_TYPE_ATOM)
        else
          Jekyll.logger.info "Unsure what FeedPage to use for the toplevel \"" + subdirectory['id'] + "\" directory."
        end
      }
    end

    def getPages(subdirectory)
      array = []
      array << subdirectory['index']
      subdirectory['pages'].each { |page|
        array << page
      }

      subdirectory['subdirectories'].each { |innerSubdirectory|
        array = array + getPages(innerSubdirectory)
      }

      return array
    end

  end

end
