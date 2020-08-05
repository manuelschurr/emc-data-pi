#!/bin/sh

import serial, subprocess, time, threading, json, requests
from datetime import datetime

#define variables
data = []
output = '['
lock = threading.Lock()

#set device connection port and grant read/write/execute permissons
device = '/dev/ttyUSB0'
bashCommand = 'sudo chmod 777 ' + device
subprocess.check_call(bashCommand.split())

#set server address
url = 'http://localhost:3000/patient'
#url = 'https://http://wifo1-29.bwl.uni-mannheim.de:3000/patient'

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

#check if data input stream is received
try:
    ser.write(b'\x7d\x81\xa1\x80\x80\x80\x80\x80\x80')
    raw = ser.read(9)
except:
    print ('No data stream found. Exiting program.')
    ser.close()
    exit()
    
#wait for data recording until pulsoximeter is applied to patient for the first time
fingerIn = raw[5] & 0x7f

while(fingerIn == 0):
    try:
        ser.write(b'\x7d\x81\xa1\x80\x80\x80\x80\x80\x80')
        raw = ser.read(9)
    except:
        print ('Data read error. Exiting program.')
        ser.close()
        exit()

    fingerIn = raw[5] & 0x7f

#constantly obtain data from device
def read_data():
    global data

    y = True
    while y:
        try:
            ser.write(b'\x7d\x81\xa1\x80\x80\x80\x80\x80\x80')
            raw = ser.read(9)
            y = False
        except:
            print ('Data read error. Trying again...')
            y = True
        if len(raw) < 9:
            print ('Data read error. Trying again...')
            y = True

    x = True
    while x:
        time = datetime.now().strftime('%H:%M:%S.%f') [:-5]
        pulsRate_i = raw[5] & 0x7f
        spo2_i = raw[6] & 0x7f
        lock.acquire()
        data = [time, pulsRate_i, spo2_i]
        lock.release()

        y = True
        while y:
            try:
                ser.write(b'\x7d\x81\xa1\x80\x80\x80\x80\x80\x80')
                raw = ser.read(9)
                y = False
            except:
                print ('Data read error. Trying again...')
                y = True
            if len(raw) < 9:
                print ('Data read error. Trying again...')
                y = True

#write data to server once half a second, as more precise data is not needed
def write_data():
    global data
    global output

    x = True
    while x:
        time.sleep(.5)
        lock.acquire()
        jsonData = {'patientID':6,'timestamp':data[0], 'pulsrate':int(data[1]), 'spo2':int(data[2])}
        requests.post(url, data = jsonData)
        lock.release()

#start threads to execute program
try:
    t1 = threading.Thread(target=read_data)
    t2 = threading.Thread(target=write_data)
    t1.start()
    t2.start()
except:
   print ("Error: unable to start threads. Exiting program.")
   ser.close()
   exit()