# Copyright 2015 Google Inc. All rights reserved.
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

module AnimationWrapper

  # Renders a responsive iframe with a video embedded.
  #
  # Example usage:
  #
  # {% animation dir/file.mp4 %}
  class Tag < Liquid::Tag

    def initialize(tag_name, arguments, tokens)
      super
      variables = arguments.split(' ')
      if variables.nil?
        raise ArgumentError, 'No argument provided from tag use.' +
          tag_name, caller
      end
      @pathToVideo = variables[0]
      @posterImage = variables[1]
      if @pathToVideo.nil?
        raise ArgumentError, 'No Video file provided from tag.' +
          tag_name, caller
      end
      @pathToVideo = @pathToVideo.strip
      if @posterImage.nil?
        @posterImage = '/web/imgs/video-placeholder.gif'
      end
      @posterImage = @posterImage.strip

    end

    def render(context)
      # If the video source is empty then this tag shouldn't be used
      raise "Missing source for video tag" if @pathToVideo.empty?

      if not context[@pathToVideo].nil?
        @pathToVideo = context[@pathToVideo]
      end

      out = "<p class='autoplay-animation-container'>"
      out += '<video class="autoplay-animation" preload="none" '
      out += 'loop muted controls '
      out += 'poster="' + @posterImage + '" '
      out += 'src= "' + @pathToVideo + '" '
      out += '></video></p>'
    end

  end
end

Liquid::Template.register_tag('animation', AnimationWrapper::Tag)
