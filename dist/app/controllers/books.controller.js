"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const books_model_1 = __importDefault(require("../models/books.model"));
const express_1 = __importDefault(require("express"));
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to create book",
            error: err,
        });
    }
}));
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = "1", limit = "4", sortBy = "createdAt", // default sort field
        sort = "desc", filter, } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skip = (pageNumber - 1) * limitNumber;
        const query = {};
        if (filter) {
            query.genre = { $regex: new RegExp(filter, "i") }; // case-insensitive
        }
        const sortOption = {
            [sortBy]: sort === "asc" ? 1 : -1,
        };
        const [books, total] = yield Promise.all([
            books_model_1.default.find(query)
                .sort(sortOption)
                .skip(skip)
                .limit(limitNumber),
            books_model_1.default.countDocuments(query),
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get books",
            error: err,
        });
    }
}));
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.default.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({ success: false, message: "Book not found" });
        }
        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get book",
            error: err,
        });
    }
}));
exports.booksRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.default.findByIdAndUpdate(req.params.bookId, req.body, {
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
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to update book",
            error: err,
        });
    }
}));
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.default.findByIdAndDelete(req.params.bookId);
        if (!book) {
            res.status(404).json({ success: false, message: "Book not found" });
        }
        res.json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to delete book",
            error: err,
        });
    }
}));
