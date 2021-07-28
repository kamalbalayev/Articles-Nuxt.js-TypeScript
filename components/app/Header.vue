<template>
    <b-navbar toggleable="lg" type="dark" variant="primary" class="shadow-lg" sticky style="z-index: 1021">
        <b-container>

            <b-navbar-brand :to="localePath('index', $i18n.locale)" class="font-weight-bold">Articles</b-navbar-brand>

            <language/>

        </b-container>
    </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Language from "@/components/app/Language.vue";

@Component({
    components: {Language}
})

export default class Header extends Vue {}

</script>
