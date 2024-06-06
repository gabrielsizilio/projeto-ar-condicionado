#include "config.h"

void setup() {
  USER_SERIAL.begin(9600);

  searchWifi();

  connectWifi();

}

void loop() {

  webSocket.loop();

}

void searchWifi() {
  int numberOfNetwork = WiFi.scanNetworks();

  USER_SERIAL.println("");
  USER_SERIAL.println("---------------------");
  for(int i=0; i<numberOfNetwork; i++) {
      USER_SERIAL.print("Network Name: ");
      USER_SERIAL.println(WiFi.SSID(i));
      USER_SERIAL.print("Signal Strength: ");
      USER_SERIAL.println(WiFi.RSSI(i));
      USER_SERIAL.println("---------------------");
  }
}

void connectWifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while( WiFi.status() != WL_CONNECTED) {
    USER_SERIAL.print(".");
    delay(1000);
  }

  USER_SERIAL.println("");
  USER_SERIAL.println("Wifi Conneted!");
  USER_SERIAL.print("IP ADDRESS: ");
  USER_SERIAL.println(WiFi.localIP());
}
