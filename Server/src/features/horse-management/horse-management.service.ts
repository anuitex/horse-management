import { v4 as uuidv4 } from "uuid";
import { BaseResponseModel } from "../../core/models";
import * as projectRepository from "./horse-management.repository";
import {
  HorseModel,
  RequestCreateHorseModel,
  RequestSearchHorseModel,
  RequestUpdateHorsesModel,
  ResponseSearchHorsesModel
} from "./models";

export async function createHorse({ name, dateOfBirth, sex, pregnant, dueDate }: RequestCreateHorseModel): Promise<BaseResponseModel> {
  let payload: HorseModel = {
    id: uuidv4(),
    name: name,
    dateOfBirth: dateOfBirth,
    sex: sex,
    pregnant: pregnant ?? null,
    dueDate: dueDate ?? null,
  };
  const created = await projectRepository.create(payload);
  return created;
}

export async function deleteHorse(id: string): Promise<BaseResponseModel> {
  const deleted = await projectRepository.deleteById(id);
  return deleted;
}

export async function updateHorse(body: RequestUpdateHorsesModel): Promise<BaseResponseModel> {
  const updated = await projectRepository.update(body);
  return updated;
}

export async function getPage(body: RequestSearchHorseModel): Promise<ResponseSearchHorsesModel> {
  const data = await projectRepository.search(body);
  return data;
}