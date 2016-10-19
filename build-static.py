import io
import os
import sys

GAE_BASE = '/Applications/GoogleAppEngineLauncher.app/Contents/Resources/GoogleAppEngine-default.bundle/Contents/Resources/google_appengine/'

sys.path.append(GAE_BASE)
sys.path.append(os.path.join(GAE_BASE, './lib/yaml/lib/'))
sys.path.append(os.path.join(GAE_BASE, './lib/webob-1.2.3/'))
sys.path.append('./gae/lib/')

from google.appengine.dist import use_library
use_library('django', '1.3')
import yaml
import devsitePage
import devsiteIndex

raw = open('_build-me.yaml', 'r').read().decode('utf8')
files = yaml.load(raw)

build_dir = './build'
file_count_good = 0
file_count_total = 0
file_count_expected = len(files)

for source_file in files:
  file_count_total += 1
  first_forward = source_file.index('/')
  lang = source_file[0:first_forward]
  kind = 'md'
  if source_file.endswith('_index.yaml'):
    kind = 'yaml'
  source_file = source_file[first_forward + 1:]
  source_file = source_file[0:source_file.rindex('.')]
  dest_file = os.path.join(build_dir, lang, source_file + '.html')

  response = None
  if (kind == 'yaml'):
    response = devsiteIndex.getPage(source_file.replace('_index', ''), lang)
    dest_file = dest_file.replace('_index', 'index')
  else:
    response = devsitePage.getPage(source_file, lang)

  if response:
    try:
      dest_dir = os.path.dirname(dest_file)
      if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
      with io.open(dest_file, 'w', encoding='utf8') as rendered_file:
        rendered_file.write(response)
        rendered_file.close()
      msg = 'OK ' + dest_file + ' (' + str(file_count_total) + ' of '
      msg += str(file_count_expected) + ')'
      print(msg)
      file_count_good += 1
    except:
      print('!! ' + dest_file)
  else:
    print('NO ' + dest_file)

if file_count_good == file_count_expected:
  print('Completed: ' + str(file_count_good) + ' generated.')
  sys.exit(0)
else:
  print('An error occured, only ' + str(file_count_good) + ' were generated')
  sys.exit(1)
