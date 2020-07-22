#!/bin/sh

import serial, subprocess, time, threading, json, requests
from datetime import datetime

#define variables
data = []
output = []
lock = threading.Lock()

#set device connection port and grant read/write/execute permissons
device = '/dev/ttyUSB0'
bashCommand = 'sudo chmod 777 ' + device
subprocess.check_call(bashCommand.split())

#set server address
url = 'https://134.155.58.211/'

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

#write data to JSON-File once every second, as more precise data is not needed
def write_data():
    global data
    global output

    x = True
    while x:
        time.sleep(.5)
        lock.acquire()
        jsonData = '{"patientID:":%d,"pulsoxy":{"pulsRate":{"value":%d,"time":"%s"},"spo2":{"value":%d,"time":"%s"}}}\n' % (1, int(data[1]), data[0], int(data[2]), data[0])
        output.append(jsonData)
        lock.release()

#send data via HTTPS-Request to server every 5 seconds
def send_data():
    global output

    x = True
    while x:
        time.sleep(5)
        lock.acquire()
        
        #testing functionality w/o sending to server
        outfile = '/home/tc/Documents/PulsOxy_data.json'
        with open(outfile, 'a') as dataWrite:
            for x in output:
                dataWrite.write(x)

        #requests.post(url, data = output)

        output = []
        lock.release()

#start threads to execute program
try:
    t1 = threading.Thread(target=read_data)
    t2 = threading.Thread(target=write_data)
    t3 = threading.Thread(target=send_data)
    t1.start()
    t2.start()
    t3.start()
except:
   print ("Error: unable to start threads. Exiting program.")
   ser.close()
   exit()