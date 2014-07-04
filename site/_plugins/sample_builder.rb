
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


# Sample generator. Takes the _code based simple samples, merges them with
# the standard template and strips out template section markup.

require 'set'

module SampleBuilder
	class Template
		@@header = nil
		@@header_full = nil
		@@footer = nil
		# TODO(ianbarber): Avoid having 3 identical functions maybe.
		def self.header(site)
			if @@header.nil?
				content = File.read(File.join(site.source, "_includes/sample_header_basic.html"))
				@@header = Liquid::Template.parse(content).render({"baseurl" => site.baseurl})
			end
			@@header
		end

		def self.header_full(site)
			if @@header_full.nil?
				content = File.read(File.join(site.source, "_includes/sample_header_full.html"))
				@@header_full = Liquid::Template.parse(content).render({"baseurl" => site.baseurl})
			end
			@@header_full
		end

		def self.footer(site)
			if @@footer.nil?
				content = File.read(File.join(site.source, "_includes/sample_footer.html"))
				@@footer = Liquid::Template.parse(content).render({"baseurl" => site.baseurl})
			end
			@@footer
		end
	end

	class SampleAssetFile < Jekyll::StaticFile
		def initialize(site, dest, path, file, newpath)
			super(site, dest, path, file)
			@newpath = newpath
			@file = file
		end

		def destination(dest)
     		File.join(dest, @newpath, @file)
   		end

   		def write(dest)
   			if super(dest)
   				if (path =~ /\.css/ || path =~ /\.js/ )
   					path = destination(dest)
   					file = File.new(path, "r")
   					contents = file.read()
   					file.close
   					contents.gsub!(/\/\* \/\/ \[(?:(?:START)|(?:END)) [^\]]+\] \*\/\s*\n?/m, "\n")
   					file = File.new(path, "w")
					file.write(contents)
					file.close
   				end
   				true
   			else
   				false
   			end
   		end
	end

	class SampleFile < Jekyll::StaticFile
		attr_accessor :section

		def initialize(site, dest, path, file, contents, section)
			super(site, dest, path, file)
			@use_jshtml = site.config['generate_sample_jshtml']
			@contents = contents
			@path = path
			@filename = file
			@section = section
		end

		def title
			if @contents =~ /\<title\>([^\<]+)\</m
				$1
			else
				@filename
			end
		end

		def url
			File.join(@path, @filename)
		end

  		def write(dest)
  			dest_path = destination(dest)
  			dirname = File.dirname(dest_path)
      		FileUtils.mkdir_p(dirname) if !File.exist?(dirname)
      		if @use_jshtml
      			dest_path.sub!('.html', '.jshtml')
      		end
			file = File.new(dest_path, "w")
			file.write(@contents)
			file.close
  			true
  		end
  	end

  	class Sample
  		attr_accessor :section

    	def initialize(site, sourcepath, dir, section)
      		@site = site
      		@sourcepath = sourcepath
      		@dir = dir
      		@section = section
    	end

    	def contents()
    		contents = File.read(@sourcepath)
    		contents.gsub!(/<!-- \/\/ \[(?:(?:START)|(?:END)) [^\]]+\] -->\s*\n?/m, "\n")
    		contents.gsub!(/\/\* \/\/ \[(?:(?:START)|(?:END)) [^\]]+\] \*\/\s*\n?/m, "\n")
    		contents.gsub(/<!-- \/\/ \[TEMPLATE ([^\]]+)\] -->\s*\n/m) { |matches|
    			tag = $1.downcase
    			if (tag == "header")
    				Template.header(@site)
    			elsif (tag == "header_full")
    				Template.header(@site) + Template.header_full(@site)
    			elsif (tag == "footer")
    				Template.footer(@site)
				else
					""
				end
    		}
    	end

    	def filename()
    		# TODO(ianbarber): Include directory in output.
    		File.join(@dir, File.basename(@sourcepath))
    	end
  	end

	class Generator < Jekyll::Generator
		def generate(site)
			gen_dir = "resources/samples"
			pages = []
			dirs = Set.new
			dirPaths = {}
			dirTitles = {}
			path = site.source
			target_dir = File.join(site.dest, gen_dir)

			# Look for _code samples.
			site.pages.each do |page|
				dir = File.join(File.dirname(File.join(path, page.path)), "_code")
				if File.exist?(dir)
					dirs.add(dir)
					dirPaths[dir] = File.dirname(page.path)
					dirTitles[dir] = page.dir
				end
			end

			dirs.each do |dir|
				Dir.glob(dir + "/*").each do |sourcepath|
					#Jekyll.logger.info sourcepath
					if sourcepath =~ /\.html/
						pages << Sample.new(site, sourcepath, dirPaths[dir], dirTitles[dir])
					elsif sourcepath =~ /\.pxm/ || sourcepath =~ /\.psd/
						# nop.
					else
						codepath = File.join(dirPaths[dir], "/_code")
						prefix, relative_path = sourcepath.split(codepath)

						site.static_files << SampleAssetFile.new(
							site,
							site.source,
							File.dirname(File.join(codepath, relative_path)),
							File.basename(sourcepath),
							File.dirname(File.join(gen_dir, dirPaths[dir], relative_path)))
					end
				end
			end

		  	pages.each do |page|
				filename = page.filename
				dirname = File.dirname(File.join(target_dir, filename))
				location = File.join(gen_dir, filename)
				site.static_files << SampleFile.new(
						site,
						site.dest,
						File.dirname(location),
						File.basename(filename),
						page.contents,
						page.section)
		  	end
		end
	end

	class SamplesTag < Liquid::Tag
		@last_section = nil
	    def initialize(tag_name, markup, tokens)
	      super
	    end

	    def render(context)
			samples = context.registers[:site].static_files.select{|p| p.is_a?(SampleFile) }
			samples.sort!{
				|a,b|
				cmp = a.section <=> b.section;
				if cmp == 0
					cmp = a.title.casecmp b.title
				end
				cmp
			}
			links = samples.map{ |sample| render_sample(sample, context.registers[:site]) }

		    links.join("\n")
	    end

	    def render_sample(sample, site)
	    	url = File.join(site.baseurl, sample.url)
	    	name = sample.title
	    	section = sample.section
	    	output = ""
	    	if @last_section != section
	    		if @last_section != nil
	    			output += "</ul>"
	    		end
	    		output += "<h2>#{section}</h2><ul class='list-links'>"
	    		@last_section = section
	    	end
			output += "<li><a href='#{url}'>#{name}</a></li>"
	    end
	end
end

Liquid::Template.register_tag('list_samples', SampleBuilder::SamplesTag)
