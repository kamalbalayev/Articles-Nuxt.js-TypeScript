<template>
    <b-dropdown variant="primary" toggle-tag="span" right menu-class="shadow border-0">

        <template #button-content>
            <span class="text-uppercase">
                {{ $i18n.locale }}
            </span>
        </template>

        <b-dropdown-item v-for="locale in $i18n.locales" :key="locale.code"
                         @click="setLang(locale.code)" exact
                         :to="switchLocalePath(locale.code)" class="d-flex align-center">
            {{ locale.name }}
        </b-dropdown-item>

    </b-dropdown>
</template>

<script lang="ts">
import {Vue, Component} from "nuxt-property-decorator";

@Component
export default class Language extends Vue {
    async fetch() {
        const lang = this.$storage.getCookie('lang')

        if (lang) {
            this.setLang(lang)
        } else {
            this.setLang(this.$store.state.locale)
        }
    }

    setLang(code: string) {
        this.$i18n.locale = code;
        this.$axios.setHeader('Content-Language', code);
        this.$axios.setHeader('Accept-Language', code);
        this.$storage.setCookie('lang', code, {maxAge: 3600 * 24 * 365});
    }
}

/*import Vue from "vue";

export default Vue.extend({
    name: "language",
    async fetch() {
        const lang = this.$storage.getCookie('lang')

        if (lang) {
            this.setLang(lang)
        } else {
            this.setLang(this.$store.state.locale)
        }
    },
    methods: {
        setLang(code: string) {
            this.$i18n.locale = code;
            this.$axios.setHeader('Content-Language', code);
            this.$axios.setHeader('Accept-Language', code);
            this.$storage.setCookie('lang', code, {maxAge: 3600 * 24 * 365});
        },
    }
})*/
</script>
