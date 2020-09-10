#!/bin/bash

PI_PATH=/home/pi

# Uninstall unused packages
echo "Removing unused packages..."
sudo apt autoremove -y

# Updating the package list
echo "Updating apt package cache..."
sudo apt update

# Install updates
echo "Installing all updates..."
sudo apt full-upgrade -y

# Install Node.js
echo "Installing Node.js..."
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt install nodejs -y

# Install npm
echo "Installing npm..."
sudo apt install npm -y

# Install sqlite3
echo "Installing sqlite3..."
sudo apt install sqlite3 -y

# Create first database
echo "Creating first database..."
mkdir $PI_PATH/DB
touch $PI_PATH/DB/emcdata.db

# Install PIP (package manager for Python)
echo "Installing PIP..."
sudo apt install python3-pip -y

# Install Python modules for pulsoximeter script
echo "Installing Python modules..."
sudo pip3 install pyserial
sudo pip3 install requests

# Show installed versions
echo -n "Installed version Node.js: ";node -v
echo -n "Installed version npm: ";npm -v

# Moving some files into a newly created 'Startup' directory
echo "Moving different files for startup..."
mkdir $PI_PATH/Startup
mv gpioonoff.sh $PI_PATH/Startup/gpioonoff.sh
mv gnss.py $PI_PATH/Startup/gnss.py
mv chromium.sh $PI_PATH/Startup/chromium.sh
mv ambulance.desktop $PI_PATH/Desktop/ambulance.desktop

# Disable standard audio cords
echo "Disabling standard audio cords..."
sudo mv aliases.conf /lib/modprobe.d/aliases.conf
echo 'blacklist snd_bcm2835' | sudo tee /etc/modprobe.d/raspi-blacklist.conf

# Disable mouse cursor
echo "Disabling the mouse cursor..."
sudo mv autostart /etc/xdg/lxsession/LXDE-pi/autostart

# Changing permissions for some files
sudo chmod 777 $PI_PATH/Startup/gpioonoff.sh
sudo chmod 777 $PI_PATH/Startup/gnss.py

# The GNSS HAT will be automatically powered when the raspberry starts
echo "Adding GNSS file to crontab for automatic start when rebooting..."

# Adding the start script for the GNSS module and the granting of permissions for the pulsoxy module to the root crontab
# Note that the commands within the brackets are connected via ";" and not with a safe-guard "&&"
# The "2>/dev/null" is important so that one does not get the "no crontab for username" message
# With this a safe-guard is not necessary
(sudo crontab -u root -l 2>/dev/null ; echo "@reboot sleep 5 && sh /home/pi/Startup/gpioonoff.sh\n@reboot sudo chmod 777 /dev/ttyUSB0") | sudo crontab -u root -

# Starting the backend and the frontend after a reboot
echo "Adding crontab to start the backend and the frontend of the system after a reboot..."

# The backend and the frontend will be automatically started after a reboot
# Adding the commands to the user crontab
(crontab -l 2>/dev/null ; echo "@reboot sleep 10 && (cd /home/pi/emc-data-pi/backend ; npm run serve)\n@reboot sleep 20 && (cd /home/pi/emc-data-pi/frontend ; npm run serve)") | crontab -

# Moving service file in needed directory and enabling the service
# Used to shut down the GNSS HAT when Raspberry Pi is shut down
echo "Moving and enabling .service file..."
sudo mv gpio.service /etc/systemd/system/gpio.service
# Parentheses needed to run the following commands in a sub-shell
( cd /etc/systemd/system ; sudo systemctl daemon-reload ; sudo systemctl enable gpio.service ; sudo systemctl start gpio.service )

# After our first setup it is probably the best to reboot the system
echo "The system will restart in ten seconds..."
sleep 10 ; sudo reboot
