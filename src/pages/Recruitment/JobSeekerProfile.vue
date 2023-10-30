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

    <v-card class="pr-5 mx-3"> 
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
              <v-tab @click="tabsdetail(1)">Pelamar Eksternal</v-tab>
              <v-tab @click="tabsdetail(2)">Pelamar Internal</v-tab>
            </v-tabs>
        <v-data-table
          v-if="eksternaldata == true"
          :headers="headers"
          :items="dataobject"
          :search="search"
          class="rounded elevation-6 mx-3 pa-1 itemchild"
        >
          <template v-slot:item.target_tanggal_pemenuhan="{ item }">
            {{ gettanggal(item.target_tanggal_pemenuhan) }}
          </template>
          <template v-slot:item.nama_recruitment="{ item }">
            {{ item.nama_recruitment }} {{ getStatusRecr(item.is_dell_recr) }}
          </template>

          <template v-slot:top>
            <v-toolbar flat>
              <v-btn
                dark
                class="mx-1 mt-1 d-none d-md-block"
                @click="showFilter('eksternal')"
                color="#25695c"
              >
                <v-icon class="mx-2" small>mdi-filter-variant</v-icon> Filter
                Recruitment
              </v-btn>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search here..."
                single-line
                hide-details
              ></v-text-field>
              <v-divider class="mx-2 d-none d-md-block" inset vertical></v-divider>
              <v-btn dark class="mb-2" @click="add()" color="#25695c">
                <v-icon small>mdi-plus</v-icon> Add Item
              </v-btn>

              <!-- Modal Add Edit -->
              <v-dialog persistent v-model="dialog" max-width="800px">
                <v-card>
                  <v-card-title class="headermodalstyle">
                    {{ formTitle }}
                    <v-spacer></v-spacer>
                    <v-btn icon dark large class="right" @click="close()">
                      <v-icon>mdi-close-box-outline</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text class="fontall">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-container fluid>
                        <v-row class="mb-1 mt-0">
                          <h4 style="color: black; font-size: 18px">
                            Identitas Pelamar
                          </h4>
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.nama"
                              outlined
                              label="Nama Job Seeker"
                              class="fontall"
                              color="#25695c"
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.no_ktp"
                              outlined
                              label="No Ktp"
                              class="fontall"
                              color="#25695c"
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.telp"
                              outlined
                              label="No Telp"
                              class="fontall"
                              color="#25695c"
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.email"
                              outlined
                              label="Email"
                              class="fontall"
                              color="#25695c"
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12" class="pa-1">
                            <v-textarea
                              v-model="defaultItem.alamat"
                              outlined
                              label="Alamat"
                              class="fontall"
                              color="#25695c"
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                        <v-row class="mb-1 mt-0">
                          <h4 style="color: black; font-size: 18px">
                            Posisi Dilamar
                          </h4>
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" md="12" class="pa-1">
                            <v-select
                              v-model="defaultItem.code_recruitment"
                              :items="listRekruitmen"
                              item-value="id_recruitment"
                              item-text="nama_recruitment"
                              label="Pilih Recruitment"
                              clearable
                              outlined
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row class="mb-1 mt-0">
                          <h4 style="color: black; font-size: 18px">
                            Berkas Pelamar
                          </h4>
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="3" md="3"  class="pt-0 pb-5" style="align-self: center;">
                            <h4 style="color: black; font-size: 13px">CV/Riwayat Hidup:</h4>
                          </v-col>
                          <v-col cols="12" sm="9" md="9" class="pa-1">
                              <v-file-input
                                  class="pt-1 mt-0"
                                  placeholder="Pilih File Berkas CV/Riwayat Hidup"
                                  prepend-icon="mdi-file-document-multiple-outline"
                                  outlined
                                  v-model="gambarinput1"
                                  v-on:change="pilihdok1"
                              ></v-file-input>
                          </v-col>
                          <v-col v-if='isEdit == true' cols="12" sm="5" md="5"  class="pt-0 pb-5">
                            <h4 style="color: black; font-size: 13px">Dokumen Terupload (CV/Riwayat Hidup):</h4>
                          </v-col> 
                          <v-col v-if='isEdit == true' cols="12" sm="7" md="7"  class="pt-0 pb-5">
                            <div style="display:flex">
                              <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.berkas_1)}}</h4>
                              <v-btn v-if=' defaultItem.berkas_1!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.berkas_1, 'Dok CV '+defaultItem.nama)" color="#25695c">
                                <v-icon small>mdi-download-circle-outline</v-icon> Download File
                              </v-btn>
                            </div>
                          </v-col> 
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="3" md="3"  class="pt-0 pb-5" style="align-self: center;">
                            <h4 style="color: black; font-size: 13px">Pas Foto:</h4>
                          </v-col>
                          <v-col cols="12" sm="9" md="9" class="pa-1">
                              <v-file-input
                                  class="pt-1 mt-0"
                                  placeholder="Pilih File Berkas Pas Foto"
                                  prepend-icon="mdi-file-document-multiple-outline"
                                  outlined
                                  v-model="gambarinput2"
                                  v-on:change="pilihdok2"
                              ></v-file-input>
                          </v-col>
                          <v-col v-if='isEdit == true' cols="12" sm="4" md="4"  class="pt-0 pb-5">
                            <h4 style="color: black; font-size: 13px">Dokumen Terupload (Pas Foto):</h4>
                          </v-col> 
                          <v-col v-if='isEdit == true' cols="12" sm="8" md="8"  class="pt-0 pb-5">
                            <div style="display:flex">
                              <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.berkas_2)}}</h4>
                              <v-btn v-if=' defaultItem.berkas_2!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.berkas_2, 'Pas Foto '+defaultItem.nama)" color="#25695c">
                                <v-icon small>mdi-download-circle-outline</v-icon> Download File
                              </v-btn>
                            </div>
                          </v-col> 
                        </v-row>
                        <v-row>
                        <!-- <v-col cols="12" sm="12" md="12" class="pa-1">
                            <v-file-input
                              v-model="berkas3"
                              label="File Berkas 3"
                              outlined
                              dense
                            ></v-file-input>
                          </v-col> -->
                          <v-col cols="12" sm="3" md="3"  class="pt-0 pb-5" style="align-self: center;">
                            <h4 style="color: black; font-size: 13px">Ijazah:</h4>
                          </v-col>
                          
                          <v-col cols="12" sm="9" md="9" class="pa-1">
                              <v-file-input
                                  class="pt-1 mt-0"
                                  placeholder="Pilih File Berkas Ijazah"
                                  prepend-icon="mdi-file-document-multiple-outline"
                                  outlined
                                  v-model="gambarinput3"
                                  v-on:change="pilihdok3"
                              ></v-file-input>
                          </v-col>
                          <v-col v-if='isEdit == true' cols="12" sm="4" md="4"  class="pt-0 pb-5">
                            <h4 style="color: black; font-size: 13px">Dokumen Terupload (Ijazah):</h4>
                          </v-col> 
                          <v-col v-if='isEdit == true' cols="12" sm="8" md="8"  class="pt-0 pb-5">
                            <div style="display:flex">
                              <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.berkas_3)}}</h4>
                              <v-btn v-if=' defaultItem.berkas_3!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.berkas_3, 'Dok Ijazah '+defaultItem.nama)" color="#25695c">
                                <v-icon small>mdi-download-circle-outline</v-icon> Download File
                              </v-btn>
                            </div>
                          </v-col>                                    
                        </v-row>
                        <v-row class="mb-1 mt-0">
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="red" @click="close">
                      <v-icon left> mdi-close-circle-outline </v-icon> Cancel
                    </v-btn>
                    <v-btn dark :loading="loading" color="#25695c" @click="save('eksternal')">
                      <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-2" @click="detailItem(item)" color="#25695C">
              mdi-information-outline
            </v-icon>
            <v-icon class="mr-1" @click="edit(item)" color="#bf9168">
              mdi-pencil-outline
            </v-icon>
            <v-icon @click="showDeleteModal(item)" color="#d42f2f">
              mdi-delete-outline
            </v-icon>
          </template>
        </v-data-table>

        <v-data-table
          v-if="internaldata == true"
          :headers="headersInternal"
          :items="dataobjectInternal"
          :search="search"
          class="rounded elevation-6 mx-3 pa-1 itemchild"
        >
          <template v-slot:item.target_tanggal_pemenuhan="{ item }">
            {{ gettanggal(item.target_tanggal_pemenuhan) }}
          </template>
          <template v-slot:item.nama_recruitment="{ item }">
            {{ item.nama_recruitment }} {{ getStatusRecr(item.is_dell_recr) }}
          </template>

          <template v-slot:top>
            <v-toolbar flat>
              <v-btn
                dark
                class="mx-1 mt-1 d-none d-md-block"
                @click="showFilter('internal')"
                color="#25695c"
              >
                <v-icon class="mx-2" small>mdi-filter-variant</v-icon> Filter
                Recruitment
              </v-btn>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search here..."
                single-line
                hide-details
              ></v-text-field>
              <v-divider class="mx-2 d-none d-md-block" inset vertical></v-divider>
              <v-btn dark class="mb-2" @click="addInternal()" color="#25695c">
                <v-icon small>mdi-plus</v-icon> Add Item
              </v-btn>

              <!-- Modal Add Edit -->
              <v-dialog persistent v-model="dialogInternal" max-width="800px">
                <v-card>
                  <v-card-title class="headermodalstyle">
                    {{ formTitle }}
                    <v-spacer></v-spacer>
                    <v-btn icon dark large class="right" @click="close()">
                      <v-icon>mdi-close-box-outline</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text class="fontall">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-container fluid>
                        <v-row class="mb-1 mt-0">
                          <h4 style="color: black; font-size: 18px">
                            Pilih Karyawan
                          </h4>
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-select
                              v-model="dept_value"
                              :items="itemsdept"
                              item-value="department_code"
                              item-text="dept_nama"
                              label="Pilih Asal Departmen Karyawan"
                              clearable
                              outlined
                              dense
                              v-on:change="pilihdept"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-select
                              v-model="defaultItem.no_induk_karyawan"
                              :items="itemskaryawan"
                              item-value="no_induk_karyawan"
                              item-text="nama_lengkap"
                              label="Pilih Karyawan"
                              clearable
                              outlined
                              dense
                              v-on:change="pilihkaryawan()"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row class="mb-1 mt-0">
                          <h4 style="color: black; font-size: 18px">
                            Identitas Pelamar
                          </h4>
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.nama"
                              outlined
                              label="Nama Job Seeker"
                              class="fontall"
                              color="#25695c"
                              dense
                              disabled
                              filled
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.no_ktp"
                              outlined
                              label="No Ktp"
                              class="fontall"
                              color="#25695c"
                              dense
                              disabled
                              filled
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.telp"
                              outlined
                              label="No Telp"
                              class="fontall"
                              color="#25695c"
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.email"
                              outlined
                              label="Email"
                              class="fontall"
                              color="#25695c"
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12" class="pa-1">
                            <v-textarea
                              v-model="defaultItem.alamat"
                              outlined
                              label="Alamat"
                              class="fontall"
                              color="#25695c"
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                        <v-row class="mb-1 mt-0">
                          <h4 style="color: black; font-size: 18px">
                            Posisi Dilamar
                          </h4>
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" md="12" class="pa-1">
                            <v-select
                              v-model="defaultItem.code_recruitment"
                              :items="listRekruitmen"
                              item-value="id_recruitment"
                              item-text="nama_recruitment"
                              label="Pilih Recruitment"
                              clearable
                              outlined
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row class="mb-1 mt-0">
                          <h4 style="color: black; font-size: 18px">
                            Berkas Pelamar
                          </h4>
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="3" md="3"  class="pt-0 pb-5" style="align-self: center;">
                            <h4 style="color: black; font-size: 13px">CV/Riwayat Hidup:</h4>
                          </v-col>
                          <v-col cols="12" sm="9" md="9" class="pa-1">
                              <v-file-input
                                  class="pt-1 mt-0"
                                  placeholder="Pilih File Berkas CV/Riwayat Hidup"
                                  prepend-icon="mdi-file-document-multiple-outline"
                                  outlined
                                  v-model="gambarinput1"
                                  v-on:change="pilihdok1"
                              ></v-file-input>
                          </v-col>
                          <v-col v-if='isEdit == true' cols="12" sm="5" md="5"  class="pt-0 pb-5">
                            <h4 style="color: black; font-size: 13px">Dokumen Terupload (CV/Riwayat Hidup):</h4>
                          </v-col> 
                          <v-col v-if='isEdit == true' cols="12" sm="7" md="7"  class="pt-0 pb-5">
                            <div style="display:flex">
                              <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.berkas_1)}}</h4>
                              <v-btn v-if=' defaultItem.berkas_1!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.berkas_1, 'Dok CV '+defaultItem.nama)" color="#25695c">
                                <v-icon small>mdi-download-circle-outline</v-icon> Download File
                              </v-btn>
                            </div>
                          </v-col> 
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="3" md="3"  class="pt-0 pb-5" style="align-self: center;">
                            <h4 style="color: black; font-size: 13px">Pas Foto:</h4>
                          </v-col>
                          <v-col cols="12" sm="9" md="9" class="pa-1">
                              <v-file-input
                                  class="pt-1 mt-0"
                                  placeholder="Pilih File Berkas Pas Foto"
                                  prepend-icon="mdi-file-document-multiple-outline"
                                  outlined
                                  v-model="gambarinput2"
                                  v-on:change="pilihdok2"
                              ></v-file-input>
                          </v-col>
                          <v-col v-if='isEdit == true' cols="12" sm="4" md="4"  class="pt-0 pb-5">
                            <h4 style="color: black; font-size: 13px">Dokumen Terupload (Pas Foto):</h4>
                          </v-col> 
                          <v-col v-if='isEdit == true' cols="12" sm="8" md="8"  class="pt-0 pb-5">
                            <div style="display:flex">
                              <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.berkas_2)}}</h4>
                              <v-btn v-if=' defaultItem.berkas_2!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.berkas_2, 'Pas Foto '+defaultItem.nama)" color="#25695c">
                                <v-icon small>mdi-download-circle-outline</v-icon> Download File
                              </v-btn>
                            </div>
                          </v-col> 
                        </v-row>
                        <v-row>
                        <!-- <v-col cols="12" sm="12" md="12" class="pa-1">
                            <v-file-input
                              v-model="berkas3"
                              label="File Berkas 3"
                              outlined
                              dense
                            ></v-file-input>
                          </v-col> -->
                          <v-col cols="12" sm="3" md="3"  class="pt-0 pb-5" style="align-self: center;">
                            <h4 style="color: black; font-size: 13px">Ijazah:</h4>
                          </v-col>
                          
                          <v-col cols="12" sm="9" md="9" class="pa-1">
                              <v-file-input
                                  class="pt-1 mt-0"
                                  placeholder="Pilih File Berkas Ijazah"
                                  prepend-icon="mdi-file-document-multiple-outline"
                                  outlined
                                  v-model="gambarinput3"
                                  v-on:change="pilihdok3"
                              ></v-file-input>
                          </v-col>
                          <v-col v-if='isEdit == true' cols="12" sm="4" md="4"  class="pt-0 pb-5">
                            <h4 style="color: black; font-size: 13px">Dokumen Terupload (Ijazah):</h4>
                          </v-col> 
                          <v-col v-if='isEdit == true' cols="12" sm="8" md="8"  class="pt-0 pb-5">
                            <div style="display:flex">
                              <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.berkas_3)}}</h4>
                              <v-btn v-if=' defaultItem.berkas_3!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.berkas_3, 'Dok Ijazah '+defaultItem.nama)" color="#25695c">
                                <v-icon small>mdi-download-circle-outline</v-icon> Download File
                              </v-btn>
                            </div>
                          </v-col>                                    
                        </v-row>
                        <v-row class="mb-1 mt-0">
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="red" @click="close">
                      <v-icon left> mdi-close-circle-outline </v-icon> Cancel
                    </v-btn>
                    <v-btn dark :loading="loading" color="#25695c" @click="save('internal')">
                      <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-2" @click="detailItem(item)" color="#25695C">
              mdi-information-outline
            </v-icon>
            <v-icon class="mr-1" @click="editInternal(item)" color="#bf9168">
              mdi-pencil-outline
            </v-icon>
            <v-icon @click="showDeleteModal(item)" color="#d42f2f">
              mdi-delete-outline
            </v-icon>
          </template>
        </v-data-table>

    </v-card>
    

              <!-- Modal Filter Emp -->
              <v-dialog persistent v-model="dialogFilter" max-width="500px">
                <v-card>
                  <v-card-title class="headermodalstyle">
                    Filter Pencarian
                    <v-spacer></v-spacer>
                    <v-btn icon dark large class="right" @click="close()">
                      <v-icon>mdi-close-box-outline</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text class="fontall pb-1">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-container fluid>
                        <!-- <v-row class="mb-3 mt-2 ml-0">
                          <h4>Department</h4>
                          <v-divider class="mx-2 mt-3"></v-divider>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-select
                              v-model="selectDepartment"
                              :items="itemsdept"
                              item-value="department_code"
                              item-text="dept_nama"
                              label="Pilih Department"
                              clearable
                              outlined
                              dense
                            ></v-select>
                          </v-col>
                        </v-row> -->
                        <v-row class="mb-3 mt-2 ml-0">
                          <h4>Rekruitmen</h4>
                          <v-divider class="mx-2 mt-3"></v-divider>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-select
                              v-model="selectRekrutmenFilter"
                              :items="listRekruitmen"
                              item-value="id_recruitment"
                              item-text="nama_recruitment"
                              label="Pilih Nama Rekruitmen"
                              clearable
                              outlined
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="red" @click="close">
                      <v-icon left> mdi-close-circle-outline </v-icon> Cancel
                    </v-btn>
                    <v-btn dark :loading="loading" color="#25695c" @click="cari()">
                      <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                      Cari
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- Modal Detail -->
              <v-dialog persistent v-model="dialogDetail" max-width="1000px">
                <v-card>
                  <v-card-title class="headermodalstyle">
                    Detail Item
                    <v-spacer></v-spacer>
                    <v-btn icon dark large class="right" @click="close()">
                      <v-icon>mdi-close-box-outline</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text class="fontall">
                    <v-row>
                      <v-col cols="12" sm="7" md="7">
                        <v-container fluid>
                          <v-row class="mb-1 mt-0">
                            <h4 style="color: black; font-size: 18px">
                              Identitas Pelamar
                            </h4>
                            <v-divider
                              class="mx-2 mt-3"
                              style="border-color: black"
                            ></v-divider>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" md="6" class="pa-1">
                              <v-text-field
                                v-model="defaultItem.nama"
                                outlined
                                label="Nama Job Seeker"
                                class="fontall"
                                color="#25695c"
                                dense
                                readonly
                                :rules="[(v) => !!v || 'Field is required']"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-1">
                              <v-text-field
                                v-model="defaultItem.no_ktp"
                                outlined
                                label="No Ktp"
                                class="fontall"
                                color="#25695c"
                                dense
                                readonly
                                :rules="[(v) => !!v || 'Field is required']"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-1">
                              <v-text-field
                                v-model="defaultItem.telp"
                                outlined
                                label="No Telp"
                                class="fontall"
                                color="#25695c"
                                dense
                                readonly
                                :rules="[(v) => !!v || 'Field is required']"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pa-1">
                              <v-text-field
                                v-model="defaultItem.email"
                                outlined
                                label="Email"
                                class="fontall"
                                color="#25695c"
                                dense
                                readonly
                                :rules="[(v) => !!v || 'Field is required']"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12" class="pa-1">
                              <v-textarea
                                v-model="defaultItem.alamat"
                                outlined
                                label="Alamat"
                                class="fontall"
                                color="#25695c"
                                dense
                                readonly
                                :rules="[(v) => !!v || 'Field is required']"
                              ></v-textarea>
                            </v-col>
                          </v-row>
                          <v-row class="mb-1 mt-0">
                            <v-divider
                              class="mx-2 mt-3"
                              style="border-color: black"
                            ></v-divider>
                          </v-row>
                        </v-container>
                      </v-col>
                      <v-col cols="12" sm="5" md="5">
                        <v-container fluid>
                          <v-row class="mb-1 mt-0">
                            <h4 style="color: black; font-size: 18px">
                              Data Lamaran
                            </h4>
                            <v-divider
                              class="mx-2 mt-3"
                              style="border-color: black"
                            ></v-divider>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="12" md="12" class="pa-1">
                              <v-text-field
                                v-model="defaultItem.nama_recruitment"
                                outlined
                                label="Pilihan Recruitment"
                                class="fontall"
                                color="#25695c"
                                dense
                                readonly
                                :rules="[(v) => !!v || 'Field is required']"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row class="mb-1 mt-0">
                            <h4 style="color: black; font-size: 18px">
                              Berkas Lamaran
                            </h4>
                            <v-divider
                              class="mx-2 mt-3"
                              style="border-color: black"
                            ></v-divider>
                          </v-row>
                          <v-row>
                            <v-col cols="6" sm="5" md="5" class="pa-1">
                              CV/Riwayat Hidup :
                            </v-col>
                            <v-col cols="6" sm="7" md="7" class="pa-1">                           
                              <div style="display:flex">
                                <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.berkas_1)}}</h4>
                                <v-btn v-if=' defaultItem.berkas_1!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.berkas_1, 'Dok Ijazah '+defaultItem.nama)" color="#25695c">
                                  <v-icon small>mdi-download-circle-outline</v-icon>
                                </v-btn>
                              </div>
                            </v-col>
                            <v-col cols="6" sm="4" md="4" class="pa-1">
                              Pas Foto :
                            </v-col>
                            <v-col cols="6" sm="8" md="8" class="pa-1">                        
                              <div style="display:flex">
                                <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.berkas_2)}}</h4>
                                <v-btn v-if=' defaultItem.berkas_2!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.berkas_2, 'Dok Ijazah '+defaultItem.nama)" color="#25695c">
                                  <v-icon small>mdi-download-circle-outline</v-icon>
                                </v-btn>
                              </div>
                            </v-col>
                            <v-col cols="6" sm="4" md="4" class="pa-1">
                              Ijazah :
                            </v-col>
                            <v-col cols="6" sm="8" md="8" class="pa-1">                       
                              <div style="display:flex">
                                <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.berkas_3)}}</h4>
                                <v-btn v-if=' defaultItem.berkas_3!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.berkas_3, 'Dok Ijazah '+defaultItem.nama)" color="#25695c">
                                  <v-icon small>mdi-download-circle-outline</v-icon>                            </v-btn>
                              </div>
                            </v-col>
                          </v-row>
                          <v-row class="mb-1" style="margin-top: 15px !important">
                            <v-divider
                              class="mx-2 mt-3"
                              style="border-color: black"
                            ></v-divider>
                          </v-row>
                        </v-container>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <!-- Modal Delete -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-text>
                    <v-row class="mb-5 mt-5 ml-0 px-2">
                      <h4>Detail Data</h4>
                      <v-divider class="mx-2 mt-3"></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="px-7 py-0">
                        <v-text-field
                          v-model="defaultItem.nama"
                          label="Nama Job Seeker"
                          outlined
                          readonly
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="px-7 py-0">
                        <v-text-field
                          v-model="defaultItem.no_ktp"
                          label="No KTP"
                          outlined
                          readonly
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="mb-5 mt-2 ml-0 px-2">
                      <v-divider class="mx-2 mt-2"></v-divider>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="red" @click="closeDelete">
                      <v-icon left> mdi-close-circle-outline </v-icon>
                      Cancel
                    </v-btn>
                    <v-btn dark color="#25695c" @click="deleteItemConfirm">
                      <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                      OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- Modal Testing -->
              <v-dialog v-model="dialogTesting" max-width="300px">
                <v-card>
                  <v-card-title class="headline">Sedang Maintenance</v-card-title>
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
import HelperGlobal from "../../services/Helper";
const HelperGlobalService = new HelperGlobal();

