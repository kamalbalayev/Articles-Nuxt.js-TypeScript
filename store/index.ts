import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface Post {
    id: number
    title: string
    body: string
}
interface User {
    id: number
    name: string
    email: string
}

export const state = () => ({
    posts: [] as Post[],
    users: [] as User[],
    locale: 'en' as string,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    posts: state => state.posts,
    users: state => state.users,
}

export const mutations: MutationTree<RootState> = {
    SET_POSTS: (state, posts: any) => (state.posts = posts),
    SET_USERS: (state, users: any) => (state.users = users),
}

export const actions: ActionTree<RootState, RootState> = {
    async getPosts({ commit }, params) {

        let api = params.user ? `users/${params.user}/posts` : 'posts'
        api += `?_page=${params.currentPage}&_limit=${params.perPage}`

        const posts = await this.$axios.$get(api)
        commit('SET_POSTS', posts)
    },

    async getUsers({ commit }) {
        const users = await this.$axios.$get('users')
        commit('SET_USERS', users)
    },
}
