#!bin/bash
# Shell script to power the GNSS HAT

if [ ! -e /sys/class/gpio/gpio4 ]; then
   echo "File exists"
   echo "4" > /sys/class/gpio/export
fi
echo "out" > /sys/class/gpio/gpio4/direction
echo "0" > /sys/class/gpio/gpio4/value
sleep 2
echo "1" > /sys/class/gpio/gpio4/value

python ./gnss.py