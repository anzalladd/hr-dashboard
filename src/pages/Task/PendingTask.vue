<template>
  <div>
    <v-breadcrumbs
      class="breadcrumbsmain fontall"
      :items="itemsbr"
      large
      color="black"
      style="font-weight: bold"
      ><template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template></v-breadcrumbs
    >

    <v-data-table
      :headers="headers"
      :items="dataobject"
      :search="search"
      class="rounded elevation-6 mx-3 pa-1 fontall"
    >
      <template v-slot:item.status="{ item }">
        <v-chip label :color="getColorStatus(item.status)" dark>
          <v-icon medium class="mr-1" color="white">
            {{ getIconStatusAdmin(item.status) }}
          </v-icon>
          {{ getStatus(item.status) }}
        </v-chip>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search here..."
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- <v-btn dark class="mb-2" @click="showAddModal()" color="green">
            <v-icon small>mdi-plus</v-icon> Add Item
          </v-btn> -->
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title class="headermodalstyle mb-0">
                Detail Pending Task
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="fontall">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <div>
                        <h5>Judul Pengajuan</h5>
                        <h3 class="ml-2">
                          {{ defaultItem.judul }}
                        </h3>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <div>
                        <h5>Pembuat</h5>
                        <h3 class="ml-2">{{ defaultItem.nama_user_pembuat }}</h3>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <div>
                        <h5>Tanggal</h5>
                        <h3 class="ml-2">
                          {{ gettanggal(defaultItem.created_at) }}
                        </h3>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <div>
                        <h5>Judul Menu</h5>
                        <h3 class="ml-2">{{ defaultItem.judul }}</h3>
                      </div>
                    </v-col>
                  </v-row> -->
                  <v-row>
                    <h5 class="ml-3">Isi Pengajuan</h5>
                    <v-card class="ml-4" color="#9CACA3" width="700px">
                      <v-card-text class="fontall pa-1">
                        <v-container class="pa-1">
                          <v-simple-table
                            v-if='defaultItem.menu_code == 9'
                            class="rounded elevation-1 mx-4 pa-1 my-3"
                          >
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <th class="text-left" style="width: 250px !important;font-size: 14px;">
                                    Nama Rekrutmen
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.nama_recruitment }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Department
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.dept_nama }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Jabatan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.jabatan }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Penempatan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.lokasi_penempatan }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Jumlah
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.jumlah_kebutuhan }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Tanggal Pemenuhan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{  gettanggal(detailTask.target_tanggal_pemenuhan) }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Dokumen Pendukung
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ getdokname(detailTask.dok) }}
                                    <v-btn dark small class="mb-2 ml-5 mt-2" @click="downloadFile(detailTask.dok)" color="#25695c">
                                      <v-icon small>mdi-download-circle-outline</v-icon> Download File
                                    </v-btn>
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Schedule
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    <v-simple-table>
                                      <template v-slot:default>
                                        <thead>
                                          <tr>
                                            <th class="text-left">
                                              Jadwal
                                            </th>
                                            <th class="text-left">
                                              Tanggal
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr
                                            v-for="item in detailTask.GetSchedule" :key="item.id"
                                          >
                                            <td>{{ item.nama_schedule }}</td>
                                            <td>{{ gettanggal(item.tanggal_schedule) }}</td>
                                          </tr>
                                        </tbody>
                                      </template>
                                    </v-simple-table>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                          <v-simple-table
                            v-if='defaultItem.menu_code == 16'
                            class="rounded elevation-1 mx-4 pa-1 my-3"
                          >
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <th class="text-left" style="width: 250px !important;font-size: 14px;">
                                    Karyawan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.nama_lengkap }}  ({{ detailTask.no_induk_karyawan }})
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Jenis Cuti
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.nama_cuti }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Lama Waktu
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.lama_cuti }} hari  (Mulai tanggal {{ gettanggal(detailTask.tgl_mulai_cuti) }}  )
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Keterangan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.keterangan }}
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                          <v-simple-table
                            v-if='defaultItem.menu_code == 17'
                            class="rounded elevation-1 mx-4 pa-1 my-3"
                          >
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <th class="text-left" style="width: 250px !important;font-size: 14px;">
                                    Karyawan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.nama_lengkap }}  ({{ detailTask.no_induk_karyawan }})
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Tanggal Lembur
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{gettanggal(detailTask.tanggal) }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Lama Waktu Lembur
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.waktu_awal_lembur }}  -  {{ detailTask.waktu_akhir_lembur }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Keterangan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.keterangan_lembur }}
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                          <v-simple-table
                            v-if='defaultItem.menu_code == 18'
                            class="rounded elevation-1 mx-4 pa-1 my-3"
                          >
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <th class="text-left" style="width: 250px !important;font-size: 14px;">
                                    Nama Training
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.nama_training }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Pelatih Training
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{detailTask.nama_pelatih }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Status Pelatih Training
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{detailTask.status_pelatih }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Tanggal Pelaksanaan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.tanggal_pelaksanaan }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Tempat Pelaksanaan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.tempat_pelaksanaan }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Target Peserta
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.target_peserta }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Target Jumlah Peserta
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.jumlah_peserta }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Perkiraan Budget
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ getRupiah(detailTask.budget) }}
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                          <v-simple-table
                            v-if='defaultItem.menu_code == 23 || defaultItem.menu_code == 25 || defaultItem.menu_code == 27 || defaultItem.menu_code == 29'
                            class="rounded elevation-1 mx-4 pa-1 my-3"
                          >
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <th class="text-left" style="width: 200px !important;font-size: 14px;">
                                    Karyawan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.nama_lengkap }}  ({{ detailTask.no_induk_karyawan }})
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Jabatan Lama
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{detailTask.nama_divisi_lama }} - {{detailTask.nama_dept_lama }} - {{detailTask.jabatan_lama }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Jabatan Baru
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{detailTask.nama_divisi_baru }} - {{detailTask.nama_dept_baru }} - {{detailTask.jabatan_baru }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Tanggal Ditetapkan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ gettanggal(detailTask.tanggal_ditetapkan) }} 
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Tanggal Mulai
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ gettanggal(detailTask.tanggal_mulai) }} 
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Dokumen Pendukung
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ getdokname(detailTask.dok_1) }}
                                    <v-btn dark small class="mb-2 ml-5 mt-2" @click="downloadFile(detailTask.dok_1)" color="#25695c">
                                      <v-icon small>mdi-download-circle-outline</v-icon> Download File
                                    </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                          <v-simple-table
                            v-if='defaultItem.menu_code == 22 || defaultItem.menu_code == 24 || defaultItem.menu_code == 26'
                            class="rounded elevation-1 mx-4 pa-1 my-3"
                          >
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <th class="text-left" style="width: 225px !important;font-size: 14px;">
                                    Karyawan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.nama_lengkap }}  ({{ detailTask.no_induk_karyawan }})
                                  </td>
                                </tr>
                                <tr v-if='defaultItem.menu_code == 22'>
                                  <th class="text-left" style="font-size: 14px">
                                    Status Kontrak Lama
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{detailTask.nama_status_karyawan_lama }}
                                  </td>
                                </tr>
                                <tr v-if='defaultItem.menu_code == 22'>
                                  <th class="text-left" style="font-size: 14px">
                                    Status Kontrak Baru
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{detailTask.nama_status_karyawan_baru }}
                                  </td>
                                </tr>
                                <tr  v-if='defaultItem.menu_code == 24'>
                                  <th class="text-left" style="font-size: 14px">
                                    Status Karyawan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.status_karyawan_sekarang }} 
                                  </td>
                                </tr>
                                <tr  v-if='defaultItem.menu_code == 24'>
                                  <th class="text-left" style="font-size: 14px">
                                    Tanggal Kontrak Lama Berakhir
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ gettanggal(detailTask.tanggal_kontrak_lama) }} 
                                  </td>
                                </tr>
                                <tr  v-if='defaultItem.menu_code == 24'>
                                  <th class="text-left" style="font-size: 14px">
                                    Tanggal Kontrak Baru
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ gettanggal(detailTask.tanggal_kontrak_baru) }} 
                                  </td>
                                </tr>
                                <tr  v-if='defaultItem.menu_code == 26'>
                                  <th class="text-left" style="font-size: 14px">
                                    Tanggal Terminasi
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ gettanggal(detailTask.tanggal_terminasi) }} 
                                  </td>
                                </tr>
                                <tr  v-if='defaultItem.menu_code == 26'>
                                  <th class="text-left" style="font-size: 14px">
                                    Alasan Terminasi
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.alasan_terminasi }} 
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Dokumen Pendukung
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ getdokname(detailTask.dok_1) }}
                                    <v-btn dark small class="mb-2 ml-5 mt-2" @click="downloadFile(detailTask.dok_1)" color="#25695c">
                                      <v-icon small>mdi-download-circle-outline</v-icon> Download File
                                    </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                          
                          <v-simple-table
                            v-if='defaultItem.menu_code == 28'
                            class="rounded elevation-1 mx-4 pa-1 my-3"
                          >
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <th class="text-left" style="width: 200px !important;font-size: 14px;">
                                    Karyawan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.nama_lengkap }}  ({{ detailTask.no_induk_karyawan }})
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Departement
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{detailTask.dept_nama }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Jenis Surat
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{detailTask.jenis_surat }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Deskripsi Kesalahan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{detailTask.deskripsi }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Tanggal Surat
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ gettanggal(detailTask.tanggal) }} 
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Dokumen Pendukung
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ getdokname(detailTask.dok_1) }}
                                    <v-btn dark small class="mb-2 ml-5 mt-2" @click="downloadFile(detailTask.dok_1)" color="#25695c">
                                      <v-icon small>mdi-download-circle-outline</v-icon> Download File
                                    </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                          <v-simple-table
                            v-if='defaultItem.menu_code == 30'
                            class="rounded elevation-1 mx-4 pa-1 my-3"
                          >
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <th class="text-left" style="width: 200px !important;font-size: 14px;">
                                    Karyawan
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ detailTask.nama_lengkap }}  ({{ detailTask.no_induk_karyawan }})
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Departement
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{detailTask.dept_nama }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Gaji Lama
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ getRupiahNol(detailTask.salary_lama) }} 
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Gaji Baru
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ getRupiahNol(detailTask.salary_baru) }} 
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Dokumen Pendukung
                                  </th>
                                  <td class="text-left" style="font-size: 14px; font-weight: bold">
                                    {{ getdokname(detailTask.dok_1) }}
                                    <v-btn dark small class="mb-2 ml-5 mt-2" @click="downloadFile(detailTask.dok_1)" color="#25695c">
                                      <v-icon small>mdi-download-circle-outline</v-icon> Download File
                                    </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions v-if='defaultItem.status == 0'>
                <v-spacer></v-spacer>
                <v-btn color="success" elevation="1" outlined @click="approve">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Approve
                </v-btn>
                <v-btn color="red" elevation="1" outlined @click="reject">
                  <v-icon left> mdi-close-circle-outline </v-icon> Reject
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="detailItem(item)" color="#25695C">
          mdi-information-outline
        </v-icon>
        <!-- <v-icon @click="deleteItem(item)" color="red"> mdi-delete </v-icon> -->
      </template>
    </v-data-table>

    <v-snackbar
      v-model="snackbar"
      :color="colorsnackbar"
      :timeout="timeoutsnackbar"
    >
      {{ textsnackbar }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PendingTask",
  data: () => ({
    itemsbr: [
      {
        text: "Task",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Pending Task",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "Nama Menu", value: "nama_menu", align: "center" },
      { text: "Nama Task", value: "judul", align: "center" },
      { text: "Pembuat", value: "name", align: "center" },
      { text: "Status", value: "status", align: "center" },
      //   { text: "User ID", value: "username" },
      {
        text: "Actions",
        value: "actions",
        align: "center",
        sortable: false,
        width: "15%",
      },
    ],
    headersProduct: [
      { text: "Product", value: "nama_product" },
      { text: "Harga", value: "harga" },
      { text: "Jumlah", value: "jumlah" },
      { text: "Keterangan", value: "deskripsi" },
    ],
    dataobject: [],

    defaultItem: {
      id: "",
      nama_menu: "",
      menu_code: "",
      nama_user_pembuat: "",
      judul: "",
      created_at: "",
      status: "",
      gambar: "",
    },

    detailTask: {
      judul: "",
      isi: "",
      kategori: "",
      tanggal: "",

      id: "",
      atd_overtime_id: "",
      keterangan_lembur: "",
      nama_lengkap: "",
      no_induk_karyawan: "",
      status: "",
      tanggal: "",
      waktu_akhir_lembur: "",
      waktu_awal_lembur: "",

      atd_permit_id: "",
      id_jenis_cuti: "",
      keterangan: "",
      nama_cuti: "",
      nama_cuti_jenis: "",
      nama_lengkap: "",
      no_induk_karyawan: "",
      status: "",
      tgl_akhir_cuti: "",
      tgl_mulai_cuti: "",

      budget: '',
      desc_training: "",
      id_training: "",
      jumlah_peserta: "",
      nama_pelatih: "",
      nama_training: "",
      status_approval: "",
      status_pelatih: "",
      tanggal_pelaksanaan: "",
      target_peserta: "",
      tempat_pelaksanaan: "",
      unit: "",
    },

    // itemsStatus: [
    //   { text: "Reseller", value: "1" },
    //   { text: "Cust Reguler", value: "0" },
    // ],
    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",
  }),

  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.user_id;
    }
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetPendingTask", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.dataobject = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.dataobject = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.dataobject = [];
        }
      }
    },

    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetDetailPendingTask/" + this.defaultItem.id,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = response.data.data.result.GetDetailPendingTask;
          this.detailTask = response.data.data.result.GetDetailTask;

          if(response.data.data.result.GetDetailPendingTask.menu_code == 5){            
            localStorage.setItem("idTaskDetail", this.defaultItem.id);
            this.$router.push("/PTEmpDetail");
          }
        } else {
          console.log("Kosong");
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },

    async approveTask() {
      const datapost = {
        id: this.defaultItem.id,
        status: this.defaultItem.status,
        admin_id: this.admin_id,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "ApproveTask",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        // console.log(response.data.data.result);
        this.dialog = false;
        this.snackbar = true;
        this.colorsnackbar = "green";
        this.textsnackbar = "Sukses Approve data";
        this.initialize();
        // if (response.data.data.result == "success") {
        //   this.dialog = false;
        //   this.snackbar = true;
        //   this.colorsnackbar = "green";
        //   this.textsnackbar = "Sukses tambah data";
        //   this.initialize();
        // } else {
        //   //   this.dialog = false;
        //   this.snackbar = true;
        //   this.colorsnackbar = "red";
        //   this.textsnackbar = "Gagal ubah data";
        // }
      } catch (error) {
        console.error(error.response);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal ubah data";
        }
      }
    },
     
    async downloadFileApi(val){
      // var imagesvalue = 'public/uploads/1656286341_login_tokomas.PNG';
      var imagesvalue = val;
      try {
        const response = await axios.get(this.BaseUrlGet + "downloadfile?path_file="+imagesvalue, {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
          responseType: 'blob',
        });
        console.log(response.data);
        if (response.data.length != 0) {
          const myArray = imagesvalue.split(".");

          var flagMenu = '';
          if(this.detailTask.flag_menu){
            flagMenu = this.detailTask.flag_menu;
          }
          if(this.detailTask.jenis_surat){
            flagMenu = this.detailTask.jenis_surat;
          }
          var nama_lengkap = '';
          if(this.detailTask.nama_lengkap){
            nama_lengkap = this.detailTask.nama_lengkap;
          }
          var judulDownload = '';
          if(this.defaultItem.judul){
            judulDownload = this.defaultItem.judul;
          }

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Dokumen "+judulDownload+" "+this.getdokname(imagesvalue)+"." + myArray[1]); 
          document.body.appendChild(link);
          link.click();
        } else {
          console.log("Kosong");
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
        }
      }
    },



    downloadFile(val){
      this.downloadFileApi(val);
    },

    detailItem(item) {
      console.log(item);
      this.defaultItem = Object.assign({}, item);
      this.getDetail();
      this.dialog = true;
    },
    deleteItem(item) {
      this.defaultItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.closeDelete();
      this.verifDelete();
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    approve() {
      console.log("approve");
      this.defaultItem.status = 1;
      this.approveTask();
    },
    reject() {
      console.log("reject");
      this.defaultItem.status = 2;
      this.approveTask();
    },
    getStatus(status) {
      if (status == "0") return "Menunggu";
      else if (status == "1") return "Disetujui";
      else return "Ditolak";
    },
    getColorStatus(status) {
      if (status == "0") return "#BF9168";
      else if (status == "1") return "#25695C";
      else return "#D42F2F";
    },
    getIconStatusAdmin(status) {
      if (status == "0") return "mdi-update";
      else if (status == "1")
        return "mdi-checkbox-marked-circle-outline";
      else return "mdi-close-circle-outline";
    },
    getRupiahNol(val) {
      var bilangan = val;

      if (bilangan) {
        var number_string = bilangan.toString(),
          sisa = number_string.length % 3,
          rupiah = number_string.substr(0, sisa),
          ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
          var separator = sisa ? "." : "";
          rupiah += separator + ribuan.join(".");
        }

        return "Rp. " + rupiah;
      }else{
        return bilangan;
      }
    },
    getRupiah(val) {
      var bilangan = val;

      if (bilangan) {
        var number_string = bilangan.toString(),
          sisa = number_string.length % 3,
          rupiah = number_string.substr(0, sisa),
          ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
          var separator = sisa ? "." : "";
          rupiah += separator + ribuan.join(".");
        }

        return "Rp. " + rupiah;
      }
    },
    gettanggal(val) {
      var bulanIndo = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Juni",
        "Juli",
        "Agust",
        "Sept",
        "Okt",
        "Nov",
        "Des",
      ];

      var date = val.split(" ")[0];

      var tanggal = date.split("-")[2];
      var bulan = date.split("-")[1];
      var tahun = date.split("-")[0];

      return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
    },
    getdokname(val){
      if(val){
        const myArray = val.split("/");
        return myArray[2];
      }else{
        return '-'
      }
    },
  },
};
</script>

