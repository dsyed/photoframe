#!/bin/bash
curl -sSL https://get.docker.com | sh
sudo apt-get update
sudo apt-get install chromium-browser

git clone https://github.com/dsyed/photoframe.git

sudo cp photoframe/K99_shutdown /etc/rc6.d
sudo chmod +x /etc/rc6.d/K99_shutdown

sudo cp photoframe/autostart /etc/xdg/lxsession/LXDE/autostart
sudo cp photoframe/lightdm.conf /etc/lightdm/lightdm.conf
