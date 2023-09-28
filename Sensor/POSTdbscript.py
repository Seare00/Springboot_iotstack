# Replaces sensor.py

import paramiko
import serial
import requests

backend_address = 'http://localhost:8080/insert'
location = ["Uppsala", "Stockholm E", "Stockholm W"]
i = 0

try:
    #  COM ändras beroende på vilken din arduino IDE använder.
    ser = serial.Serial('COM3', 9600)

    try:
        while True:
            if(i > 2):
                i = 0
            # Läser en linje av arduino temperatur datan.
            line = ser.readline().decode('utf-8').strip()
            
            try:
                temperature = float(line)
                payload = {
                    "temp": temperature,
                    "plats": location[i]
                }
                response = requests.post(backend_address, json=payload)

                if response.status_code == 200:
                    print(f"Sparar temp {temperature} för {location[i]} i SQL DB temperature.")
                
                i += 1
            except ValueError:
                #Felaktig dataformat, triggar denna meddelande.
                print(f"Felaktig data: {line}")

    except KeyboardInterrupt:
        print("\nStänger...")

except paramiko.AuthenticationException:
    print("Connection failed...")
finally:
    ser.close()