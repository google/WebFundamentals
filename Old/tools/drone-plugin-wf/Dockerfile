FROM alpine:3.3

RUN apk add --update mailcap ca-certificates nodejs && rm -rf /var/cache/apk/*

ADD bigrig.js package.json /
ENV NODE_ENV production
RUN npm install -qq

ADD drone-plugin-wf /bin/
ENTRYPOINT ["/bin/drone-plugin-wf"]
