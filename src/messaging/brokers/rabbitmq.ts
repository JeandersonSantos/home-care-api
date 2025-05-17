import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

let channel: amqp.Channel;

export async function connect() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('whatsapp_messages');
  } catch (err) {
    console.error('[RabbitMQ] Erro ao conectar/criar canal:', err);
    throw err; 
  }
}

export async function sendToQueue(queueName: string, message: object) {
  try {
    if (!channel) throw new Error('Canal não inicializado. Chame connect() antes.');
    const payload = JSON.stringify(message);
    channel.sendToQueue(queueName, Buffer.from(payload));
  } catch (err) {
    console.error('[RabbitMQ] Erro ao enviar mensagem:', err);
    throw err;
  }
}


// export async function connect() {
//   const connection = await amqp.connect(RABBITMQ_URL);
//   channel = await connection.createChannel();
//   await channel.assertQueue('whatsapp_messages');
// }

// export async function sendToQueue(queueName: string, message: object) {
//   channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
// }