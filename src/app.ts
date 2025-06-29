import dotenv from "dotenv";
import express, { Application, Request, Response } from 'express';

import { booksRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

dotenv.config();

const app: Application = express();
app.use(express.json())
app.use("/books", booksRoutes);
app.use("/borrow", borrowRoutes);

app.get('/', (req: Request, res: Response) => { 
    res.send('Welcome to Library Management App');

});

export default app;