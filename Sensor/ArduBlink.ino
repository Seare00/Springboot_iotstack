#include <dht.h>

#define dht_apin A0

dht DHT;

void setup() {
  Serial.begin(9600);
}

void loop() {
  DHT.read11(dht_apin);
  Serial.println(float(DHT.temperature));
  
  delay(3000);
}
