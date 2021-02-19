import { Sex } from "../enums";

export interface HorseModel {
    id: string;
    name: string;
    dateOfBirth: string;
    sex: Sex;
    pregnant: boolean | null;
    dueDate: string | null;
}