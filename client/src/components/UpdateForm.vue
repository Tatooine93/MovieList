<template>
  <div id="updateForm">
    <div class="container">
      <div class="card card-body mt-4 mb-4">
        <form ref="form" :id="formId" @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="updateData.username"
              type="text"
              class="form-control"
              id="username"
              :placeholder="user.username"
            />
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              v-model="updateData.email"
              type="email"
              class="form-control"
              id="email"
              :placeholder="user.email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="updateData.password"
              type="password"
              class="form-control"
              id="password"
              placeholder="New password"
            />
          </div>
          <div class="form-group">
            <label for="password-confirm">Confirm Password</label>
            <input type="password-confirm" class="form-control" id="password-confirm" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type UpdateData, useAuthStore } from '../stores/auth'
import { reactive, ref, computed, watch, onMounted } from 'vue'
//import { useRouter } from 'vue-router'

//const updateForm = ref<any>(null);
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

const emit = defineEmits(['closeModal'])

const authStore = useAuthStore()
//const router = useRouter()

const user = computed(() => {
  return authStore.user
})

const updateData = reactive<UpdateData>({
  username: '',
  email: '',
  password: ''
})

const errorMessage = ref<string>('')

watch(
  () => props.validateForm,
  async () => {
    if (props.validateForm && props.modalIsVisible) {
      await submit()
    } else {
      emit('closeModal', false)
    }
  }
)

async function submit() {
  console.log('SUBMIT is trigger from UpdateForm')
  await authStore
    .update(updateData)
    .then((res) => {
      updateData.username = ''
      updateData.email = ''
      updateData.password = ''
      emit('closeModal', true)
    })
    .catch((err) => {
      //errorMessage.value = err.message // err is undefined !!!! POURQUOI ????
      console.log(err.message)
    })
}
</script>
