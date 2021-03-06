#!/bin/sh

import serial, time, threading, json, requests, argparse
from datetime import datetime

#declare variables
data = []
output = '['
lock = threading.Lock()

#set device connection port
device = '/dev/ttyUSB0'

#input of next free PatientId from server, token for API authentication and server url
parser = argparse.ArgumentParser()
parser.add_argument('pID', type=int, help='PatientId obtained from server.')
parser.add_argument('authToken', type=str, help='Authentication token for API access.')
parser.add_argument('url', type=str, help='Central server url.')
args = parser.parse_args()
pID = args.pID
authToken = args.authToken
url = args.url

#set server route
route =  url + '/patient/createPulsoxy'

#establish connection via serial port; information on needed settings from 'https://gist.github.com/patrick-samy/df33e296885364f602f0c27f1eb139a8
try:
    ser = serial.Serial()
    ser.baudrate = 115200          
    ser.bytesize = serial.EIGHTBITS    
    ser.parity = serial.PARITY_NONE     
    ser.stopbits = serial.STOPBITS_ONE  
    ser.xonxoff = 1                   
    ser.timeout = 1
    ser.port = device
    ser.open()
except:
    print('No connection with device possible. Terminating script.')
    exit()

#check if data input stream is received; key to be written to component for communication from 'https://gist.github.com/patrick-samy/df33e296885364f602f0c27f1eb139a8'
try:
    ser.write(b'\x7d\x81\xa1\x80\x80\x80\x80\x80\x80')
    raw = ser.read(9)
except:
    print ('No data stream found. Exiting program.')
    ser.close()
    exit()
    
#wait for data recording until pulsoximeter is applied to patient for the first time (first time recording other values than zero)
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

#constantly obtain data from device by sending key and reading device bit stream afterwards
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

#create data package as demanded by server route
    x = True
    while x:
        time = datetime.now().strftime('%m-%d-%Y %H:%M:%S')
        pulsRate_i = raw[5] & 0x7f
        spo2_i = raw[6] & 0x7f
        if spo2_i > 100:
            spo2_i = 100
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

#write data to server once a second; with thread locks to ensure data integrity
def write_data():
    global data
    global output

    x = True
    while x:
        time.sleep(1)
        lock.acquire()
        jsonData = {'patientId': pID,'timestamp': data[0], 'pulsrate': int(data[1]), 'spo2': int(data[2])}
        flag = True
        #retry to connect to server in case of connection loss
        while flag:
            try:
                requests.post(route, data = jsonData, headers = {'x-access-token' : authToken})
                break
            except:
                print('No internet connection available. Retrying ...')
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