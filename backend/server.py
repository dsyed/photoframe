import os

from flask import Flask
from flask.json import jsonify

app = Flask(__name__)

REMOTE_DIR = '../frontend/remote'


@app.route('/')
def home():
    return 'Hey there. o/'


@app.route('/folders')
def folders():
    return jsonify({
        'folders': os.listdir(REMOTE_DIR)
    })


@app.route('/files/<folder>')
def files(folder):
    return jsonify({
        'files': os.listdir(os.path.join(REMOTE_DIR, folder))
    })


# 0 for on
# 1 for off
@app.route('/backlight/<int:power>')
def set_backlight(power):
    pass


@app.route('/shutdown')
def shutdown():
    pass
