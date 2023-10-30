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

          <!-- Modal Add Edit -->
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
                    <v-row class="mb-1 mt-0">
                      <h4 style="color: black; font-size: 18px">Training Request</h4>
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
                        <!-- <v-text-field
                          v-model="defaultItem.tanggal_mulai"
                          outlined
                          label="Tanggal Mulai"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field> -->
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
                        <!-- <v-text-field
                          v-model="defaultItem.tanggal_selesai"
                          outlined
                          label="Tanggal Selesai"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field> -->
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
                      <v-col cols="12" sm="6" md="6" class="pa-1">                        
                              <v-file-input
                                class="pt-1 mt-0"
                                label="Dokumen TNA"
                                placeholder="Pilih File Dok TNA"
                                prepend-icon="mdi-file-document-multiple-outline"
                                outlined
                                dense
                                v-model="file"
                                v-on:change="pilihfile"
                              ></v-file-input>
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

          <!-- Modal Detail -->
          <v-dialog persistent v-model="dialogDetail" max-width="800px">
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
                  <v-col cols="12" sm="12" md="12">
                    <v-container fluid>
                      <v-row class="mb-1 mt-0">
                        <h4 style="color: black; font-size: 18px">
                          Training Request
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
                          v-model="defaultItem.tanggal_mulai"
                          outlined
                          label="Tanggal Mulai"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                        <!-- <v-text-field
                          v-model="defaultItem.tanggal_pelaksanaan"
                          outlined
                          label="Tanggal Pelaksanaan"
                          class="fontall"
                          color="#25695c"
                          dense
                          readonly
                        ></v-text-field> -->
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.tanggal_selesai"
                          outlined
                          label="Tanggal Selesai"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                        <!-- <v-text-field
                          v-model="defaultItem.tanggal_pelaksanaan"
                          outlined
                          label="Tanggal Pelaksanaan"
                          class="fontall"
                          color="#25695c"
                          dense
                          readonly
                        ></v-text-field> -->
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
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                      </v-col>
                      
                          <v-col style="margin-bottom: 20px" cols="6" sm="5" md="5" class="pa-1">
                            Dokumen TNA:
                          </v-col>
                          <v-col cols="6" sm="7" md="7" class="pa-1">                        
                            <div style="display:flex">
                              <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.dok_tna)}}</h4>
                              <v-btn v-if=' defaultItem.dok_tna!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.dok_tna, defaultItem.nama_training)" color="#25695c">
                                <v-icon small>mdi-download-circle-outline</v-icon> Download File
                              </v-btn>
                            </div>
                          </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="itemAdmin.admin_buat"
                          outlined
                          label="Pembuat"
                          class="fontall"
                          color="#25695c"
                          dense
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.status_approval"
                          outlined
                          label="Status Approval"
                          class="fontall"
                          color="#25695c"
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
                      v-model="defaultItem.nama_training"
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
  name: "TrainingRequest",
  data: () => ({
    itemsbr: [
      {
        text: "Training",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Training Request",
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
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "Nama", value: "nama_training" },
      { text: "Jumlah Peserta", value: "jumlah_peserta" },
      { text: "Tanggal", value: "tanggal_pelaksanaan" },
      { text: "Tempat", value: "tempat_pelaksanaan" },
      { text: "Status", value: "status_approval" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    dataobject: [],

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
      tanggal_mulai:"",
      tanggal_selesai:"",
      tempat_pelaksanaan: "",
      budget: "",
      status_pelatih: "",
      nama_pelatih: "",
      dok_tna:'-',
      jam_training:0,
      status_approval: "default",
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
    
    fileUpload: '',
    fileUploadReady: false,
    file:'',
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
    this.getDept();
  },
  setup() {},

  methods: {
    async initialize() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetTrainingReq?",
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
            "GetDetailTrainingReq?id_training=" +
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
          this.itemAdmin.admin_update = response.data.data.result.GetAdminUpdate.name;

          console.log(this.itemAdmin.admin_buat);

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
    async addData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddTrainingReq",
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
          this.BaseUrlGet + "UpdateTrainingReq",
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
    async deleteApi() {
      const datapost = {
        id_training: this.readOnly.id_training,
        // no_induk_karyawan: this.deleteDetailItem.no_induk_karyawan,
      };
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "DeleteTrainingReq",
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
          this.defaultItem.dok_tna = response.data.data.result;
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

    async showFilter() {
      // console.log(localStorage.getItem("token"));
      //   await this.resetFilter();
      this.dialogFilter = true;
    },

    selectedDivisi(val) {
      console.log(val);
      this.getDept(val);
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

    cari() {
      this.initialize(this.selectDepartment);
      this.dialogFilter = false;
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
      this.resetItem();
      this.file= '';
      //   this.$router.push("/EmpAddEdit");
      //   // localStorage.setItem("id_emp", item.id);
      //   localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "add_emp");
    },
    edit(item) {
      this.readOnly.id_training = item.id_training;
      this.getDetail();
      this.dialog = true;
      this.formTitle = "Edit Item";
      this.file= '';
      //   this.$router.push("/EmpAddEdit");
      //   localStorage.setItem("id_emp", item.id);
      //   // localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "edit_emp");
    },
    showDeleteModal(item) {
      this.dialogDelete = true;
      this.readOnly.id_training = item.id_training;
      this.defaultItem.nama_training = item.nama_training;
      //   this.defaultItem = Object.assign({}, item);
      //   this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.dialogReset = false;
      this.dialogFilter = false;
      this.dialogDetail = false;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.dialogFilter = false;
    },

    async save() {
      //   this.loading = true;'
      this.defaultItem.tanggal_mulai = this.datepicker2;
      this.defaultItem.tanggal_selesai = this.datepicker3;
      this.defaultItem.tanggal_pelaksanaan = this.gettanggal(this.datepicker2) + ' sampai ' + this.gettanggal(this.datepicker3)
      const datapost = this.defaultItem;
      console.log(datapost);

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        if(this.fileUploadReady == true){await this.uploadApi()}
        console.log(datapost);
        if (this.readOnly.id_training) {
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

