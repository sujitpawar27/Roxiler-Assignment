import { Router } from 'express';
import transactionController from '../controllers/transactionController.js';



const router = Router();


// router.get('/transactions', transactionController.initializeDatabase);
router.get('/transactions', transactionController.listTransactions);
router.get('/statistics/:month', transactionController.getStatistics);
router.get('/chart-data/:month', transactionController.getBarChartData);
// router.get('/pie-chart-data', transactionController.getPieChartData);
// router.get('/combined-data', transactionController.getCombinedData);

export default router;
