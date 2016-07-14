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

  class LanguageAsset < Jekyll::StaticFile
    def initialize(site, relativeDir, filename, langcode)
      # IMPORTANT
      # Be careful when altering the names of these
      # class variables. Jekyll may be relying on the
      # variable for other things.
      @site = site
      @base = File.join Dir.pwd, site.config['WFContentSource']
      # We join here since relative_path is a read only attribute on StaticFile
      # http://www.rubydoc.info/github/mojombo/jekyll/master/Jekyll/StaticFile#relative_path-instance_method
      @dir  = File.join(langcode, relativeDir)
      @name = filename
      @langcode = langcode
    end


    def destination(dest)
      File.join(dest, File.join(@dir), @name)
    end
  end

end
