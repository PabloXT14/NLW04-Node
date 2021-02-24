import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

@EntityRepository(Survey)// Especifica que essa classe será um repositório de pesquisa/surveys do BD(sqlite)
class SurveysRepository extends Repository<Survey> {

}

export { SurveysRepository }