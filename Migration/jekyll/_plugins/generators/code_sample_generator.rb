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

  #  This generator ...
  class CodeSampleGenerator < Jekyll::Generator
    # Run near the end of the process.
    priority :low
    def generate(site)
      @contentSource = site.config['WFContentSource']
      @primaryLang = site.config['primary_lang']
      @destinationDirectory = File.join(@primaryLang, "resources/samples")

      # Look for _code samples.
      site.pages.each do |page|
        if page.path.nil?
          next
        end

        if page.langcode != 'en'
          next
        end

        codeDirectory = File.join(File.dirname(page.path), "_code")

        if File.exist?(codeDirectory)
          handleCodeDirectory(site, codeDirectory)
        end
      end
    end

    def handleCodeDirectory(site, codeDirectory)
      Dir.glob(codeDirectory + "/*").each do |sourcepath|
        if sourcepath =~ /\.pxm/ || sourcepath =~ /\.psd/
          # noop.
          return
        end

        relativeCodeDirectory = codeDirectory.sub(@contentSource, "").sub(@primaryLang+"/", "")
        relativePlainDirectory = relativeCodeDirectory.sub("/_code", "")
        filename = File.basename(sourcepath)
        outputDirectory = File.join(@destinationDirectory, relativePlainDirectory)

        if sourcepath =~ /\.html/
          site.static_files << SampleHTMLAsset.new(
              site,
              relativeCodeDirectory,
              filename,
              @primaryLang,
              outputDirectory
              )
        else
          site.static_files << SampleAsset.new(
              site,
              relativeCodeDirectory,
              filename,
              @primaryLang,
              outputDirectory
              )
        end
      end
    end
  end

end
