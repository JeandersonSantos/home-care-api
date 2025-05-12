import express from "express";
import {
  createMedicalRequest,
  listMedicalRequests,
  deleteMedicalRequest,
  updateMedicalRequest,
} from "../controllers/requestMedicalController";
const router = express.Router();

router.post("/attendance", createMedicalRequest);
router.get("/attendance", listMedicalRequests);
router.patch("/attendance", updateMedicalRequest);
router.delete("/attendance", deleteMedicalRequest);

export default router;
