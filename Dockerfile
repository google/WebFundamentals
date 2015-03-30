FROM node:0.10

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y unzip ruby bundler fontforge ttfautohint

RUN echo $(curl -sS https://appengine.google.com/api/updatecheck) | \
	sed -E 's/release: \"(.+)\".*/\1/g' > /gae_sdk_version
RUN curl -sS -o /gae_sdk.zip https://storage.googleapis.com/appengine-sdks/featured/google_appengine_`cat /gae_sdk_version`.zip
RUN unzip -q /gae_sdk.zip && rm -rf /google_appengine/lib/django-*

ENV PATH=/google_appengine:$PATH
ENV DOCKER=1

ADD . /wf/
WORKDIR /wf

RUN bundle install --quiet
RUN npm install --loglevel error || ( cat /wf/npm-debug.log && exit 1 )
RUN npm install --loglevel error -g grunt-cli

VOLUME /wf/src
VOLUME /wf/appengine/build

CMD /bin/bash
