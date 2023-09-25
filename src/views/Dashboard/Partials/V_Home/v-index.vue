<script setup>
import V_Loading from './v-loading.vue'
import { useDashboardHomeStore } from '@/stores'
import { ref, onMounted, computed } from 'vue'

const useStore = useDashboardHomeStore()

onMounted(async () => {
  await useStore.getDashboardKaryawan()
})

const activeTabs = ref(null)

const headers = ref([
  {
    title: 'Nik',
    key: 'nik',
    align: 'center',
    sortable: false
  },
  { title: 'Nama', key: 'nama', align: 'center', sortable: false },
  { title: 'Kedatangan', key: 'kedatangan', align: 'center', sortable: false }
])

const optionsAgeBreakDown = ref({
  chart: {
    id: 'chart-age-breakdown',
    type: 'bar'
  },
  xaxis: {
    categories: [20, 30, 40, 50, 60]
  }
})

const seriesAgeBreakdown = computed(() => {
  return [
    {
      name: 'series-age-breakdown',
      data: [
        useStore.data.countAllEmp20an,
        useStore.data.countAllEmp30an,
        useStore.data.countAllEmp40an,
        useStore.data.countAllEmp50an,
        useStore.data.countAllEmp60an
      ]
    }
  ]
})

const seriesEmploymentStatus = computed(() => {
  return [
    {
      name: 'series-employment-status',
      data: [
        useStore.data.countAllEmp20an,
        useStore.data.countAllEmp30an,
        useStore.data.countAllEmp40an,
        useStore.data.countAllEmp50an,
        useStore.data.countAllEmp60an
      ]
    }
  ]
})

const optionsEmploymentStatus = ref({
  chart: {
    id: 'options-employment-status',
    type: 'bar'
  },
  xaxis: {
    categories: ['Bulanan', 'Harian', 'Borong']
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  }
})

const optionsGenderDiversity = ref({
  chart: {
    type: 'pie'
  },
  labels: ['Male', 'Female']
})
</script>
<template>
  <V_Loading v-if="useStore.isLoading" />
  <v-container fluid v-else>
    <h5 class="text-h5 font-weight-bold">Good Afternoon,</h5>
    <p class="text-body-1">it's Monday, July 17, 2023</p>
    <v-row class="mt-4">
      <v-col sm="12" md="4">
        <v-card color="blue-lighten-1">
          <v-card-item>
            <h4 class="text-h4 py-3 font-weight-bold">{{ useStore.data.countAllEmp }}</h4>
            <p class="text-subtitle-1 font-weight-semi-bold">Jumlah Karyawan</p>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col sm="12" md="4">
        <v-card color="yellow-darken-4">
          <v-card-item>
            <h4 class="text-h4 py-3 font-weight-bold">0</h4>
            <p class="text-subtitle-1 font-weight-semi-bold">Jumlah Karyawan Ijin</p>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col sm="12" md="4">
        <v-card color="red-lighten-1">
          <v-card-item>
            <h4 class="text-h4 py-3 font-weight-bold">0</h4>
            <p class="text-subtitle-1 font-weight-semi-bold">Jumlah Karyawan Terlambat</p>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="4">
        <v-card style="min-height: 350px">
          <v-container>
            <v-card-title class="text-center">Employee Age Breakdown</v-card-title>
            <apexchart :options="optionsAgeBreakDown" :series="seriesAgeBreakdown"></apexchart>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="4">
        <v-card style="min-height: 350px">
          <v-container>
            <v-card-title class="text-center">Employment Status</v-card-title>
            <apexchart
              :options="optionsEmploymentStatus"
              :series="seriesEmploymentStatus"
            ></apexchart>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="4">
        <v-card style="min-height: 350px">
          <v-container>
            <v-card-title class="text-center">Gender Diversity</v-card-title>
            <apexchart
              :options="optionsGenderDiversity"
              :series="[useStore.data.countAllEmpMale, useStore.data.countAllEmpFemale]"
            ></apexchart>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col sm="12" md="6">
        <v-card style="min-height: 300px">
          <v-container>
            <v-card-title class="text-center"> List Karyawan Terlambat </v-card-title>
            <v-data-table
              :headers="headers"
              :items="[]"
              item-value="name"
              class="mt-5 hide-footer-table"
            ></v-data-table>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
        <v-card style="min-height: 300px">
          <v-container>
            <v-card-title class="text-center"> Info & Task </v-card-title>
            <v-tabs v-model="activeTabs" bg-color="primary" class="mt-5">
              <v-tab value="1">Persetujuan</v-tab>
              <v-tab value="2">Perpanjangan Kontrak</v-tab>
            </v-tabs>

            <v-card-text class="pa-0">
              <v-window v-model="activeTabs">
                <v-window-item value="1">
                  <v-list lines="one">
                    <v-list-item
                      v-for="pendingTask in useStore.dataPendingTask"
                      :key="pendingTask.id"
                    >
                      {{ pendingTask.judul }}
                    </v-list-item>
                  </v-list>
                </v-window-item>
                <v-window-item value="2">
                  <v-table>
                    <thead>
                      <tr>
                        <th>
                          Nama Lengkap
                        </th>
                        <th>
                          Tanggal Kontrak Selesai
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="perpanjanganKontrak in useStore.dataPerpanjanganKontrak"
                        :key="perpanjanganKontrak.id"
                      >
                      <td>{{ perpanjanganKontrak.nama_lengkap }}</td>
                      <td>{{ perpanjanganKontrak.tanggal_kontrak_selesai }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
