import { Router } from "express";
const router = Router();
import createServiceController from "../controllers/serviceRequest/createServiceController.js";
import progressServiceController from "../controllers/serviceRequest/progressServiceController.js";
import fetchCreatorServiceController from "../controllers/serviceRequest/fetchCreatorServiceController.js";
import bestMatchServiceController from "../controllers/serviceRequest/bestMatchServiceController.js";
import fetchAvailableServices from "../controllers/serviceRequest/fetchAvailableServices.js";
import fetchServiceWithIdController from "../controllers/serviceRequest/fetchServiceWithIdController.js";
import applyToServiceController from "../controllers/serviceRequest/applyToServiceController.js";
import fetchOrderWithIdController from "../controllers/serviceRequest/fetchOrderWithIdController.js";
import verifySession from "../middleware/verifySession.js";
import fetchAppliedProvidersController from "../controllers/serviceRequest/fetchAppliedProvidersController.js";

//Create Service Request /api/service-request/create
router.post("/create", verifySession, createServiceController);

//Start work on Service Request /api/service-request/complete
router.post("/service-life", verifySession, progressServiceController);

//Start work on Service Request /api/service-request/complete
router.get("/profile-fetch", verifySession, fetchCreatorServiceController);

router.get("/fetch-bestmatch", verifySession, bestMatchServiceController);

router.get("/fetch-available", verifySession, fetchAvailableServices);

router.get("/fetch-with-serviceid", verifySession, fetchServiceWithIdController);
router.get("/fetch-with-orderid", verifySession, fetchOrderWithIdController);
router.get("/fetch-applied-providers", verifySession, fetchAppliedProvidersController);

router.post("/apply", verifySession, applyToServiceController);

export default router;
