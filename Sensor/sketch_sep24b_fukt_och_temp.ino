#include <DHT.h>  // Include the DHT library

#define DHTPIN A5
#define DHTTYPE DHT11 

DHT dht(DHTPIN, DHTTYPE);  // Initialize the DHT sensor

void setup() {
  Serial.begin(9600);  // Start the Serial communication at 9600 baud rate
  dht.begin();
}

void loop() {
 
  float t = dht.readTemperature();


  float h = dht.readHumidity();


  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Print the temperature and humidity values to the Serial monitor
  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.println(" *C");

  delay(1000);  // Wait for 1 second before the next loop
}