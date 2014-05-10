CURRENT_BRANCH=$(shell git branch --no-color | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/')
PWD=$(shell pwd)
XDGOPEN=$(shell type xdg-open 2>/dev/null)

clean:
	rm -rf ./src/appengine/build

build: copy 
    #add_version

copy: clean
	cd ./src/site && jekyll build $(param1)

deploy: build
	cd ./src/appengine/build && appcfg.py --oauth2 update .
	@echo "Visit http://web-central.appspot.com"

server:
	@echo "Visit: http://0.0.0.0:8081/web/fundamentals/"
	cd ./src/site && jekyll serve -w --port=8081 --trace $(param1)

devsite:
	cd ./src && grunt devsite

#Image squisher task.
imsq:
	find ./src/site -iname *.png | xargs /home/build/static/projects/webgroup/imsq

optimize:
	@find . -iname *.png | xargs -L 1 optipng -o7

o2:
	@find . -iname *.png | xargs -L 1 optipng -o2
