FROM python:2.7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    python-imaging \
    python-imaging-tk \
    python-pil.imagetk \
    python-tk \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN pip install pillow

ENV DISPLAY :0

COPY . /usr/src/app
CMD ./slideshow.py
