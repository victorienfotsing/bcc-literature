import {Db, MongoClient} from "mongodb";

export default class DatabaseConnection {
    private static instance:  DatabaseConnection;
    private static client:  MongoClient;

    private constructor() {}

    public static async connect(): Promise<DatabaseConnection> {
        const mongoUri = process.env.MONGO_URI;
        if(!DatabaseConnection.instance && mongoUri) {

            DatabaseConnection.client = await MongoClient.connect(mongoUri);
            DatabaseConnection.client.once("open", () => {
                console.log("🚀 Connected to user view database");
            });
            DatabaseConnection.client.on("error", () => {
                console.error("🚨 Error connecting to user view database");
            });
            DatabaseConnection.client.on("close", () => {
                console.error("❌ Connection to user view database closed");
                DatabaseConnection.client?.removeAllListeners();
            });
            DatabaseConnection.instance = new DatabaseConnection();
        }

        return DatabaseConnection.instance;

    }

    public static async getDb(name: string): Promise<Db> {
        await DatabaseConnection.connect();
        return DatabaseConnection.client.db(name);
    }

    static async getCollection(dbName: string, colName: string) {
        const db = await DatabaseConnection.getDb(dbName);
        return db.collection(colName);
    }

    public static async getClient(): Promise<MongoClient> {
        await DatabaseConnection.connect();
        return DatabaseConnection.client;
    }
}