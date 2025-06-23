import { Model, Schema, model } from "mongoose";
import { BookMethods, IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook, Model<IBook>, BookMethods>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    required: true,
  },
  isbn: { type: String, required: true, unique: true },
  description: String,
  copies: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true },
}, {
  versionKey: false,
  timestamps: true
});


bookSchema.methods.updateAvailability = async function () {
  this.available = this.copies > 0;
  await this.save();
};

const Book = model<IBook, Model<IBook, {}, BookMethods>>("Book", bookSchema);
export default Book;