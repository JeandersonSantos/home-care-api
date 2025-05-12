import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

let channel: amqp.Channel;

export async function connect() {
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('whatsapp_messages');
}

export async function sendToQueue(queueName: string, message: object) {
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
}