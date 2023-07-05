import { axiosInstance, axiosPrivateInstance } from '../utils/axios'
import { useAuthStore } from '../stores/auth'
import { watchEffect } from 'vue'

//////////////// A REVOIR ////////////////////
////////////////////////////////////////////// pas certain de l efficacité étant donner qu'on n utilise pas d accessToken, avoir si on switch vers un système de refreshToken

export function useApiPrivate() {
  const authStore = useAuthStore()

  watchEffect(() => {
    axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
          //config.headers['Authorization'] = `Bearer ${authStore.user.id}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config

        if (
          error?.response?.status === 403 ||
          (error?.reponse?.status === 401 && !prevRequest.response.sent)
        ) {
          prevRequest.sent = true
          await authStore.refresh()
          prevRequest.headers['Authorization'] = authStore.accessToken
          //prevRequest.headers['Authorization'] = authStore.user.id

          return axiosPrivateInstance(prevRequest)
        }

        return Promise.reject(error)
      }
    )
  })

  return axiosPrivateInstance
}

export function useApi() {
  return axiosInstance
}
