export async function sendWhatsAppMessage(message: {
  phone: string;
  protocol: string;
  name: string;
  date: string;
}) {
  console.log(`Enviando WhatsApp para ${message.phone}`);
  console.log(`Mensagem: Olá ${message.name}, seu protocolo é ${message.protocol}`);
}