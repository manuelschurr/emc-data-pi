#!/bin/bash

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
mkdir DB
sqlite3 ./DB/emcdata.db

# Install Python modules for pulsoximeter script
sudo pip install pyserial
sudo pip install requests
# Install PIP (package manager for Python)
echo "Installing PIP..."
sudo apt install python-pip -y

# Install Python Modules Serial
echo "Installing pyserial..."
sudo pip install pyserial -y

# Show installed versions
echo -n "Installed version Node.js: ";node -v
echo -n "Installed version npm: ";npm -v
