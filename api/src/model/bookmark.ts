import DatabaseConnection from "../db";

import dotenv from 'dotenv';

dotenv.config();

export default class Bookmark {
    private static collection = DatabaseConnection.getCollection(process.env.BOOKMARK_DB_NAME ?? "bookmark", "bookmark")

    static async getAllByUserId(userId: string) {
        const collection = await Bookmark.collection
        const query = await collection.aggregate([
            {
                $match: {"id.userId": userId},
            },
            {$sort: {updatedAt: -1}},
            {
                $group: {
                    _id: "$id.bookId",
                    bookmarks: {
                        $push: {
                            chapterId: "$id.chapterId",
                            updatedAt: "$updatedAt",
                        }
                    }
                }
            }
        ])
        return query.toArray()
    }

    static async getAllByUserIdAndBookId(userId: string, bookId: string) {
        const collection = await Bookmark.collection
        const query = await collection.aggregate([
            {
                $match: {
                    "id.userId": userId,
                    "id.bookId": bookId
                },
            },
            {$sort: {updatedAt: -1}},
            {
                $group: {
                    _id: "$id.bookId",
                    bookmarks: {
                        $push: {
                            chapterId: "$id.chapterId",
                            updatedAt: "$updatedAt",
                        }
                    }
                }
            }
        ])
        const [res] = await query.toArray();
        return res;
    }

    static async addBookmark({userId, bookId, chapterId}: {
        userId: string,
        bookId: string,
        chapterId: string
    }) {
        const collection = await Bookmark.collection;
        const {acknowledged} = await collection.insertOne({
                id: {
                    bookId,
                    userId,
                    chapterId
                },
                updatedAt: new Date().toISOString()
            }
        );
        return acknowledged
    }

    static async removeBookmark({userId, bookId, chapterId}: {
        userId: string,
        bookId: string,
        chapterId: string
    }) {
        const collection = await Bookmark.collection;
        const {acknowledged} = await collection.deleteOne({
            "id.userId": userId,
            "id.bookId": bookId,
            "id.chapterId": chapterId
        });
        return acknowledged;
    }
}