#include "config.h"
#include <Arduino.h>
#include <IRremote.hpp>

#include <WiFi.h>
#include <WiFiClientSecure.h>

#include <ArduinoJson.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

SocketIOclient socketIO;

#define USE_SERIAL Serial

void searchWifi() {
  int numberOfNetwork = WiFi.scanNetworks();

  USE_SERIAL.println("");
  USE_SERIAL.println("---------------------");
  for (int i = 0; i < numberOfNetwork; i++) {
    USE_SERIAL.print("Network Name: ");
    USE_SERIAL.println(WiFi.SSID(i));
    USE_SERIAL.print("Signal Strength: ");
    USE_SERIAL.println(WiFi.RSSI(i));
    USE_SERIAL.println("---------------------");
  }
}

void connectWifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    USE_SERIAL.print(".");
    delay(1000);
  }

  USE_SERIAL.println("");
  USE_SERIAL.println("Wifi Conneted!");
  USE_SERIAL.print("IP ADDRESS: ");
  USE_SERIAL.println(WiFi.localIP());
}

void setupSocket() {
    String mac = WiFi.macAddress();

    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

       // add evnet name
       array.add("setup");

       // add payload (parameters) for the event
      JsonObject param1 = array.createNestedObject();
      param1["macAddress"] = mac;

      // JSON to String (serializion)
      String output;
      serializeJson(doc, output);

      // Send event
      socketIO.sendEVENT(output);

}

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);
            
            socketIO.send(sIOtype_CONNECT, "/");
            delay(2000);
            setupSocket();
            break;
        case sIOtype_EVENT:
        {
            USE_SERIAL.printf("[IOc] get event: %s id: %d\n", payload);
            DynamicJsonDocument doc(1024);
            DeserializationError error = deserializeJson(doc, payload, length);
            if(error) {
                USE_SERIAL.print(F("deserializeJson() failed: "));
                USE_SERIAL.println(error.c_str());
                return;
            }

            const char* command = doc[0];
            if (strcmp(command, "EnviaIR") == 0) {
              Serial.println("Command is EnviaIR");
            

              int pinIrSend = doc[1][0];
              JsonArray irCodeJsonArray = doc[1][1];

              size_t arraySize = irCodeJsonArray.size();
              uint16_t irCode[arraySize];

              for (size_t i = 0; i < arraySize; i++) {
                irCode[i] = irCodeJsonArray[i].as<uint16_t>();
              }

              if(pinIrSend == 3) pinIrSend = 26;
              IrSender.setSendPin(pinIrSend);
              IrSender.sendRaw(irCode, sizeof(irCode) / sizeof(irCode[0]), 38);
              ledcDetachPin(IrSender.sendPin);

            }
        }
            break;
        case sIOtype_ACK:
            USE_SERIAL.printf("[IOc] get ack: %u\n", length);
            break;
        case sIOtype_ERROR:
            USE_SERIAL.printf("[IOc] get error: %u\n", length);
            break;
        case sIOtype_BINARY_EVENT:
            USE_SERIAL.printf("[IOc] get binary: %u\n", length);
            break;
        case sIOtype_BINARY_ACK:
            USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
            break;
    }
}

void setup() {
    USE_SERIAL.begin(115200);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

      for(uint8_t t = 4; t > 0; t--) {
          USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
          USE_SERIAL.flush();
          delay(1000);
      }

    // searchWifi();

    connectWifi();

    String ip = WiFi.localIP().toString();
    USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

    // server address, port and URL
    socketIO.begin("192.168.0.10", 3000, "/socket.io/?EIO=4");

    // event handler
    socketIO.onEvent(socketIOEvent);
}

unsigned long messageTimestamp = 0;
void loop() {

  if (WiFi.status() != WL_CONNECTED) {
    USE_SERIAL.println("WiFi disconnected! Reconnecting...");
    connectWifi();
  }
  
  socketIO.loop();

}
