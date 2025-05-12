import { Request, Response } from "express";
import {
  getRequestMedicalCare,
  createRequestMedicalCare,
  updateRequestMedicalCare,
  deleteRequestMedicalCare,
} from "../services/requestMedicalCare";
import { DataRequest } from "../types/dataRequest";

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
      !name ||
      !phone ||
      !street ||
      !number ||
      !neighborhood ||
      !city 
    ) {
      res.status(400).json({ error: "Todos os campos são obrigatórios" });
      return;
    }

    const dataRequest: DataRequest = {
      name,
      phone,
      street,
      number,
      neighborhood,
      city,
    };
    const result = await createRequestMedicalCare(dataRequest);
    res.status(201).json({
      infoRequestCare: result,
      careProtocol: "11235813213455",
      doctor: "Dr. João Pedro",
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno ao criar a solicitação" });
  }
};

export const listMedicalRequests = async (req: Request, res: Response) => {
  const list = await getRequestMedicalCare();
  res.status(200).json({ requests: list });
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
