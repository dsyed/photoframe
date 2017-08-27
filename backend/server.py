import os
import signal
import sys
from subprocess import call

from flask import Flask
from flask.json import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

REMOTE_DIR = 'remote'
# REMOTE_DIR = '../Dropbox'

# Allow graceful shutdown when using `docker stop`
signal.signal(signal.SIGTERM, lambda *args: sys.exit(0))


@app.route('/')
def home():
    return 'Hey there. o/'


@app.route('/folders')
def folders():
    return jsonify({
        'data': [dir for dir in next(os.walk(REMOTE_DIR))[1] if not dir.startswith('.')]
    })


@app.route('/files/<folder>')
def files(folder):
    return jsonify({
        'data': os.listdir(os.path.join(REMOTE_DIR, folder))
    })


# 0 for on
# 1 for off
@app.route('/backlight/<int:power>')
def set_backlight(power):
    call(['echo', str(power), '>', '/sys/class/backlight/rpi_backlight/bl_power'])
    return jsonify(success=True)


# Won't work through Docker
@app.route('/shutdown')
def shutdown():
    call(['sudo', 'shutdown', '-h', 'now'])
    return jsonify(success=True)
