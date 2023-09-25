<script setup>
import { ref, onMounted } from 'vue'
import { useDetailPendingTaskStore } from '@/stores'
import { useRoute } from 'vue-router'
import router from '@/router'
import { formatDate } from '@/utils/moment'
import PersonalData from './v-personal-data.vue'
import FamilyData from './v-family-data.vue'
import WorkData from './v-work-data.vue'
import Document from './v-document.vue'

const route = useRoute()

const activeTabsOld = ref('1')
const activeTabsNew = ref('1')

const detailPendingTaskStore = useDetailPendingTaskStore()
onMounted(async () => {
  await detailPendingTaskStore.getDetailPendingTask(parseInt(route.params.id))
})

const onClickBack = () => {
  router.push({ name: 'task' })
}

</script>
<template>
  <v-container fluid v-if="!detailPendingTaskStore.isLoading">
    <v-btn class="mb-5 text-none" color="primary" prepend-icon="mdi-arrow-left" @click="onClickBack">
      Kembali
    </v-btn>
    <v-card>
      <v-container fluid>
        <v-row>
          <v-col sm="12" md="4">
            <h6 class="text-subtitle-1">Judul Pengajuan</h6>
            <p class="text-subtitle-2 font-weight-bold mt-1">
              {{ detailPendingTaskStore.data.judul }}
            </p>
          </v-col>
          <v-col sm="12" md="4">
            <h6 class="text-subtitle-1">Pembuat</h6>
            <p class="text-subtitle-2 font-weight-bold mt-1">
              {{ detailPendingTaskStore.data.nama_user_pembuat }}
            </p>
          </v-col>
          <v-col sm="12" md="4">
            <h6 class="text-subtitle-1">Tanggal</h6>
            <p class="text-subtitle-2 font-weight-bold mt-1">
              {{ formatDate(detailPendingTaskStore.data.created_at) }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="mt-3">
      <v-container fluid>
        <v-row>
          <v-col sm="12" md="6">
            <v-card>
              <v-container fluid>
                <div class="d-flex align-center px-4">
                  <v-divider></v-divider>
                  <h6 class="text-subtitle-1 text-center w-100">Data Lama</h6>
                  <v-divider></v-divider>
                </div>
                <v-tabs v-model="activeTabsOld" bg-color="primary" class="mt-5" align="center">
                  <v-tab value="1">Personal Data</v-tab>
                  <v-tab value="2">Family Data</v-tab>
                  <v-tab value="3">Work Data</v-tab>
                  <v-tab value="4">Document</v-tab>
                </v-tabs>
                <div class="my-4">
                  <v-window v-model="activeTabsOld">
                    <v-window-item value="1">
                      <PersonalData :value="detailPendingTaskStore.empOldValue" />
                    </v-window-item>
                    <v-window-item value="2">
                      <FamilyData :value="detailPendingTaskStore.empOldValue" />
                    </v-window-item>
                    <v-window-item value="3">
                      <WorkData :value="detailPendingTaskStore.empOldValue" />
                    </v-window-item>
                    <v-window-item value="4">
                      <Document :value="detailPendingTaskStore.empOldValue" />
                    </v-window-item>
                  </v-window>
                </div>
              </v-container>
            </v-card>
          </v-col>
          <v-col sm="12" md="6">
            <v-card>
              <v-container fluid>
                <div class="d-flex align-center" px-4>
                  <v-divider></v-divider>
                  <h6 class="text-subtitle-1 text-center w-100">Data Baru</h6>
                  <v-divider></v-divider>
                </div>
                <v-tabs v-model="activeTabsNew" bg-color="primary" class="mt-5" align="center">
                  <v-tab value="1">Personal Data</v-tab>
                  <v-tab value="2">Family Data</v-tab>
                  <v-tab value="3">Work Data</v-tab>
                  <v-tab value="4">Document</v-tab>
                </v-tabs>
                <div class="my-4">
                  <v-window v-model="activeTabsNew">
                    <v-window-item value="1">
                      <PersonalData :value="detailPendingTaskStore.empNewValue" />
                    </v-window-item>
                    <v-window-item value="2">
                      <FamilyData :value="detailPendingTaskStore.empNewValue" />
                    </v-window-item>
                    <v-window-item value="3">
                      <WorkData :value="detailPendingTaskStore.empNewValue" />
                    </v-window-item>
                    <v-window-item value="4">
                      <Document :value="detailPendingTaskStore.empNewValue" />
                    </v-window-item>
                  </v-window>
                </div>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
  <v-container fluid v-else>
    <v-skeleton-loader class="mb-5" type="button"></v-skeleton-loader>
    <v-card>
      <v-container>
        <v-row>
          <v-col sm="12" md="4">
            <v-skeleton-loader type="text@2"></v-skeleton-loader>
          </v-col>
          <v-col sm="12" md="4">
            <v-skeleton-loader type="text@2"></v-skeleton-loader>
          </v-col>
          <v-col sm="12" md="4">
            <v-skeleton-loader type="text@2"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="mt-4">
      <v-container fluid>
        <v-row>
          <v-col sm="12" md="6">
            <v-skeleton-loader type="text"></v-skeleton-loader>
            <v-skeleton-loader type="text@4"></v-skeleton-loader>
          </v-col>
          <v-col sm="12" md="6">
            <v-skeleton-loader type="text"></v-skeleton-loader>
            <v-skeleton-loader type="text@4"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
