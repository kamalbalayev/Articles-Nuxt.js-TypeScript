<template>
  <div style="min-height: 100vh" class="d-flex flex-column">

    <app-header/>

    <main class="w-100 flex-fill">
      <nuxt/>
    </main>

  </div>
</template>

<script lang="ts">

import {Vue, Component } from 'nuxt-property-decorator';
import AppHeader from "~/components/app/Header.vue";

@Component({
    components: {AppHeader}
})

export default class Layout extends Vue {}

</script>
