BIN := drone-plugin-wf
#IMG ?= webfundamentals/$(BIN)
IMG ?= crhym3/$(BIN)

docker: .docker
.docker: $(BIN) Dockerfile bigrig.js package.json
	docker build --rm -t $(IMG) .
	touch .docker

push: docker
	docker push $(IMG)

$(BIN): $(wildcard *.go)
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o $@
