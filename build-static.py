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

lang = 'en'
buildDir = 'build'
raw = open('_build-me.yaml', 'r').read().decode('utf8')
files = yaml.load(raw)

for f in files:
  response = 'whoops'
  print(f)
  try:
    if f.endswith('.yaml'):
      response = devsiteIndex(f.replace('_index.yaml'), lang)
      f = f.replace('_index.yaml', 'index.html')
    elif f.endswith('.md'):
      response = devsitePage.getPage(f.replace('.md', ''), lang)
      f = f.replace('.md', '.html')
  except:
    response = 'exception'

  if response:
    destFile = os.path.join('.', buildDir, lang, f)
    destDir = os.path.dirname(destFile)

    if not os.path.exists(destDir):
      os.makedirs(destDir)

    print(f)
    with io.open(destFile, 'w', encoding='utf8') as f:
      f.write(response)
      f.close()
