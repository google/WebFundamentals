# Sample generator. Takes the _code based simple samples, merges them with
# the standard template and strips out template section markup.

require 'set'

module SampleBuilder
	class SampleFile < Jekyll::StaticFile
  		def write(dest)
  			#nop
  		end
  	end

  	# TODO(ianbarber): This shouldn't really be a Page I think.
	class Sample < Jekyll::Page
    	def initialize(site, sourcepath, dir)
      		@site = site
      		@sourcepath = sourcepath
      		@dir = dir
    	end

    	def contents() 
    		#TODO(ianbarber): These clearly shouldn't live here!
    		header = <<-END
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:light,regular,medium,thin,italic,mediumitalic,bold" title="roboto">
	<link rel="stylesheet" href="css/base.css">
    		END
    		footer = <<-FOOT
	<script>
	    var _gaq = _gaq || [];
	    //_gaq.push(['_setAccount', 'UA-XXXXXX-XX']);
	    //_gaq.push(['_trackPageview']);

	    (function() {
	      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
	    })();
	</script>
    		FOOT
    		contents = File.read(@sourcepath)
    		contents.gsub!(/<!-- \/\/ \[(?:(?:START)|(?:END)) [^\]]+\] -->\s*\n/m, "\n")
    		contents.sub!("<!-- // [TEMPLATE header] -->", header)
    		contents.sub!("<!-- // [TEMPLATE footer] -->", footer)
    	end

    	def filename() 
    		# TODO(ianbarber): Include directory in output.
    		File.join(File.basename(@sourcepath))
    	end
  	end

	class Generator < Jekyll::Generator
		def generate(site)
			gen_dir = "_samples"
			pages = []
			dirs = Set.new
			path = site.source

			target_dir = File.join(site.dest, gen_dir)
		  	FileUtils::mkdir_p(target_dir) if !File.directory? target_dir
			
			# Look for _code samples.
			site.pages.each do |page|
				dir = File.join(File.dirname(File.join(path, page.path)), "_code")
				dirs.add(dir) if File.exist?(dir)
			end
			
			dirs.each do |dir|
				Dir.glob(dir + "/*.html").each do |sourcepath| 
					# TODO(ianbarber): This will need to maintain structure!
				  	pages << Sample.new(site, sourcepath, gen_dir)
				end
			end

		  	pages.each do |page|
				filename = page.filename
				file = File.new(File.join(target_dir, filename), "w")
				file.write(page.contents)
				file.close
		  		site.static_files << SampleFile.new(site, site.dest, gen_dir, filename)
		  	end

		  	# Copy static template files.
		  	site.static_files << Jekyll::StaticFile.new(site, path, "_samples/css", "base.css")
		end
	end
end