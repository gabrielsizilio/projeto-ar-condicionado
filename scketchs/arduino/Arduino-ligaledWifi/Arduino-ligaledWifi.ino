#include <IRremote.h>
#define MAX_IR_SIZE 200
#define MAX_MESSAGE_SIZE 1050

IRsend irsend;

unsigned int IRSignal[MAX_IR_SIZE];
char receivedMessage[MAX_MESSAGE_SIZE];
int messageIndex = 0;
int irIndex = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
    int khz = 38;
    // unsigned int IrLength = 0;
    // if (Serial.available() > 0) {
    //     // Lê a mensagem recebida da porta serial
    //     String receivedMessage = Serial.readStringUntil('\n');
    //     // Serial.println(receivedMessage);

    //     if (receivedMessage.startsWith("[\"EnviaIR\"")) {
    //         int tamanho = receivedMessage.length();
    //         // Serial.println("Tá entrando no IF!!");
    //         // receivedMessage = receivedMessage.substring(12);
    //         // receivedMessage.remove(tamanho - 1);
    //         Serial.println(receivedMessage);
    //     }
    //     //     // Serial.println(receivedMessage);
    //     //     int tamanho = receivedMessage.length();
    //     //     Serial.println(tamanho);

    //     //     char teste[10];
    //     //     int index = 0;
    //         // for(int i=0; i<tamanho; i++) {
    //             // char  c = receivedMessage[i];
                
    //             // if (c == ',' || c == ']') {
    //                 // Serial.print("NUMERO EM STRING: ");
    //                 // Serial.println(teste);
    //                 // IRSignal[IrLength++] = atoi(teste);
    //                 // IrLength++;
    //                 // memset(teste, 0, sizeof(teste));
    //                 // index = 0;
    //                 // Serial.print("IrLength: ");
    //                 // Serial.println(IrLength);
    //                 // return;
    //             // } else {
    //             //     teste[index++] = c;
    //             // }
    //         // }
    //         // Serial.println(receivedMessage);
    //     // }   
    // }


    if (Serial.available() > 0) {
    char c = Serial.read();  

    if (c == '\n' || messageIndex >= MAX_MESSAGE_SIZE - 1) {
        receivedMessage[messageIndex] = '\0';  

        if (strncmp(receivedMessage, "[\"EnviaIR\"", 10) == 0) {
            Serial.println("Mensagem \"EnviaIR\" recebida.");

            char buffer[10];
             unsigned int bufferIndex = 0;

            for(int i=12; i<messageIndex-1; i++) {
                if(receivedMessage[i] == ',' || receivedMessage[i] == ']') {
                    IRSignal[irIndex++] = atoi(buffer);
                    // Serial.print("String dentro do vetor: ");
                    // Serial.println(IRSignal[irIndex-1]);
                    memset(buffer, 0, sizeof(buffer));
                    bufferIndex = 0;
                } else {
                    buffer[bufferIndex++] = receivedMessage[i];
                }
            }
            // Serial.println(IRSignal[irIndex-1]);
            irsend.sendRaw(IRSignal, sizeof(IRSignal) / sizeof(IRSignal[0]), khz);

        } else {
            Serial.println("Mensagem não reconhecida.");
        }

        messageIndex = 0;  
    } else {
      receivedMessage[messageIndex++] = c;
    }
  }
}

