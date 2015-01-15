clean:
	grunt clean:destination

build: copy
    #add_version

copy: clean
	npm install
	rvm . do gem cleanup
	rvm . do bundle install
	rvm . do grunt build

deploy: build
	grunt gae:deploy
	@echo "Visit http://web-central.appspot.com"

server:
	@echo "Visit: http://0.0.0.0:8081/fundamentals/"
	grunt develop

test:
	@echo "Visit: http://0.0.0.0:8081/fundamentals/"
	grunt build

devsite:
	grunt devsite

#Image squisher task.
imsq:
	find ./src/site -iname *.png | xargs /home/build/static/projects/webgroup/imsq

optimize:
	grunt imagemin:normal

o2:
	grunt imagemin:o2
