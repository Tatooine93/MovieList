<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link :to="{ name: 'home' }" class="navbar-brand">Home</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#appNavBar" aria-controls="appNavBar"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="appNavBar">
      <!--       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item active">
          <router-link :to="{ name: 'home' }" class="nav-link" href="#">Home</router-link>
        </li>
      </ul> -->
      <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
        <li v-if="isAuthenticated" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            {{ user.username }}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link :to="{ name: 'user' }" class="dropdown-item" href="#">Profile</router-link>
            <div class="dropdown-divider"></div>
            <button @click="logout" class="dropdown-item btn btn-danger">Logout</button>
          </div>
        </li>
        <template v-else>
          <li class="nav-item active">
            <router-link :to="{ name: 'login' }" class="nav-link" href="#">Login</router-link>
          </li>
          <li class="nav-item active">
            <router-link :to="{ name: 'register' }" class="nav-link" href="#">Register</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => {
  return authStore.user
})

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated
})

async function logout() {
  await authStore
    .logout()
    .then((res) => {
      router.replace({ name: 'home' })
    })
    .catch((err) => {
      console.log(err.message)
    })
}
</script>
