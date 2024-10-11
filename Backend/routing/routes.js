import { Router } from "express";
import {
  initializeDatabase,
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
} from "./controllers/transactionController.js";

const router = Router();

router.get("/transactions/seed", initializeDatabase);
router.get("/transactions", listTransactions);
router.get("/statistics/:month", getStatistics);
router.get("/chart-data/:month", getBarChartData);
router.get("/pie-chart-data", getPieChartData);
router.get("/combined-data", getCombinedData);

export default router;
