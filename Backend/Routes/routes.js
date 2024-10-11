import { Router } from "express";
import {
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
} from "../controllers/transactionController.js";

const router = Router();

router.get("/transactions", listTransactions);
router.get("/statistics/:month", getStatistics);
router.get("/chart-data/:month", getBarChartData);
router.get("/pie-chart-data", getPieChartData);

export default router;
