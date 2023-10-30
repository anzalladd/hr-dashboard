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
    <v-card class="pr-2 mx-2 mb-5">
      <v-card-text class="fontall pa-1">
                <v-container class="pa-1">
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
                </v-container>
      </v-card-text>
    </v-card>
    <v-card class="pr-2 mx-2">
      <v-row v-if='detailEmpOldValue.no_induk_karyawan != ""'>
        <v-col class="mx-0" cols="12" sm="6" md="6">
          <v-row class="mb-3 mt-2 ml-1">
            <v-divider class="mx-2 mt-3"></v-divider>
            <h4>Data Lama</h4>
            <v-divider class="ml-2 mr-4 mt-3"></v-divider>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              align="center"
              justify="center"
              class="px-5 pt-3 pb-0 d-md-none"
            >
              <v-select
                :items="itemstabs"
                label="Pilih Tabs"
                item-value="value"
                item-text="text"
                v-on:change="selectedTabsold"
                solo
              ></v-select>
            </v-col>
            <v-tabs class="d-none d-md-block mt-3 ml-3 mr-3 mb-5">
              <v-tab @click="tabsdetailold(1)">Personal Data</v-tab>
              <v-tab @click="tabsdetailold(2)">Family Data</v-tab>
              <v-tab @click="tabsdetailold(3)">Work Data</v-tab>
              <v-tab @click="tabsdetailold(4)">Document</v-tab>
            </v-tabs>
          </v-row>
          <v-card class="fontall mx-1 my-2" elevation="5">
            <v-card-text v-if="personaldataOld == true">
              <!-- <div>Personal Data</div> -->
              <v-row class="mb-3 mt-2 ml-1">
                <h4>Foto Karyawan</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-img
                    class="mx-2 my-2 pt-1"
                    contain
                    center
                    max-height="250"
                    v-bind:src="detailEmpOldValue.foto"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row class="mb-3 mt-2 ml-1">
                <h4>Data Diri</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.nama_lengkap"
                    label="Nama Lengkap"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.no_ktp"
                    label="No Ktp"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.tempat_lahir"
                    label="Tempat Lahir"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.tanggal_lahir"
                    label="Tanggal Lahir"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.gol_darah"
                    label="Gol Darah"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.agama"
                    label="Agama"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.jenis_kelamin"
                    label="Jenis Kelamin"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Alamat</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.no_rumah"
                    label="No Rumah"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.rt"
                    label="RT"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.rw"
                    label="RW"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.desa"
                    label="Desa"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.kec"
                    label="Kecamatan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.kab"
                    label="Kab/Kota"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Contact</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="detailEmpOldValue.telpon"
                    label="No Telp"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.no_telpon_darurat"
                    label="No Telp (darurat)"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.hubungan_telp_darurat"
                    label="Hubungan Contact Darurat"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="familydataOld == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Keluarga</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="detailEmpOldValue.nama_ortu"
                    label="Orang Tua"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.status_nikah"
                    label="Status Nikah"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.nama_istri_suami"
                    label="Istri/Suami"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.pekerjaan_istri_suami"
                    label="Pekerjaan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Daftar Anak</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Nama</th>
                          <th class="text-left">Anak Ke</th>
                          <th class="text-left">TTL</th>
                          <th class="text-left">Kerja/Sekolah</th>
                          <th class="text-left">Status Nikah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in itemlistanak_old" :key="item.id">
                          <td>{{ item.nama }}</td>
                          <td>{{ item.anak_ke }}</td>
                          <td>
                            {{ item.tempat_lahir }}/{{ item.tanggal_lahir }}
                          </td>
                          <td>{{ item.status_status }}</td>
                          <td>{{ item.status_nikah }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="workdataOld == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Pekerjaan Sekarang</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.pendidikan_terakhir"
                    label="Pendidikan Terakhir"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.mulai_masuk_kerja"
                    label="Mulai Masuk Kerja"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.bagian"
                    label="Bagian"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.ditetapkan"
                    label="Ditetapkan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.no_anggota_koperasi"
                    label="No Koperasi"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.status_karyawan_nama"
                    label="Status"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col v-if="detailEmpOldValue.status_karyawan!=1" cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.tanggal_kontrak"
                    label="Tanggal Kontrak Selesai"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field v-if="showGaji == true"
                    v-model="detailEmpOldValue.gaji_sekarang"
                    label="Gaji"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpOldValue.sisa_cuti"
                    label="Sisa Cuti"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Riwayat Kerja</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Unit Perusahaan</th>
                          <th class="text-left">Tanggal</th>
                          <th class="text-left">Jabatan</th>
                          <th class="text-left">Alasan Kepindahan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in itemlistriwayatkerja_old" :key="item.id">
                          <td>{{ item.unit_perusahaan }}</td>
                          <td>{{ item.tgl }}</td>
                          <td>{{ item.jabatan }}</td>
                          <td>{{ item.alasan_kepindahan }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Pengalaman Kerja</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Perusahaan</th>
                          <th class="text-left">Jabatan</th>
                          <th class="text-left">Alasan Pindah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in itemlistpengalamankerja_old"
                          :key="item.id"
                        >
                          <td>{{ item.perusahaan }}</td>
                          <td>{{ item.jabatan }}</td>
                          <td>{{ item.alasan_kepindahan }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="documentdataOld == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Informasi Dokumen</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.nomor_jamsostek"
                    label="No Jamsostek"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.bpjs_kesehatan"
                    label="No Bpjs"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.no_rek"
                    label="No Rekening"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpOldValue.no_npwp"
                    label="No Npwp"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="mx-0" cols="12" sm="6" md="6">
          <v-row class="mb-3 mt-2 ml-1">
            <v-divider class="mx-2 mt-3"></v-divider>
            <h4>Data Baru/Perubahan</h4>
            <v-divider class="ml-4 mr-2 mt-3"></v-divider>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              align="center"
              justify="center"
              class="px-5 pt-3 pb-0 d-md-none"
            >
              <v-select
                :items="itemstabs"
                label="Pilih Tabs"
                item-value="value"
                item-text="text"
                v-on:change="selectedTabsnew"
                solo
              ></v-select>
            </v-col>
            <v-tabs class="d-none d-md-block mt-3 ml-3 mr-3 mb-5">
              <v-tab @click="tabsdetailnew(1)">Personal Data</v-tab>
              <v-tab @click="tabsdetailnew(2)">Family Data</v-tab>
              <v-tab @click="tabsdetailnew(3)">Work Data</v-tab>
              <v-tab @click="tabsdetailnew(4)">Document</v-tab>
            </v-tabs>
          </v-row>
          <v-card class="fontall mx-1 my-2" elevation="5">
            <v-card-text v-if="personaldataNew == true">
              <!-- <div>Personal Data</div> -->
              <v-row class="mb-3 mt-2 ml-1">
                <h4>Foto Karyawan</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-img
                    class="mx-2 my-2 pt-1"
                    contain
                    center
                    max-height="250"
                    v-bind:src="detailEmpNewValue.foto"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row class="mb-3 mt-2 ml-1">
                <h4>Data Diri</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.nama_lengkap"
                    label="Nama Lengkap"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.no_ktp"
                    label="No Ktp"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.tempat_lahir"
                    label="Tempat Lahir"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.tanggal_lahir"
                    label="Tanggal Lahir"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.gol_darah"
                    label="Gol Darah"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.agama"
                    label="Agama"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.jenis_kelamin"
                    label="Jenis Kelamin"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Alamat</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.no_rumah"
                    label="No Rumah"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.rt"
                    label="RT"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.rw"
                    label="RW"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.desa"
                    label="Desa"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.kec"
                    label="Kecamatan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.kab"
                    label="Kab/Kota"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Contact</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="detailEmpNewValue.telpon"
                    label="No Telp"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.no_telpon_darurat"
                    label="No Telp (darurat)"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.hubungan_telp_darurat"
                    label="Hubungan Contact Darurat"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="familydataNew == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Keluarga</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="detailEmpNewValue.nama_ortu"
                    label="Orang Tua"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.status_nikah"
                    label="Status Nikah"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.nama_istri_suami"
                    label="Istri/Suami"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.pekerjaan_istri_suami"
                    label="Pekerjaan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Daftar Anak</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Nama</th>
                          <th class="text-left">Anak Ke</th>
                          <th class="text-left">TTL</th>
                          <th class="text-left">Kerja/Sekolah</th>
                          <th class="text-left">Status Nikah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in itemlistanak_new" :key="item.id">
                          <td>{{ item.nama }}</td>
                          <td>{{ item.anak_ke }}</td>
                          <td>
                            {{ item.tempat_lahir }}/{{ item.tanggal_lahir }}
                          </td>
                          <td>{{ item.status_status }}</td>
                          <td>{{ item.status_nikah }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="workdataNew == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Pekerjaan Sekarang</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.pendidikan_terakhir"
                    label="Pendidikan Terakhir"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.mulai_masuk_kerja"
                    label="Mulai Masuk Kerja"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.bagian"
                    label="Bagian"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.ditetapkan"
                    label="Ditetapkan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.no_anggota_koperasi"
                    label="No Koperasi"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.status_karyawan_nama"
                    label="Status"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col v-if="detailEmpNewValue.status_karyawan!=1" cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.tanggal_kontrak"
                    label="Tanggal Kontrak Selesai"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field v-if="showGaji == true"
                    v-model="detailEmpNewValue.gaji_sekarang"
                    label="Gaji"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.sisa_cuti"
                    label="Sisa Cuti"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Riwayat Kerja</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Unit Perusahaan</th>
                          <th class="text-left">Tanggal</th>
                          <th class="text-left">Jabatan</th>
                          <th class="text-left">Alasan Kepindahan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in itemlistriwayatkerja_new" :key="item.id">
                          <td>{{ item.unit_perusahaan }}</td>
                          <td>{{ item.tgl }}</td>
                          <td>{{ item.jabatan }}</td>
                          <td>{{ item.alasan_kepindahan }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Pengalaman Kerja</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Perusahaan</th>
                          <th class="text-left">Jabatan</th>
                          <th class="text-left">Alasan Pindah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in itemlistpengalamankerja_new"
                          :key="item.id"
                        >
                          <td>{{ item.perusahaan }}</td>
                          <td>{{ item.jabatan }}</td>
                          <td>{{ item.alasan_kepindahan }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="documentdataNew == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Informasi Dokumen</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.nomor_jamsostek"
                    label="No Jamsostek"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.bpjs_kesehatan"
                    label="No Bpjs"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.no_rek"
                    label="No Rekening"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.no_npwp"
                    label="No Npwp"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if='detailEmpOldValue.no_induk_karyawan == ""'>        
        <v-col class="mx-0" cols="12" sm="12" md="12">
          <v-row class="mb-3 mt-2 ml-1">
            <v-divider class="mx-2 mt-3"></v-divider>
            <h4>Data Karyawan Baru</h4>
            <v-divider class="ml-4 mr-2 mt-3"></v-divider>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              align="center"
              justify="center"
              class="px-5 pt-3 pb-0 d-md-none"
            >
              <v-select
                :items="itemstabs"
                label="Pilih Tabs"
                item-value="value"
                item-text="text"
                v-on:change="selectedTabsnew"
                solo
              ></v-select>
            </v-col>
            <v-tabs class="d-none d-md-block mt-3 ml-3 mr-3 mb-5">
              <v-tab @click="tabsdetailnew(1)">Personal Data</v-tab>
              <v-tab @click="tabsdetailnew(2)">Family Data</v-tab>
              <v-tab @click="tabsdetailnew(3)">Work Data</v-tab>
              <v-tab @click="tabsdetailnew(4)">Document</v-tab>
            </v-tabs>
          </v-row>
          <v-card class="fontall mx-1 my-2" elevation="5">
            <v-card-text v-if="personaldataNew == true">
              <!-- <div>Personal Data</div> -->
              <v-row class="mb-3 mt-2 ml-1">
                <h4>Foto Karyawan</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-img
                    class="mx-2 my-2 pt-1"
                    contain
                    center
                    max-height="250"
                    v-bind:src="detailEmpNewValue.foto"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row class="mb-3 mt-2 ml-1">
                <h4>Data Diri</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.nama_lengkap"
                    label="Nama Lengkap"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.no_ktp"
                    label="No Ktp"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.tempat_lahir"
                    label="Tempat Lahir"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.tanggal_lahir"
                    label="Tanggal Lahir"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.gol_darah"
                    label="Gol Darah"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.agama"
                    label="Agama"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.jenis_kelamin"
                    label="Jenis Kelamin"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Alamat</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.no_rumah"
                    label="No Rumah"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.rt"
                    label="RT"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.rw"
                    label="RW"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.desa"
                    label="Desa"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.kec"
                    label="Kecamatan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.kab"
                    label="Kab/Kota"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Contact</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="detailEmpNewValue.telpon"
                    label="No Telp"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.no_telpon_darurat"
                    label="No Telp (darurat)"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.hubungan_telp_darurat"
                    label="Hubungan Contact Darurat"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="familydataNew == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Keluarga</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="detailEmpNewValue.nama_ortu"
                    label="Orang Tua"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.status_nikah"
                    label="Status Nikah"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.nama_istri_suami"
                    label="Istri/Suami"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.pekerjaan_istri_suami"
                    label="Pekerjaan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Daftar Anak</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Nama</th>
                          <th class="text-left">Anak Ke</th>
                          <th class="text-left">TTL</th>
                          <th class="text-left">Kerja/Sekolah</th>
                          <th class="text-left">Status Nikah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in itemlistanak_new" :key="item.id">
                          <td>{{ item.nama }}</td>
                          <td>{{ item.anak_ke }}</td>
                          <td>
                            {{ item.tempat_lahir }}/{{ item.tanggal_lahir }}
                          </td>
                          <td>{{ item.status_status }}</td>
                          <td>{{ item.status_nikah }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="workdataNew == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Pekerjaan Sekarang</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.pendidikan_terakhir"
                    label="Pendidikan Terakhir"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.mulai_masuk_kerja"
                    label="Mulai Masuk Kerja"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.bagian"
                    label="Bagian"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.ditetapkan"
                    label="Ditetapkan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.no_anggota_koperasi"
                    label="No Koperasi"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.status_karyawan_nama"
                    label="Status"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col v-if="detailEmpNewValue.status_karyawan!=1" cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.tanggal_kontrak"
                    label="Tanggal Kontrak Selesai"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field v-if="showGaji == true"
                    v-model="detailEmpNewValue.gaji_sekarang"
                    label="Gaji"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmpNewValue.sisa_cuti"
                    label="Sisa Cuti"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Riwayat Kerja</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Unit Perusahaan</th>
                          <th class="text-left">Tanggal</th>
                          <th class="text-left">Jabatan</th>
                          <th class="text-left">Alasan Kepindahan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in itemlistriwayatkerja_new" :key="item.id">
                          <td>{{ item.unit_perusahaan }}</td>
                          <td>{{ item.tgl }}</td>
                          <td>{{ item.jabatan }}</td>
                          <td>{{ item.alasan_kepindahan }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Pengalaman Kerja</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Perusahaan</th>
                          <th class="text-left">Jabatan</th>
                          <th class="text-left">Alasan Pindah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in itemlistpengalamankerja_new"
                          :key="item.id"
                        >
                          <td>{{ item.perusahaan }}</td>
                          <td>{{ item.jabatan }}</td>
                          <td>{{ item.alasan_kepindahan }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="documentdataNew == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Informasi Dokumen</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.nomor_jamsostek"
                    label="No Jamsostek"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.bpjs_kesehatan"
                    label="No Bpjs"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.no_rek"
                    label="No Rekening"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmpNewValue.no_npwp"
                    label="No Npwp"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="pr-2 mx-2 my-5">
      <v-card-actions >
          <v-btn color="red" elevation="1" outlined @click="back">
                  <v-icon left> mdi-arrow-left-circle </v-icon>
                  Kembali
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if='defaultItem.status == 0' color="success" elevation="1" outlined @click="approve">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Approve
          </v-btn>
          <v-btn v-if='defaultItem.status == 0' color="red" elevation="1" outlined @click="reject">
                  <v-icon left> mdi-close-circle-outline </v-icon> Reject
            </v-btn>
      </v-card-actions>
    </v-card>

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
  name: "PendingTaskEmployeeDetail",
  data: () => ({
    itemsbr: [
      {
        text: "Task",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Pending Task Detail",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    personaldataOld: true,
    familydataOld: false,
    workdataOld: false,
    documentdataOld: false,
    statusdataOld: false,
    personaldataNew: true,
    familydataNew: false,
    workdataNew: false,
    documentdataNew: false,
    statusdataNew: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",

    detailEmpOldValue: {
      id: "",
      foto: "",
      no_induk_karyawan: "",
      no_ktp: "",
      nama_lengkap: "",
      jenis_kelamin: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      nama_ortu: "",
      agama: "",
      unit_perusahan: "",
      pangkat: "",
      jabatan: "",
      divisi: "",
      departement: "",
      rt: "",
      rw: "",
      no_rumah: "",
      desa: "",
      kec: "",
      kab: "",
      status_nikah: "",
      nama_istri_suami: "",
      pekerjaan_istri_suami: "",
      bin_binti: "",
      gol_darah: "",
      status_karyawan: "",
      telpon: "",
      no_telpon_darurat: "",
      hubungan_telp_darurat:"",
      mulai_masuk_kerja: "",
      bagian: "",
      ditetapkan: "",
      nomor_jamsostek: "",
      scan_kartu_jamsostek: "",
      bpjs_kesehatan: "",
      scan_kartu_bpjs: "",
      no_rek: "",
      no_npwp: "",
      pendidikan_terakhir: "",
      no_anggota_koperasi: "",
      gaji_sekarang: "",
      sisa_cuti: "",
    },
    detailEmpNewValue: {
      id: "",
      foto: "",
      no_induk_karyawan: "",
      no_ktp: "",
      nama_lengkap: "",
      jenis_kelamin: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      nama_ortu: "",
      agama: "",
      unit_perusahan: "",
      pangkat: "",
      jabatan: "",
      divisi: "",
      departement: "",
      rt: "",
      rw: "",
      no_rumah: "",
      desa: "",
      kec: "",
      kab: "",
      status_nikah: "",
      nama_istri_suami: "",
      pekerjaan_istri_suami: "",
      bin_binti: "",
      gol_darah: "",
      status_karyawan: "",
      telpon: "",
      no_telpon_darurat: "",
      hubungan_telp_darurat:"",
      mulai_masuk_kerja: "",
      bagian: "",
      ditetapkan: "",
      nomor_jamsostek: "",
      scan_kartu_jamsostek: "",
      bpjs_kesehatan: "",
      scan_kartu_bpjs: "",
      no_rek: "",
      no_npwp: "",
      pendidikan_terakhir: "",
      no_anggota_koperasi: "",
      gaji_sekarang: "",
      sisa_cuti: "",
    },

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

    itemlistanak_old: [
      {
        id: 1,
        nama: "indra",
        anak_ke: "1",
        tempat_lahir: "Salatiga",
        tanggal_lahir: "1990-01-01",
        status_nikah: "Sudah",
        status_status: "Bekerja",
      },
      {
        id: 2,
        nama: "dani",
        anak_ke: "2",
        tempat_lahir: "Salatiga",
        tanggal_lahir: "1994-02-02",
        status_nikah: "Belum",
        status_status: "Bekerja",
      },
      {
        id: 3,
        nama: "andra",
        anak_ke: "3",
        tempat_lahir: "Salatiga",
        tanggal_lahir: "1998-03-03",
        status_nikah: "Belum",
        status_status: "Bekerja",
      },
    ],
    itemlistanak_new: [
      {
        id: 1,
        nama: "indra",
        anak_ke: "1",
        tempat_lahir: "Salatiga",
        tanggal_lahir: "1990-01-01",
        status_nikah: "Sudah",
        status_status: "Bekerja",
      },
      {
        id: 2,
        nama: "dani",
        anak_ke: "2",
        tempat_lahir: "Salatiga",
        tanggal_lahir: "1994-02-02",
        status_nikah: "Belum",
        status_status: "Bekerja",
      },
      {
        id: 3,
        nama: "andra",
        anak_ke: "3",
        tempat_lahir: "Salatiga",
        tanggal_lahir: "1998-03-03",
        status_nikah: "Belum",
        status_status: "Bekerja",
      },
    ],

    itemlistriwayatkerja_old: [
      {
        id: 1,
        unit_perusahaan: "PR Sukun",
        tgl: "2022-01-01",
        jabatan: "Manager Keuangan",
        alasan_kepindahan: "-",
      },
      {
        id: 2,
        unit_perusahaan: "PR Sukun",
        tgl: "2021-02-02",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
    ],
    itemlistriwayatkerja_new: [
      {
        id: 1,
        unit_perusahaan: "PR Sukun",
        tgl: "2022-01-01",
        jabatan: "Manager Keuangan",
        alasan_kepindahan: "-",
      },
      {
        id: 2,
        unit_perusahaan: "PR Sukun",
        tgl: "2021-02-02",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
    ],

    itemlistpengalamankerja_old: [
      {
        id: 1,
        perusahaan: "Formulatrix",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
      {
        id: 2,
        perusahaan: "Damatex",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
      {
        id: 3,
        perusahaan: "PT SCI",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
    ],
    itemlistpengalamankerja_new: [
      {
        id: 1,
        perusahaan: "Formulatrix",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
      {
        id: 2,
        perusahaan: "Damatex",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
      {
        id: 3,
        perusahaan: "PT SCI",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
    ],

    itemlistPerpindahanJabatanPekerjaan:[],
    itemlistStatusKaryawan:[],
    itemlistKontrakKaryawan:[],
    itemlistGajiKaryawan:[],
    itemlistSPKaryawan:[],

    headerslistPerpindahanJabatanPekerjaan:[
      // { text: "Nama Karyawan", value: "nama_lengkap" },
      { text: "Jabatan Awal", value: "jabatan_lama" },
      { text: "Jabatan Baru", value: "jabatan_baru" },
      // { text: "Tgl Ditetapkan", value: "tanggal_ditetapkan" },
      { text: "Tgl Mulai Kerja", value: "tanggal_mulai" },
      { text: "Utilitas", value: "flag_menu" },
      { text: "Dokumen", value: "dok_1" },
    ],
    headerslistStatusKaryawan:[
      { text: "Status Karyawan Lama", value: "nama_status_karyawan_lama" },
      { text: "Status Karyawan Baru", value: "nama_status_karyawan_baru" },
      { text: "Tanggal dibuat", value: "created_at" },
      { text: "Utilitas", value: "flag_menu" },
      { text: "Dokumen", value: "dok_1" },
    ],
    headerslistKontrakKaryawan:[
      { text: "Status Karyawan", value: "status_karyawan_sekarang" },
      { text: "Kontrak Lama Berakhir", value: "tanggal_kontrak_lama" },
      { text: "Kontrak Baru Berakhir", value: "tanggal_kontrak_baru" },
      { text: "Utilitas", value: "flag_menu" },
      { text: "Dokumen", value: "dok_1" },
    ],
    headerslistGajiKaryawan:[
      { text: "Gaji Lama", value: "salary_lama" },
      { text: "Gaji Baru", value: "salary_baru" },
      { text: "Tanggal", value: "tanggal" },
      { text: "Dokumen", value: "dok_1" },
    ],
    headerslistSPKaryawan:[
      { text: "Tanggal Surat", value: "tanggal" },
      { text: "Jenis Surat", value: "jenis_surat" },
      { text: "Deskripsi", value: "deskripsi" },
      { text: "Dokumen", value: "dok_1" },
    ],

    itemstabs: [
      { text: "Personal Data", value: "1" },
      { text: "Family Data", value: "2" },
      { text: "Work Data", value: "3" },
      { text: "Document", value: "4" },
    ],
    itemsStatus: [
      { text: "Reseller", value: "1" },
      { text: "Cust Reguler", value: "0" },
    ],
    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",
    id_emp: "",

    showGaji: false,

    idTask : '',
    statustask:'',
  }),

  created() {
    this.idTask = localStorage.getItem("idTaskDetail");
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      // this.admin_id = this.User.code;
      this.admin_id = this.User.user_id;
      if(this.User.role_code == '1' || this.User.role_code == '99'){
        this.showGaji = true;
      }
    }
    this.getDetail();
  },

  methods: {
    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetDetailPendingTask/" + this.idTask,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = response.data.data.result.GetDetailPendingTask;
          this.detailEmpOldValue = response.data.data.result.GetDetailTask.old_value;
          this.detailEmpNewValue = response.data.data.result.GetDetailTask.new_value;
          // this.detailEmp = response.data.data.result;
          if (response.data.data.result.GetDetailTask.old_value.foto == "-") {
            this.detailEmpOldValue.foto = "/images/noimage.png";
          }else{
            this.getFotoOld(response.data.data.result.GetDetailTask.old_value.foto)
          }
          if (response.data.data.result.GetDetailTask.new_value.foto == "-") {
            this.detailEmpNewValue.foto = "/images/noimage.png";
          }else{
            this.getFotoNew(response.data.data.result.GetDetailTask.new_value.foto)
          }
          this.itemlistanak_old = response.data.data.result.GetDetailTask.old_value.listAnak;
          this.itemlistanak_new = response.data.data.result.GetDetailTask.new_value.listAnak;
          
          this.itemlistriwayatkerja_old = response.data.data.result.GetDetailTask.old_value.listRiwayatPekerjaan;
          this.itemlistriwayatkerja_new = response.data.data.result.GetDetailTask.new_value.listRiwayatPekerjaan;
          
          this.itemlistpengalamankerja_old = response.data.data.result.GetDetailTask.old_value.listPengalamanKerja;
          this.itemlistpengalamankerja_new = response.data.data.result.GetDetailTask.new_value.listPengalamanKerja;
          // this.itemlistriwayatkerja =
          //   response.data.data.result.listRiwayatPekerjaan;
          // this.itemlistpengalamankerja =
          //   response.data.data.result.listPengalamanKerja;
          //   this.detailTask = response.data.data.result.GetDetailTask;
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

     async downloadFileApi(val,item){
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
          var flag_menu = '';
          if(item.flag_menu){
            flag_menu = item.flag_menu;
          }

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Dokumen "+flag_menu+" "+this.getdokname(imagesvalue)+"." + myArray[1]); 
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

    async getFotoOld(val){
      // var imagesvalue = 'public/uploads/1656286341_login_tokomas.PNG';
      var imagesvalue = val;
      try {
        const response = await axios.get(this.BaseUrlGet + "getimages?path_file="+imagesvalue, {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        if (response.data.length != 0) {
          this.detailEmpOldValue.foto = "data:image/jpg;base64," + response.data.data.result;
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
    async getFotoNew(val){
      // var imagesvalue = 'public/uploads/1656286341_login_tokomas.PNG';
      var imagesvalue = val;
      try {
        const response = await axios.get(this.BaseUrlGet + "getimages?path_file="+imagesvalue, {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        if (response.data.length != 0) {
          this.detailEmpNewValue.foto = "data:image/jpg;base64," + response.data.data.result;
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

    async approveTask() {
      const datapost = {
        id: this.idTask,
        status: this.statustask,
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
        this.$router.push("/PendingTask");
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

    back(){
        this.$router.go(-1);
    },
    approve() {
      console.log("approve");
      this.statustask = 1;
      this.approveTask();
    },
    reject() {
      console.log("reject");
      this.statustask = 2;
      this.approveTask();
    },



    downloadFile(val,item){
      console.log(item);
      this.downloadFileApi(val,item);
    },

    tabsdetailold(val) {
      this.changeTabsold(val);
    },
    tabsdetailnew(val) {
      this.changeTabsnew(val);
    },
    selectedTabsold(val) {
      this.changeTabsold(val);
    },
    selectedTabsnew(val) {
      this.changeTabsnew(val);
    },
    
    changeTabsold(val) {
      if (val == 1) {
        this.personaldataOld = true;
        this.familydataOld = false;
        this.workdataOld = false;
        this.documentdataOld = false;
        this.statusdataOld = false;
      } else if (val == 2) {
        this.personaldataOld = false;
        this.familydataOld = true;
        this.workdataOld = false;
        this.documentdataOld = false;
        this.statusdataOld = false;
      } else if (val == 3) {
        this.personaldataOld = false;
        this.familydataOld = false;
        this.workdataOld = true;
        this.documentdataOld = false;
        this.statusdataOld = false;
      } else if (val == 4) {
        this.personaldataOld = false;
        this.familydataOld = false;
        this.workdataOld = false;
        this.documentdataOld = true;
        this.statusdataOld = false;
      }else {
        this.personaldataOld = false;
        this.familydataOld = false;
        this.workdataOld = false;
        this.documentdataOld = false;
        this.statusdataOld = true;
      }
    },
    changeTabsnew(val) {
      if (val == 1) {
        this.personaldataNew = true;
        this.familydataNew = false;
        this.workdataNew = false;
        this.documentdataNew = false;
        this.statusdataNew = false;
      } else if (val == 2) {
        this.personaldataNew = false;
        this.familydataNew = true;
        this.workdataNew = false;
        this.documentdataNew = false;
        this.statusdataNew = false;
      } else if (val == 3) {
        this.personaldataNew = false;
        this.familydataNew = false;
        this.workdataNew = true;
        this.documentdataNew = false;
        this.statusdataNew = false;
      } else if (val == 4) {
        this.personaldataNew = false;
        this.familydataNew = false;
        this.workdataNew = false;
        this.documentdataNew = true;
        this.statusdataNew = false;
      }else {
        this.personaldataNew = false;
        this.familydataNew = false;
        this.workdataNew = false;
        this.documentdataNew = false;
        this.statusdataNew = true;
      }
    },
    detailItem(item) {
      console.log(item);
      this.defaultItem = Object.assign({}, item);
      this.getDetail();
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
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

