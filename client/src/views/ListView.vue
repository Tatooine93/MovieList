<template>
  <div class="list-group">
    <div class="list-group-item active d-flex align-items-center justify-content-between p-2 gap-4">
      <div>Your lists of Movies</div>
    </div>

    <button
      type="button"
      class="list-group-item list-group-item-primary"
      data-bs-toggle="modal"
      data-bs-target="#addList"
    >
      &plus; Add List
    </button>
    <a
      :href="generateURL(list.id)"
      class="list-group-item list-group-item-action d-flex align-items-start"
      aria-current="true"
      v-for="list in lists"
      :key="list.id"
    >
      <div class="ms-2 me-auto">
        <div class="">{{ list.listName }}</div>
      </div>
      <span class="badge bg-primary rounded-pill">{{ numberOfMovie(list.id) }}</span>
      <span class="ms-2">&#62;</span>
    </a>
  </div>
  <Modal :close-modal="closeModalEvent" modal-id="addList">
    <template v-slot:title> Add New List </template>
    <template v-slot:body="slotProps">
      <CreateListForm
        :validate-form="slotProps.validateForm"
        :modal-is-visible="slotProps.modalIsVisible"
        form-id="addList"
        @closeModal="(closeModal: boolean) => closeModalEvent = closeModal"
      >
      </CreateListForm>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { type Movie, useListStore } from '../stores/list'
import { ref, computed, onMounted } from 'vue'
import Modal from '../components/Modal.vue'
import CreateListForm from '../components/CreateListForm.vue'
import { useRouter } from 'vue-router'

const listStore = useListStore()
const closeModalEvent = ref<boolean>(false)
const router = useRouter()

const list = computed(() => {
  return listStore.list
})
const lists = ref(list)

const movie = computed(() => {
  return listStore.movie
})

const movies = ref(movie)

/* const specificListId = '6496f90cf55fef424323acdc';

const filteredMovies = computed(() => {
    return movies.value.filter((movie: Movie) => movie.listId.toString() === specificListId);
}); */

function numberOfMovie(listId: string) {
  return movies.value.filter((movie: Movie) => movie.listId === listId).length
}

async function getList() {
  await listStore.getList()
}

onMounted(async () => {
  await getList()
})

const generateURL = (id: string) => {
  return `/list/${id}`
}

//console.log("lists from ListView", list);
</script>

<style scoped>
.list-group {
  min-width: 300px;
  max-width: 40vw;
  margin: auto;
}
</style>
