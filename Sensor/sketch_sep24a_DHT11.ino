#include <DHT.h>  

#define DHTPIN A5       
#define DHTTYPE DHT11  

DHT dht(DHTPIN, DHTTYPE);  

void setup() {
  Serial.begin(9600);  // Start the Serial communication at 9600 baud rate
  dht.begin();         // Start the DHT sensor
}

void loop() {
  // Read temperature as Celsius
  float t = dht.readTemperature();



 
  if (isnan(t) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Print the temperature and humidity values to the Serial monitor

  Serial.println(t);

  delay(1000);  // Wait for 1 second before the next loop
}
