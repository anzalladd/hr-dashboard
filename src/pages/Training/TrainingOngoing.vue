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
      class="rounded elevation-6 mx-3 pa-1 itemchild"
    >

      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-btn
            dark
            class="mx-1 mt-1 d-none d-md-block"
            @click="showFilter()"
            color="#25695c"
          >
            <v-icon class="mx-2" small>mdi-filter-variant</v-icon> Filter
            Recruitment
          </v-btn> -->
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

          <!-- Modal Add -->
          <v-dialog persistent v-model="dialog" max-width="700px">
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
                    <v-row v-if="value == 'add'" class="mb-1 mt-0">
                      <h4 style="color: black; font-size: 18px">Pilih Training Request</h4>
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                    <v-row v-if="value == 'add'">
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-select
                          v-model="seletedTraining"
                          :items="itemTrainingReq"
                          item-value="id_training"
                          item-text="nama_training"
                          label="Pilih Training Req"
                          clearable
                          outlined
                          dense
                          v-on:change="changeSeletedTraining"
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row class="mb-1 mt-2" >
                      <h4 style="color: black; font-size: 18px">Detail Training</h4>
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.nama_training"
                          outlined
                          label="Nama Training"
                          class="fontall"
                          color="#25695c"
                          dense
                          disabled
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-textarea
                          v-model="defaultItem.desc_training"
                          outlined
                          label="Deskripsi Training"
                          class="fontall"
                          color="#25695c"
                          dense
                          disabled
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.target_peserta"
                          outlined
                          label="Target Peserta"
                          class="fontall"
                          color="#25695c"
                          dense
                          disabled
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.jumlah_peserta"
                          outlined
                          label="Jumlah Peserta"
                          class="fontall"
                          color="#25695c"
                          dense
                          disabled
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="datepicker2"
                                slot="activator"
                                label="Tanggal Mulai"
                                outlined
                                dense
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                disabled
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="datepicker2"
                              @input="menu2 = false"
                            ></v-date-picker>
                          </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-menu
                            v-model="menu3"
                            :close-on-content-click="false"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="datepicker3"
                                slot="activator"
                                label="Tanggal Selesai"
                                outlined
                                dense
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                disabled
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="datepicker3"
                              @input="menu3 = false"
                            ></v-date-picker>
                          </v-menu>
                      </v-col>
                      <!-- <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.tanggal_pelaksanaan"
                          outlined
                          label="Tanggal Pelaksanaan"
                          class="fontall"
                          color="#25695c"
                          dense
                          disabled
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col> -->
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.tempat_pelaksanaan"
                          outlined
                          label="Tempat Pelaksanaan"
                          class="fontall"
                          color="#25695c"
                          dense
                          disabled
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-select
                          v-model="defaultItem.status_pelatih"
                          :items="itemsSource"
                          item-value="value"
                          item-text="text"
                          label="Pilih Status Trainer"
                          clearable
                          outlined
                          dense
                          disabled
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.nama_pelatih"
                          outlined
                          label="Nama Trainer"
                          class="fontall"
                          color="#25695c"
                          dense
                          disabled
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.budget"
                          outlined
                          label="Jumlah Budget"
                          class="fontall"
                          color="#25695c"
                          type="number"
                          dense
                          disabled
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.jam_training"
                          outlined
                          label="Jam Training"
                          class="fontall"
                          color="#25695c"
                          type="number"
                          dense
                          disabled
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
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
                <v-btn dark :loading="loading" color="#25695c" @click="save">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal Edit -->
          <v-dialog v-model="dialogEdit" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >What you want to edit?</v-card-title
              >
              <v-card-actions class="mt-2">
                <v-spacer></v-spacer>
                <v-btn dark color="#1885ab" @click="editTraining">
                  <v-icon left> mdi-pencil-outline </v-icon>
                  Edit Training
                </v-btn>
                <v-btn dark color="#25695c" @click="editPeserta">
                  <v-icon left> mdi-pencil-outline </v-icon>
                  Edit Peserta</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal Edit Training -->
          <v-dialog persistent v-model="dialogEditTraining" max-width="700px">
            <v-card>
              <v-card-title class="headermodalstyle">
                Edit Training
                <v-spacer></v-spacer>
                <v-btn icon dark large class="right" @click="close()">
                  <v-icon>mdi-close-box-outline</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="fontall">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container fluid>
                    <v-row class="mb-1 mt-2" >
                      <h4 style="color: black; font-size: 18px">Detail Training</h4>
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.nama_training"
                          outlined
                          label="Nama Training"
                          class="fontall"
                          color="#25695c"
                          dense
                          
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-textarea
                          v-model="defaultItem.desc_training"
                          outlined
                          label="Deskripsi Training"
                          class="fontall"
                          color="#25695c"
                          dense
                          
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.target_peserta"
                          outlined
                          label="Target Peserta"
                          class="fontall"
                          color="#25695c"
                          dense
                          
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.jumlah_peserta"
                          outlined
                          label="Jumlah Peserta"
                          class="fontall"
                          color="#25695c"
                          dense
                          
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">                        
                        <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="datepicker2"
                                slot="activator"
                                label="Tanggal Mulai"
                                outlined
                                dense
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="datepicker2"
                              @input="menu2 = false"
                            ></v-date-picker>
                          </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">                        
                        <v-menu
                            v-model="menu3"
                            :close-on-content-click="false"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="datepicker3"
                                slot="activator"
                                label="Tanggal Selesai"
                                outlined
                                dense
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="datepicker3"
                              @input="menu3 = false"
                            ></v-date-picker>
                          </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.tempat_pelaksanaan"
                          outlined
                          label="Tempat Pelaksanaan"
                          class="fontall"
                          color="#25695c"
                          dense
                          
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-select
                          v-model="defaultItem.status_pelatih"
                          :items="itemsSource"
                          item-value="value"
                          item-text="text"
                          label="Pilih Status Trainer"
                          clearable
                          outlined
                          dense
                          
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.nama_pelatih"
                          outlined
                          label="Nama Trainer"
                          class="fontall"
                          color="#25695c"
                          dense
                          
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.budget"
                          outlined
                          label="Jumlah Budget"
                          class="fontall"
                          color="#25695c"
                          type="number"
                          dense
                          
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-select
                          v-model="defaultItem.status_training"
                          :items="itemsStatusTraining"
                          item-value="value"
                          item-text="text"
                          label="Pilih Status"
                          clearable
                          outlined
                          dense
                          @change='pilihStatus'
                          
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                      </v-col>
                      <v-col v-if='showSelesai == true' cols="12" sm="6" md="6" class="pa-1">                        
                              <v-file-input
                                class="pt-1 mt-0"
                                label="Dokumen LPJ"
                                placeholder="Pilih File Dok LPJ"
                                prepend-icon="mdi-file-document-multiple-outline"
                                outlined
                                dense
                                v-model="file"
                                v-on:change="pilihfile"
                              ></v-file-input>
                      </v-col>
                      <v-col  v-if='showSelesai == true' cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.realisasi_budget"
                          outlined
                          label="Realisasi Budget"
                          class="fontall"
                          color="#25695c"
                          type="number"
                          dense                          
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
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
                <v-btn dark :loading="loading" color="#25695c" @click="save">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          
          <!-- Modal Edit Peserta -->
          <v-dialog persistent v-model="dialogEditPeserta" max-width="700px">
            <v-card>
              <v-card-title class="headermodalstyle">
                Edit Peserta
                <v-spacer></v-spacer>
                <v-btn icon dark large class="right" @click="close()">
                  <v-icon>mdi-close-box-outline</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="fontall px-1 pb-1">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container fluid>
                    <v-row>
                    <v-col cols="12">
                      <v-data-table
                        :headers="headerslistpeserta"
                        :items="itemlistpeserta"
                        sort-by="calories"
                        class="elevation-1"
                      >
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>Daftar Peserta</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialogpeserta" max-width="500px">
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="primary"
                                  dark
                                  class="mb-2"
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="tambahpeserta"
                                >
                                  Tambah
                                </v-btn>
                              </template>
                              <v-card>
                                <v-card-title>
                                  <span v-if="valuepeserta == 'add'" class="text-h5">Tambah Peserta</span>
                                  <span v-if="valuepeserta == 'edit'" class="text-h5">Edit Keterangan Peserta</span>
                                </v-card-title>
                                <v-card-text class="mt-2">
                                  <v-container>
                                    <v-row>
                                      <v-col v-if="valuepeserta == 'add'" cols="12" sm="6" md="6" class="pa-1">
                                        <v-select
                                          v-model="dept_value"
                                          :items="itemsdept"
                                          item-value="department_code"
                                          item-text="dept_nama"
                                          label="Pilih Departemen"
                                          clearable
                                          outlined
                                          dense
                                          v-on:change="pilihdept"
                                          :rules="[(v) => !!v || 'Field is required']"
                                        ></v-select>
                                      </v-col>
                                      <v-col v-if="valuepeserta == 'add'" cols="12" sm="12" md="12">
                                        <v-combobox
                                          v-model="employee"
                                          :items="itemlistemployee"
                                          item-value="no_induk_karyawan"
                                          item-text="nama_lengkap"
                                          label="Pilih Employee"
                                          outlined
                                        ></v-combobox>
                                      </v-col>
                                      <v-col v-if="valuepeserta != 'add'" cols="4" sm="4" md="4">
                                        <v-text-field
                                          outlined
                                          v-model="editedItempeserta.no_induk_karyawan"
                                          label="NIK"
                                          disabled
                                        ></v-text-field>
                                      </v-col>
                                      <v-col v-if="valuepeserta != 'add'" cols="8" sm="8" md="8">
                                        <v-text-field
                                          outlined
                                          v-model="editedItempeserta.nama_lengkap"
                                          label="Nama"
                                          disabled
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="12" md="12">
                                        <v-textarea
                                          outlined
                                          v-model="editedItempeserta.description"
                                          label="Keterangan"
                                        ></v-textarea>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>

                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="blue darken-1" text @click="closepeserta">
                                    Cancel
                                  </v-btn>
                                  <v-btn color="blue darken-1" text @click="savepeserta">
                                    Save
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogDeletepeserta" max-width="500px">
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
                                    @click="closeDeletepeserta"
                                    >Cancel</v-btn
                                  >
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="deleteItemConfirmpeserta"
                                    >OK</v-btn
                                  >
                                  <v-spacer></v-spacer>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                        <v-icon class="mr-1" @click="editItempeserta(item)" color="#bf9168">
                          mdi-pencil-outline
                        </v-icon>
                        <v-icon @click="deleteItempeserta(item)" color="#d42f2f">
                          mdi-delete-outline
                        </v-icon>
                        </template>
                      </v-data-table>
                    </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="close">
                  <v-icon left> mdi-close-circle-outline </v-icon> Cancel
                </v-btn>
                <v-btn dark :loading="loading" color="#25695c" @click="savepeserta">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Save
                </v-btn>
              </v-card-actions> -->
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
                  <v-col cols="12" sm="6" md="6">
                    <v-container fluid>
                      <v-row class="mb-1 mt-0">
                        <h4 style="color: black; font-size: 18px">
                          Detail Training
                        </h4>
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
                      </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.nama_training"
                          outlined
                          label="Nama Training"
                          class="fontall"
                          color="#25695c"
                          dense
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-textarea
                          v-model="defaultItem.desc_training"
                          outlined
                          label="Deskripsi Training"
                          class="fontall"
                          color="#25695c"
                          dense
                          readonly
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.target_peserta"
                          outlined
                          label="Target Peserta"
                          class="fontall"
                          color="#25695c"
                          dense
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.jumlah_peserta"
                          outlined
                          label="Jumlah Peserta"
                          class="fontall"
                          color="#25695c"
                          dense
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.tanggal_pelaksanaan"
                          outlined
                          label="Tanggal Pelaksanaan"
                          class="fontall"
                          color="#25695c"
                          dense
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.tempat_pelaksanaan"
                          outlined
                          label="Tempat Pelaksanaan"
                          class="fontall"
                          color="#25695c"
                          dense
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-select
                          v-model="defaultItem.status_pelatih"
                          :items="itemsSource"
                          item-value="value"
                          item-text="text"
                          label="Pilih Status Trainer"
                          outlined
                          dense
                          readonly
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.nama_pelatih"
                          outlined
                          label="Nama Trainer"
                          class="fontall"
                          color="#25695c"
                          dense
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.budget"
                          outlined
                          label="Jumlah Budget"
                          class="fontall"
                          color="#25695c"
                          type="number"
                          dense
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.jam_training"
                          outlined
                          label="Jam Training"
                          class="fontall"
                          color="#25695c"
                          type="number"
                          dense
                          readonly
                        ></v-text-field>
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
                  <v-col cols="12" sm="6" md="6">
                    <v-container fluid>
                      <v-row class="mb-1 mt-0">
                        <h4 style="color: black; font-size: 18px">
                          Peserta Training
                        </h4>
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
                      </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">
                                    NIK
                                  </th>
                                  <th class="text-left">
                                    Nama
                                  </th>
                                  <th class="text-left">
                                    Keterangan
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="item in itemlistpeserta"
                                  :key="item.no_induk_karyawan">
                                  <td>{{ item.no_induk_karyawan }}</td>
                                  <td>{{ item.nama_lengkap }}</td>
                                  <td>{{ item.description }}</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
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
                      v-model="deleteDetailItem.nama_training"
                      label="Nama Training"
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
  name: "TrainingOnGoing",
  data: () => ({
    itemsbr: [
      {
        text: "Training",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Training On Going",
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
    dialogEdit: false,
    dialogEditTraining: false,
    dialogEditPeserta : false,
    dialogDetail: false,
    dialogDelete: false,
    dialogReset: false,
    dialogTesting: false,
    dialogFilter: false,
    showSelesai: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "Nama", value: "nama_training" },
      { text: "Jumlah Peserta", value: "jumlah_peserta" },
      { text: "Tanggal", value: "tanggal_pelaksanaan" },
      { text: "Tempat", value: "tempat_pelaksanaan" },
      { text: "Status", value: "status_training" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    dataobject: [],

    seletedTraining:"",
    readOnly: {
      id_training: "",
    },
    defaultItem: {
      id_training: "default",
      nama_training: "",
      desc_training: "",
      target_peserta: "",
      jumlah_peserta: "",
      unit: "default",
      tanggal_pelaksanaan: "",
      tempat_pelaksanaan: "",
      budget: "",
      realisasi_budget:0,
      dok_lpj:'-',
      status_pelatih: "",
      nama_pelatih: "",
      status_approval: "default",
      status_training: "default",
      created_at: "default",
      updated_at: "default",
    },

    itemAdmin:{
      admin_buat: "default",
      admin_update: "default",
    },

    deleteDetailItem: {
      id_training: "",
      nama_training: "",
    },

    itemsdept: [],
    itemsdivisi: [],
    itemsSource: [
      { text: "internal", value: "internal" },
      { text: "eksternal", value: "eksternal" },
    ],
    itemsStatusTraining: [
      { text: "Berjalan", value: "berjalan" },
      { text: "Selesai", value: "selesai" },
    ],

    itemTrainingReq : [],

    datepicker1: "2022-01-01",
    menu1: false,

    datepicker2: "2022-10-01",
    menu2: false,
    datepicker3: "2022-10-01",
    menu3: false,

    selectDivisi: "",
    selectDepartment: "",
    AddModal: true,
    valid: true,

    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",

    itemlistemployee : [],
    employee:"",

    
    fileUpload: '',
    fileUploadReady: false,

    valuepeserta : 'add',

    itemlistpeserta : [],
    dialogpeserta: false,
    dialogDeletepeserta: false,
    headerslistpeserta: [
      {
        text: "NIK",
        align: "start",
        sortable: false,
        value: "no_induk_karyawan",
      },
      { text: "Nama", value: "nama_lengkap" },
      { text: "Keterangan", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedItempeserta: {
      id :"",
      no_induk_karyawan: "",
      nama_lengkap: "-",
      description: "-",
    }
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
    this.getTrainingReq();
    this.getDept();
    this.getEmployee();
  },
  setup() {},

  methods: {
    async initialize() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetTraining?status_training=berjalan",
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
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
    async getTrainingReq() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetTrainingReq?status_training=Disetujui",
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemTrainingReq = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemTrainingReq = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemTrainingReq = [];
        }
      }
    },
    async getEmployee(val) {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetAllEmployee?divisi_code=&department_code=" + val,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemlistemployee = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemlistemployee = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemlistemployee = [];
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
    async getDept() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAllDepartment", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
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
    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetDetailTraining?id_training=" +
            this.readOnly.id_training,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = response.data.data.result.GetTraining;
          this.itemAdmin.admin_buat = response.data.data.result.GetAdminBuat.name;
          // this.itemAdmin.admin_update = response.data.data.result.GetAdminUpdate.name;
          this.itemlistpeserta = response.data.data.result.GetTrainingPeserta;

          console.log(this.itemlistpeserta);

          this.datepicker2 = this.defaultItem.tanggal_mulai;
          this.datepicker3 = this.defaultItem.tanggal_selesai;
          //   if (response.data.data.result.foto == "-") {
          //     this.detailEmp.foto = "/images/noimage.png";
          //   }
          //   this.itemlistanak = response.data.data.result.listAnak;
          //   this.itemlistriwayatkerja =
          //     response.data.data.result.listRiwayatPekerjaan;
          //   this.itemlistpengalamankerja =
          //     response.data.data.result.listPengalamanKerja;
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
    async getDetailTrainingReq() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetDetailTrainingReq?id_training=" +
            this.seletedTraining,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = response.data.data.result.GetTraining;
          this.itemAdmin.admin_buat = response.data.data.result.GetAdminBuat.name;
          this.itemAdmin.admin_update = response.data.data.result.GetAdminUpdate.name;

          console.log(this.itemAdmin.admin_buat);
          this.datepicker2 = this.defaultItem.tanggal_mulai;
          this.datepicker3 = this.defaultItem.tanggal_selesai;
          console.log(this.defaultItem);

          //   if (response.data.data.result.foto == "-") {
          //     this.detailEmp.foto = "/images/noimage.png";
          //   }
          //   this.itemlistanak = response.data.data.result.listAnak;
          //   this.itemlistriwayatkerja =
          //     response.data.data.result.listRiwayatPekerjaan;
          //   this.itemlistpengalamankerja =
          //     response.data.data.result.listPengalamanKerja;
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
    async addData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddTraining",
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
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses tambah data";
          this.initialize();
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
    async editData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateTraining",
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
          this.dialogEditTraining = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses tambah data";
          this.initialize();
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
        id_training: this.readOnly.id_training,
        // no_induk_karyawan: this.deleteDetailItem.no_induk_karyawan,
      };
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "DeleteTraining",
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
          this.defaultItem.dok_lpj = response.data.data.result;
          // console.log(this.defaultItem.foto_barang);
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

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Dokumen  "+nama+"." + myArray[1]); 
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
      this.getEmployee(this.dept_value);
    },

    pilihStatus(){
      if(this.defaultItem.status_training == 'selesai'){this.showSelesai = true;}
      else{this.showSelesai = false;}
    },
    pilihfile(event) {
      console.log(event);
      if (event != null) {
        this.fileUpload = event;
        this.fileUploadReady = true;
      } else {
        this.fileUploadReady = false;
      }
    },

    async showFilter() {
      // console.log(localStorage.getItem("token"));
      //   await this.resetFilter();
      this.dialogFilter = true;
    },

    selectedDivisi(val) {
      console.log(val);
      this.getDept(val);
    },

    cari() {
      this.initialize(this.selectDepartment);
      this.dialogFilter = false;
    },

    changeSeletedTraining(){
      this.getDetailTrainingReq();
    },

    detailItem(item) {
      this.readOnly.id_training = item.id_training;
      this.getDetail();
      this.dialogDetail = true;
      //   this.$router.push("/EmpDetail");
      //   localStorage.setItem("id_emp", item.id);
    },
    add() {
      this.dialog = true;
      this.formTitle = "Add Item";
      this.value = 'add';
      this.resetItem();
      //   this.$router.push("/EmpAddEdit");
      //   // localStorage.setItem("id_emp", item.id);
      //   localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "add_emp");
    },
    edit(item) {
      this.readOnly.id_training = item.id_training;
      this.value = 'edit';
      this.dialogEdit = true;
      this.formTitle = "Edit Item";
      //   this.$router.push("/EmpAddEdit");
      //   localStorage.setItem("id_emp", item.id);
      //   // localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "edit_emp");
    },
    editTraining(){
      this.getDetail();
      this.dialogEdit = false;
      this.dialogEditTraining = true;
    },
    editPeserta(){
      this.getDetail();
      this.dialogEdit = false;
      this.dialogEditPeserta = true;
    },
    showDeleteModal(item) {
      this.dialogDelete = true;
      this.readOnly.id_recruitment = item.id_recruitment;
      this.defaultItem.nama_recruitment = item.nama_recruitment;
      this.defaultItem.jabatan = item.jabatan;
      this.defaultItem.jumlah_kebutuhan = item.jumlah_kebutuhan;
      //   this.defaultItem = Object.assign({}, item);
      //   this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.dialogEdit = false;
      this.dialogEditTraining = false;
      this.dialogEditPeserta = false;
      this.dialogReset = false;
      this.dialogFilter = false;
      this.dialogDetail = false;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.dialogFilter = false;
    },

    async save() {
      //   this.loading = true;

      this.defaultItem.tanggal_mulai = this.datepicker2;
      this.defaultItem.tanggal_selesai = this.datepicker3;
      this.defaultItem.tanggal_pelaksanaan = this.gettanggal(this.datepicker2) + ' sampai ' + this.gettanggal(this.datepicker3)
      const datapost = this.defaultItem;
      console.log(datapost);

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {

        console.log(datapost);
        if (this.readOnly.id_training) {
          console.log("Save Edit");
          if(this.fileUploadReady == true){await this.uploadApi()}
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
      this.defaultItem.nama_training = "";
      this.defaultItem.desc_training = "";
      this.defaultItem.target_peserta = "";
      this.defaultItem.jumlah_peserta = "";
      this.defaultItem.tanggal_pelaksanaan = "";
      this.defaultItem.tempat_pelaksanaan = "";
      this.defaultItem.budget = "";
      this.defaultItem.status_pelatih = "";
      this.defaultItem.nama_pelatih = "";

      this.readOnly.id_training = "";
      this.$refs.form.resetValidation();
    },

    gettanggal(val) {
      return HelperGlobalService.gettanggal(val);
    },

    
    deleteItempeserta(item) {
      // this.editedIndexpeserta = this.itemlistpeserta.indexOf(item);
      this.editedItempeserta = Object.assign({}, item);
      this.dialogDeletepeserta = true;
    },
    async deleteItemConfirmpeserta() {
      const datapost = {
        id: this.editedItempeserta.id,
      };
      try {
        const response = await axios.post(
          this.BaseUrlGet + 'DeletePesertaTraining',
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          // this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses tambah data";
          this.getDetail();
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
      this.closeDeletepeserta();
    },
    closepeserta() {
      this.dialogpeserta = false;
    },
    closeDeletepeserta() {
      this.dialogDeletepeserta = false;
      this.$nextTick(() => {
        this.editedItempeserta = Object.assign({}, this.defaultItempeserta);
        this.editedIndexpeserta = -1;
      });
    },
    tambahpeserta(){
      this.editedItempeserta.id = '';
      this.valuepeserta = 'add';
    },
    editItempeserta(item){
      this.dialogpeserta = true;
      this.editedItempeserta = item;
      this.valuepeserta = 'edit';
    },
    async savepeserta() {
      var endpoint = "AddPesertaTraining";
      if(this.editedItempeserta.id){
        var endpoint = "UpdatePesertaTraining";
      }else{
        this.editedItempeserta.no_induk_karyawan = this.employee.no_induk_karyawan;
      }
      const datapost = {
        id: this.editedItempeserta.id,
        emp_nik: this.editedItempeserta.no_induk_karyawan,
        code_training: this.readOnly.id_training,
        image_sertifikat: '-',
        description: this.editedItempeserta.description,
      };
      try {
        const response = await axios.post(
          this.BaseUrlGet + endpoint,
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          // this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses tambah data";
          this.getDetail();
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
      this.closepeserta();
    },
  },
};
</script>

