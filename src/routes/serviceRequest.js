import { Router } from "express";
const router = Router();
import createServiceController from "../controllers/serviceRequest/createServiceController.js";
import progressServiceController from "../controllers/serviceRequest/progressServiceController.js";
import fetchCreatorServiceController from "../controllers/serviceRequest/fetchCreatorServiceController.js";
import bestMatchServiceController from "../controllers/serviceRequest/bestMatchServiceController.js";
import fetchAvailableServices from "../controllers/serviceRequest/fetchAvailableServices.js";
import fetchServiceWithIdController from "../controllers/serviceRequest/fetchServiceWithIdController.js";
import passportMiddleware from "../middleware/passportMiddleware.js";
import applyToServiceController from "../controllers/serviceRequest/applyToServiceController.js";
import fetchOrderWithIdController from "../controllers/serviceRequest/fetchOrderWithIdController.js";

//Create Service Request /api/service-request/create
router.post("/create", passportMiddleware, createServiceController);

//Start work on Service Request /api/service-request/complete
router.post("/service-life", passportMiddleware, progressServiceController);

//Start work on Service Request /api/service-request/complete
router.get("/profile-fetch", passportMiddleware, fetchCreatorServiceController);

router.get("/fetch-bestmatch", passportMiddleware, bestMatchServiceController);

router.get("/fetch-available", passportMiddleware, fetchAvailableServices);

router.get("/fetch-with-serviceid", passportMiddleware, fetchServiceWithIdController);
router.get("/fetch-with-orderid", passportMiddleware, fetchOrderWithIdController);

router.post("/apply", passportMiddleware, applyToServiceController);

export default router;
