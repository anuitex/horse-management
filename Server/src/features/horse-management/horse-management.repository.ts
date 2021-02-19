import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { BaseResponseModel } from "../../core/models";
import {
  HorseModel,
  RequestSearchHorseModel,
  RequestUpdateHorsesModel,
  ResponseSearchHorsesModel
} from "./models";

export async function create({ id, name, dateOfBirth, sex, pregnant, dueDate }: HorseModel): Promise<BaseResponseModel> {
  let created: QueryResult<HorseModel> = await pool.query(
    "INSERT INTO horses(id, name, dateofbirth, sex,  pregnant, duedate) VALUES ($1, $2, $3, $4, $5,$6)",
    [id, name, dateOfBirth, sex, pregnant, dueDate]
  );
  if (created) {
    return { isSuccessful: true, message: `Horse ${name} added` }
  } else {
    created
    return { isSuccessful: false, message: "No " }
  }
}

export async function update(body: RequestUpdateHorsesModel): Promise<BaseResponseModel> {
  const updated = await pool.query(
    `UPDATE horses SET name='${update.name}', dateofbirth='${body.dateOfBirth}', sex=${body.sex}, pregnant=${body.pregnant}, duedate='${body.dueDate}' WHERE id='${body.id}'`
  );
  if (!updated) {
    return { isSuccessful: false, message: `No updated ${body.name}` }
  } else {
    return { isSuccessful: true, message: `Updated ${body.name}` }
  }
}

export async function deleteById(id: string): Promise<BaseResponseModel> {
  const find: QueryResult<HorseModel> = await pool.query("SELECT * FROM horses WHERE id=$1", [id]);

  if (!find.rowCount) {
    return { isSuccessful: false, message: `No deleted` };
  }
  const deleted: QueryResult<HorseModel> = await pool.query("DELETE FROM horses WHERE id=$1", [id]);

  if (!deleted) {
    return { isSuccessful: false, message: `No deleted` };
  }
  return { isSuccessful: true, message: `Horse ${deleted.rows[0].name} deleted` };
}
export async function search({ page, pageSize }: RequestSearchHorseModel): Promise<ResponseSearchHorsesModel> {
  let total: number = (await pool.query(`SELECT * FROM horses`)).rowCount as number;
  let horses: any[] = (await pool.query(`SELECT * FROM horses LIMIT ${pageSize} OFFSET ((${page} - 1) * ${pageSize})`)).rows;

  const newItems: HorseModel[] = horses.map(item =>
  ({
    id: item.id,
    name: item.name,
    dateOfBirth: item.dateofbirth,
    sex: item.sex,
    pregnant: item.pregnant,
    dueDate: item.duedate,
  })
  )

  return { isSuccessful: true, message: "Response", items: newItems, total, isDataEmpty: !!newItems.length };
}
