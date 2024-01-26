#include "config.h"

void setupSocket() {
    String mac = Wifi.macAddress();

    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

       // add evnet name
       // Hint: socket.on('event_name', ....)
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

void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
        USE_SERIAL.printf("[IOc] Disconnected!\n");
        break;
    case sIOtype_CONNECT:
        USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);
        setupSocket();
      // // join default namespace (no auto join in Socket.IO V3)
      // socketIO.send(sIOtype_CONNECT, "/");
       break;
    case sIOtype_EVENT:
        if (strstr((char*)payload, "button") != NULL) {
          // Lógica a ser executada quando o evento 'button' é recebido
          USE_SERIAL.println("led");
        }else {
          USE_SERIAL.printf("[IOc] get event: %s\n", payload);
        }
        break;
    }
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
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    USE_SERIAL.print(".");
    delay(1000);
  }

  USE_SERIAL.println("");
  USE_SERIAL.println("Wifi Conneted!");
  USE_SERIAL.print("IP ADDRESS: ");
  USE_SERIAL.println(WiFi.localIP());
}


void setup() {
  USE_SERIAL.begin(9600);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  // searchWifi();

  // connectWifi();

  // disable AP
  if (WiFi.getMode() & WIFI_AP) {
    WiFi.softAPdisconnect(true);
  }

  WiFiMulti.addAP(WIFI_SSID, WIFI_PASS);

  // WiFi.disconnect();
  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }
  String ip = WiFi.localIP().toString();
  USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

  // server address, port and URL
  // socketIO.begin("192.168.0.7", 8081, "/socket.io/?EIO=4");
  socketIO.begin("192.168.0.102", 8081, "/socket.io/?EIO=4");

  // event handler
  socketIO.onEvent(socketIOEvent);
}

void loop() {
  socketIO.loop();

  // uint64_t now = millis();

  // if(now - messageTimestamp > 2000) {
  //     messageTimestamp = now;

  //     // creat JSON message for Socket.IO (event)
  //     DynamicJsonDocument doc(1024);
  //     JsonArray array = doc.to<JsonArray>();

  //     // add evnet name
  //     // Hint: socket.on('event_name', ....
  //     array.add("event_name");

  //     // add payload (parameters) for the event
  //     JsonObject param1 = array.createNestedObject();
  //     param1["now"] = (uint32_t) now;

  //     // JSON to String (serializion)
  //     String output;
  //     serializeJson(doc, output);

  //     // Send event
  //     socketIO.sendEVENT(output);

  //     // Print JSON for debugging
  //     USE_SERIAL.println(output);
  // }
}
