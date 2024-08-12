#include <IRremote.h>
#define MAX_IR_SIZE 230
#define MAX_MESSAGE_SIZE 50


IRsend irsend;

unsigned int IRSignal[MAX_IR_SIZE];
char receivedMessage[MAX_MESSAGE_SIZE];
bool irComplete = 0;
unsigned int indexControlador;


void setup() {
  Serial.begin(9600);
}

void loop() {
    int khz = 38;

    if (Serial.available() > 0) {
    String action = Serial.readStringUntil(',');
    Serial.println(action);

    unsigned int irIndex = 0;
    if (strncmp(action.c_str(), "[\"EnviaIR\"", 10) == 0) {
        Serial.println("Mensagem \"EnviaIR\" recebida.");
        char buffer[10];
        unsigned int bufferIndex = 0;

        int reads = 0;

        while(reads < 1){
            if( Serial.available() > 0){
                String aux = Serial.readStringUntil(',');
                aux[0] = aux[1];
                aux[1] = '\0';
                indexControlador= aux.toInt();
                reads++;
            }
        }


        while(!irComplete) {
            if (Serial.available() > 0) {
                char c = Serial.read(); 

                if(c == '\n') {
                    irComplete = true;
                }

                if(c != '[') {
                    if((c == ',' || c == ']') && (bufferIndex != 0)) {
                        IRSignal[irIndex++] = atoi(buffer);
                        memset(buffer, 0, sizeof(buffer));
                        bufferIndex = 0;
                    } else {
                        if(c != ']' && c != '\r') {
                            buffer[bufferIndex++] = c;
                        }
                    }
                }
            }
        }
        // Serial.println(irIndex);
        // irsend.sendRaw(IRSignal, sizeof(IRSignal) / sizeof(IRSignal[0]), khz);


        irsend.setSendPin(indexControlador);
        irsend.sendRaw(IRSignal, irIndex, khz);
        IRSignal[irIndex] = '\0';
        
        Serial.println(irIndex);

        for(int i=0; i < irIndex; i++) {
            Serial.print(IRSignal[i]);
            Serial.print(" ");
        }

        irIndex = 0;
        irComplete = 0;
    } else {
        Serial.println("Mensagem não reconhecida.");
    }
  }
}

