import {
  sendMenssageProtocol
} from "../services/sendMenssage";
import { Request, Response } from "express";
import dayjs from 'dayjs';
export const sendMenssageProtocolController = async (req: Request, res: Response) => {
try {
    const { protocol, date, name, doctor, phone, id } = req.body;
    if (!protocol || !date || !name || !doctor || !phone || !id) {
       res.status(400).json({ error: 'Todos os campos são obrigatórios' });
       return;
    }
    if (!date || !dayjs(date).isValid()) {
      throw new Error('Data inválida fornecida.');
    }
    const formattedDate =  dayjs(date).format('DD/MM/YYYY');;
    const sendMessageRequest ={ protocol, date: formattedDate, name, doctor, phone, id };
    const result = await sendMenssageProtocol(sendMessageRequest);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
};
