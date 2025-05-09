import { Request, Response } from "express";
import {
  getRequestMedicalCare,
  createRequestMedicalCare,
  deleteRequestMedicalCare,
} from "../services/requestMedicalCare";
import { DataRequest } from "../types/dataRequest";

export const createMedicalRequest = async (req: Request, res: Response) => {
  try {
    const { date = "", name = "", phone = "", address = "" } = req.body || {};

    if (!date || !name || !phone || !address) {
      res.status(400).json({ error: "Todos os campos são obrigatórios" });
      return;
    }

    const dataRequest: DataRequest = {
      date,
      name,
      phone,
      address,
    };

    await createRequestMedicalCare(dataRequest);
    res.status(201).json({
      infoRequestCare: dataRequest,
      careProtocol: "11235813213455",
      doctor: "Dr. João Pedro",
    });
  } catch (error) {
    console.error("Erro ao criar solicitação:", error);
    res.status(500).json({ error: "Erro interno ao criar a solicitação" });
  }
};

export const listMedicalRequests = async (req: Request, res: Response) => {
  const list = await getRequestMedicalCare();
  res.status(200).json({ requests: list });
};

export const deleteMedicalRequest = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ error: "Não foi possivel encontrar a solicitação" });
    return;
  }

  await deleteRequestMedicalCare(id as string);
  res.status(200).json({ message: "Solicitação excluída com sucesso" });
};
