<template>
    <div id="movieContainer">
        <div class="container">
            <div class="card card-body mt-4">
                <a :href="generateURL(currentMovie?.listId)"
                    class="text-black link-underline link-underline-opacity-0 mb-4">
                    &#60; Prev
                </a>

                <!-- <h5 class="card-title">Moviename: {{ currentMovie?.movieName }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">ID: {{ currentMovie?.id }}</h6>
                <h6 class="card-subtitle mb-2 text-muted">ListID: {{ currentMovie?.listId }}</h6>
                <h5 class="card-title">{{ tmdbMovieInfo?.original_title }}</h5> -->
                <div v-if="tmdbMovieInfo.id" class="card mb-3" data-bs-toggle="list" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img :src="`https://image.tmdb.org/t/p/original/${tmdbMovieInfo?.poster_path}`"
                                class="img-fluid rounded-start" loading="lazy" alt="movie poster is missing">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{ tmdbMovieInfo?.original_title }}</h5>
                                <p class="card-text">{{ tmdbMovieInfo?.overview }}</p>
                                <p class="card-text"><small class="text-body-secondary">{{ tmdbMovieInfo?.release_date
                                }}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    Sorry for the inconvenience, but we can't retrieve the movie's informations
                </div>

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
import { type Movie, type List, useListStore } from '../stores/list'
import { ref, onMounted, computed, watch } from 'vue'
import Modal from '../components/Modal.vue'
import UpdateMovieForm from '../components/UpdateMovieForm.vue';
import { useRouter } from 'vue-router'
import { useTMDBApi } from '../composables/useTMDBApi'

const listStore = useListStore()
const closeModalEvent = ref<boolean>(false)
const router = useRouter()
const specificMovieId = ref<string>();
//const apiId = ref();
//const lists = ref<List[] | undefined>([])
//const movies = ref<Movie[] | undefined>([])
//const currentMovieApiId = ref<Movie>()
const tmdbMovieInfo = ref<any | unknown>({})

async function getList() {
    await listStore.getList();
}

async function getSpecificMovieId() {
    specificMovieId.value = router.currentRoute.value.params.movieId as string;
}

/* async function getApiId() {
    apiId.value = router.currentRoute.value.query.apiMovieId;
} */

/* async function getLists() {
    lists.value = listStore.list
} */

/* async function getMovies() {
    movies.value = listStore.movie
} */

const currentMovie = computed(() => {
    const movie = listStore.movie.find((movie: Movie) => movie.id === specificMovieId.value) as Movie
    if (movie !== undefined) {
        getMovieApiInfo(movie.apiMovieId)
    }
    return movie || {} as Movie
})


async function getMovieApiInfo(movieId: number) {
    (await useTMDBApi()).endpoint.get(`movie/${movieId}`, { append_to_response: "videos" }) // need to use endpoint to have videos !!
        .then((res) => {
            tmdbMovieInfo.value = res
            console.log("tmdb movie info from MovieView", res);
        })
        .catch((err) => {
            //errorMessage.value = err.message // err is undefined !!!! POURQUOI ????
            console.log(err.message)
        })
}

