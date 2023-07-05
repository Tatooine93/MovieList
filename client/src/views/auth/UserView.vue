<template>
    <div id="user">
        <div class="container">
            <div v-if="user" class="card card-body mt-4">
                <h5 class="card-title">Username: {{ user.username }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Email: {{ user.email }}</h6>
                <h6 class="card-subtitle mb-2 text-muted">ID: {{ user.id }}</h6>

                <div>
                    <div id="button-container" class="d-flex flex-row-reverse p-2 gap-4">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUser">
                            Edit User
                        </button>

                        <button type="button" class="btn btn-danger" @click="deleteUser(user.id)">
                            Delete User
                        </button>
                    </div>


                    <Modal :close-modal="closeModalEvent" modal-id="editUser">
                        <template v-slot:title>
                            Edit User
                        </template>
                        <template v-slot:body="slotProps">
                            <UpdateForm :validate-form="slotProps.validateForm" :modal-is-visible="slotProps.modalIsVisible"
                                form-id="editUser" @closeModal="(closeModal: boolean) => closeModalEvent = closeModal">
                            </UpdateForm>
                        </template>
                    </Modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
import { ref, computed, onMounted } from 'vue'
import Modal from '../../components/Modal.vue'
import UpdateForm from '../../components/UpdateForm.vue';
import { useRouter } from 'vue-router'


const router = useRouter()
const authStore = useAuthStore()
const closeModalEvent = ref<boolean>(false)

const user = computed(() => {
    return authStore.user
})

async function getUser() {
    await authStore.getUser()
}

onMounted(async () => {
    await getUser()
})

function deleteUser(id: string) {
    if (confirm("Do you really want to delete your profile?")) {
        authStore.deleteUser()
        router.replace({ name: 'login' })
    }
}
</script>

<style scoped>
#user .card {
    min-width: 300px;
    max-width: 40vw;
    margin: auto;
}
</style>
