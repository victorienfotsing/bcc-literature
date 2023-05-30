import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import Bookmark from "./model/bookmark";
import {consumers} from "stream";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

app.get('/', (req: Request, res: Response) => {
    const userId = req.query.id;
    console.dir(req)
    res.send({
        14: [2, 3, 4, 5]
    });
});
app.get('/bookmarks', async (req: Request, res: Response) => {
    const userId = req.headers['bcc-literature-user-id']?.toString();

    if (userId) {
        res.status(403).json(await Bookmark.getAllByUserId(userId));
    } else {
        res.sendStatus(403);
    }
});
app.get('/bookmarks/:bookId', async (req: Request, res: Response) => {
    const userId = req.headers['bcc-literature-user-id']?.toString();
    const bookId = req.params.bookId;

    console.dir(userId, bookId);
    if (userId && bookId) {
        res.status(200).json(await Bookmark.getAllByUserIdAndBookId(userId, bookId));
    } else {
        res.sendStatus(403);
    }
});

app.post('/bookmarks', async (req: Request, res: Response) => {
    const userId = req.headers['bcc-literature-user-id']?.toString();
    const {bookId, chapterId} = req.body;
    if (userId && bookId && chapterId) {
        const queryRes = await Bookmark.addBookmark({userId, bookId: bookId, chapterId: chapterId});
        queryRes ? res.sendStatus(200): res.sendStatus(500)
    } else {
        res.sendStatus(403);
    }
});

app.delete('/bookmarks', async (req: Request, res: Response) => {
    const userId = req.headers['bcc-literature-user-id']?.toString();
    const {bookId, chapterId} = req.body;
    if (userId && bookId && chapterId) {
        const queryRes = await Bookmark.removeBookmark({userId, bookId: bookId, chapterId: chapterId});
        queryRes ? res.sendStatus(200): res.sendStatus(500)
    } else {
        res.sendStatus(403);
    }
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});