#!/bin/bash
git pull http://www.github.com/dsyed/photoframe
curl -sSL https://get.docker.com | sh
sudo apt-get install chromium
cp photoframe/K99_shutdown /etc/rc6.d
sudo chmod +x K99_shutdown
