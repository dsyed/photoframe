import os
from subprocess import call

from flask import Flask
from flask.json import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

REMOTE_DIR = '../frontend/Dropbox'


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
    call(['say', 'backlight'])
    return jsonify(success=True)


@app.route('/shutdown')
def shutdown():
    call(['say', 'shutdown'])    
    return jsonify(success=True)
