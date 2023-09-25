<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'

const user = useUserStore()
const drawer = ref(true)
const openList = ref([])
const route = useRoute()
</script>
<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" width="300">
      <v-layout column align-center class="pa-4">
        <div class="text-center" style="width: 100%">
          <v-avatar size="80">
            <img src="@/assets/avatar.png" alt="avatar" />
          </v-avatar>
          <p class="text-subtitle-1 font-weight-bold mt-4 text-darken">{{ user.data.name }}</p>
          <p class="font-weight-medium text-subtitle-2" style="color: #787a91">
            {{ user.data.role }}
          </p>
        </div>
      </v-layout>
      <v-divider style="background-color: white !important"></v-divider>
      <v-list density="comfortable" v-model:opened="openList" style="font-size: 14px" nav>
        <v-list-item
          color="darken"
          to="/dashboard"
          link
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="Dashboard"
          :active="route.path === '/dashboard'"
        >
        </v-list-item>
        <v-list-group v-for="item in user.data.list_menu" :key="item.title" :value="item.title">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="item.title" :prepend-icon="item.icon"></v-list-item>
          </template>
          <v-list-item
            v-for="child in item.items"
            :to="child.to"
            :key="child.title"
            :title="child.title"
            :prepend-icon="child.icon"
            :value="child.title"
            color="darken"
            link
            :active="route.path === child.to"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="white" clipped-left app>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <img class="ml-4" height="48" width="220" src="@/assets/hris_header.png" />
    </v-app-bar>

    <v-main class="bg-teal-lighten-5" style="min-height: 100vh">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>
