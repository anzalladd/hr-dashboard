<script setup>
const props = defineProps(['status'])
const getIconStatusAdmin = (status) => {
  if (status === 0) return 'mdi-update'
  else if (status === 1) return 'mdi-checkbox-marked-circle-outline'
  else return 'mdi-close-circle-outline'
}
const getStatus = (status) => {
  if (status === 0) return 'Menunggu'
  else if (status === 1) return 'Disetujui'
  else return 'Ditolak'
}
const getColorStatus = (status) => {
  if (status === 0) return 'blue'
  else if (status === 1) return 'secondary'
  else return 'red-darken-4'
}
</script>

<template>
  <v-chip label :color="getColorStatus(props.status)" class="text-caption">
    <v-icon medium class="mr-1" color="black">
      {{ getIconStatusAdmin(props.status) }}
    </v-icon>
    <p class="font-weight-bold text-black">
      {{ getStatus(props.status) }}
    </p>
  </v-chip>
</template>
