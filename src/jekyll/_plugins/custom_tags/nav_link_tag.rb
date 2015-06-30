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
  class NavLinkTag < Liquid::Block

    def initialize(tag_name, params, tokens)
      super
      @params = params.split(' ')
      @url = @params.first
    end

    def render(context)
      page_url = context.environments.first["page"]["url"]
      "<li>" +
      ((@url != page_url) ? "<a href=\"#{@url}\">" : '') +
      super +
      ((@url != page_url) ? "</a>" : "") +
      "</li>"
    end
  end
end

Liquid::Template.register_tag('nav_link', Jekyll::NavLinkTag)