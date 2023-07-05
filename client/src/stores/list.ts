import { defineStore } from 'pinia'
import { useApiPrivate } from '../composables/useApi.js'
import { useAuthStore } from './auth.js'

const authStore = useAuthStore()
const user = authStore.user

export interface CreateListData {
  listName: string
  userId: string
}

export interface CreateMovieData {
  movieName: string
  listId: string
}

export interface UpdateListData {
  listName: string
}

export interface UpdateMovieData {
  movieName: string
}

export interface Movie {
  id: string
  movieName: string
  listId: string
  apiMovieId: number
  downloaded: boolean
  seen: boolean
}

export interface List {
  id: string
  listName: string
  userId: string
  //movies: Movie[]
}

/* export interface List {
  lists: Lists[]
} */

export interface State {
  list: List[]
  movie: Movie[]
}

export const useListStore = defineStore('list', {
  state: (): State => {
    return {
      list: [] as List[],
      movie: [] as Movie[]
    }
  },

  getters: {
    //userInfo: (state: State) => state.list
  },

  actions: {
    async getList() {
      console.log('GETLIST is called')

      try {
        const { data } = await useApiPrivate().get(`/api/list/user/${user.id}`) // change to :id sinon test id de Marc: 648fd162da4e2040475d421b
        this.list = [] as List[]
        this.movie = [] as Movie[]
        data.forEach((el: List) => {
          this.list.push({
            id: el._id,
            listName: el.listName,
            userId: el.userId
          })

          this.getMovie(el._id)
        })

        //console.log('this.list from getList', this.list)
        //console.log('data from getList', data)

        return data
      } catch (error: Error | any) {
        //console.log('error getuser from auth.ts', error)
        throw error.response.message
      }
    },

    async getMovie(listId: string) {
      //console.log('GETMOVIE is called')

      try {
        const { data } = await useApiPrivate().get(`/api/movie/list/${listId}`)
        //console.log('DATA getMovies', data)
        data.forEach((el: Movie) => {
          this.movie.push({
            id: el._id,
            movieName: el.movieName,
            listId: el.listId,
            apiMovieId: 123456,
            downloaded: false,
            seen: false
          })
        })
        //console.log('this.movie from getMovie', this.movie)
        return data
      } catch (error: Error | any) {
        //console.log('error getuser from auth.ts', error)
        throw error.response.message
      }
    },

    async createList(payload: CreateListData) {
      console.log('GETMOVIE is called')
      try {
        const { data } = await useApiPrivate().post(`/api/list/create`, payload)
        await this.getList()
        return data
      } catch (error: Error | any) {
        //console.log('error getuser from auth.ts', error)
        throw error.response.message
      }
    },

    async updateList(payload: UpdateListData, listId: string) {
      console.log('UPDATELIST is called')

      try {
        const { data } = await useApiPrivate().put(`/api/list/${listId}`, payload)

        await this.getList()

        return data
      } catch (error: Error | any) {
        throw error.response.message
      }
    },

    async deleteList(id: string | undefined) {
      console.log('DELETELIST is called')

      try {
        const { data } = await useApiPrivate().delete(`/api/list/${id}`)
        return data
      } catch (error: Error | any) {
        throw error.response.message
      }
    },

    async createMovie(payload: CreateMovieData) {
      console.log('CREATEMOVIE is called')
      try {
        const { data } = await useApiPrivate().post(`/api/movie/create`, payload)
        await this.getList()
        return data
      } catch (error: Error | any) {
        //console.log('error getuser from auth.ts', error)
        throw error.response.message
      }
    },

    async updateMovie(payload: UpdateMovieData, movieId: string) {
      console.log('UPDATEMOVIE is called')

      try {
        const { data } = await useApiPrivate().put(`/api/movie/${movieId}`, payload)

        await this.getList()

        return data
      } catch (error: Error | any) {
        throw error.response.message
      }
    },

    async deleteMovie(id: string | undefined) {
      console.log('DELETEMOVIE is called')

      try {
        const { data } = await useApiPrivate().delete(`/api/movie/${id}`)
        return data
      } catch (error: Error | any) {
        throw error.response.message
      }
    }
  }
})
