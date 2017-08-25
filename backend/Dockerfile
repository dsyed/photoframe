FROM python:2.7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy requirements.txt first (for caching)
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY server.py .
COPY remote .

ENV FLASK_APP server.py
CMD flask run --host 0.0.0.0
