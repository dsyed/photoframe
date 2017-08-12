import os

from flask import Flask
from flask.json import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

REMOTE_DIR = '../frontend/remote'


@app.route('/')
def home():
    return 'Hey there. o/'


@app.route('/folders')
def folders():
    return jsonify({
        'data': os.listdir(REMOTE_DIR)
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
    pass


@app.route('/shutdown')
def shutdown():
    pass
