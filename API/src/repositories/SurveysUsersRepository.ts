import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)// Especifica que essa classe será um repositório do model SurveyUser do BD(sqlite)
class SurveysUsersRepository extends Repository<SurveyUser> {

}

export { SurveysUsersRepository }