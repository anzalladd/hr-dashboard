<script setup>
const props = defineProps(['value'])
</script>
<template>
  <div class="mt-5">
    <p class="text-subtitle-1 font-weight-bold mt-1 mb-5 w-100">Keluarga</p>
    <v-row>
      <v-col sm="12" md="12">
        <v-text-field
          label="Orang Tua"
          color="primary"
          readonly
          :model-value="props.value.nama_ortu"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="4">
        <v-text-field
          label="Status Nikah"
          color="primary"
          readonly
          :model-value="props.value.status_nikah"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="4">
        <v-text-field
          label="Istri/Suami"
          color="primary"
          readonly
          :model-value="props.value.nama_istri_suami"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="4">
        <v-text-field
          label="Pekerjaan"
          color="primary"
          readonly
          :model-value="props.value.pekerjaan_istri_suami"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mb-5"></v-divider>
  </div>
  <div class="mt-5">
    <p class="text-subtitle-1 font-weight-bold mt-1 mb-5 w-100">Daftar Anak</p>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">Nama</th>
          <th class="text-center">Anak Ke</th>
          <th class="text-center">TTL</th>
          <th class="text-center">Kerja/Sekolah</th>
          <th class="text-center">Status Nikah</th>
        </tr>
      </thead>
      <tbody v-if="value.listAnak.length">
        <tr v-for="item in props.value.listAnak" :key="item.id">
          <td>{{ item.nama }}</td>
          <td>{{ item.anak_ke }}</td>
          <td>{{ item.tempat_lahir }}/{{ item.tanggal_lahir }}</td>
          <td>{{ item.status_status }}</td>
          <td>{{ item.status_nikah }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center">-</td>
          <td class="text-center">-</td>
          <td class="text-center">-</td>
          <td class="text-center">-</td>
          <td class="text-center">-</td>
        </tr>
      </tbody>
    </v-table>
    <v-divider class="my-5"></v-divider>
  </div>
</template>
