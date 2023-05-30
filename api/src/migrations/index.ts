import { JSONStorage, MongoDBStorage, Umzug } from "umzug";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { readFileSync } from "fs";
import path from "path";

let client: MongoClient | undefined;



const getUmzug = async () => {
    client = new MongoClient("");

    // All file references in the Umzug config have to be relative to the project root
    const umzug = new Umzug({
        migrations: {
            glob: "migrations/mongo/*.ts",
            resolve: (params) => {
                const def = Umzug.defaultResolver(params);

                return {
                    name: def.name,
                    up: async () => {
                        await params.context.connect();
                        await def.up(params);
                    },
                    down: async () => {
                        if (!def.down) return;
                        await params.context.connect();
                        await def.down(params);
                    },
                };
            },
        },
        context: client,
        // When locally running or testing Mongo migrations, no Mongo ledger is needed
        storage:
            new MongoDBStorage({
                connection: (await client.connect()).db("migrationLedger"),
                collectionName: "mongoMigrations",
            }),
        logger: console,
        create: {
            template: (filepath: string) => {
                const fullpath = `${filepath}.ts`;
                return [
                    [fullpath, readFileSync("migrations/templates/mongo.template.ts").toString()],
                ];
            },
            folder: "migrations/mongo/",
        },
    });

    return [umzug, client];
};

export default getUmzug;