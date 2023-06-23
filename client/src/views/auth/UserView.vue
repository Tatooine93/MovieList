<template>
    <div id="user">
        <div class="container">
            <div v-if="user" class="card card-body mt-4">
                <h5 class="card-title">Username: {{ user.username }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Email: {{ user.email }}</h6>
                <h6 class="card-subtitle mb-2 text-muted">ID: {{ user.id }}</h6>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
import { reactive, ref, computed, onMounted } from 'vue'

const authStore = useAuthStore()

const user = computed(() => {
    return authStore.user
})

async function getUser() {
    await authStore.getUser()
}

onMounted(async () => {
    await getUser()
})

</script>

<style scoped>
#register .card {
    min-width: 300px;
    max-width: 40vw;
    margin: auto;
}
</style>
