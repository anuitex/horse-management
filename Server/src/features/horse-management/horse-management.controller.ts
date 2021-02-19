//Vendors
import { Request, Response } from "express";
//Services
import * as projectService from "./horse-management.service";


export function createHorseHandler(req: Request, res: Response) {
    projectService.createHorse(req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => res.status(err.statusCode).send(err));
}

export function deleteHorseHandler(req: Request, res: Response) {
    projectService.deleteHorse(String(req.query.id))
        .then((result) => {
            res.send(result)
        })
        .catch((err) => res.status(err.statusCode).send(err));
}

export function updateHorseHandler(req: Request, res: Response) {
    projectService.updateHorse(req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => res.status(err.statusCode).send(err));
}

export function paginationHandler(req: Request, res: Response) {
    projectService.getPage({ page: Number(req.query.page), pageSize: Number(req.query.limit) })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => res.status(err.statusCode).send(err));
}
