<template>
    <span class="button-main small bookmark-icon"
          v-bind:class="[isBookmarked ? 'active-bookmark' : 'inactive-bookmark']"
          v-on:click="toggleBookmark()"></span>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    props: ['article', 'bookTitle'],
    computed: {
        ...mapGetters('session', ['userId']),
        ...mapGetters('books', ['getBookmarkStatus']),
        isBookmarked() {
            return this.getBookmarkStatus(this.article.chapterId)
        }
    },
    methods: {
        ...mapActions('books', {
            unBookmark: 'unBookmark',
            bookmark: 'bookmark'
        }),
        toggleBookmark() {
            if (this.isBookmarked) this.unBookmark({
                userId: this.userId,
                bookId: this.article.bookId,
                chapterId: this.article.chapterId
            });
            else this.bookmark({
                userId: this.userId,
                bookId: this.article.bookId,
                chapterId: this.article.chapterId
            });
        }
    },
};
</script>