#!/bin/bash
omxplayer ~/photoframe/tts/startup.mp4
docker-compose -f ~/photoframe/docker-compose.yml up
chromium --noerrdialogs --kiosk localhost
