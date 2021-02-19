import { HorseModel } from "../horse.model";

export interface RequestCreateHorseModel extends Omit<HorseModel, "id"> {

}
