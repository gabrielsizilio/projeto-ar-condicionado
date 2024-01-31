#include <IRremote.h>
#define MAX_IR_SIZE 230
#define MAX_MESSAGE_SIZE 300

IRsend irsend;

unsigned int IRSignal[MAX_IR_SIZE];
char receivedMessage[MAX_MESSAGE_SIZE];
bool irComplete = 0;


void setup() {
  Serial.begin(9600);
}

void loop() {
    int khz = 38;

    if (Serial.available() > 0) {
    String action = Serial.readStringUntil(',');

    if (strncmp(action.c_str(), "[\"EnviaIR\"", 10) == 0) {
        Serial.println("Mensagem \"EnviaIR\" recebida.");
        char buffer[10];
        unsigned int bufferIndex = 0;
        unsigned int irIndex = 0;

        while(!irComplete) {
            if (Serial.available() > 0) {
                char c = Serial.read(); 
                // Serial.print(c);

                if(c == '\n') {
                    irComplete = true;
                    return;
                }

                if(c != '[') {
                    // Serial.print(irIndex);
                    if((c == ',' || c == ']') && (bufferIndex != 0)) {
                        IRSignal[irIndex++] = atoi(buffer);
                        // Serial.print(IRSignal[irIndex-1]);
                        // Serial.print(" ");
                        memset(buffer, 0, sizeof(buffer));
                        bufferIndex = 0;
                    } else {
                        if(c != ']') {
                            buffer[bufferIndex++] = c;
                        }else {
                            Serial.println(irIndex);
                            irsend.sendRaw(IRSignal, sizeof(IRSignal) / sizeof(IRSignal[0]), khz);
                        }
                    }
                }
            }
        }
        // for(int i=0; i<irIndex-1; i++) {
        //     Serial.print(IRSignal[i]);
        //     Serial.print(" ");
        // }
    } else {
        Serial.println("Mensagem não reconhecida.");
    }

    // char c = Serial.read();  

    // if (c == '\n' || messageIndex >= MAX_MESSAGE_SIZE - 1) {
    //     receivedMessage[messageIndex] = '\0';  

    //     if (strncmp(receivedMessage, "[\"EnviaIR\"", 10) == 0) {
    //         Serial.println("Mensagem \"EnviaIR\" recebida.");

    //         char buffer[10];
    //         unsigned int bufferIndex = 0;

    //         for(int i=12; i<messageIndex-1; i++) {
    //             if(receivedMessage[i] == ',' || receivedMessage[i] == ']') {
    //                 IRSignal[irIndex++] = atoi(buffer);
    //                 memset(buffer, 0, sizeof(buffer));
    //                 bufferIndex = 0;
    //             } else {
    //                 buffer[bufferIndex++] = receivedMessage[i];
    //             }
    //         }
    //         irsend.sendRaw(IRSignal, sizeof(IRSignal) / sizeof(IRSignal[0]), khz);

    //     } else {
    //         Serial.println("Mensagem não reconhecida.");
    //     }

    //     messageIndex = 0;  
    // } else {
    //   receivedMessage[messageIndex++] = c;
    // }
  }
}

