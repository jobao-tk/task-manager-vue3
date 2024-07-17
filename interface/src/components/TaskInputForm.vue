<!-- TaskInputForm.vue -->
<template>
  <v-card
          prepend-icon="mdi-account"
          :title="isEditForm ? 'Edit Task' : 'New task'"
        >
          <v-card-text>
            <v-row dense>
              <v-col
                cols="12"
              >
              <v-text-field
              v-model="task.title"
              label="Task"
              :rules="[requiredField]"
              required
            ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                v-model="task.priority"
                :items="[1, 2, 3, 4, 5]"
                label="Default"
              ></v-select>
              </v-col>

              <v-col
                cols="12"
              >
              <v-textarea 
      v-model="task.description"
      label="Description"
      :rules="[requiredField]"
      required
    ></v-textarea >
              </v-col>
  </v-row>
  </v-card-text>
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text="Close"
              variant="plain"
              @click="closeDialog"
            ></v-btn>
  
            <v-btn
              color="primary"
              text="Save"
              variant="tonal"
              @click="submitForm"
            ></v-btn>
          </v-card-actions>
        </v-card>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "TaskInputForm",
  props: {
    isEditForm: {
      type: Boolean,
      default: false,
    },
    initialTask: {
      type: Object,
      default: () => ({ title: "", description: "", priority: 3, status: 0, userId: "" }),
    },
  },
  setup(props, { emit }) {
    const task = ref({ ...props.initialTask });

    // Validation rule for required fields
    const requiredField = (value) => !!value || "Field is required";

    // Watch for changes in initialTask prop and update the local task ref
    watch(
      () => props.initialTask,
      (newTask) => {
        task.value = { ...newTask };
      }
    );

    const submitForm = () => {
      if (task.value.title && task.value.description) {
        emit("submit-task", { ...task.value });

        task.value = { title: "", description: "", priority: 3, status: 0, userId: "" };
      }
    };

    const closeDialog = () => {
        emit("close-dialog", { close: true });
    };

    return {
      task,
      closeDialog,
      submitForm,
      requiredField,
    };
  },
};
</script>
