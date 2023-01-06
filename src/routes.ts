import { Router } from "express";
import multer from "multer";
import uploadConfig from './config/multer';

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { isAdministrator } from "./middlewares/isAdministrator";
import { CreateUserAdministratorController } from "./controllers/admin/CreateUserAdministratorController";
import { DeleteUserAdministratorController } from "./controllers/admin/DeleteUserAdministratorController";
import { ListUserAdministratorController } from "./controllers/admin/ListUserAdministratorController";
import { EditUserAdministratorController } from "./controllers/admin/EditUserAdministratorController";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { EditUserProfileController } from "./controllers/user/EditUserProfileController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCampusController } from "./controllers/campus/CreateCampusController";
import { ListCampusController } from "./controllers/campus/ListCampusController";
import { EditCampusController } from "./controllers/campus/EditCampusController";
import { DeleteCampusController } from "./controllers/campus/DeleteCampusController";

import { ListUserCampusEnvironmentController } from "./controllers/room/ListUserCampusEnvironmentController";
import { CreateBuildingController } from "./controllers/building/CreateBuildingController";
import { ListAllBuildingsController } from "./controllers/building/ListAllBuildingsController";
import { ListBuildingsController } from "./controllers/building/ListBuildingsController";
import { EditBuildingsController } from "./controllers/building/EditBuildingsController";
import { DeleteBuildingsController } from "./controllers/building/DeleteBuildingsController";

import { CreateRoomController } from "./controllers/room/CreateRoomController";
import { EditRoomController } from "./controllers/room/EditRoomController";
import { DeleteRoomController } from "./controllers/room/DeleteRoomController";
import { ListRoomController } from "./controllers/room/ListRoomController";
import { ListUserCampusRoomsController } from "./controllers/room/ListUserCampusRoomsController";

import { ListMovementsController } from "./controllers/movement/ListMovementsController";
import { CheckoutController } from "./controllers/movement/CheckoutController";
import { CheckinController } from "./controllers/movement/CheckinController";

import { CreateHealthTipController } from "./controllers/health_tip/CreateHealthTipController";
import { ListHealthTipsController } from "./controllers/health_tip/ListHealthTipsController";
import { DeleteHealthTipController } from "./controllers/health_tip/DeleteHealthTipController";

import { ListAlertController } from "./controllers/alert/ListAlertController";
import { CreateDiseaseContaminationReportController } from "./controllers/disease_contamination/CreateDiseaseContaminationReportController";

import { ListDashboardCardsController } from "./controllers/dashboard/ListDashboardCardsController";
import { ListDashboardSeriesController } from "./controllers/dashboard/ListDashboardSeriesController";
import { ListPercentageRiskGroupController } from "./controllers/dashboard/ListPercentageRiskGroupController";
import { ListPercentageVaccineDosesController } from "./controllers/dashboard/ListPercentageVaccineDosesController";
import { ListSeriesForCasesByCourseController } from "./controllers/dashboard/ListSeriesForCasesByCourseController";
import { ListSeriesForCasesByYearController } from "./controllers/dashboard/ListSeriesForCasesByYearController";
import { EditThisUserAdministratorController } from "./controllers/admin/EditThisUserAdministratorController";
import { ListContaminedStudantsController } from "./controllers/dashboard/ListContaminedStudantsController";
import { ListAlertsContaminationController } from "./controllers/dashboard/ListAlertsContaminationController";

const router = Router();
const upload = multer(uploadConfig.upload("./uploads"));

// ** ROTAS PARA USUÁRIO **
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.patch('/editme', isAuthenticated, new EditUserProfileController().handle);
router.delete('/deleteme', isAuthenticated, new DeleteUserController().handle);
router.get('/alerts', isAuthenticated, new ListAlertController().handle);
router.post('/contamination', isAuthenticated, upload.single('file'), new CreateDiseaseContaminationReportController().handle);

// ** ROTAS PARA CAMPUS **
// router.post('/campus', isAuthenticated, isAdministrator, new CreateCampusController().handle);
// router.get('/campus', isAuthenticated, isAdministrator, new ListCampusController().handle);
// router.patch('/campus', isAuthenticated, isAdministrator, new EditCampusController().handle);
// router.delete('/campus', isAuthenticated, isAdministrator, new DeleteCampusController().handle);

// ** ROTAS PARA PRÉDIOS **
router.get('/buildings', isAuthenticated, new ListBuildingsController().handle);
router.post('/buildings', isAuthenticated, isAdministrator, new CreateBuildingController().handle);
router.get('/list_building', isAuthenticated, isAdministrator, new ListAllBuildingsController().handle);
router.patch('/buildings', isAuthenticated, isAdministrator, new EditBuildingsController().handle);
// router.delete('/building', isAuthenticated, isAdministrator, new DeleteBuildingsController().handle);

// ** ROTAS PARA SALAS **
router.get('/rooms', isAuthenticated, new ListUserCampusRoomsController().handle);
router.get('/environments', isAuthenticated, new ListUserCampusEnvironmentController().handle);
router.post('/rooms', isAuthenticated, isAdministrator, new CreateRoomController().handle);
router.get('/list_room', isAuthenticated, isAdministrator, new ListRoomController().handle);
router.patch('/rooms', isAuthenticated, isAdministrator, new EditRoomController().handle);
router.delete('/rooms', isAuthenticated, isAdministrator, new DeleteRoomController().handle);

// ** ROTAS PARA CHECK-IN E CHECK-OUT **
router.post('/checkin', isAuthenticated, new CheckinController().handle);
router.patch('/checkout', isAuthenticated, new CheckoutController().handle);
router.get('/movements', isAuthenticated, new ListMovementsController().handle);

// ** ROTAS PARA DICAS DE SAÚDE **
router.get('/health_tips', isAuthenticated, new ListHealthTipsController().handle);
router.post('/health_tip', isAuthenticated, isAdministrator, upload.single('file'), new CreateHealthTipController().handle);
router.delete('/health_tip', isAuthenticated, isAdministrator, new DeleteHealthTipController().handle);

// ** ROTAS PARA CONTROLE DOS ADMINISTRADORES **
router.post('/user/admin', isAuthenticated, isAdministrator, new CreateUserAdministratorController().handle);
router.delete('/user/admin', isAuthenticated, isAdministrator, new DeleteUserAdministratorController().handle);
router.patch('/user/admin', isAuthenticated, isAdministrator, new EditUserAdministratorController().handle);
router.patch('/user/admin/edit', isAuthenticated, isAdministrator, new EditThisUserAdministratorController().handle);
router.get('/user/admin', isAuthenticated, isAdministrator, new ListUserAdministratorController().handle);
router.get('/dashboard/cards', isAuthenticated, isAdministrator, new ListDashboardCardsController().handle);
router.get('/dashboard/series', isAuthenticated, isAdministrator, new ListDashboardSeriesController().handle);
router.get('/dashboard/group_risk', isAuthenticated, isAdministrator, new ListPercentageRiskGroupController().handle);
router.get('/dashboard/vaccine_doses', isAuthenticated, isAdministrator, new ListPercentageVaccineDosesController().handle);
router.get('/dashboard/cases_by_course', isAuthenticated, isAdministrator, new ListSeriesForCasesByCourseController().handle);
router.get('/dashboard/cases_by_year', isAuthenticated, isAdministrator, new ListSeriesForCasesByYearController().handle);
router.get('/dashboard/list_studants_contamined', isAuthenticated, isAdministrator, new ListContaminedStudantsController().handle);
router.get('/dashboard/alerts', isAuthenticated, isAdministrator, new ListAlertsContaminationController().handle);

export { router };