<script setup>
import { LoginSchema } from '@/utils/schemas'
import { useUserStore } from '@/stores'
import { ref } from 'vue'

const visible = ref(false)
const user = useUserStore()
const { submit, field } = LoginSchema.useLoginForm()
</script>

<template>
  <main>
    <v-row no-gutters class="h-screen">
      <v-col sm="12" md="6">
        <div class="d-flex justify-center align-center h-100 u-bg-color-secondary">
          <img src="@/assets/illustration_login.svg" alt="illustration" width="500" />
        </div>
      </v-col>
      <v-col sm="12" md="6" class="d-flex flex-column justify-center h-100">
        <v-container>
          <div class="d-flex flex-column">
            <img src="@/assets/logo_hris.png" alt="logo" class="logo" />
            <h1 class="text-h3 font-weight-bold">Login Account</h1>
            <p class="text-subtitle-1 mb-6 mt-2">
              Please enter your email and password to continue.
            </p>
          </div>
          <form @submit.prevent="submit">
            <v-text-field
              v-model="field.email.value.value"
              :error-messages="field.email.errorMessage.value"
              label="Email"
              type="email"
              color="primary"
              variant="underlined"
              autocomplete="email"
              prepend-inner-icon="mdi-email"
              class="mt-2"
            ></v-text-field>
            <v-text-field
              v-model="field.password.value.value"
              :error-messages="field.password.errorMessage.value"
              label="Password"
              color="primary"
              variant="underlined"
              autocomplete="password"
              prepend-inner-icon="mdi-key-variant"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              @click:append-inner="visible = !visible"
              class="mt-2"
            ></v-text-field>

            <v-btn class="mt-6" type="submit" color="primary" block :loading="user.isLoading">
              Submit
            </v-btn>
          </form>
        </v-container>
      </v-col>
    </v-row>
  </main>
</template>

<style lang="scss" scoped>
.logo {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 300px;
}
</style>
