#!/bin/bash
curl -sSL https://get.docker.com | sh

sudo apt-get update
sudo apt-get install -y apt-transport-https chromium-browser unclutter vlc
echo "deb https://packagecloud.io/Hypriot/Schatzkiste/debian/ jessie main" | sudo tee /etc/apt/sources.list.d/hypriot.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 37BBEE3F7AD95B3F

sudo apt-get update
sudo apt-get install docker-compose

if cd photoframe; then git pull && cd .. && pwd; else git clone https://github.com/dsyed/photoframe.git; fi
if cd Dropbox-Uploader; then git pull && cd .. && pwd; else git clone https://github.com/andreafabrizi/Dropbox-Uploader.git; fi

sudo cp photoframe/K99_shutdown /etc/rc6.d
sudo chmod +x /etc/rc6.d/K99_shutdown

sudo cp photoframe/autostart /home/pi/.config/lxsession/LXDE-pi/autostart
sudo cp photoframe/lightdm.conf /etc/lightdm/lightdm.conf

sudo ./Dropbox-Uploader/dropbox_uploader.sh