onMounted(async () => {
    await getList()
    await getSpecificMovieId()
    //await getApiId()
    //await getLists()
    //await getMovies()
    //await getMovieApiId()
    /* if (apiId !== undefined) {
        return getMovieApiInfo(apiId.value)
    } */
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

<!-- <script setup lang="ts"> // work perfectly only if you call a computed, because of computed 

import { type Movie, type List, useListStore } from '../stores/list'
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useTMDBApi } from '../composables/useTMDBApi'

const listStore = useListStore()
const router = useRouter()

const specificMovieId = computed(() => {
    return router.currentRoute.value.params.movieId as string;
})

const lists = computed(() => {
    return listStore.list
})

const movies = computed(() => {
    return listStore.movie
})

const currentMovie = computed(() => {
    return movies.value?.find((movie: Movie) => movie.id === specificMovieId.value) as Movie
})

async function getLists() {
    await listStore.getList()
}

onMounted(async () => {
    await getLists()

})

console.log("lists from MovieView", lists);
console.log("movies from MovieView", movies);
console.log("specificMovieId from MovieView", specificMovieId);
console.log("currentMovie from MovieView", currentMovie);

</script> -->

<!-- <script setup lang="ts">
import { type Movie, useListStore } from '../stores/list'
import { ref, computed, onMounted, reactive } from 'vue'
import Modal from '../components/Modal.vue'
import UpdateMovieForm from '../components/UpdateMovieForm.vue';
import { useRouter } from 'vue-router'
import { useTMDBApi } from '../composables/useTMDBApi'

const listStore = useListStore()
const closeModalEvent = ref<boolean>(false)
const router = useRouter()


const movie = computed(() => {
    return listStore.movie
})

const movies = ref(movie)

const specificMovieId = router.currentRoute.value.params.movieId as string;

const currentMovie = computed(() => {
    const movie = movies.value.find((list: Movie) => list.id === specificMovieId) /* as Movie */;
    console.log("currentMovie ApiID", movie?.apiMovieId);

    return movie || {} as Movie;
})


async function getList() {
    await listStore.getList()
}

onMounted(async () => {
    await getList()
})

const tmdbMovieInfo = ref<object>({})

//console.log("movies value from CreateMovieForm", movies);

const movieTmdb = computed(async () => {
    (await useTMDBApi()).movies.getDetails(currentMovie.value.apiMovieId)
        .then((res) => {
            //console.log("TMDB Api response from CreateMovieForm", res.results);
            tmdbMovieInfo.value = res
            console.log("tmdb movie info from MovieView", res);

        })
        .catch((err) => {
            //errorMessage.value = err.message // err is undefined !!!! POURQUOI ????
            console.log(err.message)
        })
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
</script> -->





<!-- <script setup lang="ts">
import { type Movie, useListStore } from '../stores/list'
import { ref, computed, onMounted, reactive, watch } from 'vue'
import Modal from '../components/Modal.vue'
import UpdateMovieForm from '../components/UpdateMovieForm.vue';
import { useRouter } from 'vue-router'
import { useTMDBApi } from '../composables/useTMDBApi'

const listStore = useListStore()
const closeModalEvent = ref<boolean>(false)
const router = useRouter()

const specificMovieId = ref<string | undefined>(undefined);

const currentMovie = ref<Movie | undefined>(undefined);
const tmdbMovieInfo = ref<object>({});

async function getList() {
    await listStore.getList();
}

//const movies = computed(() => listStore.movie);

onMounted(async () => {
    await getList();
    specificMovieId.value = router.currentRoute.value.params.movieId as string;
    console.log("specificMovieId from MovieView", specificMovieId);
    console.log("listStore.movie from MovieView", listStore.movie);

    // Fetch the corresponding movie information
    if (specificMovieId.value) {
        const apiMovieId = listStore.movie.find((movie: Movie) => movie.id === '64a774639034663419078daa');
        //const currentMovie.value = movies.value.find((movie: Movie) => movie.id === '64a774639034663419078daa') || {} as Movie;
        console.log("apiMovieId from MovieView", apiMovieId);
        console.log("apiMovieId HARD from MovieView", listStore.movie.find(movie => movie.id === specificMovieId.value));

        if (apiMovieId) {

            const tmdbApi = await useTMDBApi();
            try {
                const res = await tmdbApi.movies.getDetails(apiMovieId.apiMovieId);
                tmdbMovieInfo.value = res;
                console.log("tmdb movie info from MovieView", res);
            } catch (err) {
                console.log(err.message);
            }
        }
    }
});



function deleteMovie(movieId: string | undefined, listId: string | undefined) {
    if (confirm("Do you really want to delete your profile?")) {
        listStore.deleteMovie(movieId);
        router.push({ name: 'movieList', params: { listId: `${listId}` } });
    }
}

const generateURL = (id: string | undefined) => {
    return `/list/${id}`;
};
</script> -->



<style scoped>
#movieContainer .card {
    min-width: 300px;
    max-width: 40vw;
    margin: auto;
}
</style>
