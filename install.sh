#!/bin/bash
curl -sSL https://get.docker.com | sh
sudo apt-get install chromium

git pull http://www.github.com/dsyed/photoframe

sudo cp photoframe/K99_shutdown /etc/rc6.d
sudo chmod +x /etc/rc6.d/K99_shutdown

sudo cp photoframe/autostart /etc/xdg/lxsession/LXDE/autostart
sudo cp photoframe/lightdm.conf /etc/lightdm/lightdm.conf
