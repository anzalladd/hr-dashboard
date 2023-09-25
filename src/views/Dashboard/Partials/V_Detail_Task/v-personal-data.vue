<script setup>
const props = defineProps(['value'])

const getPhoto = (photo) => {
  return (photo === '-' || photo === '') ? new URL('@/assets/default_image.jpg', import.meta.url).href : photo
}

</script>
<template>
  <div class="mt-5">
    <p class="text-subtitle-1 font-weight-bold mt-1 mb-5 w-100">Foto Karyawan</p>
    <v-img
      contain
      aspect-ratio="1"
      width="200"
      height="200"
      :src="getPhoto(props.value.foto)"
    ></v-img>
    <v-divider class="mb-5"></v-divider>
  </div>
  <div class="mt-5">
    <p class="text-subtitle-1 font-weight-bold mt-1 mb-5 w-100">Data Diri</p>
    <v-row>
      <v-col sm="12" md="6">
        <v-text-field
          label="Nama Lengkap"
          color="primary"
          readonly
          :model-value="props.value.nama_lengkap"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="6">
        <v-text-field
          label="No KTP"
          color="primary"
          readonly
          :model-value="props.value.no_ktp"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="4">
        <v-text-field
          label="Tempat Lahir"
          color="primary"
          readonly
          :model-value="props.value.tempat_lahir"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="4">
        <v-text-field
          label="Tanggal Lahir"
          color="primary"
          readonly
          :model-value="props.value.tanggal_lahir"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="4">
        <v-text-field
          label="Gol. Darah"
          color="primary"
          readonly
          :model-value="props.value.gol_darah"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6">
        <v-text-field
          label="Agama"
          color="primary"
          readonly
          :model-value="props.value.agama"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="6">
        <v-text-field
          label="Jenis Kelamin"
          color="primary"
          readonly
          :model-value="props.value.jenis_kelamin"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mb-5"></v-divider>
  </div>
  <div class="mt-5">
    <p class="text-subtitle-1 font-weight-bold mt-1 mb-5 w-100">Alamat</p>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.no_rumah"
          label="No Rumah"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.rt"
          label="RT"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.rw"
          label="RW"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.desa"
          label="Desa"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.kec"
          label="Kecamatan"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="props.value.kab"
          label="Kab/Kota"
          color="primary"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mb-5"></v-divider>
  </div>
  <div class="mt-5">
    <p class="text-subtitle-1 font-weight-bold mt-1 mb-5 w-100">Contact</p>
    <v-row>
      <v-col cols="12" sm="12">
        <v-text-field
          :model-value="props.value.telpon"
          label="No Telp"
          outlined
          readonly
          dense
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          :model-value="props.value.no_telpon_darurat"
          label="No Telp (darurat)"
          outlined
          readonly
          dense
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          :model-value="props.value.hubungan_telp_darurat"
          label="Hubungan Contact Darurat"
          outlined
          readonly
          dense
          filled
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
