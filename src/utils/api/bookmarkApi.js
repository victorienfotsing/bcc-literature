import axios from "axios";

const baseApi = "http://localhost:8080";

/**
 *
 * @param {string} userId
 * @param {string} bookId
 */
const getBookmarksByBookId = async (userId, bookId) => {
    return await axios.get(`${baseApi}/bookmarks/${bookId}`, {
        headers: {
            "bcc-literature-user-id": userId
        }
    }).then(value => {
        return value;
    });
};

const getAllByUserId = async (userId) => {
    return await axios.get(`${baseApi}/bookmarks`, {
        headers: {
            "bcc-literature-user-id": userId
        }
    }).then(value => {
        return value;
    });
};

const bookmark = async (userId, bookId, chapterId) => {
    return await axios.post(`${baseApi}/bookmarks`, {
        bookId,
        chapterId
    }, {
        headers: {
            "bcc-literature-user-id": userId
        }
    }).then(value => {
        return value;
    });
};

const unBookmark = async (userId, bookId, chapterId) => {
    return await axios.delete(`${baseApi}/bookmarks`, {
        bookId,
        chapterId
    }, {
        headers: {
            "bcc-literature-user-id": userId
        }
    }).then(value => {
        return value;
    });
};

export default {
    getBookmarksByBookId,
    bookmark,
    unBookmark
};