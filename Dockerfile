FROM node:0.10

RUN apt-get update && apt-get install -y ruby ruby-dev bundler fontforge ttfautohint

ENV CLOUDSDK_CORE_DISABLE_PROMPTS=1
ENV CLOUDSDK_PYTHON_SITEPACKAGES=1

ADD https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz /
RUN tar xzf google-cloud-sdk.tar.gz

RUN /google-cloud-sdk/install.sh
RUN /google-cloud-sdk/bin/gcloud config set component_manager/fixed_sdk_version 0.9.48
RUN /google-cloud-sdk/bin/gcloud components update app -q

ADD . /wf/
WORKDIR /wf

RUN bundle install
RUN npm install || ( cat /wf/npm-debug.log && exit 1 )
RUN npm install -g grunt-cli

ENV PATH=/google-cloud-sdk/platform/google_appengine:$PATH
ENV DOCKER=1

VOLUME /wf/src
VOLUME /wf/appengine/build

CMD /bin/bash
