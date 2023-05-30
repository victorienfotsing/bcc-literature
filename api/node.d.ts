import { ObjectId as MongoObjectId } from "mongodb";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            BOOKMARK_DB_NAME: string;
            PORT: number;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
