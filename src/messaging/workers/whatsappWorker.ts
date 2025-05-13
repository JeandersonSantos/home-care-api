import amqp from 'amqplib';
import { sendWhatsAppMessage } from '../providers/whatsappService';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

async function startWhatsAppWorker() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    
    await channel.assertQueue('whatsapp_messages');
    console.log('WhatsApp worker waiting for messages...');

    channel.consume('whatsapp_messages', async (msg) => {

    if (msg) {
      try {
        const message = JSON.parse(msg.content.toString());
        console.log('Processing WhatsApp message:', message);
        
        // Verifica se o protocolo é par (sucesso) ou ímpar (erro)
        const protocolNumber = parseInt(message.protocol);
        if (protocolNumber % 2 === 0) {
          await sendWhatsAppMessage({
            phone: message.phone,
            protocol: message.protocol,
            name: message.name,
            date: message.date
          });
          console.log('Mensagem enviada com sucesso!');
        } else {
          console.log('Erro simulado: número de protocolo ímpar');
          // Aqui você poderia implementar uma DLQ (Dead Letter Queue) se quiser
        }
        
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error);
      }
   }
    });
  } catch (error) {
    console.error('Error in WhatsApp worker:', error);
    setTimeout(startWhatsAppWorker, 5000); // Tentar reconectar após 5 segundos
  }
}

startWhatsAppWorker();