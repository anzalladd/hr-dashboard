import { formatDate } from '@/utils/moment'; import { useDetailPendingTaskStore } from '@/stores';
<script setup>
import { onMounted } from 'vue'
import { useDetailPendingTaskStore } from '@/stores'
import { useRoute } from 'vue-router'
import router from '@/router'
import { formatDate } from '@/utils/moment'

const route = useRoute()

const detailPendingTaskStore = useDetailPendingTaskStore()
onMounted(async () => {
  await detailPendingTaskStore.getDetailPendingTask(parseInt(route.params.id))
})

const onClickBack = () => {
  router.push({ name: 'task' })
}

const getDokName = (string) => {
  return string ? string.split('/')[2] : '-'
}
</script>
<template>
  <v-container fluid v-if="!detailPendingTaskStore.isLoading">
    <v-btn
      class="mb-5 text-none"
      color="primary"
      prepend-icon="mdi-arrow-left"
      @click="onClickBack"
    >
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
    <v-card class="mt-5">
      <v-container fluid>
        <h6 class="text-subtitle-1 font-weight-medium">Isi Pengajuan</h6>
        <v-divider class="mt-4 mb-4"></v-divider>
        <div v-if="detailPendingTaskStore.data.menu_code == 16">
          <v-row class="pb-6">
            <v-col sm="12" md="6">
              <div class="d-flex align-center justify-space-between w-100 py-5">
                <p class="text-subtitle-2 font-weight-bold">Karyawan</p>
                <p class="text-subtitle-2">
                  {{ detailPendingTaskStore.detailTask.nama_lengkap || '-' }}
                </p>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center justify-space-between w-100 py-5">
                <p class="text-subtitle-2 font-weight-bold">Jenis Cuti</p>
                <p class="text-subtitle-2">
                  {{ detailPendingTaskStore.detailTask.nama_cuti || '-' }}
                </p>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center justify-space-between w-100 py-5">
                <p class="text-subtitle-2 font-weight-bold">Lama Waktu</p>
                <p class="text-subtitle-2">
                  {{ detailPendingTaskStore.detailTask.lama_cuti }} hari (Mulai tanggal
                  {{ formatDate(detailPendingTaskStore.detailTask.tgl_mulai_cuti) }} )
                </p>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center justify-space-between w-100 py-5">
                <p class="text-subtitle-2 font-weight-bold">Jenis Cuti</p>
                <p class="text-subtitle-2">
                  {{ detailPendingTaskStore.detailTask.keterangan || '-' }}
                </p>
              </div>
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </div>
        <div v-if="detailPendingTaskStore.data.menu_code == '9'">
          <v-row class="py-5">
            <v-col sm="12" md="6">
              <p class="text-subtitle-2 font-weight-bold">Nama Rekrutmen</p>
            </v-col>
            <v-col sm="12" md="6">
              <p class="text-subtitle-2">
                {{ detailPendingTaskStore.detailTask.nama_recruitment || '-' }}
              </p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="py-5">
            <v-col sm="12" md="6">
              <p class="text-subtitle-2 font-weight-bold">Department</p>
            </v-col>
            <v-col sm="12" md="6">
              <p class="text-subtitle-2">
                {{ detailPendingTaskStore.detailTask.dept_nama || '-' }}
              </p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="py-5">
            <v-col sm="12" md="6">
              <p class="text-subtitle-2 font-weight-bold">Jabatan</p>
            </v-col>
            <v-col sm="12" md="6">
              <p class="text-subtitle-2">
                {{ detailPendingTaskStore.detailTask.jabatan || '-' }}
              </p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="py-5">
            <v-col sm="12" md="6">
              <p class="text-subtitle-2 font-weight-bold">Penempatan</p>
            </v-col>
            <v-col sm="12" md="6">
              <p class="text-subtitle-2">
                {{ detailPendingTaskStore.detailTask.lokasi_penempatan || '-' }}
              </p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="py-5">
            <v-col sm="12" md="6">
              <p class="text-subtitle-2 font-weight-bold">Jumlah</p>
            </v-col>
            <v-col sm="12" md="6">
              <p class="text-subtitle-2">
                {{ detailPendingTaskStore.detailTask.jumlah_kebutuhan || '-' }}
              </p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="py-5">
            <v-col sm="12" md="6">
              <p class="text-subtitle-2 font-weight-bold">Tanggal Pemenuhan</p>
            </v-col>
            <v-col sm="12" md="6">
              <p class="text-subtitle-2">
                {{ formatDate(detailPendingTaskStore.detailTask.target_tanggal_pemenuhan) || '-' }}
              </p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="py-5">
            <v-col sm="12" md="6">
              <p class="text-subtitle-2 font-weight-bold">Dokumen Pendukung</p>
            </v-col>
            <v-col sm="12" md="6">
              <div class="d-flex align-items-center">
                <p class="text-subtitle-2 mr-5">
                  {{ getDokName(detailPendingTaskStore.detailTask.dok) }}
                </p>
                <v-btn
                  class="mb-5 text-none"
                  color="success"
                  prepend-icon="mdi-download-circle-outline"
                >
                  Download File
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
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
