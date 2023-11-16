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
    <VueHtml2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1800"
      filename="myPDF"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="100%"
      ref="html2Pdf"
    >
      <section slot="pdf-content" style="font-family: 'Arial'; padding: 20px">
        <h1 style="font-size: 24px;text-align: center; margin: 20px 0">Data Karyawan</h1>
        <table
          style="border: 1px solid black; width: 100%;border-collapse: collapse;"
        >
          <tr style="border: 1px solid black;background-color: lightgrey">
            <td style="padding: 20px">
              <th style="text-align: center">A. Personal Data</th>
            </td>
          </tr>
          <tr v-for="(item, index) in getPersonalData[0]" :key="index">
            <td style="padding: 20px; border: 1px solid black">
              <p style="font-size: 14px">{{ item }}</p>
            </td>
            <td style="padding: 20px; border: 1px solid black">
              <p style="font-size: 14px">{{ getPersonalData[1][index] }}</p>
            </td>
          </tr>
        </table>
        <table
          style="border: 1px solid black; width: 100%;border-collapse: collapse;margin-top: 20px">
         <tr style="border: 1px solid black;background-color: lightgrey">
            <td style="padding: 20px">
              <th style="text-align: center">B. Family Data</th>
            </td>
          </tr>
          <tr v-for="(item, index) in getFamilyData[0]" :key="index">
            <td style="padding: 20px; border: 1px solid black">
              <p style="font-size: 14px">{{ item }}</p>
            </td>
            <td style="padding: 20px; border: 1px solid black">
              <p style="font-size: 14px">{{ getFamilyData[1][index] }}</p>
            </td>
          </tr>
        </table>
        <table
          style="border: 1px solid black; width: 100%;border-collapse: collapse;margin-top: 20px">
          <tr style="border: 1px solid black;background-color: lightgrey">
            <td style="padding: 20px">
              <th style="text-align: center">C. List Anak Data</th>
            </td>
          </tr>
          <tr>
              <th style="border: 1px solid black;padding: 20px">Nama</th>
              <th style="border: 1px solid black;padding: 20px">Anak Ke</th>
              <th style="border: 1px solid black;padding: 20px ">TTL</th> 
              <th style="border: 1px solid black;padding: 20px">Status Menikah</th>
          </tr>
          <tr v-for="(item, index) in itemlistanak" :key="index">
            <td style="padding: 20px; border: 1px solid black">
              <p style="font-size: 14px">{{ item.nama }}</p>
            </td>
            <td style="padding: 20px; border: 1px solid black">
              <p style="font-size: 14px">{{ item.anak_ke }}</p>
            </td>
            <td style="padding: 20px; border: 1px solid black">
              <p style="font-size: 14px">{{ `${item.tempat_lahir}/${item.tanggal_lahir}` }}</p>
            </td>
            <td style="padding: 20px; border: 1px solid black">
              <p style="font-size: 14px">{{ item.status_nikah }}</p>
            </td>
          </tr>
        </table>
        <table
        style="border: 1px solid black; width: 100%;border-collapse: collapse;margin-top: 20px">
          <tr style="border: 1px solid black;background-color: lightgrey">
            <td style="padding: 20px">
              <th style="text-align: center">D. Work Data</th>
            </td>
          </tr>
          <tr v-for="(item, index) in getWorkData[0]" :key="index">
            <td style="padding: 20px; border: 1px solid black">
              <p style="font-size: 14px">{{ item }}</p>
            </td>
            <td style="padding: 20px; border: 1px solid black">
              <p style="font-size: 14px">{{ getWorkData[1][index] }}</p>
            </td>
          </tr>
        </table>
      </section>
    </VueHtml2pdf>
    <v-container fluid>
      <div class="d-flex justify-end pb-4">
        <v-btn dark class="mb-2" color="#b9a700" @click="downloadExcel">
          <v-icon small>mdi-download</v-icon> Download
        </v-btn>
      </div>
      <v-card class="pr-2 mt-2">
        <v-row>
          <v-col class="mx-0" cols="12" sm="3" md="3">
            <v-card class="mx-3 my-2" elevation="5">
              <v-card-text class="pa-1">
                <v-img
                  class="mx-2 my-2 pt-1"
                  contain
                  center
                  max-height="250"
                  v-bind:src="detailEmp.foto"
                ></v-img>

                <h3
                  align="center"
                  justify="center"
                  style="font-weight: 600; color: black"
                >
                  {{ detailEmp.nama_lengkap }}
                </h3>
                <div style="text-align: center" class="mb-5 mt-5">
                  <v-chip color="blue" outlined small> Employee </v-chip>
                </div>
                <div class="px-3">
                  <v-text-field
                    v-model="detailEmp.no_induk_karyawan"
                    label="Nomor Induk Karyawan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-model="detailEmp.divisi_nama"
                    label="Divisi"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-model="detailEmp.dept_nama"
                    label="Department"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-model="detailEmp.jabatan"
                    label="Jabatan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-model="detailEmp.status_karyawan_nama"
                    label="Status Karyawan"
                    outlined
                    readonly
                    dense
                    filled
                  ></v-text-field>
                </div>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
            </v-card>
          </v-col>
          <v-col class="mx-0" cols="12" sm="9" md="9">
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
                  v-on:change="selectedTabs"
                  solo
                ></v-select>
              </v-col>
              <v-tabs class="d-none d-md-block mt-3 ml-3 mr-3 mb-5">
                <v-tab @click="tabsdetail(1)">Personal Data</v-tab>
                <v-tab @click="tabsdetail(2)">Family Data</v-tab>
                <v-tab @click="tabsdetail(3)">Work Data</v-tab>
                <v-tab @click="tabsdetail(4)">Document</v-tab>
                <v-tab @click="tabsdetail(5)">Status & Lain-lain</v-tab>
              </v-tabs>
            </v-row>
            <v-card class="fontall mx-1 my-2" elevation="5">
              <v-card-text v-if="personaldata == true">
                <!-- <div>Personal Data</div> -->
                <v-row class="mb-3 mt-2 ml-1">
                  <h4>Data Diri</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.nama_lengkap"
                      label="Nama Lengkap"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.no_ktp"
                      label="No Ktp"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.tempat_lahir"
                      label="Tempat Lahir"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.tanggal_lahir"
                      label="Tanggal Lahir"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.gol_darah"
                      label="Gol Darah"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.agama"
                      label="Agama"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.jenis_kelamin"
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
                      v-model="detailEmp.no_rumah"
                      label="No Rumah"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.rt"
                      label="RT"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.rw"
                      label="RW"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.desa"
                      label="Desa"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.kec"
                      label="Kecamatan"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.kab"
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
                      v-model="detailEmp.telpon"
                      label="No Telp"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.no_telpon_darurat"
                      label="No Telp (darurat)"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.hubungan_telp_darurat"
                      label="Hubungan Contact Darurat"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text v-if="familydata == true">
                <v-row class="mb-2 mt-3 ml-1">
                  <h4>Keluarga</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="detailEmp.nama_ortu"
                      label="Orang Tua"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.status_nikah"
                      label="Status Nikah"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.nama_istri_suami"
                      label="Istri/Suami"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.pekerjaan_istri_suami"
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
                          <tr v-for="item in itemlistanak" :key="item.id">
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
              <v-card-text v-if="workdata == true">
                <v-row class="mb-2 mt-3 ml-1">
                  <h4>Pekerjaan Sekarang</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.pendidikan_terakhir"
                      label="Pendidikan Terakhir"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.mulai_masuk_kerja"
                      label="Mulai Masuk Kerja"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.bagian"
                      label="Bagian"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.ditetapkan"
                      label="Ditetapkan"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.no_anggota_koperasi"
                      label="No Koperasi"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.status_karyawan_nama"
                      label="Status"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="detailEmp.status_karyawan != 1" cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.tanggal_kontrak"
                      label="Tanggal Kontrak Selesai"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-if="showGaji == true"
                      v-model="detailEmp.gaji_sekarang"
                      label="Gaji"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="detailEmp.sisa_cuti"
                      label="Sisa Cuti"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mb-2 mt-3 ml-1">
                  <h4>Perpindahan Jabatan Kerja Sekarang</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-data-table
                      :headers="headerslistPerpindahanJabatanPekerjaan"
                      :items="itemlistPerpindahanJabatanPekerjaan"
                      class="rounded elevation-1 mx-1 pa-1 itemchild"
                    >
                      <template v-slot:item.jabatan_lama="{ item }">
                        {{ item.jabatan_lama }} <br />
                        ({{ item.nama_dept_lama }}) </template
                      ><template v-slot:item.jabatan_baru="{ item }">
                        {{ item.jabatan_baru }} <br />
                        ({{ item.nama_dept_baru }})
                      </template>
                      <template v-slot:item.tanggal_ditetapkan="{ item }">
                        {{ gettanggal(item.tanggal_ditetapkan) }}
                      </template>
                      <template v-slot:item.tanggal_mulai="{ item }">
                        {{ gettanggal(item.tanggal_mulai) }}
                      </template>
                      <template v-slot:item.dok_1="{ item }">
                        {{ getdokname(item.dok_1) }}
                        <v-btn
                          dark
                          small
                          class="mb-2 ml-5 mt-2"
                          @click="downloadFile(item.dok_1, item)"
                          color="#25695c"
                        >
                          <v-icon small>mdi-download-circle-outline</v-icon>
                          Download
                        </v-btn>
                      </template>
                    </v-data-table>
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
                          <tr
                            v-for="item in itemlistriwayatkerja"
                            :key="item.id"
                          >
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
                  <h4>Riwayat Pelatihan</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Judul / Topik Training</th>
                            <th class="text-left">Tanggal</th>
                            <th class="text-left">Tempat</th>
                            <th class="text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in itemListHistoryTraining"
                            :key="item.id"
                          >
                            <td>{{ item.nama_training }}</td>
                            <td>{{ item.tanggal_pelaksanaan }}</td>
                            <td>{{ item.tempat_pelaksanaan }}</td>
                            <td>{{ item.status_training }}</td>
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
                            v-for="item in itemlistpengalamankerja"
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
              <v-card-text v-if="documentdata == true">
                <v-row class="mb-2 mt-3 ml-1">
                  <h4>Informasi Dokumen</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.nomor_jamsostek"
                      label="No Jamsostek"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.bpjs_kesehatan"
                      label="No Bpjs"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.no_rek"
                      label="No Rekening"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="detailEmp.no_npwp"
                      label="No Npwp"
                      outlined
                      readonly
                      dense
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text v-if="statusdata == true">
                <v-row class="mb-2 mt-3 ml-1">
                  <h4>Update Status Karyawan</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-data-table
                      :headers="headerslistStatusKaryawan"
                      :items="itemlistStatusKaryawan"
                      class="rounded elevation-1 mx-1 pa-1 itemchild"
                    >
                      <template v-slot:item.created_at="{ item }">
                        {{ gettanggal(item.created_at) }}
                      </template>
                      <template v-slot:item.dok_1="{ item }">
                        {{ getdokname(item.dok_1) }}
                        <v-btn
                          dark
                          small
                          class="mb-2 ml-5 mt-2"
                          @click="downloadFile(item.dok_1, item)"
                          color="#25695c"
                        >
                          <v-icon small>mdi-download-circle-outline</v-icon>
                          Download
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
                <v-row class="mb-2 mt-3 ml-1">
                  <h4>Update Kontrak Karyawan</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-data-table
                      :headers="headerslistKontrakKaryawan"
                      :items="itemlistKontrakKaryawan"
                      class="rounded elevation-1 mx-1 pa-1 itemchild"
                    >
                      <template v-slot:item.tanggal_kontrak_lama="{ item }">
                        {{ gettanggal(item.tanggal_kontrak_lama) }}
                      </template>
                      <template v-slot:item.tanggal_kontrak_baru="{ item }">
                        {{ gettanggal(item.tanggal_kontrak_baru) }}
                      </template>
                      <template v-slot:item.dok_1="{ item }">
                        {{ getdokname(item.dok_1) }}
                        <v-btn
                          dark
                          small
                          class="mb-2 ml-5 mt-2"
                          @click="downloadFile(item.dok_1, item)"
                          color="#25695c"
                        >
                          <v-icon small>mdi-download-circle-outline</v-icon>
                          Download
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
                <v-row class="mb-2 mt-3 ml-1" v-if="showGaji == true">
                  <h4>Update Gaji Karyawan</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row v-if="showGaji == true">
                  <v-col cols="12" sm="12">
                    <v-data-table
                      :headers="headerslistGajiKaryawan"
                      :items="itemlistGajiKaryawan"
                      class="rounded elevation-1 mx-1 pa-1 itemchild"
                    >
                      <template v-slot:item.tanggal="{ item }">
                        {{ gettanggal(item.tanggal) }}
                      </template>
                      <template v-slot:item.salary_lama="{ item }">
                        {{ getRupiahNol(item.salary_lama) }}
                      </template>
                      <template v-slot:item.salary_baru="{ item }">
                        {{ getRupiahNol(item.salary_baru) }}
                      </template>
                      <template v-slot:item.dok_1="{ item }">
                        {{ getdokname(item.dok_1) }}
                        <v-btn
                          dark
                          small
                          class="mb-2 ml-5 mt-2"
                          @click="downloadFile(item.dok_1, item)"
                          color="#25695c"
                        >
                          <v-icon small>mdi-download-circle-outline</v-icon>
                          Download
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
                <v-row class="mb-2 mt-3 ml-1">
                  <h4>Surat Peringatan Karyawan</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-data-table
                      :headers="headerslistSPKaryawan"
                      :items="itemlistSPKaryawan"
                      class="rounded elevation-1 mx-1 pa-1 itemchild"
                    >
                      <template v-slot:item.tanggal="{ item }">
                        {{ gettanggal(item.tanggal) }}
                      </template>
                      <template v-slot:item.dok_1="{ item }">
                        {{ getdokname(item.dok_1) }}
                        <v-btn
                          dark
                          small
                          class="mb-2 ml-5 mt-2"
                          @click="downloadFile(item.dok_1, item)"
                          color="#25695c"
                        >
                          <v-icon small>mdi-download-circle-outline</v-icon>
                          Download
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

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
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "EmployeeDetail",
  components: {
    VueHtml2pdf,
  },
  data: () => ({
    itemsbr: [
      {
        text: "Employee",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Detail",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    personaldata: true,
    familydata: false,
    workdata: false,
    documentdata: false,
    statusdata: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",

    detailEmp: {
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
      hubungan_telp_darurat: "",
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

    itemlistanak: [
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
    itemlistriwayatkerja: [
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
    itemlistpengalamankerja: [
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
    itemlistPerpindahanJabatanPekerjaan: [],
    itemlistStatusKaryawan: [],
    itemlistKontrakKaryawan: [],
    itemlistGajiKaryawan: [],
    itemlistSPKaryawan: [],
    itemListHistoryTraining: [],

    headerslistPerpindahanJabatanPekerjaan: [
      // { text: "Nama Karyawan", value: "nama_lengkap" },
      { text: "Jabatan Awal", value: "jabatan_lama" },
      { text: "Jabatan Baru", value: "jabatan_baru" },
      // { text: "Tgl Ditetapkan", value: "tanggal_ditetapkan" },
      { text: "Tgl Mulai Kerja", value: "tanggal_mulai" },
      { text: "Utilitas", value: "flag_menu" },
      { text: "Dokumen", value: "dok_1" },
    ],
    headerslistStatusKaryawan: [
      { text: "Status Karyawan Lama", value: "nama_status_karyawan_lama" },
      { text: "Status Karyawan Baru", value: "nama_status_karyawan_baru" },
      { text: "Tanggal dibuat", value: "created_at" },
      { text: "Utilitas", value: "flag_menu" },
      { text: "Dokumen", value: "dok_1" },
    ],
    headerslistKontrakKaryawan: [
      { text: "Status Karyawan", value: "status_karyawan_sekarang" },
      { text: "Kontrak Lama Berakhir", value: "tanggal_kontrak_lama" },
      { text: "Kontrak Baru Berakhir", value: "tanggal_kontrak_baru" },
      { text: "Utilitas", value: "flag_menu" },
      { text: "Dokumen", value: "dok_1" },
    ],
    headerslistGajiKaryawan: [
      { text: "Gaji Lama", value: "salary_lama" },
      { text: "Gaji Baru", value: "salary_baru" },
      { text: "Tanggal", value: "tanggal" },
      { text: "Dokumen", value: "dok_1" },
    ],
    headerslistSPKaryawan: [
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
  }),

  created() {
    this.id_emp = localStorage.getItem("id_emp");
    console.log(this.id_emp);
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
      if (this.User.role_code == "1" || this.User.role_code == "99") {
        this.showGaji = true;
      }
    }
    this.getDetail();
  },

  computed: {
    getPersonalData() {
      const { detailEmp } = this
      const personaldata = [[
        'Nama Lengkap', 'No Ktp', 'Tempat Lahir', 'Tanggal Lahir', 'Gol Darah', 'Agama', 'Jenis Kelamin', 'Nomor Induk Karyawan',
        'Divisi', 'Department', 'Jabatan', 'Status Karyawan', 'No Rumah', 'RT', 'RW', 'Desa', 'Kecamatan', 'Kab/Kota', 'No Telp', 
        'No Telp (darurat)', 'Hubungan Contact Darurat'
      ], [
        detailEmp.nama_lengkap, detailEmp.no_ktp, detailEmp.tempat_lahir, detailEmp.tanggal_lahir, detailEmp.gol_darah, 
        detailEmp.agama, detailEmp.jenis_kelamin, detailEmp.no_induk_karyawan, detailEmp.divisi, detailEmp.departement, detailEmp.jabatan,
        detailEmp.status_karyawan, detailEmp.no_rumah, detailEmp.rt, detailEmp.rw, detailEmp.desa, detailEmp.kec, detailEmp.kab, detailEmp.telpon,
        detailEmp.no_telpon_darurat, detailEmp.hubungan_telp_darurat
      ]]
      return personaldata
    },

    getWorkData() {
      const { detailEmp } = this
      const workData = [[
        'Pendidikan Terakhir', 'Mulai Masuk Kerja', 'Bagian', 'Ditetapkan', 'No Koperasi',
        'Status', 'Tanggal Kontrak Selesai', 'Gaji', 'Sisa Cuti'
      ], [
        detailEmp.pendidikan_terakhir, detailEmp.mulai_masuk_kerja, detailEmp.bagian, detailEmp.ditetapkan,
        detailEmp.no_anggota_koperasi, detailEmp.status_karyawan, detailEmp.tanggal_kontrak, detailEmp.gaji_sekarang,
        detailEmp.sisa_cuti
      ]]
      return workData
    },

    getFamilyData() {
      const { detailEmp } = this
      const familydata = [[
        'Orang Tua', 'Status Nikah', 'Istri/Suami', 'Pekerjaan'
      ], [detailEmp.nama_ortu, detailEmp.status_nikah, detailEmp.nama_istri_suami, detailEmp.pekerjaan_istri_suami]];
      return familydata
    },

    getDaftarAnakData() {
      const listAnak = this.itemlistanak.map(value => [
        value.nama, value.anak_ke, `${value.tempat_lahir}/${value.tanggal_lahir}`,
        value.status_status, value.status_nikah
      ])
      const daftarAnak = [
        ['Nama', 'Anak Ke', 'TTL', 'Kerja/Sekolah', 'Status Menikah'],
        ...listAnak
      ]
      return daftarAnak
    }
  },

  methods: {
    downloadExcel() {
      this.$refs.html2Pdf.generatePdf();
    },
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
          this.detailEmp = response.data.data.result;
          if (response.data.data.result.foto == "-") {
            this.detailEmp.foto = "/images/noimage.png";
          } else {
            this.getFoto(response.data.data.result.foto);
          }
          this.itemlistanak = response.data.data.result.listAnak;
          this.itemlistriwayatkerja =
            response.data.data.result.listRiwayatPekerjaan;
          this.itemlistpengalamankerja =
            response.data.data.result.listPengalamanKerja;
          this.itemlistPerpindahanJabatanPekerjaan =
            response.data.data.result.listPerpindahanJabatanPekerjaan;
          this.itemlistStatusKaryawan =
            response.data.data.result.statusPekerjaan;
          this.itemlistKontrakKaryawan =
            response.data.data.result.kontrakPekerjaan;
          this.itemlistGajiKaryawan =
            response.data.data.result.perubahanGajiKaryawan;
          this.itemlistSPKaryawan = response.data.data.result.spKaryawan;
          this.itemListHistoryTraining =
            response.data.data.result.listHistoryTraining;
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

    async downloadFileApi(val, item) {
      // var imagesvalue = 'public/uploads/1656286341_login_tokomas.PNG';
      var imagesvalue = val;
      try {
        const response = await axios.get(
          this.BaseUrlGet + "downloadfile?path_file=" + imagesvalue,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
            responseType: "blob",
          }
        );
        console.log(response.data);
        if (response.data.length != 0) {
          const myArray = imagesvalue.split(".");
          var flag_menu = "";
          if (item.flag_menu) {
            flag_menu = item.flag_menu;
          }

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "Dokumen " +
              flag_menu +
              " " +
              this.getdokname(imagesvalue) +
              "." +
              myArray[1]
          );
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

    async getFoto(val) {
      // var imagesvalue = 'public/uploads/1656286341_login_tokomas.PNG';
      var imagesvalue = val;
      try {
        const response = await axios.get(
          this.BaseUrlGet + "getimages?path_file=" + imagesvalue,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        if (response.data.length != 0) {
          this.detailEmp.foto =
            "data:image/jpg;base64," + response.data.data.result;
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

    downloadFile(val, item) {
      console.log(item);
      this.downloadFileApi(val, item);
    },

    tabsdetail(val) {
      this.changeTabs(val);
    },
    selectedTabs(val) {
      this.changeTabs(val);
    },
    changeTabs(val) {
      if (val == 1) {
        this.personaldata = true;
        this.familydata = false;
        this.workdata = false;
        this.documentdata = false;
        this.statusdata = false;
      } else if (val == 2) {
        this.personaldata = false;
        this.familydata = true;
        this.workdata = false;
        this.documentdata = false;
        this.statusdata = false;
      } else if (val == 3) {
        this.personaldata = false;
        this.familydata = false;
        this.workdata = true;
        this.documentdata = false;
        this.statusdata = false;
      } else if (val == 4) {
        this.personaldata = false;
        this.familydata = false;
        this.workdata = false;
        this.documentdata = true;
        this.statusdata = false;
      } else {
        this.personaldata = false;
        this.familydata = false;
        this.workdata = false;
        this.documentdata = false;
        this.statusdata = true;
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
      } else {
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

    getdokname(val) {
      if (val) {
        const myArray = val.split("/");
        return myArray[2];
      } else {
        return "-";
      }
    },
  },
};
</script>
