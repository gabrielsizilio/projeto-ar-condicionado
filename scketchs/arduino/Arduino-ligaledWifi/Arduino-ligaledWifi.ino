#define pinLed 8

#include <IRremote.h>
#include <ArduinoJson.h>

IRsend irsend;
int khz = 38;

const int maxStringSize = 1000;
char receivedString[maxStringSize];

int ligado = 0;
void alternaLed() {
  if (!ligado) {
    ligado = 1;
    digitalWrite(pinLed, HIGH);
  } else {
    ligado = 0;
    digitalWrite(pinLed, LOW);
  }
}

void parseList(String listString, int* intArray, int arraySize) {
  int index = 0;
  int start = 1;  // Ignora o primeiro caractere '['

  // Percorre a string, separando os elementos por vírgula e convertendo para inteiros
  for (int i = 1; i < listString.length(); i++) {
    if (listString[i] == ',' || listString[i] == ']') {
      listString[i] = '\0';                          // Substitui ',' ou ']' por '\0' para separar os elementos
      intArray[index++] = atoi(&listString[start]);  // Converte e adiciona o elemento ao vetor de inteiros
      start = i + 1;                                 // Atualiza o início para o próximo elemento
    }
    if (index >= arraySize) break;  // Sai do loop se o vetor estiver cheio
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(pinLed, OUTPUT);
}

void loop() {
  String mensagem = Serial.readString();
  String eu = "led";

  mensagem.trim();

  if (mensagem.equals(eu)) {
    // irsend.sendRaw(irSignal, sizeof(irSignal) / sizeof(irSignal[0]), khz);
    alternaLed();
  }




  String received = "[\"EnviaIR\",[\"5960, 7044, 608, 1564, 576, 1564, 580, 1564, 580, 1564, 576, 1564, 576, 1568, 576, 1564, 580, 1564, 576, 508, 576, 512, 572, 508, 576, 508, 576, 508, 576, 508, 576, 508, 576, 508, 576, 1564, 576, 1568, 576, 1568, 572, 1568, 576, 1568, 572, 1568, 576, 1568, 572, 1568, 572, 512, 572, 512, 548, 536, 548, 536, 548, 536, 548, 536, 548, 536, 548, 536, 544, 1600, 544, 1572, 568, 1576, 568, 1572, 544, 1600, 540, 1600, 544, 1596, 544, 1600, 568, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 1576, 568, 1572, 568, 520, 564, 1576, 568, 1572, 568, 1576, 564, 1576, 568, 1576, 564, 520, 564, 520, 564, 1576, 568, 520, 560, 524, 564, 520, 560, 524, 564, 520, 560, 524, 560, 1580, 564, 1580, 560, 524, 560, 1580, 564, 520, 560, 1584, 560, 1584, 556, 1584, 536, 548, 536, 548, 536, 1608, 556, 528, 556, 1588, 532, 552, 528, 556, 528, 556, 528, 1612, 532, 576, 508, 1632, 508, 576, 508, 1636, 508, 576, 508, 576, 508, 1632, 508, 576, 508, 1636, 508, 576, 508, 1636, 504, 580, 504, 1636, 508, 1636, 504, 7160, 504\"]]";

  StaticJsonDocument<maxStringSize> doc;
  deserializeJson(doc, received);

  String action = doc[0];
  Serial.println("Ação: " + action);

  String listString = doc[1];
  int intArray[200];  
  parseList(listString, intArray, 200);

  Serial.println("Elementos do vetor:");
  for (int i = 0; i < 200; i++) {
        if (intArray[i] != 0) {
            Serial.println(intArray[i]);
        } else {
            break; 
        }
  }
}
