import { Sex } from "../../enums";

export interface HorseModel {
  id: string;
  name: string;
  heartsRate?: number;
  isWarning?: boolean;
  dateOfBirth: string | Date;
  sex: Sex;
  pregnant?: boolean | string;
  dueDate?: string;
}
