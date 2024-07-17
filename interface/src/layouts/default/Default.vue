<template>
  <v-app>
    <default-view />
    <v-footer class="footer-height pa-0 position-sticky">

      <v-row class="d-flex flex-column w-100">
        <div class="bg-primary d-flex w-100 align-center px-4">
          <strong>Get connected with us on social networks!</strong>
    
          <v-spacer></v-spacer>
    
          <v-btn
            v-for="icon in icons"
            :key="icon"
            :icon="icon"
            class="mx-4"
            size="small"
            variant="plain"
          ></v-btn>
        </div>
    
        <div class="px-4 py-2 bg-black text-center w-100 pb-2">
          {{ new Date().getFullYear() }} — <strong>Jobson Anselmo Chinelli</strong>
        </div>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
  import DefaultView from './View.vue';

  export default {
    components: {
      DefaultView
    },
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>
<style>
.footer-height {
  max-height: 65px !important;
}
</style>