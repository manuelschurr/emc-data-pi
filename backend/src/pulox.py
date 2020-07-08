#!/bin/sh

import serial, subprocess, time
from datetime import datetime

#set device connection port and save file
device = '/dev/ttyUSB0'
outfile = '/home/pi/Documents/PulsOxy_data.csv'

#grant read/write/execute permissons for device
bashCommand = 'sudo chmod 777 ' + device
subprocess.check_call(bashCommand.split())

#establish connection via serial port
ser = serial.Serial()
ser.baudrate = 115200          
ser.bytesize = serial.EIGHTBITS    
ser.parity = serial.PARITY_NONE     
ser.stopbits = serial.STOPBITS_ONE  
ser.xonxoff = 1                   
ser.timeout = 1
ser.port = device
ser.open()
ser.write(b'\x7d\x81\xa1\x80\x80\x80\x80\x80\x80')

#check if data input stream is received
try:
    raw = ser.read(9)
except:
    print ('No data stream found.')
    exit()
    
#wait for data recording until pulsoximeter is applied to patient for the first time
fingerIn = raw[5] & 0x7f

while(fingerIn == 0):
    try:
        raw = ser.read(9)
    except:
        print ('Data read error.')
        exit()

    fingerIn = raw[5] & 0x7f

#testing only
with open(outfile, 'a') as csvWrite:
    csvWrite.write('Timestamp,' + 'Puls Rate,' + 'SpO2\n')

    #obtain data from component
    while len(raw) >= 9:
        time = datetime.now().strftime('%H:%M:%S.%f') [:-3]
        pulsRate_i = raw[5] & 0x7f
        spo2_i = raw[6] & 0x7f
        pulsRate = [time, pulsRate_i]
        sp2o = [time, spo2_i]

        #testing only
        csvWrite.write(str(time) + ', ' + str(pulsRate_i) + ', ' + str(spo2_i) + '\n')
        print(time, str(pulsRate_i), str(spo2_i))

        try:
            raw = ser.read(9)
        except:
            print ('Data read error.')
            exit()

    if len(raw) <= 1:
        print ('Data read error.')
        exit()

    ser.close()