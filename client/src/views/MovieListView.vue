<template>
    <div class="list-group">
        <div class="list-group-item active d-flex align-items-center justify-content-between p-2 gap-4">
            <a href="/list" class="text-white link-underline link-underline-opacity-0">
                &#60; Prev
            </a>
            <div>
                {{ currentList?.listName }}
            </div>
            <div id="button-container" class="d-flex flex-row gap-4">
                <button type="button" class="btn btn-danger" @click="deleteList(currentList?.id)">
                    Delete List
                </button>
                <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#editList">
                    Edit List
                </button>
            </div>

        </div>

        <button type="button" class=" list-group-item list-group-item-primary" data-bs-toggle="modal"
            data-bs-target="#addMovie">
            &plus; Add Movie
        </button>
        <a :href="generateURL(movie.id, movie.apiMovieId)"
            class="list-group-item list-group-item-action d-flex align-items-start" aria-current="true"
            v-for="movie in filteredMovies" :key="movie.id">
            <div class="ms-2 me-auto">
                <div class="">{{ movie.movieName }}</div>
            </div>
            <span class="ms-4">&#62;</span>
        </a>
    </div>
    <Modal :close-modal="closeModalEvent" modal-id="editList">
        <template v-slot:title>
            Edit List
        </template>
        <template v-slot:body="slotProps">
            <UpdateListForm :validate-form="slotProps.validateForm" :modal-is-visible="slotProps.modalIsVisible"
                :current-list="currentList" form-id="editList"
                @closeModal="(closeModal: boolean) => closeModalEvent = closeModal">
            </UpdateListForm>
        </template>
    </Modal>
    <Modal :close-modal="closeModalEvent" modal-id="addMovie">
        <template v-slot:title>
            Add Movie
        </template>
        <template v-slot:body="slotProps">
            <CreateMovieForm :validate-form="slotProps.validateForm" :modal-is-visible="slotProps.modalIsVisible"
                :current-list="currentList" form-id="addMovie"
                @closeModal="(closeModal: boolean) => closeModalEvent = closeModal">
            </CreateMovieForm>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { type Movie, type List, useListStore } from '../stores/list'
import { ref, computed, onMounted } from 'vue'
import Modal from '../components/Modal.vue'
import UpdateListForm from '../components/UpdateListForm.vue';
import CreateMovieForm from '../components/CreateMovieForm.vue';
import { useRouter } from 'vue-router'
import { useTMDBApi } from '../composables/useTMDBApi'

const listStore = useListStore()
const closeModalEvent = ref<boolean>(false)
const router = useRouter()


const list = computed(() => {
    return listStore.list
})

const lists = ref(list)

async function getList() {
    await listStore.getList()
}

onMounted(async () => {
    await getList()
})

const specificListId = router.currentRoute.value.params.listId as string;

/* const currentList = computed(() => {
    return lists.value.find((list: List) => list.id === specificListId) as List | undefined;
}) */

const currentList = computed(() => {
    const list = lists.value.find((list: List) => list.id === specificListId) as List;
    return list || {} as List;
})

const movie = computed(() => {
    return listStore.movie
})

const movies = ref(movie)

const filteredMovies = computed(() => {


    return movies.value.filter((movie: Movie) => movie.listId.toString() === specificListId);
});


//console.log("type of FilterdMovie from MovieListView", filteredMovies);

function deleteList(id: string | undefined) {
    if (confirm("Do you really want to delete your profile?")) {
        listStore.deleteList(id)
        for (const movie of filteredMovies.value) {
            listStore.deleteMovie(movie.id)
        }
        router.replace({ name: 'list' })
    }
}

const generateURL = (id: string, apiId: number) => {
    return `/movie/${id}`;
};
</script>

<style scoped>
.list-group {
    min-width: 300px;
    max-width: 40vw;
    margin: auto;
}
</style>