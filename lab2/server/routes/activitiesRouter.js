import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import * as activityController from "../controllers/activitityController.js"

const activitiesRouter = Router();

activitiesRouter.post('/activities/', authMiddleware, activityController.AddActivity);
activitiesRouter.get('/activities/', authMiddleware, activityController.getAllActivitiesForUser);
activitiesRouter.get('/activities/:id', authMiddleware, activityController.getActivityById);
activitiesRouter.put('/activities/', authMiddleware, activityController.EditActivity);
activitiesRouter.delete('/activities/:id', authMiddleware, activityController.DeleteActivity);

export default activitiesRouter;