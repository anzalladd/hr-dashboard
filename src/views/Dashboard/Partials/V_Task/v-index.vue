<script setup>
import { onMounted, ref } from 'vue'
import { usePendingTaskStore } from '@/stores'
import router from '@/router'
import StatusChip from '@/components/StatusChip.vue'

const search = ref('')

const pendingTaskStore = usePendingTaskStore()
onMounted(async () => {
  await pendingTaskStore.getPendingTask()
})

const getDetailPendingTask = async (id, menu_code) => {
  if(menu_code === 5){
    router.push({ name: 'detail_task', params: { id } })
    return
  } 
  router.push({ name: 'detail_pending_task', params: { id } })
}

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
        :loading="pendingTaskStore.isLoading"
        :items="pendingTaskStore.data"
        :headers="pendingTaskStore.headers"
        :search="search"
      >
        <template v-slot:item.status="{ item }">
          <StatusChip :status="item.selectable.status" />
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn color="green-accent-4 text-white text-none" @click="getDetailPendingTask(item.selectable.id, item.selectable.menu_code)">Detail</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
