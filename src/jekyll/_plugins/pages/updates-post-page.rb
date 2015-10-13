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

  require 'sanitize'

  # This class solely exists to take any of the update posts and remove the
  # posts/<File Directory> from the final output / URL structure

  class UpdatePostPage < UpdatePage

    def initialize(site, relativeDir, filename, langcode)
      super(site, relativeDir, filename, langcode)
    end

    def getJekyllsRelativeUrl()
      urlParts = self.url.split(File::SEPARATOR)
      foundYearValue = false
      urlParts = urlParts.select { |urlPart|
        select = false
        if foundYearValue
          select = true
        elsif urlPart.match(/^\d+$/)
          foundYearValue = true
          select = true
        end

        select
      }
      # To match self.url, add a forward slash
      newUrl = '/' + File.join('updates', urlParts)
      newUrl
    end

    # This is a method from the Jekyll::Page class
    # http://www.rubydoc.info/github/mojombo/jekyll/master/Jekyll/Page
    # This points the destation to a nested language if appropriate
    def destination(dest)
      original_target = Pathname.new self.superdest("")
      base = Pathname.new dest
      relativePath = original_target.relative_path_from base

      fileDirectories = relativePath.dirname.to_s.split(File::SEPARATOR)
      foundYearValue = false
      fileDirectories = fileDirectories.select { |directory|
        select = false
        if foundYearValue
          select = true
        elsif directory.match(/^\d+$/)
          foundYearValue = true
          select = true
        end

        select
      }
      relativePath = File.join('updates', fileDirectories, relativePath.basename)

      path = File.join(base, @langcode, relativePath)

      path
    end

  end
end
