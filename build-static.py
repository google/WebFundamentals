import io
import os
import sys
import logging

GAE_BASE = '/Applications/GoogleAppEngineLauncher.app/Contents/Resources/GoogleAppEngine-default.bundle/Contents/Resources/google_appengine/'

sys.path.append(GAE_BASE)
sys.path.append(os.path.join(GAE_BASE, './lib/yaml/lib/'))
sys.path.append(os.path.join(GAE_BASE, './lib/webob-1.2.3/'))
sys.path.append('./gae/lib/')

from google.appengine.dist import use_library
use_library('django', '1.3')

import devsitePage
import devsiteIndex

lang = sys.argv[1]
path = sys.argv[2]
buildDir = sys.argv[3]

response = devsitePage.getPage(path, lang)

destFile = os.path.join('.', buildDir, lang, path) + '.html'
destDir = os.path.dirname(destFile)

if not os.path.exists(destDir):
  os.makedirs(destDir)

with io.open(destFile, 'w', encoding='utf8') as f:
  f.write(response)
  f.close()
