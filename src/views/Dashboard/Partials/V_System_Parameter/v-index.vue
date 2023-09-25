<script setup>
import { onMounted, ref } from 'vue'
import { useSystemParameterStore } from '@/stores'

const search = ref('')

const systemParameterStore = useSystemParameterStore()
onMounted(async () => {
  await systemParameterStore.getAllData()
})
</script>
<template>
  <v-container fluid>
    <v-row class="h-screen" v-if="!systemParameterStore.isLoading">
      <v-col sm="12" md="5">
        <v-card>
          <v-card-title>
            <v-card-title class="text-h5 pl-0">Divisi</v-card-title>
            <v-divider class="mb-5"></v-divider>
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
              <v-col sm="12" md="6">
                <div class="d-flex justify-md-end">
                  <v-btn color="primary">ADD ITEM</v-btn>
                </div>
              </v-col>
            </v-row>

            <v-divider class="mx-4" inset vertical></v-divider>
          </v-card-title>
          <v-data-table
            :items="systemParameterStore.dataDivisi"
            :headers="systemParameterStore.headersDivisi"
            :search="search"
          >
            <template v-slot:item.action="{ item }">
              <v-btn color="green-accent-4 text-white text-none">Detail</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col sm="12" md="7">
        <v-card>
          <v-card-title>
            <v-card-title class="text-h5 pl-0">Department</v-card-title>
            <v-divider class="mb-5"></v-divider>
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
              <v-col sm="12" md="6">
                <div class="d-flex justify-md-end">
                  <v-btn color="primary">ADD ITEM</v-btn>
                </div>
              </v-col>
            </v-row>

            <v-divider class="mx-4" inset vertical></v-divider>
          </v-card-title>
          <v-data-table
            :items="systemParameterStore.dataDepartment"
            :headers="systemParameterStore.headersDepartment"
            :search="search"
          >
            <template v-slot:item.action="{ item }">
              <v-btn color="green-accent-4 text-white text-none">Detail</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-4" v-else>
      <v-col sm="12" md="5">
        <v-card>
          <v-container>
            <v-skeleton-loader type="text"></v-skeleton-loader>
            <v-skeleton-loader type="table-heading"></v-skeleton-loader>
            <v-skeleton-loader type="table-tbody"></v-skeleton-loader>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="7">
        <v-card>
          <v-container>
            <v-skeleton-loader type="text"></v-skeleton-loader>
            <v-skeleton-loader type="table-heading"></v-skeleton-loader>
            <v-skeleton-loader type="table-tbody"></v-skeleton-loader>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
