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
  # {% ytvideo hy7IMGVUHps %}
  class Tag < Liquid::Tag

    def initialize(tag_name, arguments, tokens)
      super
      variables = arguments.split(' ')
      if variables.nil?
        raise ArgumentError, 'No argument provided from tag use.' +
          tag_name, caller
      end
      @videoId = variables[0].strip
      if @videoId.nil?
        raise ArgumentError, 'No Video ID provided from tag.' +
          tag_name, caller
      end

      variables.shift
      @videoArguments = variables.inject([]) { |resultingArguments, argument|
        resultingArguments << argument.strip
      }

    end

    def render(context)
      # If the video source is empty then this tag shouldn't be used
      raise "Missing source for video tag" if @videoId.empty?

      # Expand this page variable to be its actual value.
      if not context[@videoId].nil?
        @videoId = context[@videoId]
      end
      iframeSrcUrl = 'https://www.youtube.com/embed/' + @videoId
      iframeSrcUrl += '?controls=2&amp;modestbranding=1&amp;showinfo=0'
      iframeSrcUrl += '&amp;utm-source=crdev-wf';
      @videoArguments.each do |argument|
        iframeSrcUrl += '&amp;' + argument
      end

      out =  '<div class="video-wrapper">'
      out += '<iframe src="' + iframeSrcUrl +'" '
      out += 'class="devsite-embedded-youtube-video" allowfullscreen '
      out += 'data-video-id="' + @videoId +'" '
      out += 'data-autohide="1" data-modestbranding="1" data-controls="2" '
      out += 'data-utm-source="crdev-wf" data-showinfo="0" frameborder="0">'
      out += '</iframe>'
      out += '</div>'
    end

  end
end

Liquid::Template.register_tag('ytvideo', VideoWrapper::Tag)
