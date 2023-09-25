<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores'

const props = defineProps(['value'])

const userStore = useUserStore()

const isShowGaji = computed(() => {
  return userStore.data.role_code == '1' || userStore.data.role_code == '99'
})
</script>
<template>
  <div class="mt-5">
    <p class="text-subtitle-1 font-weight-bold mt-1 mb-5 w-100">Pekerjaan Sekarang</p>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.pendidikan_terakhir"
          label="Pendidikan Terakhir"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.bagian"
          label="Bagian"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.ditetapkan"
          label="Ditetapkan"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.no_anggota_koperasi"
          label="No Koperasi"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col v-if="props.value.status_karyawan != 1" cols="12" md="4">
        <v-text-field
          :model-value="props.value.status_karyawan_nama"
          label=""
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" v-if="isShowGaji">
        <v-text-field
          :model-value="props.value.gaji_sekarang"
          label="Gaji"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.sisa_cuti"
          label="Sisa Cuti"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mb-5"></v-divider>
  </div>
  <div class="mt-5">
    <p class="text-subtitle-1 font-weight-bold mt-1 mb-5 w-100">Riwayat Kerja</p>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">Unit Perusahaan</th>
          <th class="text-center">Tanggal</th>
          <th class="text-center">Jabatan</th>
          <th class="text-center">Alasan Kepindahan</th>
        </tr>
      </thead>
      <tbody v-if="value.listRiwayatPekerjaan.length">
        <tr v-for="item in props.value.listRiwayatPekerjaan" :key="item.id">
          <td>{{ item.unit_perusahaan }}</td>
          <td>{{ item.tgl }}</td>
          <td>{{ item.jabatan }}</td>
          <td>{{ item.alasan_kepindahan }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center">-</td>
          <td class="text-center">-</td>
          <td class="text-center">-</td>
          <td class="text-center">-</td>
        </tr>
      </tbody>
    </v-table>
    <v-divider class="my-5"></v-divider>
  </div>
  <div class="mt-5">
    <p class="text-subtitle-1 font-weight-bold mt-1 mb-5 w-100">Pengalaman Kerja</p>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">Perusahaan</th>
          <th class="text-center">Jabatan</th>
          <th class="text-center">Alasan Pindah</th>
        </tr>
      </thead>
      <tbody v-if="value.listRiwayatPekerjaan.length">
        <tr v-for="item in props.value.listRiwayatPekerjaan" :key="item.id">
          <td>{{ item.perusahaan }}</td>
          <td>{{ item.jabatan }}</td>
          <td>{{ item.alasan_kepindahan }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center">-</td>
          <td class="text-center">-</td>
          <td class="text-center">-</td>
        </tr>
      </tbody>
    </v-table>
    <v-divider class="my-5"></v-divider>
  </div>
</template>
