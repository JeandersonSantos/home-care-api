import { Request, Response } from "express";
import {
  getRequestMedicalCare,
  createRequestMedicalCare,
  updateRequestMedicalCare,
  deleteRequestMedicalCare,
} from "../services/requestMedicalCare";
import { DataRequest } from "../types/dataRequest";
import  generateProtocolNumber  from "../utils/generateProtocolNumber";
import {
  sendMenssageProtocol
} from "../services/sendMenssage";

export const createMedicalRequest = async (req: Request, res: Response) => {
  try {
    const {
      name = "",
      phone = "",
      street = "",
      number = "",
      neighborhood = "",
      city = "",
    } = req.body || {};

    if (
      !name.trim() ||
      !phone.trim() ||
      !street.trim() ||
      !number.trim() ||
      !neighborhood.trim() ||
      !city.trim()
    ) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios e não podem ser vazios' });
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      throw new Error(`Número de telefone inválido `);
    }

    const dataRequest: DataRequest = {
      name: name.trim(),
      phone: cleanPhone,
      street: street.trim(),
      number: number.trim(),
      neighborhood: neighborhood.trim(),
      city: city.trim(),
    };

    const result = await createRequestMedicalCare(dataRequest);
    const careProtocol = generateProtocolNumber(); 
    const doctor = "Dr. João Pedro";

    res.status(201).json({
      infoRequestCare: result,
      careProtocol: careProtocol,
      doctor,
    });

    const sendMessageRequest = {
      protocol: careProtocol,
      date: result.createdAt || new Date(),
      name: name.trim(),
      doctor,
      phone: cleanPhone,
      id: result.id,
    };    
    
    sendMenssageProtocol(sendMessageRequest)
      .then((data) => {
        console.debug(`Mensagem Enviada:`, data);
      })
      .catch((error: unknown) => {
        let errorMessage = 'Erro desconhecido';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.error(`Erro ao enviar mensagem, erro: ${errorMessage}`);
      });

  } catch (error) {
    res.status(500).json({ error: "Erro interno ao criar a solicitação" });

  }
};

export const listMedicalRequests = async (req: Request, res: Response) => {
  const list = await getRequestMedicalCare();
  res.status(200).json({  ...list });
};

export const updateMedicalRequest = async (req: Request, res: Response) => {
  const { id } = req.query;
  const dataRequest = req.body;
  if (!id) {
    res.status(400).json({ error: "Não foi possivel encontrar a solicitação" });
    return;
  }

  const result =  await updateRequestMedicalCare(id as string, dataRequest);
  res
    .status(200)
    .json({ message: "Solicitação atualizada com sucesso", result });
};

export const deleteMedicalRequest = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ error: "Não foi possivel encontrar a solicitação" });
    return;
  }
  const result = await deleteRequestMedicalCare(id as string);
  res.status(200).json({ message: "Solicitação excluída com sucesso", result });
};
