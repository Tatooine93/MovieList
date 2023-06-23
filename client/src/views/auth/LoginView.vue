<template>
    <div id="login">
        <div class="container">
            <div class="card card-body mt-4">
                <h5 class="card-title">Login</h5>
                <form @submit.prevent="submit">
                    <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input v-model="loginData.username" type="text" class="form-control" id="username"
                            placeholder="Username" autocomplete="off" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="loginData.password" type="password" class="form-control" id="password"
                            placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-success">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type LoginData, useAuthStore } from '../../stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const loginData = reactive<LoginData>({
    username: '',
    password: ''
})

const errorMessage = ref<string>('')

async function submit() {
    console.log("loginData from LoginView", loginData)
    await authStore
        .login(loginData)
        .then((res) => {
            console.log("response from Loginview", res);

            router.replace({ name: 'user' })
        })
        .catch((err) => {
            //errorMessage.value = err.message !!! err is undefined !!!!! POURQUOI ?
            console.log("error message from LoginView", err.response)
        })
}
</script>

<style scoped>
#login .card {
    min-width: 300px;
    max-width: 40vw;
    margin: auto;
}
</style>
