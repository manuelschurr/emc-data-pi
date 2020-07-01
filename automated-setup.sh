#!/bin/bash

# Nicht mehr benoetigte Pakete koennen deinstalliert werden
echo "Nicht mehr benötigte Pakete werden deinstalliert..."
sudo apt autoremove -y

# Vor der Installation der Sotware, wird die Paketliste aktualisiert
echo "Paketliste aktualisieren..."
sudo apt update

# Gefundende Updates installieren
echo "Gefundene Updates installieren..."
sudo apt full-upgrade -y

# Node.js installieren
echo "Node.js installieren..."
sudo apt install nodejs -y

# npm installieren
echo "npm installieren..."
sudo apt install npm -y

# mongoDB installieren
echo "mongoDB installieren..."
sudo apt install mongodb -y

# PIP installieren
echo "PIP installieren..."
sudo apt install python-pip

# Python Modules Serial and Dateutil installieren
sudo pip install pyserial
sudo pip install py-dateutil

# Versionen anzeigen
echo -n "Installierte Version Node.js: ";node -v
echo -n "Installierte Version npm: ";npm -v
echo -n "Installierte Version Datenbank: ";mongod --version
echo -n "Installierte Version der Datenbank-Shell: ";mongo -version