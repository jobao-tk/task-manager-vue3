<template>
    <div :class="!isEditDialog ? 'pa-4 text-center' : ''">
      <v-dialog
        v-model="dialog"
        max-width="700"
      >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-if="!isEditDialog"
            prepend-icon="mdi-cog"
            size="small"
            :text="isEditDialog ? 'Edit Task' : 'New Task'"
            v-bind="activatorProps"
          ></v-btn>
          <v-icon
          v-if="isEditDialog"
        class="me-2"
        size="small"
        v-bind="activatorProps"
      >
        mdi-pencil
      </v-icon>
        </template>
  
        <TaskInputForm :is-edit-form="isEditDialog" @close-dialog="closeDialog" @submit-task="submitTask" :initialTask="selectedTask" />
      </v-dialog>
    </div>
  </template>

<script>
import TaskInputForm from "./TaskInputForm";
import apiClient from '../config/axios';
import { mapGetters } from 'vuex';
  export default {
    name: "App",
    components: {
        TaskInputForm
    },
    props: {
    isEditDialog: {
      type: Boolean,
      default: false,
    },
    taskId: {
      type: Number  ,
      default: 0,
    },
    selectedTask: {
      type: Object,
      default: () => ({ title: "", description: "", priority: 3, status: 0, userId: "" }),
    },
  },
    computed: {
    ...mapGetters(['getUser']),
    },
    data: () => ({
      dialog: false,
    }),
    methods: {
        async submitTask (task) {
          task.userId = this.getUser.id
          if (!this.isEditDialog) {
            apiClient.post('tasks', task).then((result) => {
                console.log(result)
                this.$emit('createTask', true);
                this.dialog = false;
            }).catch((err) => {
                console.log(err)
                this.dialog = false;
            });
          } else {
            apiClient.patch('tasks/'+this.taskId+'/update', task).then((result) => {
                console.log(result)
                this.$emit('editTask', true);
                this.dialog = false;
            }).catch((err) => {
                console.log(err)
                this.dialog = false;
            });
          }
        },
        async closeDialog (dialog) {
            this.dialog = false;
        }
    }
  }
</script>