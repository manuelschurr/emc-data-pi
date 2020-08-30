#!/usr/bin/python

import serial
import time
from decimal import *
from subprocess import call

def find(str, ch):
    for i, ltr in enumerate(str):
        if ltr == ch:
            yield i

# Enable Serial Communication
port = serial.Serial("/dev/ttyS0", baudrate=115200, timeout=5)
# Transmitting AT Commands to the Modem
#  '\r\n' indicates the ENTER key

port.write('AT'+'\r\n')
rcv = port.read(100)
print rcv
time.sleep(.1)

# to power the GPS
port.write('AT+CGNSPWR=1'+'\r\n')
rcv = port.read(100)
print rcv
time.sleep(.1)

# set the baudrate to 115200
port.write('AT+CGNSIPR=115200'+'\r\n')
rcv = port.read(100)
print rcv
time.sleep(.1)

# send data received to UART
port.write('AT+CGNSTST=1'+'\r\n')
rcv = port.read(100)
print rcv
time.sleep(.1)

port.write('AT+CGNSINF'+'\r\n')
rcv = port.read(200)
print rcv
time.sleep(.1)
#ck=1
#while ck == 1
 #  fd = port.read(200)
  # time.sleep(.5)
