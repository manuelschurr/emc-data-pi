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
sudo apt install python-pip -y

# Install Python Modules Serial
echo "Installing pyserial..."
sudo pip install pyserial -y

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

# Adding the gpioonoff.sh script to the crontab
# The GNSS HAT will be automatically powered when the raspberry starts +
# starting the backend and the frontend after a reboot
echo "Adding GNSS file to crontab for automatic start when rebooting..."
echo "Adding crontab to start the backend and the frontend of the system after a reboot..."
# Parentheses needed to run the following commands in a sub-shell
(sudo crontab -l 2>/dev/null; echo "@reboot sleep 5 && sh /home/pi/Startup/gpioonoff.sh\n@reboot sleep 10 && (cd /home/pi/emc-data-pi/backend ; npm run serve)\n@reboot sleep 20 && (cd /home/pi/emc-data-pi/frontend ; npm run serve)") | crontab -

# Moving service file in needed directory and enabling the service
# Used to shut down the GNSS HAT when Raspberry Pi is shut down
echo "Moving and enabling .service file..."
sudo mv gpio.service /etc/systemd/system/gpio.service
# Parentheses needed to run the following commands in a sub-shell
( cd /etc/systemd/system ; sudo systemctl daemon-reload ; sudo systemctl enable gpio.service ; sudo systemctl start gpio.service )

# Grant permissions for pulsoxy.py
PULSOXY_DEVICE='/dev/ttyUSB0'
sudo chmod 777 $PULSOXY_DEVICE

# After our first setup it is probably the best to reboot the system
echo "The system will restart in ten seconds..."
sleep 10 ; sudo reboot
