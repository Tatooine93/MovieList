<template>
  <div id="creatListForm">
    <div class="container">
      <div class="card card-body mt-4 mb-4">
        <form ref="form" :id="formId" @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="form-group">
            <label for="movieName">Movie name</label>
            <input
              v-model="updateMovieData.movieName"
              @keyup="fetchMovies"
              type="text"
              class="form-control"
              id="movieName"
              :placeholder="props.currentMovie?.movieName"
            />
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="list-group mt-4 mb-4">
    <div
      v-for="movie in movies"
      @click="selectedMovie(movie)"
      class="list-group-item list-group-item-action card mb-3 user-select-none"
      data-bs-toggle="list"
      style="max-width: 540px"
      :key="movie.id"
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
            class="img-fluid rounded-start"
            loading="lazy"
            alt="movie poster is missing"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ movie.original_title }}</h5>
            <p class="card-text">{{ movie.overview }}</p>
            <p class="card-text">
              <small class="text-body-secondary">{{ movie.release_date }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type UpdateMovieData, type Movie, useListStore } from '../stores/list'
import { useAuthStore } from '../stores/auth'
import { reactive, ref, computed, watch, onMounted } from 'vue'
//import { useRouter } from 'vue-router'
import { useTMDBApi } from '../composables/useTMDBApi'

//const createListForm = ref<any>(null);
//const buttonSubmit = ref<any>(null);

const props = defineProps<{
  validateForm?: boolean
  currentMovie: Movie
  formId: string
  modalIsVisible?: boolean
}>()

/* const form = ref<any>(null)
const formID = ref<string>('')
onMounted(() => {
    formID.value = form.value.id
}) */

const emit = defineEmits(['closeModal'])

const listStore = useListStore()
const authStore = useAuthStore()
//const router = useRouter()

/* const user = computed(() => {
    return authStore.user
}) */

const updateMovieData = reactive<UpdateMovieData>({
  movieName: '',
  apiMovieId: null
})

const errorMessage = ref<string>('')

const movies = ref<any>([])

//console.log("movies value from CreateMovieForm", movies);

async function fetchMovies(event: KeyboardEvent) {
  ;(await useTMDBApi()).search
    .searchMovies({ query: (event.target as HTMLInputElement).value })
    .then((res) => {
      //console.log("TMDB Api response from CreateMovieForm", res.results);
      movies.value = res.results
    })
    .catch((err) => {
      //errorMessage.value = err.message // err is undefined !!!! POURQUOI ????
      console.log(err.message)
    })
}

function selectedMovie(movie: any) {
  console.log('selectedMovie is trigger from CreateMovieForm')

  updateMovieData.movieName = movie.original_title // a savoir si les gens préfère avoir le titre original ou le titre qu'ils ont rentrer eu mm !!!!! si titre originale => retirer le v-model de l input
  updateMovieData.apiMovieId = movie.id

  //console.log("selected movie from SelectedMovie from CreateMovieForm", movie.id);
  //console.log("createMovieData.apiMovieId from SelectedMovie from CreateMovieForm", createMovieData.apiMovieId);
}

watch(
  () => props.validateForm,
  async () => {
    console.log('valideForm value from UpdateListForm', props.validateForm)
    //console.log("formId value from UpdateListForm", props.formId);
    console.log('modalIsVisible value from UpdateListForm', props.modalIsVisible)

    if (props.validateForm && props.modalIsVisible) {
      await submit()
    } else {
      emit('closeModal', false)
    }
  }
)

async function submit() {
  console.log('SUBMIT is trigger from UpdateListForm')
  await listStore
    .updateMovie(updateMovieData, props.currentMovie.id)
    .then((res) => {
      updateMovieData.movieName = ''
      updateMovieData.apiMovieId = null
      emit('closeModal', true)
    })
    .catch((err) => {
      //errorMessage.value = err.message // err is undefined !!!! POURQUOI ????
      console.log(err.message)
    })
}
</script>

<style scoped>
.list-group {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
