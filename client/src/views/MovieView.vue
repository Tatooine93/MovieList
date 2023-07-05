<template>
    <div id="movie">
        <div class="container">
            <div class="card card-body mt-4">
                <a :href="generateURL(currentMovie?.listId)"
                    class="text-black link-underline link-underline-opacity-0 mb-4">
                    &#60; Prev
                </a>
                <h5 class="card-title">Moviename: {{ currentMovie?.movieName }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">ID: {{ currentMovie?.id }}</h6>
                <h6 class="card-subtitle mb-2 text-muted">ListID: {{ currentMovie?.listId }}</h6>

                <div>
                    <div id="button-container" class="d-flex flex-row-reverse p-2 gap-4">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editMovie">
                            Edit Movie
                        </button>

                        <button type="button" class="btn btn-danger"
                            @click="deleteMovie(currentMovie?.id, currentMovie?.listId)">
                            Delete Movie
                        </button>
                    </div>
                    <Modal :close-modal="closeModalEvent" modal-id="editMovie">
                        <template v-slot:title>
                            Edit Movie
                        </template>
                        <template v-slot:body="slotProps">
                            <UpdateMovieForm :validate-form="slotProps.validateForm"
                                :modal-is-visible="slotProps.modalIsVisible" :current-movie="currentMovie"
                                form-id="editMovie" @closeModal="(closeModal: boolean) => closeModalEvent = closeModal">
                            </UpdateMovieForm>
                        </template>
                    </Modal>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { type Movie, useListStore } from '../stores/list'
import { ref, computed, onMounted } from 'vue'
import Modal from '../components/Modal.vue'
import UpdateMovieForm from '../components/UpdateMovieForm.vue';
import { useRouter } from 'vue-router'

const listStore = useListStore()
const closeModalEvent = ref<boolean>(false)
const router = useRouter()


/* const list = computed(() => {
    return listStore.list
})
const lists = ref(list) */

const movie = computed(() => {
    return listStore.movie
})

const movies = ref(movie)

const specificMovieId = router.currentRoute.value.params.movieId as string;

/* const currentMovie = computed(() => {
    return movies.value.find((movie: Movie) => movie.id === specificMovieId) as Movie;
}) */

const currentMovie = computed(() => {
    const movie = movies.value.find((list: Movie) => list.id === specificMovieId) as Movie;
    return movie || {} as Movie;
})

async function getList() {
    await listStore.getList()
}

onMounted(async () => {
    await getList()
})

function deleteMovie(movieId: string | undefined, listId: string | undefined) {
    if (confirm("Do you really want to delete your profile?")) {
        listStore.deleteMovie(movieId)
        router.push({ name: 'movieList', params: { listId: `${listId}` } })
    }
}

const generateURL = (id: string | undefined) => {
    return `/list/${id}`;
};
</script>

<style scoped>
#movie .card {
    min-width: 300px;
    max-width: 40vw;
    margin: auto;
}
</style>
