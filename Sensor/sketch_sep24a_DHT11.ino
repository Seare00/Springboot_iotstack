#include <DHT.h>  // Include the DHT library

#define DHTPIN A5       // Define which pin the sensor is connected to
#define DHTTYPE DHT11  // Define the type of DHT sensor (change to DHT11 if you have a DHT11)

DHT dht(DHTPIN, DHTTYPE);  // Initialize the DHT sensor

void setup() {
  Serial.begin(9600);  // Start the Serial communication at 9600 baud rate
  dht.begin();         // Start the DHT sensor
}

void loop() {
  // Read temperature as Celsius
  float t = dht.readTemperature();



  // Check if any reads failed and exit early (to try again).
  if (isnan(t) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Print the temperature and humidity values to the Serial monitor

  Serial.println(t);

  delay(1000);  // Wait for 1 second before the next loop
}