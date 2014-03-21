CURRENT_BRANCH=$(shell git branch --no-color | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/')
PWD=$(shell pwd)
XDGOPEN=$(shell type xdg-open 2>/dev/null)

clean:
	rm -rf ./build

build: copy 
    #add_version

copy: clean
	cd ./src/site && jekyll build && cd ../.. && cp -R ./src/appengine/* build/

#add_version:
#	ruby -p -i -e '$$_.gsub!(/CHANGEME/, "$(CURRENT_BRANCH)")' ./build/app.yaml

deploy: build
	cd ./build && appcfg.py --oauth2 update .
	@echo "Visit http://web-central.appspot.com"
	#@echo "Visit http://$(CURRENT_BRANCH).web-central.appspot.com"

server:
	cd ./src/site && jekyll serve -w --port=8081 --trace

optimize:
	@find . -iname *.png | xargs -L 1 optipng -o7

o2:
	@find . -iname *.png | xargs -L 1 optipng -o2
