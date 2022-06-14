import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { CreateCampusController } from "./controllers/campus/CreateCampusController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateBuildingController } from "./controllers/building/CreateBuildingController";
import { CreateRoomController } from "./controllers/room/CreateRoomController";
import { ListRoomController } from "./controllers/room/ListRoomController";
import { ListUserCampusRoomsController } from "./controllers/room/ListUserCampusRoomsController";
import { ListMovementsController } from "./controllers/movement/ListMovementsController";
import { ListAllBuildingsController } from "./controllers/building/ListAllBuildingsController";
import { ListBuildingsController } from "./controllers/building/ListBuildingsController";
import { CheckoutController } from "./controllers/movement/CheckoutController";
import { CheckinController } from "./controllers/movement/CheckinController";

const router = Router();

// ** ROTAS PARA USUÁRIO **
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// ** ROTAS PARA CAMPUS **
router.post('/campus', isAuthenticated, new CreateCampusController().handle);

// ** ROTAS PARA PRÉDIOS **
router.post('/buildings', isAuthenticated, new CreateBuildingController().handle);
router.get('/list_building', isAuthenticated, new ListAllBuildingsController().handle);
router.get('/buildings', isAuthenticated, new ListBuildingsController().handle);

// ** ROTAS PARA SALAS **
router.post('/rooms', isAuthenticated, new CreateRoomController().handle);
router.get('/list_room', isAuthenticated, new ListRoomController().handle);
router.get('/rooms', isAuthenticated, new ListUserCampusRoomsController().handle);

// ** ROTAS PARA CHECK-IN **
router.post('/checkin', isAuthenticated, new CheckinController().handle);
router.get('/movements', isAuthenticated, new ListMovementsController().handle);

// ** ROTAS PARA CHECK-OUT **
router.patch('/checkout', isAuthenticated, new CheckoutController().handle);

export { router };