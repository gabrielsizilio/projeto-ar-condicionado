
#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ArduinoJson.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#include <Hash.h>

SocketIOclient socketIO;
ESP8266WiFiMulti WiFiMulti;

#define USE_SERIAL Serial

// CONFIGURAÇÃO DO WIFI
#define WIFI_SSID "TP-LINK_555F3C"
#define WIFI_PASS ""
