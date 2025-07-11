import { SortOrder } from "mongoose";
import Book from "../models/books.model";
import express, { Request, Response } from "express";


export const booksRoutes = express.Router();


booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create book",
      error: err,
    });
  }
});

booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "4",
      sortBy = "createdAt", // default sort field
      sort = "desc",
      filter,
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const query: any = {};

    
    if (filter) {
      query.genre = { $regex: new RegExp(filter as string, "i") }; // case-insensitive
    }
    const sortOption: { [key: string]: SortOrder } = {
  [sortBy as string]: sort === "asc" ? 1 : -1,
};

const [books, total] = await Promise.all([
  Book.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limitNumber),
  Book.countDocuments(query),
]);

    

    const totalPages = Math.ceil(total / limitNumber) || 1;

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get books",
      error: err,
    });
  }
});

booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get book",
      error: err,
    });
  }
});
booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error: err,
    });
  }
});
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error: err,
    });
  }
});
