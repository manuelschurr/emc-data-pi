#!/bin/sh

import serial, subprocess
from datetime import datetime

#set device connection port and save file
device = '/dev/ttyUSB0'
outfile = '/home/pi/Documents/PulsOxy_data.csv'

#grant read/write/execute permissons for device
bashCommand = 'sudo chmod 777 ' + device
subprocess.check_call(bashCommand.split())

#setup connection via serial port
ser = serial.Serial()
def establish_serial_connection(ser):
    ser.baudrate = 115200          
    ser.bytesize = serial.EIGHTBITS    
    ser.parity = serial.PARITY_NONE     
    ser.stopbits = serial.STOPBITS_ONE  
    ser.xonxoff = 1                   
    ser.timeout = 1
    ser.port = device

#get data from device
def get_data(ser):
    ser.open()
    ser.write(b'\x7d\x81\xa1\x80\x80\x80\x80\x80\x80')

    try:
        raw = list(ser.read(9))
    except:
        print ('Data read error.')
        exit()

    with open(outfile, 'a') as csvWrite:
        csvWrite.write('Timestamp,' + 'Puls Rate,' + 'SpO2\n')

        while len(raw) >= 9:
            now = datetime.now()
            time = now.strftime('%H:%M:%S.%f') [:-3]
            pulsRate = raw[5] & 0x7f
            spo2 = raw[6] & 0x7f

            csvWrite.write(str(time) + ', ' + str(pulsRate) + ', ' + str(spo2) + '\n')

            #testing only
            print(time, str(pulsRate), str(spo2))
            
            try:
                raw = ser.read(9)
            except:
                print ('Data read error.')
                exit()

        ser.close()

        if len(raw) <= 1:
            print ('Data read error.')
            exit()
        return raw

#execute functions
establish_serial_connection(ser)
data = get_data(ser)