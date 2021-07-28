<template>
  <b-container class="my-5">
    <b-row class="h-100 d-flex" align-v="center" align-h="center">
      <b-col cols="12" md="6" lg="5">
        <email-form/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">

import {Vue, Component } from 'nuxt-property-decorator';
import EmailForm from "~/components/EmailForm.vue";

@Component({
    components: {EmailForm}
})

export default class Index extends Vue {}

</script>
