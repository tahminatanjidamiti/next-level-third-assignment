import express, { Request, Response } from "express";
import Book from "../models/books.model";
import Borrow from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    const foundBook = await Book.findById(book);

    if (!foundBook || foundBook.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies",
      });
      return; 
    }

    foundBook.copies -= quantity;
    await foundBook.updateAvailability();

    const borrowed = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowed,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Borrow failed",
      error: err,
    });
  }
});
borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const result = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: "Summary retrieved",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to Summary retrieved",
      error: err,
    });
  }
});


