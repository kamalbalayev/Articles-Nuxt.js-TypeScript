<template>
    <b-card v-if="data" :title="data.title | capitalize" :sub-title="data.body | capitalize"
            title-tag="h2" sub-title-tag="p" sub-title-text-variant="secondary"
            class="mb-3 rounded-lg" :class="{'shadow border-light': isHovered}"
            v-b-hover="hoverHandler">

        <b-img :src="`https://picsum.photos/800/300/?image=${randomId(10, 100)}`" fluid :alt="data.title" class="my-3"/>

        <div class="d-flex align-items-center">

            <div class="d-flex align-items-center flex-fill" v-if="user">

                <b-avatar class="mr-3"/>

                <div class="mr-auto">
                    <span class="d-block" v-text="user.name"/>

                    <small class="d-block" v-text="user.email"/>
                </div>

            </div>

            <b-button variant="light" size="sm" @click="getComments(data.id)">
                {{ $t('comments') }}
            </b-button>

        </div>

        <div v-if="commentsToggle">
            <template v-if="comments.length > 0">
                <hr>

                <span class="h6">
                    {{ $t('allComments') }} ({{comments.length}})
                </span>

                <template v-for="(comment, i) in comments">
                    <b-card :key="`comment-${i}`" :title="comment.name" :sub-title="data.body"
                            title-tag="h5" sub-title-tag="span" sub-title-text-variant="secondary"
                            class="mt-2 rounded-lg border-0 bg-light">

                        <hr>

                        <div class="d-flex align-items-center flex-fill" v-if="user">

                            <b-avatar class="mr-3" size="26"/>

                            <small class="d-block mr-auto" v-text="comment.email"/>

                        </div>

                    </b-card>
                </template>

            </template>
        </div>

    </b-card>
</template>

<script lang="ts">

import {Vue, Component, Prop, Emit} from "nuxt-property-decorator";

@Component({
    filters: {
        capitalize: function (value: string) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
})

export default class PostsItem extends Vue {

    @Prop({ type: Object, default: null }) readonly data!: object
    @Prop({ type: Object, default: null }) readonly user!: object

    public isHovered: boolean = false;
    public commentsToggle: boolean = false;
    public comments: any = [];

    hoverHandler(hovered: boolean) {
        this.isHovered = hovered
    }

    randomId(min: number, max: number) {
        return (Math.random() * (max - min) + min).toFixed(0);
    }

    async getComments(id: number){

        this.commentsToggle = !this.commentsToggle

        if(this.comments.length === 0){
            const {data} = await this.$axios.get(`posts/${id}/comments`)
            this.comments = data
        }

        this.justEmit(id)
    }

    @Emit('just-emit')
    justEmit(id: number){}
}
</script>
