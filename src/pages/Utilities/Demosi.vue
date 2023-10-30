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

      <template v-slot:item.jabatan_lama="{ item }">
        {{ item.jabatan_lama }} <br> ({{ item.nama_dept_lama }})
      </template><template v-slot:item.jabatan_baru="{ item }">
        {{ item.jabatan_baru }} <br> ({{ item.nama_dept_baru }})
      </template>
      <template v-slot:item.tanggal_ditetapkan="{ item }">
        {{ gettanggal(item.tanggal_ditetapkan) }}
      </template>
      <template v-slot:item.tanggal_mulai="{ item }">
        {{ gettanggal(item.tanggal_mulai) }}
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-btn dark color="#4c9faf" class="center" @click="showDokumen()">
              Dokumen Contoh
          </v-btn>
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
                {{ formTitle }} {{itemsbr[1].text}}
                <v-spacer></v-spacer>
                <v-btn icon dark large class="right" @click="close()">
                  <v-icon>mdi-close-box-outline</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="fontall">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-combobox
                            v-model="selectedEmployee"
                            :items="itemsemp"
                            item-value="no_induk_karyawan"
                            item-text="nama_lengkap"
                            label="Pilih Karyawan"
                            v-on:change="selectedEmp()"
                            outlined
                          :disabled='isDisableDetail'
                          :filled='isDisableDetail'
                        ></v-combobox>                                        
                      </v-col>
                    </v-row>
                    <v-row class="mb-1 mt-0">
                      <h4 style="color: black; font-size: 18px">Pekerjaan Sebelumnya</h4>
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="defaultItem.no_induk_karyawan"
                          outlined
                          label="NIK"
                          class="fontall"
                          color="#25695c"
                          disabled
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="defaultItem.jabatan_lama"
                          outlined
                          label="Jabatan"
                          class="fontall"
                          color="#25695c"
                          disabled
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="defaultItem.nama_divisi_lama"
                          outlined
                          label="Divisi"
                          class="fontall"
                          color="#25695c"
                          disabled
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="defaultItem.nama_dept_lama"
                          outlined
                          label="Departement"
                          class="fontall"
                          color="#25695c"
                          disabled
                          filled
                        ></v-text-field>
                      </v-col>
                      
                    </v-row>
                    <v-row class="mb-1 mt-0">
                      <h4 style="color: black; font-size: 18px">Pekerjaan Baru</h4>
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="defaultItem.divisi_baru"
                          :items="itemsdivisi"
                          item-value="divisi_code"
                          item-text="nama"
                          v-on:change="selectedDivisi"
                          label="Pilih Divisi"
                          clearable
                          outlined
                          :disabled='isDisableDetail'
                          :filled='isDisableDetail'
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="defaultItem.departement_baru"
                          :items="itemsdept"
                          item-value="department_code"
                          item-text="dept_nama"
                          label="Pilih Departement"
                          clearable
                          outlined
                          :disabled='isDisableDept'
                          :filled='isDisableDept'
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="defaultItem.jabatan_baru"
                          outlined
                          label="Jabatan Baru"
                          class="fontall"
                          color="#25695c"
                          :disabled='isDisableDetail'
                          :filled='isDisableDetail'
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row> 
                      <v-col cols="12" sm="6" md="6">
                        <v-menu
                            v-model="menu1"
                            transition="scale-transition"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="datepicker1"
                                slot="activator"
                                label="Tanggal Ditetapkan"
                                outlined
                                readonly
                                v-bind="attrs"
                                v-on="on"
                          :disabled='isDisableDetail'
                          :filled='isDisableDetail'
                            ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="datepicker1"
                                @input="menu1 = false"
                                @change='changefromdate()'
                            ></v-date-picker>
                        </v-menu>
                      </v-col> 
                      <v-col cols="12" sm="6" md="6">
                        <v-menu
                            v-model="menu2"
                            transition="scale-transition"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="datepicker2"
                                slot="activator"
                                label="Tanggal Mulai Kerja"
                                outlined
                                readonly
                                v-bind="attrs"
                                v-on="on"
                          :disabled='isDisableDetail'
                          :filled='isDisableDetail'
                            ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="datepicker2"
                                @input="menu2 = false"
                                @change='changefromdate()'
                            ></v-date-picker>
                        </v-menu>
                      </v-col> 
                    </v-row>
                    <v-row class="mb-1 mt-0">
                      <h4 style="color: black; font-size: 18px">Dokumen Pendukung</h4>
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                    <v-row> 
                      <v-col cols="12" sm="12" md="12" class="py-0">
                            <v-file-input
                              class="pt-1 mt-0"
                              placeholder="Pilih Foto/Gambar"
                              prepend-icon="mdi-file-document-multiple-outline"
                              outlined
                              v-model="gambarinput"
                              v-on:change="pilihgambar"
                          :disabled='isDisableDetail'
                          :filled='isDisableDetail'
                            ></v-file-input>
                      </v-col> 
                      <v-col cols="12" sm="4" md="4"  class="pt-0 pb-5">
                        <h4 style="color: black; font-size: 13px">Dokumen Terupload :</h4>
                      </v-col> 
                      <v-col cols="12" sm="8" md="8"  class="pt-0 pb-5">
                        <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.dok_1)}}</h4>
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
              <v-card-actions v-if="isDisableDetail == false">
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
                    <h4>{{itemsbr[1].text}} - {{defaultItem.nama_lengkap}} ({{defaultItem.no_induk_karyawan}})</h4>
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

          <!-- Modal File -->
          <v-dialog v-model="dialogDokumen" max-width="500px">
            <v-card>              
              <v-card-title class="headermodalstyle">
                Dokumen Pendukung
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="#466ce7" @click="showUploadDokumen">
                  <v-icon left> mdi-upload </v-icon>
                  Upload Dok
                </v-btn>
                <v-btn dark color="#146c3e" @click="downloadFileDokContoh">
                  <v-icon left> mdi-download </v-icon>
                  Download Dok</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal Upload Dokumen -->
          <v-dialog v-model="dialogUploadDokumen" max-width="500px">
            <v-card>
              <v-card-title class="headermodalstyle">
                Upload File Dokumen Contoh
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>                
                <v-row> 
                  <v-col cols="12" sm="12" md="12" class="py-0">
                    <v-file-input
                        class="pt-1 mt-0"
                        placeholder="Pilih File"
                        prepend-icon="mdi-file-document-multiple-outline"
                        outlined
                        v-model="filedokinput"
                        v-on:change="pilihfiledokumen"
                    ></v-file-input>
                  </v-col> 
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="#146c3e" @click="uploadFileDokContoh">
                  Simpan
                </v-btn>
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
  name: "Demosi",
  data: () => ({
    itemsbr: [
      {
        text: "Utilitas",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Demosi Karyawan",
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
      { text: "Nama Karyawan", value: "nama_lengkap" },
      { text: "Jabatan Awal", value: "jabatan_lama" },
      { text: "Jabatan Baru", value: "jabatan_baru" },
      { text: "Tgl Ditetapkan", value: "tanggal_ditetapkan" },
      { text: "Tgl Mulai Kerja", value: "tanggal_mulai" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    dataobject: [],

    readOnly: {
      id: "",
    },
    defaultItem: {
      id: "-",
      jabatan_id: "-",
      emp_nik:"",
      divisi_lama: "",
      departement_lama: "",
      jabatan_lama: "",
      nama_divisi_lama: "",
      nama_dept_lama: "",
      divisi_baru: "",
      departement_baru: "",
      jabatan_baru: "",
      nama_divisi_baru: "-",
      nama_dept_baru: "-",
      tanggal_ditetapkan: "",
      tanggal_mulai: "",
      dok_1: "-",
      dok_2: "-",
      status: "-",
      flag_menu: "",
      nama_lengkap: "-",
      no_induk_karyawan: "",
      no_ktp: "-",
    },

    itemAdmin:{
      admin_buat: "default",
      admin_update: "default",
    },

    deleteDetailItem: {
      id: "",
      nama_training: "",
    },

    itemsemp: [],
    itemsdept: [],
    itemsdivisi: [],
    itemsSource: [
      { text: "internal", value: "internal" },
      { text: "eksternal", value: "eksternal" },
    ],

    datepicker1: new Date().toISOString().substr(0, 10),
    menu1: false,
    datepicker2: new Date().toISOString().substr(0, 10),
    menu2: false,

    selectDivisi: "",
    selectDepartment: "",
    AddModal: true,
    valid: true,

    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",

    selectedEmployee: [],

    isDisableDept: true,
    isDisableDetail: false,
    
    imagesResult:'-',
    imagesReturnBase64:'',
    imagesShow:'/images/noimage.png',
    imagesShow2:'/images/noimage.png',
    fileUpload:'',
    gambarinput:'',

    dialogDokumen: false,
    dialogUploadDokumen : false,
    menu_id : 'demosi',
    path_dok_contoh : '',
    filedokinput: '',
    fileUploadDok:'',
    fileUploadDokReady: false,
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
    this.getDivisi();
    this.getEmp();
    // this.getDept();
  },
  setup() {},

  methods: {
    async initialize() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetPAJabatanKaryawan?flag_menu=Demosi_Karyawan",
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
    async getEmp() {
      try {
        const response = await axios.get(this.BaseUrlGet +  
        "GetAllEmployee", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsemp = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsemp = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsemp = [];
        }
      }
    },
    async addData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddPAJabatanKaryawan",
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
        const response = await axios.put(
          this.BaseUrlGet + "EditPAJabatanKaryawan/"+this.readOnly.id,
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
          this.textsnackbar = "Sukses ubah data";
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
        id_training: this.readOnly.id,
        // no_induk_karyawan: this.deleteDetailItem.no_induk_karyawan,
      };
      // this.dialogDetail = false;
      console.log(this.authtoken)
      try {
        const response = await axios.delete(
          this.BaseUrlGet + "DeletePAJabatanKaryawan/"+this.readOnly.id,
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
        // console.error(error.response.data.data.result);
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

    async showFilter() {
      // console.log(localStorage.getItem("token"));
      //   await this.resetFilter();
      this.dialogFilter = true;
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
          this.imagesResult = response.data.data.result;
          this.defaultItem.dok_1 = response.data.data.result;
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
          this.imagesReturnBase64 = "data:image/jpg;base64," + response.data.data.result;
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


    async getDetailFileDokContoh(){
      try {
        const response = await axios.get(this.BaseUrlGet + "GetMenuDokumenDetail/"+this.menu_id, {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.path_dok_contoh = response.data.data.result.GetPathMenuDokumen.path_dok;
        } else {
          console.log("Kosong");
          this.path_dok_contoh = '';
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.path_dok_contoh = '';
        }
      }
    },
    async EditPathMenuDokumen() {
      // this.dialogDetail = false;
       const datapost = {
        path_dok: this.path_dok_contoh,
      };
      try {
        const response = await axios.put(
          this.BaseUrlGet + "EditPathMenuDokumen/"+this.menu_id,
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
          this.textsnackbar = "Sukses ubah data";
          this.dialogDokumen = false;
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
    async downloadFileDokContoh(){
      await this.getDetailFileDokContoh();
      
      var imagesvalue = this.path_dok_contoh;
      var nama = 'Contoh Dok '+this.itemsbr[1].text;

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
          link.setAttribute("download", nama+"." + myArray[1]); 
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
    async uploadFileDokContoh(){
      console.log(this.fileUploadDokReady);
       if(this.fileUploadDokReady == true){
            const formData = new FormData();
            formData.append("file", this.fileUploadDok);
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
                this.path_dok_contoh = response.data.data.result;

                await this.EditPathMenuDokumen();

                this.snackbar = true;
                this.colorsnackbar = "green";
                this.textsnackbar = "Sukses upload";

                
                this.dialogUploadDokumen = false;
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
       }else{
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = 'Dokumen Kosong, Gagal Simpan';
       }
    },    
    showUploadDokumen(){
      console.log(this.User.role_code)
      if(this.User.role_code == 1 || this.User.role_code == 2 || this.User.role_code == 99){
        this.dialogUploadDokumen = true;
        this.dialogDokumen = false;
        this.filedokinput = '';
        this.fileUploadDok = '';
        this.fileUploadDokReady = false;
      }else{
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = 'Yang bisa Upload hanya role manager';
      }
    },
    showDokumen(){
      this.dialogDokumen = true;
    },
    pilihfiledokumen(event) {
      if (event != null) {
        this.fileUploadDok = event;
        this.fileUploadDokReady = true;
      } else {
        this.fileUploadDokReady = false;
      }
    },

    selectedDivisi(val) {
      console.log(val);
      if(val){
        this.getDept(val);
        this.isDisableDept = false;
      }else{
        this.isDisableDept = true;
        this.defaultItem.departement_baru = '';
      }
    },
    selectedEmp() {
      console.log(this.selectedEmployee);
      if(this.selectedEmployee){
        this.defaultItem.no_induk_karyawan = this.selectedEmployee.no_induk_karyawan;
        this.defaultItem.emp_nik = this.selectedEmployee.no_induk_karyawan;        
        this.defaultItem.jabatan_lama = this.selectedEmployee.jabatan;
        this.defaultItem.divisi_lama = this.selectedEmployee.divisi_code;
        this.defaultItem.nama_divisi_lama = this.selectedEmployee.divisi_nama;
        this.defaultItem.departement_lama = this.selectedEmployee.department_code;
        this.defaultItem.nama_dept_lama = this.selectedEmployee.dept_nama;
      }
      // this.getDept(val);
      // this.isDisableDept = false;
    },
    pilihgambar(event) {
      console.log(event);
      if (event != null) {
        this.imagesShow = URL.createObjectURL(event);
        console.log(this.defaultItem.gambarshow);
        this.fileUpload = event;
        this.fileUploadReady = true;
        // this.filephotoarray.push("lahan1");
      } else {
        this.imagesShow = "/images/noimage.png";
        this.fileUploadReady = false;
      }
    },

    cari() {
      this.initialize(this.selectDepartment);
      this.dialogFilter = false;
    },

    detailItem(item) {
      this.readOnly.id = item.id;
      this.isDisableDetail = true;
      this.readOnly.id = item.id;
      this.defaultItem = item;
      this.getDept(item.divisi_baru);
      this.selectedEmployee = {no_induk_karyawan:item.no_induk_karyawan, nama_lengkap:item.nama_lengkap}
      this.datepicker1 = item.tanggal_ditetapkan;
      this.datepicker2 = item.tanggal_mulai;
      this.gambarinput = '';
      this.dialog = true;
      this.formTitle = "Detail Item";
      //   this.$router.push("/EmpDetail");
      //   localStorage.setItem("id_emp", item.id);
    },
    add() {
      this.dialog = true;
      this.formTitle = "Add Item";
      this.isDisableDept = true;
      this.isDisableDetail = false;
      this.readOnly.id = "";
      this.gambarinput = '';
      // this.defaultItem.dok1 = "";
      this.resetItem();
      //   this.$router.push("/EmpAddEdit");
      //   // localStorage.setItem("id_emp", item.id);
      //   localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "add_emp");
    },
    edit(item) {
      this.readOnly.id = item.id;
      this.defaultItem = item;
      this.getDept(item.divisi_baru);
      this.selectedEmployee = {no_induk_karyawan:item.no_induk_karyawan, nama_lengkap:item.nama_lengkap}
      this.datepicker1 = item.tanggal_ditetapkan;
      this.datepicker2 = item.tanggal_mulai;
      this.gambarinput = '';
      this.fileUploadReady = false;
        this.isDisableDept = false;
      this.isDisableDetail = false;
      // this.getDetail();
      this.dialog = true;
      this.formTitle = "Edit Item";
      //   this.$router.push("/EmpAddEdit");
      //   localStorage.setItem("id_emp", item.id);
      //   // localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "edit_emp");
    },
    showDeleteModal(item) {
      this.dialogDelete = true;
      this.readOnly.id = item.id;
      this.defaultItem = item;
      //   this.defaultItem = Object.assign({}, item);
      //   this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.dialogReset = false;
      this.dialogFilter = false;
      this.dialogDetail = false;
      this.dialogDokumen = false;
          this.initialize();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.dialogFilter = false;
      this.dialogDokumen = false;
    },

    async save() {
      //   this.loading = true;

      this.defaultItem.tanggal_ditetapkan = this.datepicker1;
      this.defaultItem.tanggal_mulai = this.datepicker2;
      this.defaultItem.flag_menu = 'Demosi_Karyawan'
      const datapost = this.defaultItem;
      
      console.log(datapost);

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
          if(this.fileUploadReady == true){
            await this.uploadApi();
            console.log(datapost);
            if (this.readOnly.id) {
              console.log("Save Edit");
              this.editData(datapost);
            } else {
              console.log("Save Add");
              this.addData(datapost);
            }
          }else{
             if (this.readOnly.id) {
              console.log("Save Edit");
              this.editData(datapost);
            } else {
              this.snackbar = true;
              this.colorsnackbar = "red";
              this.textsnackbar =
                "File kosong, tidak bisa upload";
              this.loading = false;
            }
          }        
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom tidak boleh ada yang kosong";
      }
    },

    deleteItemConfirm() {
      this.deleteApi();
    },
    
    resetItem() {
      //   this.defaultItem.user_id = item.user_id;
      this.defaultItem.departement_baru = "";
      this.defaultItem.departement_lama = "";
      this.defaultItem.divisi_baru = "";
      this.defaultItem.divisi_lama = "";
      this.defaultItem.flag_menu = "";
      // this.defaultItem.id = "";
      this.defaultItem.jabatan_baru = "";
      this.defaultItem.jabatan_lama = "";
      this.defaultItem.nama_dept_lama = "";
      this.defaultItem.nama_divisi_lama = "";
      this.defaultItem.no_induk_karyawan = "";
      this.defaultItem.emp_nik = "";
      this.defaultItem.tanggal_ditetapkan = "";
      this.defaultItem.tanggal_mulai = "";

      this.readOnly.id = "";
      // this.$refs.form.resetValidation();
    },

    gettanggal(val) {
      return HelperGlobalService.gettanggal(val);
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

