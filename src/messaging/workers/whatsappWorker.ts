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
          
          // Implemente o envio real para a API do WhatsApp aqui
          await sendWhatsAppMessage(message);
          
          channel.ack(msg);
        } catch (error) {
          console.error('Error processing message:', error);
          // Pode adicionar lógica de retry ou dead letter queue aqui
        }
      }
    });
  } catch (error) {
    console.error('Error in WhatsApp worker:', error);
    setTimeout(startWhatsAppWorker, 5000); // Tentar reconectar após 5 segundos
  }
}

startWhatsAppWorker();