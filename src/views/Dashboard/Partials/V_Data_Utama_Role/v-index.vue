<script setup>
import { onMounted, ref } from 'vue'
import { useDataUtamaRole } from '@/stores'

const search = ref('')

const dataUtamaRoleStore = useDataUtamaRole()
onMounted(async () => {
  await dataUtamaRoleStore.getAllRole()
})

</script>
<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col sm="12" md="6">
            <v-text-field
              density="compact"
              variant="underlined"
              label="Search Data"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-col>
        </v-row>
      
        <v-divider class="mx-4" inset vertical></v-divider>
      </v-card-title>
      <v-data-table
        :loading="dataUtamaRoleStore.isLoading"
        :items="dataUtamaRoleStore.data"
        :headers="dataUtamaRoleStore.headers"
        :search="search"
       >
        <template v-slot:item.action="{ item }">
          <v-btn
            color="green-accent-4 text-white text-none"
            >Detail</v-btn
          >
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
