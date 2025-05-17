import express from "express";
import {
  createMedicalRequest,
  listMedicalRequests,
  deleteMedicalRequest,
  updateMedicalRequest,
} from "../controllers/requestMedicalController";
import { sendMenssageProtocolController } from "../controllers/sendMenssageController";

const router = express.Router();

router.post("/attendance", createMedicalRequest);
router.get("/attendance", listMedicalRequests);
router.patch("/attendance", updateMedicalRequest);
router.delete("/attendance", deleteMedicalRequest);
router.post("/send-message-protocol", sendMenssageProtocolController);

export default router;
