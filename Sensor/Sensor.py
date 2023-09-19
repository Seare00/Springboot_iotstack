import serial
import mysql.connector

# Set up database connection
db = mysql.connector.connect(
    host="localhost",
    user="arduino",
    password="password",
    database="sensors"
)

cursor = db.cursor()

#  COM ändras beroende på vilken din arduino IDE använder.
ser = serial.Serial('COM4', 9600)

try:
    while True:
        # Läser en linje av arduino temperatur datan)
        line = ser.readline().decode('utf-8').strip()
        
        try:
            temperatur = float(line)
            query = "INSERT INTO temperatur (temp_value) VALUES (%s)"
            cursor.execute(query, (temperatur,))
            db.commit()
            print(f"Sparar temp {temperatur} i SQL DB.")
        except ValueError:
            #Felaktig dataformat, triggar denna meddelande.
            print(f"Felaktig data: {line}")

except KeyboardInterrupt:
    print("\nStänger...")
    ser.close()
    cursor.close()
    db.close()

