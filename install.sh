#!/bin/bash
curl -sSL https://get.docker.com | sh
sudo curl -L https://github.com/docker/compose/releases/download/1.15.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo apt-get update
sudo apt-get install chromium-browser vlc

if cd photoframe; then git pull && cd ..; else git clone https://github.com/dsyed/photoframe.git; fi

sudo cp photoframe/K99_shutdown /etc/rc6.d
sudo chmod +x /etc/rc6.d/K99_shutdown

sudo cp photoframe/autostart /home/pi/.config/lxsession/LXDE-pi/autostart
sudo cp photoframe/lightdm.conf /etc/lightdm/lightdm.conf
