#include "config.h"
// #include <Arduino.h>
#include <IRremote.hpp>

#include <WiFi.h>
#include <WiFiClientSecure.h>

#include <ArduinoJson.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

SocketIOclient socketIO;

#define USE_SERIAL Serial

bool interferencePaused = false;
const int MAX_BLOCKED_PINS = 10;
int blockedPins[MAX_BLOCKED_PINS];
int numBlockedPins = 0;
unsigned long previousMillis = 0;
const int blinkInterval = 1;
bool blockedState = false;

typedef void (*EventHandler)(DynamicJsonDocument &);

void sendIr(uint16_t irCode[], size_t length, int pinIrSend) {
  interferencePaused = true;
  delay(50);
  IrSender.setSendPin(pinIrSend);
  IrSender.sendRaw(irCode, length, 38);
  ledcDetachPin(IrSender.sendPin);
  delay(50);
  interferencePaused = false;
}

void addBlockedEmissorPin(int pin) {
  if (numBlockedPins < MAX_BLOCKED_PINS) {
    pinMode(pin, OUTPUT);
    blockedPins[numBlockedPins++] = pin;
    Serial.printf("Adicionado pino bloqueado: %d\n", pin);
  } else {
    Serial.println("Limite de pinos bloqueados atingido!");
  }
}

void handleSendIr(DynamicJsonDocument &doc) {
  Serial.println("Command is EnviaIR");

  int pinIrSend = doc[1][0];
  JsonArray irCodeJsonArray = doc[1][1];

  size_t arraySize = irCodeJsonArray.size();
  uint16_t irCode[arraySize];

  for (size_t i = 0; i < arraySize; i++) {
    irCode[i] = irCodeJsonArray[i].as<uint16_t>();
  }

  sendIr(irCode, arraySize, pinIrSend);
}

void handleAddBlockedEmissors(DynamicJsonDocument &doc) {
  Serial.println("Command is AddBlockedEmissors");

  JsonArray pins = doc[1][0];

  size_t arraySize = pins.size();
  numBlockedPins = 0;

  for (size_t i = 0; i < arraySize; i++) {
    addBlockedEmissorPin(pins[i].as<int>());
  }
}

static struct {
  const char *name;
  EventHandler handler;
} eventHandlers[] = {
  { "EnviaIR", handleSendIr },
  { "AddBlockedEmissors", handleAddBlockedEmissors }
};

void generateIrInterference() {
  if (interferencePaused) return;
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= blinkInterval) {
    previousMillis = currentMillis;
    blockedState = !blockedState;

    for (int i = 0; i < numBlockedPins; i++) {
      digitalWrite(blockedPins[i], blockedState);
    }
  }
}

void stopIrInterference() {
  for (int i = 0; i < numBlockedPins; i++) {
    digitalWrite(blockedPins[i], LOW);
  }
  blockedState = false;
}

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

void processEvent(DynamicJsonDocument &doc) {
  const char *command = doc[0];
  for (const auto &eventHandler : eventHandlers) {
    if (strcmp(command, eventHandler.name) == 0) {
      eventHandler.handler(doc);
      return;
    }
  }

  Serial.printf("Unknown command: %s\n", command);
}

void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length) {
  switch (type) {
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

        if (error) {
          USE_SERIAL.print(F("deserializeJson() failed: "));
          USE_SERIAL.println(error.c_str());
          return;
        }

        processEvent(doc);
        break;
      }
    case sIOtype_ERROR:
      USE_SERIAL.printf("[IOc] get error: %u\n", length);
      break;
    default:
      USE_SERIAL.println("[IOc] Unknown event type.");
      break;
  }
}

void bootWait() {
  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }
}

void setup() {
  USE_SERIAL.begin(115200);
  // addBlockedEmissorPin(4);
  bootWait();
  // searchWifi();

  connectWifi();

  String ip = WiFi.localIP().toString();
  USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

  // server address, port and URL
  socketIO.begin(host, port, "/socket.io/?EIO=4");

  // event handler
  socketIO.onEvent(socketIOEvent);
}

void loop() {

  if (WiFi.status() != WL_CONNECTED) {
    USE_SERIAL.println("WiFi disconnected! Reconnecting...");
    connectWifi();
  }

  if (socketIO.isConnected()) {
    generateIrInterference();
  } else {
    stopIrInterference();
  }

  socketIO.loop();
}
