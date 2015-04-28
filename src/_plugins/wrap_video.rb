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

module VideoWrapper

  # Renders a responsive iframe with a video embedded.
  #
  # Example usage:
  #
  # {% video //www.youtube.com/embed/hy7IMGVUHps %} {% endvideo %}
  #
  # or:
  # {% video %}
  # <iframe src="//www.youtube.com/embed/hy7IMGVUHps"
  #         frameborder="0" allowfullscreen>
  # </iframe>
  # {% endvideo %}
  class Tag < Liquid::Block

    def initialize(tag_name, src, tokens)
      super
      @src = src
    end

    def render(context)
      out = '<div class="video-container">'
      if not @src.empty?
        out += '<iframe src="' + @src + '" frameborder="0" allowfullscreen></iframe>'
      else
        contents = super
        out += contents
      end
      out += "</div>"
    end

  end
end

Liquid::Template.register_tag('video', VideoWrapper::Tag)
