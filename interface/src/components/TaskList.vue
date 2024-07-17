<!-- TaskList.vue -->
<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Priority
        </th>
        <th class="text-left">
          Title
        </th>
        <th class="text-left">
          Description
        </th>
        <th class="text-left">
          Status
        </th>
        <th class="text-left">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in getTasks"
        :key="item.id"
      >
        <td><v-badge
          :color="priority[item.priority-1].color"
          :content="priority[item.priority-1].text"
          inline
        ></v-badge></td>
        <td>{{ item.title }}</td>
        <td>{{ item.description }}</td>
        <td><v-badge
          :color="status[item.status].color"
          :content="status[item.status].text"
          inline
        ></v-badge></td>
        <td>
          <div class="d-flex flex-row justify-start align-start">
            <v-icon
          size="small"
          class="me-2"
          @click="completeTask(item)"
        >
        mdi-check-circle
        </v-icon>
        <TaskDialog @edit-task="fetchTasks" :is-edit-dialog="true" :selected-task="item" :task-id="item.id"/>
      <v-icon
        size="small"
        @click="deleteTask(item)"
      >
        mdi-delete
      </v-icon>
          </div>
        </td>
      </tr>
      <tr v-if="getTasks == null">
        <td colspan="3">Nenhum registro encontrado</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskDialog from "./TaskDialog.vue";
import apiClient from '../config/axios';
export default {
  name: "TaskList",
  components: {
    TaskDialog
  },
  data() {
    return {
      status: [
        {
          color: "primary",
          text: "Open"
        },
        {
          color: "success",
          text: "Completed"
        },
      ],
      priority: [
        {
          color: "error",
          text: "Maximum"
        },
        {
          color: "warning",
          text: "High"
        },
        {
          color: "primary",
          text: "Medium"
        },
        {
          color: "info",
          text: "Low"
        },
        {
          color: "secondary",
          text: "Minimum"
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getTasks'])
  },
  methods: {
    ...mapActions(['fetchTasks']),
    async completeTask (task) {
      apiClient.get('tasks/'+task.id+'/complete').then((result) => {
        this.fetchTasks()
      }).catch((err) => {
        console.log(err);
      });
    },
    async deleteTask (task) {
      apiClient.delete('tasks/'+task.id).then((result) => {
        this.fetchTasks()
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    console.log('tasklist');
    this.fetchTasks();
  }
};
</script>

<style scoped>
</style>
