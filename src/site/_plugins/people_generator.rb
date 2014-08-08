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
  
 
  class ContributorsGenerator < Generator
    def generate(site)
      data_file = File.join(site.source, "_contributors.yaml")
      data = YAML.load_file(data_file)
      site.data["contributors"] = data
    end
  end
  
end