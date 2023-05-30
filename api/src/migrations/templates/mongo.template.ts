/* istanbul ignore file because already executed migrations should not be part of coverage */
import { MongoClient } from "mongodb";
// This file is only meant to be used within CLI commands
// eslint-disable-next-line import/no-extraneous-dependencies
import { MigrationFn } from "umzug";

export const up: MigrationFn<MongoClient> = async ({
    name,
    path,
    context,
}) => {};
export const down: MigrationFn<MongoClient> = async ({
    name,
    path,
    context,
}) => {};
