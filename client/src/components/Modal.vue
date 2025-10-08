<template>
  <div
    ref="modal"
    class="modal fade"
    :id="props.modalId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <slot name="title"> Modal </slot>
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <slot name="body" :validateForm="validate" :modalIsVisible="modalIsVisible"> </slot>

        <div class="modal-footer">
          <button ref="closeButton" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <!-- <button ref="validateButton" type="button" class="btn btn-primary" @click="validateForm"
                        data-bs-dismiss="modal">Save
                        changes</button> -->
          <button type="button" class="btn btn-primary" @click="validateForm">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  closeModal?: boolean
  modalId: string
}>()

const closeButton = ref<any>(null)
//const validateButton = ref<any>(null)
const validate = ref<boolean>(false)
const modal = ref<any>(null)
const modalIsVisible = ref<boolean>(false)

watch(
  () => props.closeModal,
  () => {
    if (props.closeModal) {
      closeButton.value.click()
      validateForm()
    }
  }
)

const validateForm = () => {
  //console.log("validate value from Modal", validate.value);
  //console.log("closeModal value from Modal", props.closeModal);

  console.log('modal value from Modal', modal)
  console.log('modal class value from Modal', modal.value.classList)
  console.log('modal class value include SHOW from Modal', modal.value.classList.contains('show'))

  if (modalIsVisible.value) {
    modalIsVisible.value = false
  }
  modalIsVisible.value = modal.value.classList.contains('show')

  validate.value = !validate.value
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
             * The following styles are auto-applied to elements with
             * transition="modal" when their visibility is toggled
             * by Vue.js.
             *
             * You can easily play with the modal transition by editing
             * these styles.
             */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
