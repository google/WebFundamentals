CURRENT_BRANCH=$(shell git branch --no-color | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/')
PWD=$(shell pwd)
XDGOPEN=$(shell type xdg-open 2>/dev/null)

clean:
	rm -rf ./src/appengine/build

build: copy 
    #add_version

copy: clean
	cd ./src/site && jekyll build $(param1)

#add_version:
#	ruby -p -i -e '$$_.gsub!(/CHANGEME/, "$(CURRENT_BRANCH)")' ./build/app.yaml

deploy: build
	cd ./src/appengine/build && appcfg.py --oauth2 update .
	@echo "Visit http://web-central.appspot.com"
	#@echo "Visit http://$(CURRENT_BRANCH).web-central.appspot.com"

server:
	cd ./src/site && jekyll serve -w --port=8081 --trace $(param1)

devsite:
	cd ./src/site && jekyll build $(param1)	--config _config-devsite.yml

devsitediff:
	cd /google/src/cloud/$(USER)/webfundamentals && g4 sync && diff --brief -rq google3/googledata/devsite/content/en/web/fundamentals $(PWD)/src/appengine/build/devsite

#Image squisher task.
imsq:
	find ./src/site -iname *.png | xargs /home/build/static/projects/webgroup/imsq

optimize:
	@find . -iname *.png | xargs -L 1 optipng -o7

o2:
	@find . -iname *.png | xargs -L 1 optipng -o2
