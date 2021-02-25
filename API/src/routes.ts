//Router vai servir para chamar o arquivo UserController
import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveysController();
const sendMailController = new SendMailController();


// Criando rota de usuário/user
router.post("/users", userController.create);
// Criando rota de survey/pesquisa
router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);
// Criando rota de envio de email
router.post("/sendMail", sendMailController.execute);


export { router };