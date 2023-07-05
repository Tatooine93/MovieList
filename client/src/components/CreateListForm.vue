<template>
    <div id="creatListForm">
        <div class="container">
            <div class="card card-body mt-4 mb-4">
                <form ref="form" :id="props.formId" @submit.prevent="submit">
                    <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                    <div class="form-group">
                        <label for="listName">List name</label>
                        <input v-model="createListData.listName" type="text" class="form-control" id="listName"
                            placeholder="list name" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { type CreateListData, useListStore } from '../stores/list'
import { useAuthStore } from '../stores/auth'
import { reactive, ref, computed, watch, onMounted } from 'vue'
//import { useRouter } from 'vue-router'

//const createListForm = ref<any>(null);
//const buttonSubmit = ref<any>(null);

const props = defineProps<{
    validateForm?: boolean
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
//const router = useRouter()

const user = computed(() => {
    return authStore.user
})

const createListData = reactive<CreateListData>({
    listName: '',
    userId: user.value.id,

})

const errorMessage = ref<string>('')

watch(() => props.validateForm, async () => {
    if (props.validateForm && props.modalIsVisible) {
        await submit()
    }
    else {
        emit('closeModal', false)
    }

})

async function submit() {
    console.log("SUBMIT is trigger from CreateListForm")
    await listStore
        .createList(createListData)
        .then((res) => {
            createListData.listName = ''
            emit('closeModal', true)
        })
        .catch((err) => {
            //errorMessage.value = err.message // err is undefined !!!! POURQUOI ????
            console.log(err.message)
        })
}

</script>