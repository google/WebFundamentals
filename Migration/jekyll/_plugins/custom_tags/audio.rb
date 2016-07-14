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

module AudioWrapper

  # Renders a responsive iframe with a video embedded.
  #
  # Example usage:
  #
  # {% audio https://url-for.mp3 %}
  class Tag < Liquid::Tag

    def initialize(tag_name, arguments, tokens)
      super
      variables = arguments.split(' ')
      if variables.nil?
        raise ArgumentError, 'No argument provided from tag use.' +
          tag_name, caller
      end
      @audioUrl = variables[0].strip
      if @audioUrl.nil?
        raise ArgumentError, 'No Audio URL provided from tag.' +
          tag_name, caller
      end

      variables.shift
      @videoArguments = variables.inject([]) { |resultingArguments, argument|
        resultingArguments << argument.strip
      }

    end

    def render(context)
      # If the audio source is empty then this tag shouldn't be used
      raise "Missing source for audio tag" if @audioUrl.empty?

      # Expand this page variable to be its actual value.
      if not context[@audioUrl].nil?
        @audioUrl = context[@audioUrl]
      end

      out = '<audio class="embedded-audio" src="' + @audioUrl +  '" controls preload="none"></audio>'
    end

  end
end

Liquid::Template.register_tag('audio', AudioWrapper::Tag)
