<template>
  <div id="register">
    <div class="container">
      <div class="card card-body mt-4">
        <h6 class="card-title">Register</h6>
        <form @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="form-group">
            <label for="username">Username</label>
            <input v-model="registerData.username" type="text" class="form-control" id="username" />
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input v-model="registerData.email" type="email" class="form-control" id="email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="registerData.password" type="password" class="form-control" id="password" />
          </div>
          <div class="form-group">
            <label for="password-confirm">Confirm Password</label>
            <input type="password-confirm" class="form-control" id="password-confirm" />
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end"><button type="submit"
              class="btn btn-success mt-4">Register</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type RegisterData, useAuthStore } from '../../stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const registerData = reactive<RegisterData>({
  username: '',
  email: '',
  password: ''
})

const errorMessage = ref<string>('')

async function submit() {
  await authStore
    .register(registerData)
    .then((res) => {
      router.replace({ name: 'login' })
    })
    .catch((err) => {
      //errorMessage.value = err.message // err is undefined !!!! POURQUOI ????
      console.log(err.message)
    })
}
</script>

<style scoped>
#register .card {
  min-width: 300px;
  max-width: 40vw;
  margin: auto;
}
</style>
