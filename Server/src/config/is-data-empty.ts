import { v4 as uuidv4 } from 'uuid'

export const mockup = [
    {
        id: uuidv4(),
        name: "Berik",
        dateOfBirth: String(new Date().toISOString()),
        sex: 0,
        pregnant: null,
        dueDate: null
    },
    {
        id: uuidv4(),
        name: "Bobby",
        dateOfBirth: String(new Date().toISOString()),
        sex: 0,
        pregnant: null,
        dueDate: null
    },
    {
        id: uuidv4(),
        name: "Jenny",
        dateOfBirth: String(new Date().toISOString()),
        sex: 1,
        pregnant: false,
        dueDate: null
    },
    {
        id: uuidv4(),
        name: "Molly",
        dateOfBirth: String(new Date().toISOString()),
        sex: 1,
        pregnant: false,
        dueDate: null
    },
    {
        id: uuidv4(),
        name: "Dolla",
        dateOfBirth: String(new Date().toISOString()),
        sex: 1,
        pregnant: true,
        dueDate: String(new Date().toISOString())
    },
]