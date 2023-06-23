import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../composables/useApi.js'
import axios from 'axios'

export interface User {
  id: number
  username: string
  email: string
}

export interface State {
  user: User
  accessToken: string
}

export interface LoginData {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      user: {} as User,
      accessToken: '' as string
    }
  },

  getters: {
    userInfo: (state: State) => state.user,
    isAuthenticated: (state: State) => (state.user?.id ? true : false) //pe utiliser _id car l id est set une première fois avec login en tant que "id" puis une seconde fois par getrUser en tant que _id car si le champ virtuel n existe pas
  },

  actions: {
    async attempt() {
      console.log('ATTEMPT is called')
      try {
        console.log('before REFRESH is called from Attempt')
        await this.refresh()
        console.log('after REFRESH is called from Attempt')
        console.log('aft erGETUSER is called from Attempt')
        await this.getUser()
        console.log('after GETUSER is called from Attempt')
        return
      } catch (error: Error | any) {
        return
      }
    },

    async login(payload: LoginData) {
      console.log('LOGIN is called')

      try {
        const { data } = await useApi().post('/api/user/login', payload)
        //this.accessToken = data.access_token
        this.user.id = data.userId
        console.log('data from login', data)
        console.log('this.user from login', this.user)

        await this.getUser()

        return data
      } catch (error: Error | any) {
        //console.log('error login from auth.ts', error)

        throw error.response.message
      }
    },

    async register(payload: RegisterData) {
      console.log('REGISTER is called')

      try {
        const { data } = await useApi().post('/api/user/register', payload)
        return data
      } catch (error: Error | any) {
        throw error.response.message
      }
    },

    async getUser() {
      console.log('GETUSER is called')
      //console.log('GETUSER user _id:', this.user._id)
      console.log('GETUSER user id:', this.user.id)

      try {
        const { data } = await useApiPrivate().get(`/api/user/${this.user.id}`) // change to :id sinon test id de Marc: 648fd162da4e2040475d421b
        this.user = data
        this.user.id = data._id
        console.log('data from GetUser:', data)
        console.log('this.user from GetUser:', this.user)

        return data
      } catch (error: Error | any) {
        //console.log('error getuser from auth.ts', error)
        throw error.response.message
      }
    },

    async logout() {
      console.log('LOGOUT is called')

      try {
        const { data } = await useApiPrivate().get('/api/user/logout')
        this.user = {} as User
        return data
      } catch (error: Error | any) {
        throw error.response.message
      }
    },

    async refresh() {
      console.log('REFRESH is called')

      try {
        const { data } = await useApi().get('/jwtid')
        console.log('data from refresh:', data)
        this.user.id = data
        console.log('isAuthenticated from Refresh :', this.isAuthenticated)
        return data
      } catch (error: Error | any) {
        console.log('error from Refresh:', error.message)
        console.log('No Token')

        throw error.message
      }
    }

    ///// MARCHE OK ///////
    ///////////////////////////////

    /* async refresh() {
      console.log('REFRESH is called')

      await axios({
        method: 'get',
        url: `http://localhost:3500/jwtid`,
        withCredentials: true
      })
        .then((res) => {
          console.log('data from refresh:', res.data)
          this.user.id = res.data
        })
        .catch((error) => {
          console.log('error from Refresh', error.message)
        })
    } */

    /* refresh() {
      console.log('REFRESH is called')
      const data = async () => {
        await axios({
          method: 'get',
          url: `http://localhost:3500/jwtid`,
          withCredentials: true
        })
          .then((res) => (this.user.id = res.data))
          .catch((error) => console.log('error from Refresh', error.message))
      }
    } */

    /* async refresh() {
      console.log('REFRESh is called')

      await axios
        .get(`http://localhost:3500/jwtid`)
        //.then((res) => (this.user.id = res.data))
        .then((res) => console.log('this.user.id from refresh', this.user.id))
        .catch((error) => console.log('error from Refresh', error.message))
    } */
  }
})
