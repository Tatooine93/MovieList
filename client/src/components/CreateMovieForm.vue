<template>
    <div id="creatListForm">
        <div class="container">
            <div class="card card-body mt-4 mb-4">
                <form ref="form" :id="props.formId" @submit.prevent="submit">
                    <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                    <div class="form-group">
                        <label for="movieName">Movie name</label>
                        <input v-model="createMovieData.movieName" type="text" class="form-control" id="movieName"
                            placeholder="movie name" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { type CreateMovieData, type List, useListStore } from '../stores/list'
import { useAuthStore } from '../stores/auth'
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

//const createMovieForm = ref<any>(null);
//const buttonSubmit = ref<any>(null);

const props = defineProps<{
    validateForm?: boolean
    currentList: List
    formId: string
    modalIsVisible?: boolean
}>()

/* const form = ref<any>(null)
const formID = ref<string>('')
onMounted(() => {
    formID.value = form.value.id
}) */

const emit = defineEmits(['closeModal',])

const listStore = useListStore()
const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => {
    return authStore.user
})

const createMovieData = reactive<CreateMovieData>({
    movieName: '',
    listId: props.currentList.id,
})

const errorMessage = ref<string>('')

watch(() => props.currentList.id, (newValue) => { //this patch the problem when the listId stay undefined, dont know why exactly, it work fine in UpdateListForm maybe a fluke !
    createMovieData.listId = newValue
})

watch(() => props.validateForm, async () => {
    console.log("valideForm value from CreateMovieForm", props.validateForm);
    console.log("formId value from CreateMovieForm", props.formId);

    if (props.validateForm && props.modalIsVisible) {
        await submit()
    }
    else {
        emit('closeModal', false)
    }
})

async function submit() {
    console.log("SUBMIT is trigger from CreateMovieForm")

    await listStore
        .createMovie(createMovieData)
        .then((res) => {
            createMovieData.movieName = ''
            //createMovieData.listId = ''
            emit('closeModal', true)
        })
        .catch((err) => {
            //errorMessage.value = err.message // err is undefined !!!! POURQUOI ????
            console.log(err.message)
        })
}

</script>