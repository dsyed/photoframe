#!/bin/bash
omxplayer tts/startup.mp4
docker-compose up
chromium --noerrdialogs --kiosk localhost
