<template>
  <v-layout ref="app" class="rounded rounded-md">
    <v-app-bar
        color="primary"
        density="compact"
      >
        <template v-slot:prepend>
          <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        </template>

        <v-app-bar-title>Task Manager</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-logout" @click="clickToLogout"></v-btn>
        </template>
      </v-app-bar>


    <v-main class="d-flex flex-column align-start justify-start" style="min-height: 300px;">
      <router-view />
    </v-main>

    
  </v-layout>
</template>

<script>
  import { useLayout } from 'vuetify'
  import { mapActions } from 'vuex';
  const Child = {
    setup (props, ctx) {
      const { getLayoutItem } = useLayout()

      function print (key) {
        alert(JSON.stringify(getLayoutItem(key), null, 2))
      }

      return () => ctx.slots.default({ print })
    },
  }

  export default {
    components: { Child },
    methods: {
      ...mapActions(['logout']),
      clickToLogout () {
        this.logout(true);
        this.$router.push({ name: 'Login' });
      },
    }
  }
</script>
