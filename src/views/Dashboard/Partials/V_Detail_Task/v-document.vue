<script setup>
const props = defineProps(['value'])
</script>
<template>
  <div class="mt-5">
    <p class="text-subtitle-1 font-weight-bold mt-1 mb-5 w-100">Informasi Document</p>
    <v-row>
      <v-col sm="12" md="12">
        <v-text-field
          label="No Jamsotek"
          color="primary"
          readonly
          :model-value="props.value.nomor_jamsostek"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="4">
        <v-text-field
          label="No Bpjs"
          color="primary"
          readonly
          :model-value="props.value.bpjs_kesehatan"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="4">
        <v-text-field
          label="No Rekening"
          color="primary"
          readonly
          :model-value="props.value.no_rek"
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="4">
        <v-text-field
          label="No Npwp"
          color="primary"
          readonly
          :model-value="props.value.no_npwp"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mb-5"></v-divider>
  </div>
</template>
