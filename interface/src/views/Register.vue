<template>
    <v-main class="d-flex align-center justify-center w-100" style="min-height: 500px;">
        <v-row v-if="error.show" class="d-flex align-center justify-center w-100">
            <v-col cols="4">
               <v-alert
               density="compact"
               :text="error.msg"
               title="Error"
               type="error"
            ></v-alert>
            </v-col>
         </v-row>
        <v-row class="d-flex align-center justify-center w-100">
            <v-col cols="4">
                <v-card class="elevation-12">
                    <v-form ref="form" @submit.prevent="handleSubmit()">  
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Register</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            
                            <v-text-field
                            v-model="username"
                            :rules="usernameRules"
                            label="Username"
                            ></v-text-field>
                            <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="Email"
                            ></v-text-field>
                            <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            ></v-text-field>
                            
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" type="submit">Register</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-main>
</template>

<script>
import apiClient from '../config/axios';
export default {
    name: 'Login',
    props: {
        source: String,
    },
    data() {
        return {
            showPassword: false,
            error: {
                show: false,
                msg: ''
            },
            username: '',
            usernameRules: [
                value => {
                if (value?.length > 3) return true

                return 'Username must be at least 3 characters.'
                },
            ],
            email: '',
            emailRules: [
                value => {
                    if (value?.length > 3) return true
                    return 'Username must be at least 3 characters.'
                }
            ],
            password: '',
            passwordRules: [
                value => {
                if (value?.length > 3) return true

                return 'Password must be at least 3 characters.'
                },
            ],
        }
    },
    methods: {
      async validate () {
        const { valid } = await this.$refs.form.validate()

        if (valid) alert('Form is valid')
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      handleSubmit () {
         apiClient.post('auth/register', {username: this.username, email: this.email, password: this.password}).then((result) => {
            this.$router.push({ name: 'Login' });
         }).catch((err) => {
            this.reset();
            this.error.show = true;

            this.error.msg = err.response.data.error;
         });
      },
    },
};
</script>

<style></style>
