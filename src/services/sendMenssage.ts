import fetch from 'node-fetch';
import { SendMessageRequest } from "../types/sendMenssageRequest";
import dayjs from 'dayjs';

export const sendMenssageProtocol = async (sendMessageRequest: SendMessageRequest) => {
  try {
    const { protocol, date, name, doctor, phone, id } = sendMessageRequest;

    if (!date || !dayjs(date).isValid()) {
      throw new Error('Data inválida fornecida.');
    }
    const formattedDate =  dayjs(date).format('DD/MM/YYYY');

    const message = `Sr(a) ${name}, o número de protocolo do atendimento é: ${protocol}, data da solicitação: ${formattedDate}, o doutor ${doctor} irá lhe atender.`;
    const apiKey = process.env.GZAPPY_API_KEY;
    if (!apiKey) {
      throw new Error('Autorização não está definida no ambiente.');
    }
    const response = await fetch('https://v2-api.gzappy.com/message/send-text', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: phone,
        message: message
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API GZappy: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    let errorMessage = 'Erro desconhecido';
    if (error instanceof Error) { 
      errorMessage = error.message;
    }
  throw new Error(errorMessage);  }
};