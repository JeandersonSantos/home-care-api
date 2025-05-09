import express from "express";
import { getRequestMedicalCare, createRequestMedicalCare, deleteRequestMedicalCare } from "../services/requestMedicalCare";
import { DataRequest } from "../types/dataRequest";

const router = express.Router();

router.post("/request-medical-care", async (req: any, res: any) => {
  const { date, name, phone, address } = req.body;
  if (!date) {
    return res.status(400).json({ error: "A data é obrigatória" });
  }
  if (!name) {
    return res.status(400).json({ error: "O nome é obrigatório" });
  }
  if (!phone) {
    return res.status(400).json({ error: "O telefone é obrigatório" });
  }
  if (!address) {
    return res.status(400).json({ error: "O endereço é obrigatório" });
  }
  const dataRequest : DataRequest= {
    date,
    name,
    phone,
    address,
  };
  await createRequestMedicalCare(dataRequest);
  res
    .status(201)
    .json({
      infoRequestCare: dataRequest,
      careProtocol: "11235813213455",
      doctor: "Dr. João Pedro",
    });
});

router.get("/request-medical-care", async (req: any, res: any) => {
  let list = await getRequestMedicalCare();
  res.status(200).json({ contatos: list });
});

router.delete("/request-medical-care/", async (req: any, res: any) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Não foi possivel encontrar a solicitação" });
  }

  await deleteRequestMedicalCare(id as string);
  res.status(200).json({ message: "Solicitação excluída com sucesso" });
});
export default router;
