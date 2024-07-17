<template>
  <v-container class="mt-4">
    <v-row class="d-flex flex-row justify-end align-end">
      <v-col cols="2">
        <TaskDialog @create-task="updateTaskList"/>
      </v-col>
    </v-row>

    <!-- Input Form -->
    

    <!-- Display Tasks -->
    <TaskList ref="taskList" :tasks="tasks" @delete-task="deleteTask" @edit-task="editTask" />
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import TaskList from "../components/TaskList.vue";
import TaskDialog from "../components/TaskDialog.vue";
import { mapActions, mapGetters } from 'vuex';
import apiClient from '../config/axios';
export default {
  name: "App",
  components: {
    TaskList,
    TaskDialog
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  data() {
    return {
    }
  },
  methods: {
    updateTaskList() {
      this.$refs.taskList.fetchTasks();
    }
  },
};
</script>