export default {
  name: "JobSeeker",
  data: () => ({
    itemsbr: [
      {
        text: "Recruitment",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Job Seeker",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    rules: {
      required: (value) => !!value || "Required.",
      countermin: (value) => value.length > 5 || "Min 6 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    loading: false,
    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDetail: false,
    dialogDelete: false,
    dialogReset: false,
    dialogTesting: false,
    dialogFilter: false,
    dialogInternal: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "ID Job Seeker", value: "id_job_seeker" },
      { text: "Nama", value: "nama" },
      { text: "No Ktp", value: "no_ktp" },
      // { text: "Unit Perusahaan", value: "unit_perusahan_nama" },
      { text: "No Telp", value: "telp" },
      { text: "Email", value: "email" },
      { text: "Rekruitment", value: "nama_recruitment" },
      //   { text: "User ID", value: "username" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    headersInternal: [
      { text: "ID Job Seeker", value: "id_job_seeker" },
      { text: "NIK", value: "no_induk_karyawan" },
      { text: "Nama", value: "nama" },
      { text: "No Ktp", value: "no_ktp" },
      // { text: "Unit Perusahaan", value: "unit_perusahan_nama" },
      { text: "No Telp", value: "telp" },
      { text: "Email", value: "email" },
      { text: "Rekruitment", value: "nama_recruitment" },
      //   { text: "User ID", value: "username" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    dataobject: [],
    dataobjectInternal: [],
    itemsdept:[],
    itemskaryawan:[],

    typeFilter :'eksternal',

    dept_value:'',

    readOnly: {
      id_job_seeker: "",
    },
    defaultItem: {
      id_job_seeker: "-",
      no_ktp: "",
      nama: "",
      telp: "",
      email: "",
      alamat: "",
      code_recruitment: "",
      nama_recruitment:"-",
      berkas_1:'-',
      berkas_2:'-',
      berkas_3:'-',
      no_induk_karyawan:'-',
      type:'eksternal',
    },

    deleteDetailItem: {
      id: "",
    },


    itemstabs: [
      { text: "Pelamar Eksternal", value: "1" },
      { text: "Pelamar Internal", value: "2" },
    ],

    listschedulejobseeker: [],
    berkas1: "",
    berkas2: "",
    berkas3: "",

    gambarinput1:'',
    gambarinput2:'',
    gambarinput3:'',

    fileUploaddok1:'',
    fileUploaddok2:'',
    fileUploaddok3:'',
    fileUploaddok1Ready: false,
    fileUploaddok2Ready: false,
    fileUploaddok3Ready: false,

    itemsRecruitment: [],
    itemsSource: [
      { text: "internal", value: "internal" },
      { text: "eksternal", value: "eksternal" },
    ],

    listRekruitmen:[],

    selectRekrutmenFilter: '',

    AddModal: true,
    valid: true,

    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",

    isEdit: false,

    eksternaldata: true,
    internaldata: false,
  }),

  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    localStorage.removeItem("status");
    this.initialize();
    this.initializeinternal();
    this.GetRecruitment();
    this.GetRecruitmentAll();
    this.getDept();
  },
  setup() {},

  methods: {
    async initialize(val) {
      var val_code = "";
      if (val) {
        val_code = val;
      }
      try {
        const response = await axios.get(this.BaseUrlGet + "GetJobSeekerandRecruitment?rekruitmen="+val_code+"&type=eksternal", {
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
    async initializeinternal(val) {
      var val_code = "";
      if (val) {
        val_code = val;
      }
      try {
        const response = await axios.get(this.BaseUrlGet + "GetJobSeekerandRecruitment?rekruitmen="+val_code+"&type=internal", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.dataobjectInternal = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.dataobjectInternal = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.dataobjectInternal = [];
        }
      }
    },
    async GetRecruitment() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetRecruitment", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsRecruitment = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsRecruitment = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsRecruitment = [];
        }
      }
    },
    async GetRecruitmentAll() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetRecruitmentAll", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.listRekruitmen = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.listRekruitmen = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.listRekruitmen = [];
        }
      }
    },
    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetJobSeekerStatus?id_job_seeker=" +
            this.readOnly.id_job_seeker,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem.id_job_seeker =
            response.data.data.result[0].id_job_seeker;
          this.defaultItem.nama_recruitment = response.data.data.result[0].nama_recruitment;
          this.defaultItem.no_ktp = response.data.data.result[0].no_ktp;
          this.defaultItem.nama = response.data.data.result[0].nama;
          this.defaultItem.telp = response.data.data.result[0].telp;
          this.defaultItem.email = response.data.data.result[0].email;
          this.defaultItem.alamat = response.data.data.result[0].alamat;
          this.defaultItem.code_recruitment =
            response.data.data.result[0].code_recruitment;

          this.listschedulejobseeker =
            response.data.data.result[0].listschedulejobseeker;

            this.defaultItem.berkas_1 = response.data.data.result[0].berkas_1;
            this.defaultItem.berkas_2 = response.data.data.result[0].berkas_2;
            this.defaultItem.berkas_3 = response.data.data.result[0].berkas_3;

          //   if (response.data.data.result.foto == "-") {
          //     this.detailEmp.foto = "/images/noimage.png";
          //   }
          //   this.itemlistanak = response.data.data.result.listAnak;
          //   this.itemlistriwayatkerja =
          //     response.data.data.result.listRiwayatPekerjaan;
          //   this.itemlistpengalamankerja =
          //     response.data.data.result.listPengalamanKerja;
          //   this.detailTask = response.data.data.result.GetDetailTask;
          console.log(this.defaultItem);
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
    async addData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddJobSeeker",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialog = false;
          this.dialogInternal = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses tambah data";
          this.initialize();
          this.initializeinternal();
        } else {
          //   this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal ubah data";
        }
      } catch (error) {
        console.error(error.response.data.data.result);
        console.error('no_ktp ->',("no_ktp" in error.response.data.data.result));
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          if(("no_ktp" in error.response.data.data.result)== true){
            this.snackbar = true;
            this.colorsnackbar = "red";
            this.textsnackbar = "Error, No Ktp Sudah terdaftar sebagai Pelamar";
          }else{
            this.snackbar = true;
            this.colorsnackbar = "red";
            this.textsnackbar = "Gagal tambah data";
          }
        }
      }
    },
    async editData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateJobSeeker",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialog = false;
          this.dialogInternal = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses Ubah data";
          this.initialize();
          this.initializeinternal();
        } else {
          //   this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal ubah data";
        }
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
    async deleteApi() {
      const datapost = {
        id_job_seeker: this.readOnly.id_job_seeker,
        // no_induk_karyawan: this.deleteDetailItem.no_induk_karyawan,
      };
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "DeleteJobSeeker",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menghapus data";

          this.dialogDelete = false;
          this.initialize();
        } else {
          this.dialog = true;
        }
      } catch (error) {
        console.error(error.response.data.data.result);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
        if (error.response.status == 400) {
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = error.response.data.data.result;
        }
      }
    },
    
    async getDept() {
      var div_code = "";
      // if (val) {
      //   div_code = val;
      // }
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetAllDepartment",
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

    async getEmp(val) {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetAllEmployee?divisi_code=&department_code=" + val,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemskaryawan = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemskaryawan = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemskaryawan = [];
        }
      }
    },

    async getDetailKaryawan() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetDetailEmployeeByNIK?NIK=" + this.defaultItem.no_induk_karyawan,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem.nama = response.data.data.result.nama_lengkap;
          this.defaultItem.no_ktp = response.data.data.result.no_ktp;
          this.defaultItem.telp = response.data.data.result.telpon;
          // this.detailEmp = response.data.data.result;
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

    async showFilter(val) {
      this.typeFilter = val;
      // console.log(localStorage.getItem("token"));
      //   await this.resetFilter();
      this.dialogFilter = true;
    },

    async uploadApi(val) {
      const formData = new FormData();
      if(val == 'dok1'){formData.append("file", this.fileUploaddok1);}
      if(val == 'dok2'){formData.append("file", this.fileUploaddok2);}
      if(val == 'dok3'){formData.append("file", this.fileUploaddok3);}
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
          if(val == 'dok1'){this.defaultItem.berkas_1 = response.data.data.result;}
          if(val == 'dok2'){this.defaultItem.berkas_2 = response.data.data.result;}
          if(val == 'dok3'){this.defaultItem.berkas_3 = response.data.data.result;}
          
          console.log(this.defaultItem.foto_barang);
          // this.dialogDelete = false;
          // this.dialog = false;
          // this.initialize();
        } else {
          this.dialog = true;
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    }, 
    
    async downloadFile(val, nama){
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

          // var flagMenu = '';
          // if(this.detailTask.flag_menu){
          //   flagMenu = this.detailTask.flag_menu;
          // }
          // if(this.detailTask.jenis_surat){
          //   flagMenu = this.detailTask.jenis_surat;
          // }
          // var nama_lengkap = '';
          // if(this.detailTask.nama_lengkap){
          //   nama_lengkap = this.detailTask.nama_lengkap;
          // }
          // var judulDownload = '';
          // if(this.defaultItem.judul){
          //   judulDownload = this.defaultItem.judul;
          // }

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", nama+" "+this.getdokname(imagesvalue)+"." + myArray[1]); 
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

    pilihdept(){
      this.getEmp(this.dept_value);
    },

    pilihkaryawan(){
      this.getDetailKaryawan()
    },


    pilihdok1(event) {
      console.log(event);
      if (event != null) {
        this.fileUploaddok1 = event;
        this.fileUploaddok1Ready = true;
      } else {
        this.fileUploaddok1Ready = false;
      }
    },
    pilihdok2(event) {
      console.log(event);
      if (event != null) {
        this.fileUploaddok2 = event;
        this.fileUploaddok2Ready = true;
      } else {
        this.fileUploaddok2Ready = false;
      }
    },
    pilihdok3(event) {
      console.log(event);
      if (event != null) {
        this.fileUploaddok3 = event;
        this.fileUploaddok3Ready = true;
      } else {
        this.fileUploaddok3Ready = false;
      }
    },

    tabsdetail(val) {
      this.changeTabs(val);
    },
    selectedTabs(val) {
      this.changeTabs(val);
    },
    changeTabs(val) {
      if (val == 1) {
        this.eksternaldata = true;
        this.internaldata = false;
        this.initialize('');
      } else {
        this.eksternaldata = false;
        this.internaldata = true;
        this.initializeinternal('');
      }
    },


    selectedDivisi(val) {
      console.log(val);
      this.getDept(val);
    },

    cari() {
      if(this.typeFilter == 'eksternal'){
        this.initialize(this.selectRekrutmenFilter);
      }else{
        this.initializeinternal(this.selectRekrutmenFilter);
      }
      this.dialogFilter = false;
    },

    detailItem(item) {
      this.readOnly.id_job_seeker = item.id_job_seeker;
      this.getDetail();
      this.dialogDetail = true;
      //   this.$router.push("/EmpDetail");
      //   localStorage.setItem("id_emp", item.id);
    },
    add() {
      this.dialog = true;
      this.formTitle = "Add Item";
      this.isEdit = false,
      this.resetItem();
      this.fileUploaddok1Ready = false;
      this.fileUploaddok2Ready = false;
      this.fileUploaddok3Ready = false;
      this.gambarinput1 = '';
      this.gambarinput2 = '';
      this.gambarinput3 = '';
      //   this.$router.push("/EmpAddEdit");
      //   // localStorage.setItem("id_emp", item.id);
      //   localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "add_emp");
    },
    edit(item) {
      this.readOnly.id_job_seeker = item.id_job_seeker;
      this.getDetail();
      this.dialog = true;
      this.isEdit = true,
      this.formTitle = "Edit Item";
      this.fileUploaddok1Ready = false;
      this.fileUploaddok2Ready = false;
      this.fileUploaddok3Ready = false;
      this.gambarinput1 = '';
      this.gambarinput2 = '';
      this.gambarinput3 = '';
      //   this.$router.push("/EmpAddEdit");
      //   localStorage.setItem("id_emp", item.id);
      //   // localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "edit_emp");
    },
    addInternal() {
      this.dialogInternal = true;
      this.formTitle = "Add Item";
      this.isEdit = false,
      this.resetItem();
      this.fileUploaddok1Ready = false;
      this.fileUploaddok2Ready = false;
      this.fileUploaddok3Ready = false;
      this.gambarinput1 = '';
      this.gambarinput2 = '';
      this.gambarinput3 = '';
      //   this.$router.push("/EmpAddEdit");
      //   // localStorage.setItem("id_emp", item.id);
      //   localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "add_emp");
    },
    editInternal(item) {
      this.readOnly.id_job_seeker = item.id_job_seeker;
      this.getDetail();
      this.dialogInternal = true;
      this.isEdit = true,
      this.formTitle = "Edit Item";
      this.fileUploaddok1Ready = false;
      this.fileUploaddok2Ready = false;
      this.fileUploaddok3Ready = false;
      this.gambarinput1 = '';
      this.gambarinput2 = '';
      this.gambarinput3 = '';
      //   this.$router.push("/EmpAddEdit");
      //   localStorage.setItem("id_emp", item.id);
      //   // localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "edit_emp");
    },
    showDeleteModal(item) {
      this.dialogDelete = true;
      this.readOnly.id_job_seeker = item.id_job_seeker;
      this.defaultItem.nama = item.nama;
      this.defaultItem.no_ktp = item.no_ktp;
      //   this.defaultItem = Object.assign({}, item);
      //   this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.dialogInternal = false;
      this.dialogReset = false;
      this.dialogFilter = false;
      this.dialogDetail = false;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.dialogFilter = false;
    },

    async save(val) {
      //   this.loading = true;
      if(val == 'internal'){
        // this.no_induk_karyawan = ''
        this.defaultItem.type = 'internal';
      }else{
        this.defaultItem.no_induk_karyawan = '-';
        this.defaultItem.type = 'eksternal';
      }
      const datapost = this.defaultItem;

      console.log(datapost);

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        if(this.fileUploaddok1Ready == true){
          await this.uploadApi('dok1');
        }
        if(this.fileUploaddok2Ready == true){
          await this.uploadApi('dok2');
        }
        if(this.fileUploaddok3Ready == true){
          await this.uploadApi('dok3');
        }
        console.log(datapost);
        if (this.readOnly.id_job_seeker) {
          console.log("Save Edit");
          this.editData(datapost);
        } else {
          console.log("Save Add");
          this.addData(datapost);
        }
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
      }
    },

    deleteItemConfirm() {
      this.deleteApi();
    },
    resetItem() {
      //   this.defaultItem.user_id = item.user_id;
      this.defaultItem.no_ktp = "";
      this.defaultItem.nama = "";
      this.defaultItem.telp = "";
      this.defaultItem.email = "";
      this.defaultItem.alamat = "";
      this.readOnly.id_job_seeker = "";
      this.$refs.form.resetValidation();
    },

    gettanggal(val) {
      return HelperGlobalService.gettanggal(val);
    },
    getStatusRecr(val){
      if(val == 0){
        return '';
      }else{
        return '(Rekrutmen Dihapus Admin)';
      }
    },
    getdokname(val){
      if(val){
        if(val !='-'){
          const myArray = val.split("/");
          return myArray[2];
        }else{
          return '-'
        }
      }else{
        return '-'
      }
    },
  },
};
</script>

