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

    <v-card class="pr-2 mx-2">
      <v-card-title class="headermodalstyle">
        {{ formTitle }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="mb-3 mt-2 ml-1">
            <h4 style="color: black; font-size: 18px">Data Karyawan</h4>
            <v-divider
              class="mx-2 mt-3"
              style="border-color: black"
            ></v-divider>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.no_induk_karyawan"
                label="Nomor Induk Karyawan"
                outlined
                dense
                :rules="[(v) => !!v || 'Field is required']"
                :disabled = 'isDisabledNIK'
                :filled = 'isDisabledNIK'
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" v-if="detailEmp.status_karyawan != 1">
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="detailEmp.status_karyawan"
                :items="itemsstatuskaryawan"
                item-value="id"
                item-text="nama"
                label="Pilih Status"
                clearable
                outlined
                dense
                :rules="[(v) => !!v || 'Field is required']"
              ></v-select>
            </v-col>            
            <v-col cols="12" sm="6" v-if="detailEmp.status_karyawan != 1">
              <v-menu
                v-model="menu5"
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="datepicker5"
                    slot="activator"
                    label="Tanggal Kontrak Berakhir"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="[(v) => !!v || 'Field is required']"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="datepicker5"
                  @input="menu5 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <!-- <v-col
                    cols="12"
                    sm="6">
                        <v-select
                            v-model="detailEmp.unit_perusahan"
                            :items="itemsunitperusahaan"
                            item-value="unit_perusahaan_code"
                            item-text="nama"
                            label="Pilih Unit Perusahaan"
                            clearable
                            outlined
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                            required
                        ></v-select>
                    </v-col> -->

            <v-col cols="12" sm="6">
              <v-select
                v-model="detailEmp.divisi"
                :items="itemsdivisi"
                item-value="divisi_code"
                item-text="nama"
                v-on:change="selectedDivisi"
                label="Pilih Divisi"
                clearable
                outlined
                dense
                :rules="[(v) => !!v || 'Field is required']"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="detailEmp.departement"
                :items="itemsdept"
                item-value="department_code"
                item-text="dept_nama"
                label="Pilih Departement"
                clearable
                outlined
                dense
                :rules="[(v) => !!v || 'Field is required']"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.jabatan"
                label="Jabatan"
                outlined
                dense
                :rules="[(v) => !!v || 'Field is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.gaji_sekarang"
                label="Gaji Sekarang"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.sisa_cuti"
                label="Sisa Cuti"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-3 mt-2 ml-1">
            <h4 style="color: black; font-size: 18px">Personal Data</h4>
            <v-divider
              class="mx-2 mt-3"
              style="border-color: black"
            ></v-divider>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.nama_lengkap"
                label="Nama Lengkap"
                outlined
                dense
                :rules="[(v) => !!v || 'Field is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.no_ktp"
                label="No Ktp"
                outlined
                dense
                :rules="[(v) => !!v || 'Field is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.tempat_lahir"
                label="Tempat Lahir"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="datepicker1"
                    slot="activator"
                    label="Tanggal Lahir"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="[(v) => !!v || 'Field is required']"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="datepicker1"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="detailEmp.gol_darah"
                :items="itemsGolDarah"
                item-value="value"
                item-text="text"
                label="Pilih Gol Darah"
                clearable
                outlined
                dense
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="detailEmp.agama"
                :items="itemsAgama"
                item-value="value"
                item-text="text"
                label="Pilih Agama"
                clearable
                outlined
                dense
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="detailEmp.jenis_kelamin"
                :items="itemsKelamin"
                item-value="value"
                item-text="text"
                label="Pilih Jenis Kelamin"
                clearable
                outlined
                dense
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row class="mb-2 mt-3 ml-1">
            <h4 style="color: black; font-size: 18px">Alamat</h4>
            <v-divider
              class="mx-2 mt-3"
              style="border-color: black"
            ></v-divider>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.no_rumah"
                label="No Rumah"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.rt"
                label="RT"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.rw"
                label="RW"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.desa"
                label="Desa"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.kec"
                label="Kecamatan"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.kab"
                label="Kab/Kota"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-2 mt-3 ml-1">
            <h4 style="color: black; font-size: 18px">Contact</h4>
            <v-divider
              class="mx-2 mt-3"
              style="border-color: black"
            ></v-divider>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="detailEmp.telpon"
                label="No Telp"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.no_telpon_darurat"
                label="No Telp (darurat)"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.hubungan_telp_darurat"
                label="Status Hubungan (No telp Darurat)"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-2 mt-3 ml-1">
            <h4 style="color: black; font-size: 18px">Keluarga</h4>
            <v-divider
              class="mx-2 mt-3"
              style="border-color: black"
            ></v-divider>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="detailEmp.nama_ortu"
                label="Orang Tua"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <!-- <v-text-field
                v-model="detailEmp.status_nikah"
                label="Status Nikah"
                outlined
                dense
              ></v-text-field> -->
              
              <v-select
                v-model="detailEmp.status_nikah"
                :items="itemsPernikahan"
                item-value="value"
                item-text="text"
                label="Status Pernikahan"
                clearable
                outlined
                dense
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.nama_istri_suami"
                label="Istri/Suami"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.pekerjaan_istri_suami"
                label="Pekerjaan"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- <v-row class="mb-2 mt-3 ml-1">
                <h4>Daftar Anak</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
                </v-row> -->
          <v-row class="mb-3 px-2">
            <v-col cols="12">
              <v-data-table
                :headers="headerslistanak"
                :items="itemlistanak"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Daftar Anak</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogAnak" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Tambah Daftar Anak
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Daftar Anak</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                  v-model="editedItemAnak.nama"
                                  label="Nama anak"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItemAnak.anak_ke"
                                  label="Anak Ke"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItemAnak.tempat_lahir"
                                  label="Tempat Lahir"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <!-- <v-text-field
                                            v-model="editedItemAnak.tanggal_lahir"
                                            label="Tanggal Lahir"
                                            ></v-text-field> -->
                                <v-menu
                                  v-model="menu4"
                                  transition="scale-transition"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="datepicker4"
                                      slot="activator"
                                      label="Tanggal Lahir"
                                      v-bind="attrs"
                                      v-on="on"
                                      :rules="[
                                        (v) => !!v || 'Field is required',
                                      ]"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="datepicker4"
                                    @input="menu4 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-select
                                  v-model="editedItemAnak.status_nikah"
                                  :items="itemsPernikahan"
                                  item-value="value"
                                  item-text="text"
                                  label="Status Nikah"
                                  clearable
                                >
                                </v-select>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-select
                                  v-model="editedItemAnak.status_status"
                                  :items="itemsPekerjaanAnak"
                                  item-value="value"
                                  item-text="text"
                                  label="Sekolah/Bekerja"
                                  clearable
                                >
                                </v-select>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">
                            Cancel
                          </v-btn>
                          <v-btn color="blue darken-1" text @click="saveAnak">
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDeleteAnak" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this
                          item?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeDeleteAnak"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirmAnak"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small @click="deleteItemAnak(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row class="mb-2 mt-3 ml-1">
            <h4 style="color: black; font-size: 18px">Pekerjaan</h4>
            <v-divider
              class="mx-2 mt-3"
              style="border-color: black"
            ></v-divider>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <!-- <v-text-field
                v-model="detailEmp.pendidikan_terakhir"
                label="Pendidikan Terakhir"
                outlined
                dense
              ></v-text-field> -->
              
              <v-select
                v-model="detailEmp.pendidikan_terakhir"
                :items="itemsPendidikan"
                item-value="value"
                item-text="text"
                label="Pendidikan Terakhir"
                clearable
                outlined
                dense
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="datepicker2"
                    slot="activator"
                    label="Mulai Masuk Kerja"
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                    :rules="[(v) => !!v || 'Field is required']"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="datepicker2"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.bagian"
                label="Bagian"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="datepicker3"
                    slot="activator"
                    label="Ditetapkan"
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                    :rules="[(v) => !!v || 'Field is required']"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="datepicker3"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="detailEmp.no_anggota_koperasi"
                label="No Koperasi"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-3 px-2">
            <v-col cols="12">
              <v-data-table
                :headers="headerslistRiwayat"
                :items="itemlistriwayatkerja"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Riwayat Kerja</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogRiwayat" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Tambah Riwayat
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Riwayat Pekerjaan</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                  v-model="editedItemRiwayat.unit_perusahaan"
                                  label="Unit Perusahaan"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="editedItemRiwayat.jabatan"
                                  label="Jabatan"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <!-- <v-text-field
                                            v-model="editedItemAnak.tanggal_lahir"
                                            label="Tanggal Lahir"
                                            ></v-text-field> -->
                                <v-menu
                                  v-model="menu4"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="datepicker4"
                                      slot="activator"
                                      label="Tanggal"
                                      v-bind="attrs"
                                      v-on="on"
                                      :rules="[
                                        (v) => !!v || 'Field is required',
                                      ]"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="datepicker4"
                                    @input="menu4 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                  v-model="editedItemRiwayat.alasan_kepindahan"
                                  label="Alasan Pindah"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeRiwayat"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="saveRiwayat"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDeleteRiwayat" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this
                          item?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeDeleteRiwayat"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirmRiwayat"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small @click="deleteItemRiwayat(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row class="mb-3 px-2">
            <v-col cols="12">
              <v-data-table
                :headers="headerslistPengalaman"
                :items="itemlistpengalamankerja"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Pengalaman Kerja</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogPengalaman" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Tambah Pengalaman
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Pengalaman Kerja</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                  v-model="editedItemPengalaman.perusahaan"
                                  label="Perusahaan"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="editedItemPengalaman.jabatan"
                                  label="Jabatan"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                  v-model="
                                    editedItemPengalaman.alasan_kepindahan
                                  "
                                  label="Alasan Pindah"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closePengalaman"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="savePengalaman"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog
                      v-model="dialogDeletePengalaman"
                      max-width="500px"
                    >
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this
                          item?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeDeletePengalaman"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirmPengalaman"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small @click="deleteItemPengalaman(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row class="mb-2 mt-3 ml-1">
            <h4 style="color: black; font-size: 18px">Informasi Dokumen</h4>
            <v-divider
              class="mx-2 mt-3"
              style="border-color: black"
            ></v-divider>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.nomor_jamsostek"
                label="No Jamsostek"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.bpjs_kesehatan"
                label="No Bpjs"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.no_rek"
                label="No Rekening"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detailEmp.no_npwp"
                label="No Npwp"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-2 mt-3 ml-1">
            <h4 style="color: black; font-size: 18px">Foto Karyawan</h4>
            <v-divider
              class="mx-2 mt-3"
              style="border-color: black"
            ></v-divider>
          </v-row>
          <v-row>      
            <v-col cols="12" sm="6" md="6">              
              <v-img
                class="mx-2 my-2 pt-1"
                contain
                center
                max-height="250"
                v-bind:src="imageShow"
              ></v-img>
            </v-col>   
            <v-col cols="12" sm="6" md="6">              
            </v-col>     
                      <v-col cols="12" sm="6" md="6" class="py-0">
                            <v-file-input
                              class="pt-1 mt-0"
                              placeholder="Pilih Foto"
                              prepend-icon="mdi-file-document-multiple-outline"
                              outlined
                              dense
                              label = 'Pilih Foto'
                              v-model="file"
                              v-on:change="pilihfile"
                            ></v-file-input>
                      </v-col> 
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark color="red" @click="close">
          <v-icon left> mdi-close-circle-outline </v-icon> Cancel
        </v-btn>
        <v-btn dark :loading="loading" color="#25695c" @click="saveemp">
          <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
          Save
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Modal Verifikasi Save -->
    <v-dialog v-model="dialogVerifikasiSave" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure to save this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="closeSaveConfirmation">
            <v-icon left> mdi-close-circle-outline </v-icon>
            Cancel
          </v-btn>
          <v-btn dark color="#25695c" @click="saveItemConfirm">
            <v-progress-circular
              v-if="load == true"
              :size="25"
              :width="5"
              indeterminate
              color="#25695C"
            >
            </v-progress-circular>
            <v-icon v-if="load == false" left>
              mdi-checkbox-marked-circle-outline
            </v-icon>
            <h4 v-if="load == false">Save</h4></v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Verifikasi Cancel -->
    <v-dialog v-model="dialogVerifikasiCancel" max-width="500px">
      <v-card>
        <v-card-title class="headline">Are you sure to cancel?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="closeCancelConfirmation">
            <v-icon left> mdi-close-circle-outline </v-icon>
            Cancel
          </v-btn>
          <v-btn dark color="#25695c" @click="cancelItemConfirm">
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            Ok</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  name: "EmployeeDetail",
  data: () => ({
    itemsbr: [
      {
        text: "Employee",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Create/Update",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    formTitle: "Create New Data Employee",
    value: "add",
    load: false,
    valid: true,
    dialog: false,
    dialogVerifikasiSave: false,
    dialogVerifikasiCancel: false,
    personaldata: true,
    familydata: false,
    workdata: false,
    documentdata: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",

    detailEmp: {
      id: "",
      type_pt: "Add",
      foto: "-",
      no_induk_karyawan: "",
      no_ktp: "",
      nama_lengkap: "",
      jenis_kelamin: "Laki-Laki",
      tempat_lahir: "-",
      tanggal_lahir: "",
      nama_ortu: "-",
      agama: "-",
      unit_perusahan: "",
      pangkat: "-",
      jabatan: "",
      divisi: "",
      departement: "",
      rt: "-",
      rw: "-",
      no_rumah: "-",
      desa: "-",
      kec: "-",
      kab: "-",
      status_nikah: "-",
      nama_istri_suami: "-",
      pekerjaan_istri_suami: "-",
      bin_binti: "-",
      gol_darah: "-",
      status_karyawan: "",
      tanggal_kontrak: "",
      telpon: "-",
      no_telpon_darurat: "-",
      hubungan_telp_darurat:'-',
      mulai_masuk_kerja: "",
      bagian: "-",
      ditetapkan: "",
      nomor_jamsostek: "-",
      scan_kartu_jamsostek: "-",
      bpjs_kesehatan: "-",
      scan_kartu_bpjs: "-",
      no_rek: "-",
      no_npwp: "-",
      pendidikan_terakhir: "-",
      no_anggota_koperasi: "-",
      gaji_sekarang: 0,
      sisa_cuti: 0,
      listAnak: [],
      listRiwayatPekerjaan: [],
      listPengalamanKerja: [],
    },

    itemlistanak: [],
    itemlistriwayatkerja: [],
    itemlistpengalamankerja: [],

    itemsGolDarah: [
      { text: "-", value: "-" },
      { text: "A", value: "A" },
      { text: "AB", value: "AB" },
      { text: "B", value: "B" },
      { text: "O", value: "O" },
    ],
    itemsAgama: [
      { text: "-", value: "-" },
      { text: "Islam", value: "Islam" },
      { text: "Kristen", value: "Kristen" },
      { text: "Katolik", value: "Katolik" },
      { text: "Hindu", value: "Hindu" },
      { text: "Buddha", value: "Buddha" },
      { text: "Konghuchu", value: "Konghuchu" },
      { text: "Others", value: "Others" },
    ],
    itemsKelamin: [
      { text: "Laki-Laki", value: "Laki-Laki" },
      { text: "Perempuan", value: "Perempuan" },
    ],
    itemsStatus: [
      { text: "Reseller", value: "1" },
      { text: "Cust Reguler", value: "0" },
    ],
    itemsPernikahan: [
      { text: "Tidak Kawin", value: "Tidak Kawin" },
      { text: "Kawin", value: "Kawin" },
      { text: "Janda/Duda", value: "Janda/Duda" },
    ],
    itemsPendidikan: [
      { text: "SD", value: "SD" },
      { text: "SMP", value: "SMP" },
      { text: "SMA", value: "SMA" },
      { text: "Diploma", value: "Diploma" },
      { text: "Sarjana", value: "Sarjana" },
      { text: "Magister", value: "Magister" },
    ],
    itemsPekerjaanAnak: [
      { text: "Sekolah", value: "Sekolah" },
      { text: "Bekerja", value: "Bekerja" },
    ],
    itemsdept: [],
    itemsdivisi: [],
    itemsunitperusahaan: [],
    itemsstatuskaryawan: [],

    datepicker1: "2022-01-01",
    menu1: false,
    datepicker2: "2022-01-01",
    menu2: false,
    datepicker3: "2022-01-01",
    menu3: false,
    datepicker4: "2022-01-01",
    menu4: false,
    datepicker5: "2000-01-01",
    menu5: false,

    loading: false,
    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 4000,
    colorsnackbar: null,

    statusaddedit: "",

    admin_id: "",
    id_emp: "",

    dialogAnak: false,
    dialogDeleteAnak: false,
    headerslistanak: [
      {
        text: "Nama",
        align: "start",
        sortable: false,
        value: "nama",
      },
      { text: "Anak_ke", value: "anak_ke" },
      { text: "Tempat Lahir", value: "tempat_lahir" },
      { text: "Tanggal Lahir", value: "tanggal_lahir" },
      { text: "Status Nikah", value: "status_nikah" },
      { text: "Sekolah/Bekerja", value: "status_status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    // itemlistanak: [],
    editedIndexAnak: -1,
    editedItemAnak: {
      nama: "",
      anak_ke: "-",
      tempat_lahir: "-",
      tanggal_lahir: "-",
      status_nikah: "-",
      status_status: "-",
    },
    defaultItemAnak: {
      nama: "",
      anak_ke: "-",
      tempat_lahir: "-",
      tanggal_lahir: "-",
      status_nikah: "-",
      status_status: "-",
    },

    dialogRiwayat: false,
    dialogDeleteRiwayat: false,
    headerslistRiwayat: [
      {
        text: "Unit Perusahaan",
        align: "start",
        sortable: false,
        value: "unit_perusahaan",
      },
      { text: "Tanggal", value: "tgl" },
      { text: "Jabatan", value: "jabatan" },
      { text: "Alasan Kepindahan", value: "alasan_kepindahan" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndexRiwayat: -1,
    editedItemRiwayat: {
      unit_perusahaan: "",
      tgl: "-",
      jabatan: "-",
      alasan_kepindahan: "-",
    },
    defaultItemRiwayat: {
      unit_perusahaan: "",
      tgl: "-",
      jabatan: "-",
      alasan_kepindahan: "-",
    },

    dialogPengalaman: false,
    dialogDeletePengalaman: false,
    headerslistPengalaman: [
      {
        text: "Perusahaan",
        align: "start",
        sortable: false,
        value: "perusahaan",
      },
      { text: "Jabatan", value: "jabatan" },
      { text: "Alasan Kepindahan", value: "alasan_kepindahan" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    // itemlistanak: [],
    editedIndexPengalaman: -1,
    editedItemPengalaman: {
      perusahaan: "",
      jabatan: "-",
      alasan_kepindahan: "-",
    },
    defaultItemPengalaman: {
      perusahaan: "",
      jabatan: "-",
      alasan_kepindahan: "-",
    },

    fileUpload : '',
    fileUploadReady : false,

    imageShow: '/images/noimage.png',

    isDisabledNIK : false,
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.id_emp = localStorage.getItem("id_emp");
    this.statusaddedit = localStorage.getItem("status");
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    if (this.statusaddedit) {
      if (this.statusaddedit == "edit_emp") {
        this.getDetail();
        this.formTitle = "Edit Data Employee";
        this.isDisabledNIK = true;
      }
    } else {
      this.$router.push("/Employee");
    }
    this.getDivisi();
    this.getUnitPerusahaan();
    this.getStatusKaryawan();
    this.fileUploadReady = false;
  },

  methods: {
    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetDetailEmployeeById?id=" + this.id_emp,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.getDept(response.data.data.result.divisi);
          this.detailEmp = response.data.data.result;
          this.detailEmp.id = this.id_emp;

          this.itemlistanak = response.data.data.result.listAnak;
          this.itemlistriwayatkerja =
            response.data.data.result.listRiwayatPekerjaan;
          this.itemlistpengalamankerja =
            response.data.data.result.listPengalamanKerja;

          this.datepicker5 = response.data.data.result.tanggal_kontrak;

          if(response.data.data.result.foto != '-'){this.getFoto(response.data.data.result.foto)}
          //   this.itemlistriwayatkerja = response.data.data.result.listRiwayatPekerjaan;
          //   this.itemlistpengalamankerja = response.data.data.result.listPengalamanKerja;
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
    async getDivisi() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAllDivisi", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsdivisi = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsdivisi = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsdivisi = [];
        }
      }
    },
    async getDept(val) {
      var div_code = "";
      if (val) {
        div_code = val;
      }
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetAllDepartment?divisi_code=" + div_code,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsdept = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsdept = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsdept = [];
        }
      }
    },
    async getUnitPerusahaan() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetAllUnitPerusahaan",
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsunitperusahaan = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsunitperusahaan = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsunitperusahaan = [];
        }
      }
    },
    async getStatusKaryawan() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetAllStatusKaryawan",
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsstatuskaryawan = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsstatuskaryawan = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsstatuskaryawan = [];
        }
      }
    },
    async addApi() {
      this.load = true;
      this.detailEmp.tanggal_kontrak = this.datepicker5;
      this.detailEmp.type_pt = 'Add' ;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddEmployeePT",
          this.detailEmp,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        this.loading = false;
        if (response.data.data.result == "success") {
          this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.load = false;
          this.$router.push("/Employee");
          //   this.initialize();
        } else {
          this.dialog = true;
          this.load = false;
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
        this.load = false;
      }
    },
    async editApi() {
      this.load = true;
      this.detailEmp.tanggal_kontrak = this.datepicker5
      this.detailEmp.type_pt = 'Update' ;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddEmployeePT",
          this.detailEmp,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        this.loading = false;
        if (response.data.data.result == "success") {
          this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.load = false;
          this.$router.push("/Employee");
          //   this.initialize();
        } else {
          this.dialog = true;
          this.load = false;
        }
      } catch (error) {
        this.loading = false;
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }else if(error.response.status == 400){
          console.error(error.response.data.data.result);
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = error.response.data.data.result;
        }else{
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = 'Gagal...';
        }
        this.load = false;
      }
    },
    
    async uploadApi() {
      const formData = new FormData();
      formData.append("file", this.fileUpload);
      // console.log(formData);
      // this.dialogDetail = false;
      try {        
        const response = await axios.post(
          this.BaseUrlGet + "upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.success);
        if (response.data.success == true) {
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses upload gambar";
          // this.imagesResult = response.data.data.result;
          console.log(response.data.data);
          // console.log(this.detailEmp.foto);
          this.detailEmp.foto = response.data.data.result;
          // console.log(this.detailEmp.foto);
          // this.dialogDelete = false;
          // this.dialog = false;
          // this.initialize();
        } else {
          this.dialog = true;
        }
      } catch (error) {
        // console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    }, 
    
    async getFoto(val){
      // var imagesvalue = 'public/uploads/1656286341_login_tokomas.PNG';
      var imagesvalue = val;
      try {
        const response = await axios.get(this.BaseUrlGet + "getimages?path_file="+imagesvalue, {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        if (response.data.length != 0) {
          this.imageShow = "data:image/jpg;base64," + response.data.data.result;
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

    
    pilihfile(event) {
      console.log(event);
      if (event != null) {
        this.fileUpload = event;
        this.fileUploadReady = true;
        this.imageShow = URL.createObjectURL(event);
      } else {
        this.fileUploadReady = false;
      }
    },

    selectedDivisi(val) {
      console.log(val);
      if (val == null) {
        this.itemsdept = [];
      } else {
        this.getDept(val);
      }
    },
    detailItem(item) {
      console.log(item);
      this.defaultItem = Object.assign({}, item);
      this.getDetail();
      this.dialog = true;
    },
    close() {
      this.dialogVerifikasiCancel = true;
    },
    closeCancelConfirmation() {
      this.dialogVerifikasiCancel = false;
    },
    cancelItemConfirm() {
      localStorage.removeItem("id_emp");
      localStorage.removeItem("status");
      this.$router.push("/Employee");
    },

    saveemp() {
      console.log(this.datepicker1);
      this.$refs.form.validate();

      if (this.$refs.form.validate() != true) {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Menambah, Data Wajib tidak boleh ada yang kosong";
      } else {
        this.detailEmp.listAnak = JSON.stringify(this.itemlistanak);
        this.detailEmp.listRiwayatPekerjaan = JSON.stringify(
          this.itemlistriwayatkerja
        );
        this.detailEmp.listPengalamanKerja = JSON.stringify(
          this.itemlistpengalamankerja
        );
        this.detailEmp.tanggal_lahir = this.datepicker1;
        this.detailEmp.mulai_masuk_kerja = this.datepicker2;
        this.detailEmp.ditetapkan = this.datepicker3;
        // console.log(JSON.stringify(this.itemlistanak))
        this.dialogVerifikasiSave = true;
      }
    },

    closeSaveConfirmation() {
      this.dialogVerifikasiSave = false;
    },
    async saveItemConfirm() {
      if(this.fileUploadReady == true){await this.uploadApi();}
      console.log('test');
      if (this.statusaddedit == "edit_emp") {
        console.log("edit_emp");
        this.editApi();
      } else {
        console.log("add_emp");
        this.addApi();
      }
    },

    deleteItemAnak(item) {
      this.editedIndexAnak = this.itemlistanak.indexOf(item);
      this.editedItemAnak = Object.assign({}, item);
      this.dialogDeleteAnak = true;
    },
    deleteItemConfirmAnak() {
      this.itemlistanak.splice(this.editedIndexAnak, 1);
      this.closeDeleteAnak();
    },
    closeAnak() {
      this.dialogAnak = false;
      this.$nextTick(() => {
        this.editedItemAnak = Object.assign({}, this.defaultItemAnak);
        this.editedIndexAnak = -1;
      });
    },
    closeDeleteAnak() {
      this.dialogDeleteAnak = false;
      this.$nextTick(() => {
        this.editedItemAnak = Object.assign({}, this.defaultItemAnak);
        this.editedIndexAnak = -1;
      });
    },
    saveAnak() {
      if (this.editedIndexAnak > -1) {
        Object.assign(
          this.itemlistanak[this.editedIndexAnak],
          this.editedItemAnak
        );
      } else {
        this.editedItemAnak.tanggal_lahir = this.datepicker4;
        this.itemlistanak.push(this.editedItemAnak);
        //   console.log(this.datepicker4);
      }
      this.closeAnak();
    },

    deleteItemRiwayat(item) {
      this.editedIndexRiwayat = this.itemlistriwayatkerja.indexOf(item);
      this.editedItemRiwayat = Object.assign({}, item);
      this.dialogDeleteRiwayat = true;
    },
    deleteItemConfirmRiwayat() {
      this.itemlistriwayatkerja.splice(this.editedIndexRiwayat, 1);
      this.closeDeleteRiwayat();
    },
    closeRiwayat() {
      this.dialogRiwayat = false;
      this.$nextTick(() => {
        this.editedItemRiwayat = Object.assign({}, this.defaultItemRiwayat);
        this.editedIndexRiwayat = -1;
      });
    },
    closeDeleteRiwayat() {
      this.dialogDeleteRiwayat = false;
      this.$nextTick(() => {
        this.editedItemRiwayat = Object.assign({}, this.defaultItemRiwayat);
        this.editedIndexRiwayat = -1;
      });
    },
    saveRiwayat() {
      if (this.editedIndexRiwayat > -1) {
        Object.assign(
          this.itemlistriwayatkerja[this.editedIndexRiwayat],
          this.editedItemRiwayat
        );
      } else {
        this.editedItemRiwayat.tgl = this.datepicker4;
        this.itemlistriwayatkerja.push(this.editedItemRiwayat);
        console.log(this.editedItemRiwayat);
      }
      this.closeRiwayat();
    },

    deleteItemPengalaman(item) {
      this.editedIndexPengalaman = this.itemlistpengalamankerja.indexOf(item);
      this.editedItemPengalaman = Object.assign({}, item);
      this.dialogDeletePengalaman = true;
    },
    deleteItemConfirmPengalaman() {
      this.itemlistpengalamankerja.splice(this.editedIndexPengalaman, 1);
      this.closeDeletePengalaman();
    },
    closePengalaman() {
      this.dialogPengalaman = false;
      this.$nextTick(() => {
        this.editedItemPengalaman = Object.assign(
          {},
          this.defaultItemPengalaman
        );
        this.editedIndexPengalaman = -1;
      });
    },
    closeDeletePengalaman() {
      this.dialogDeletePengalaman = false;
      this.$nextTick(() => {
        this.editedItemPengalaman = Object.assign(
          {},
          this.defaultItemPengalaman
        );
        this.editedIndexPengalaman = -1;
      });
    },
    savePengalaman() {
      if (this.editedIndexPengalaman > -1) {
        Object.assign(
          this.itemlistpengalamankerja[this.editedIndexPengalaman],
          this.editedItemPengalaman
        );
      } else {
        //   this.editedItemRiwayat.tgl = this.datepicker4;
        this.itemlistpengalamankerja.push(this.editedItemPengalaman);
        console.log(this.editedItemPengalaman);
      }
      this.closePengalaman();
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
  },
};
</script>

