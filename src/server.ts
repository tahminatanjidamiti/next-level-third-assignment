import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';


let server: Server;
const port = process.env.PORT || 5000;
async function main() {

    try {
        await mongoose.connect(process.env.DB_URL as string);

        // console.log("Connected to MongoDB Using Mongoose!!");
        server = app.listen(port, () => {
            // console.log(`Server is listening on port ${port}`);
        });


    } catch (error) {
        console.log(error)
    }

}

main()