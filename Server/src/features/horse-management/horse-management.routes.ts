import { Router } from "express";
import { ApiEndpointsConstants } from "../../config/api-endpoints.constants";
import * as ProjectController from "./horse-management.controller";

export const horseManagementRouter: Router = Router();

horseManagementRouter.post(ApiEndpointsConstants.CREATE_HORSE, ProjectController.createHorseHandler);
horseManagementRouter.delete(ApiEndpointsConstants.DELETE_HORSE, ProjectController.deleteHorseHandler);
horseManagementRouter.post(ApiEndpointsConstants.UPDATE_HORSE, ProjectController.updateHorseHandler);
horseManagementRouter.get(ApiEndpointsConstants.SEARCH_HORSES, ProjectController.paginationHandler)