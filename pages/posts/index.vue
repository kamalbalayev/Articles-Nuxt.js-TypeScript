<template>
    <b-container class="mh-100 py-4">

        <b-row>

            <b-col cols="12" lg="3" order-lg="1">

                <b-list-group class="sticky-top mb-3 shadow" style="top: 80px">

                    <b-list-group-item :active="activeUser === null"
                                       @click="activeUser = null">
                        {{$t('allUsers')}}
                    </b-list-group-item>

                    <b-list-group-item v-for="(user, i) in users" :key="`user-${i}`"
                                       :active="activeUser === user.id"
                                       @click="activeUser = user.id">
                        {{user.name}}
                    </b-list-group-item>

                </b-list-group>

            </b-col>

            <b-col cols="12" lg="9">

                <h1 class="py-4 text-center font-weight-bold" v-text="$t('posts')"/>

                <post-item v-for="(post, i) in posts" :key="`post-${i}`"
                           :data="post"
                           :user="getPostUser(post.userId)"
                           @just-emit="showId($event)"/>

            </b-col>

        </b-row>

        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            first-text="⏮"
            prev-text="⏪"
            next-text="⏩"
            last-text="⏭"
            class="mb-0"/>

    </b-container>

</template>

<script lang="ts">

import {Vue, Component, Watch } from 'nuxt-property-decorator';
import { getters } from '~/store'

@Component
export default class Posts extends Vue {

    public activeUser: any = null;

    public totalRows: number = 100;
    public currentPage: number = 1;
    public perPage: number = 10;

    async fetch () {
        await this.getPosts()
        await this.getUsers()
    }

    get posts(): any{
        return this.$store.getters['posts'] as ReturnType<typeof getters.posts>
    }

    get users(): any{
        return this.$store.getters['users'] as ReturnType<typeof getters.users>
    }

    @Watch("activeUser")
    @Watch("currentPage")
    async getPosts(){
        await this.$store.dispatch('getPosts', {
            rows: this.totalRows,
            currentPage: this.currentPage,
            perPage: this.perPage,
            user: this.activeUser
        })
    }

    async getUsers(){
        await this.$store.dispatch('getUsers')
    }

    getPostUser (userId: number) {
        return this.users.find((user: any) => user.id === userId)
    }

    showId(id: number){
        alert(`See Comments by id ${id}`)
    }

}

</script>
