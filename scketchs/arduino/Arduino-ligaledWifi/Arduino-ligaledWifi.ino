#define pinLed 8

#include <IRremote.h>

IRsend irsend;
unsigned int irSignal[] = {5916, 7092, 560, 1584, 536, 1604, 564, 1580, 560, 1580, 564, 1580, 536, 1604, 564, 1580, 560, 1580, 540, 544, 568, 516, 540, 544, 564, 520, 564, 524, 560, 520, 564, 520, 564, 524, 560, 1580, 536, 1608, 536, 1604, 536, 1608, 536, 1604, 540, 1604, 536, 1604, 540, 1604, 556, 528, 564, 520, 560, 524, 564, 520, 564, 520, 560, 524, 536, 548, 564, 520, 540, 544, 564, 1580, 560, 1580, 540, 1604, 560, 1580, 564, 1580, 536, 1608, 560, 1584, 536, 1604, 536, 548, 536, 548, 536, 548, 536, 548, 536, 548, 536, 548, 536, 548, 536, 1604, 536, 552, 532, 548, 540, 1604, 536, 1608, 536, 1604, 560, 1584, 564, 1576, 564, 520, 564, 1580, 564, 1576, 564, 520, 564, 520, 540, 548, 536, 548, 560, 520, 540, 1604, 540, 1604, 536, 548, 560, 1580, 536, 1608, 560, 524, 536, 1608, 556, 1584, 536, 548, 536, 548, 536, 1608, 532, 552, 532, 552, 532, 1608, 560, 524, 536, 548, 536, 548, 536, 1608, 532, 552, 556, 1584, 532, 552, 536, 1608, 532, 552, 532, 552, 532, 1612, 532, 552, 532, 1608, 532, 556, 528, 1612, 532, 552, 532, 1612, 528, 1612, 532, 7156, 508};
int khz = 38; // 38kHz carrier frequency for the NEC protocol

int ligado = 0;
void alternaLed() {
  if(!ligado) {
    ligado = 1;
    digitalWrite(pinLed, HIGH); // Define o pino como HIGH (ligado)
  } else {
    ligado = 0;
    digitalWrite(pinLed, LOW);  // Define o pino como LOW (desligado)
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(pinLed, OUTPUT);

}

void loop() {
  // String mensagem = Serial.readStringUntil('\n');
  String mensagem = Serial.readString();
  String eu = "led";
  
  mensagem.trim();

  if (mensagem.equals(eu)) {
    irsend.sendRaw(irSignal, sizeof(irSignal) / sizeof(irSignal[0]), khz);
    alternaLed();
  }
}
