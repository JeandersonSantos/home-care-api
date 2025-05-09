import express from "express";
import {
  createMedicalRequest,
  listMedicalRequests,
  deleteMedicalRequest,
} from "../controllers/requestMedicalController";
const router = express.Router();

router.post("/request-medical-care", createMedicalRequest);
router.get("/request-medical-care", listMedicalRequests);
router.delete("/request-medical-care", deleteMedicalRequest);

export default router;
