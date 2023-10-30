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
      <v-row class="mb-0 mt-0 ml-1 pl-1 pt-2 pb-0">
          <h3>Detail Hasil Rekruitmen</h3>
          <v-divider class="ml-3 mt-4"></v-divider>
          <v-btn dark color="red" class="mr-3" @click="backButton"> Kembali
          </v-btn>
      </v-row>
      <v-row>
        <v-col class="mx-0" cols="12" sm="4" md="4">
          <v-card class="mx-3 my-2" elevation="5">
            <v-card-text class="pa-1">
              <div style="text-align: center" class="mb-5 mt-2">
                <v-chip color="#25695c" outlined> Rekruitmen </v-chip>
              </div>
              <div class="px-3">
                <v-text-field
                  v-model="defaultItem.nama_recruitment"
                  outlined
                  label="Nama Recruitment"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="defaultItem.dept_nama"
                  outlined
                  label="Nama Department"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="defaultItem.jabatan"
                  outlined
                  label="Jabatan"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="defaultItem.lokasi_penempatan"
                  outlined
                  label="Lokasi Penempatan"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="defaultItem.jumlah_kebutuhan"
                  outlined
                  label="Jumlah Kebutuhan"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="defaultItem.source_pemenuhan"
                  outlined
                  label="Source Pemenuhan"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                
                <v-row>
                  <v-col style="margin-bottom: 20px" cols="6" sm="4" md="4" class="py-1 pl-3">
                      Dok PTK:
                  </v-col>
                  <v-col cols="6" sm="8" md="8" class="pa-1">                        
                    <div style="display:flex">
                        <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.dok)}}</h4>
                        <v-btn v-if=' defaultItem.dok!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.dok, defaultItem.nama_recruitment)" color="#25695c">
                            <v-icon small>mdi-download-circle-outline</v-icon>
                        </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </v-card>
          <v-card class="mx-3 mb-2 mt-7" elevation="5">
            <v-card-text class="pa-1">
              <div style="text-align: center" class="mb-2 mt-2">
                <v-chip color="#25695c" outlined> List Pelamar </v-chip>
              </div>
              <v-row>
                <v-col cols="6">
                  <h4 class="ml-5 my-3">Jumlah Pelamar</h4>
                </v-col>
                <v-col cols="6" style="text-align: right">
                  <h4 class="mr-5 my-3">{{ jmlPelamar }} Pelamar</h4></v-col
                >
              </v-row>
              <div class="px-1 mb-2">
                <v-data-table
                  :headers="headersPelamar"
                  :items="listPelamar"
                  :search="search"
                  :items-per-page="5"
                  disable-items-per-page="true"
                  class="rounded elevation-6 mx-3 pa-1 itemchild"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      class="mr-2"
                      @click="detailItemJobSeeker(item)"
                      color="#25695C"
                    >
                      mdi-information-outline
                    </v-icon>
                  </template>
                </v-data-table>
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </v-card>
        </v-col>
        <v-col class="mx-0" cols="12" sm="8" md="8">
          <v-card class="mx-1 mt-2 mb-5 pb-3" elevation="5">
            <v-card-text class="pa-1">
              <div style="text-align: center" class="mb-5 mt-2">
                <v-chip color="#25695c" outlined> Hasil Rekruitmen </v-chip>
              </div>
              <div class="px-3 pb-2">
                <h4>Tanggal Selesai: {{gettanggal(tanggalResult)}}</h4>
                <h4>Peserta Lolos Seleksi:</h4>
                    <v-chip
                          v-for="tag in listResult"
                          :key="tag.id_job_seeker"
                          label
                          color="cyan"
                          dark
                          class="mr-1 mt-1"
                    >
                        <v-icon style="font-size: medium" left>
                            mdi-account-circle-outline
                        </v-icon>
                        {{ tag.nama }}
                    </v-chip>
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </v-card>
          <v-card class="fontall mx-1 my-2" elevation="5">
            <v-card-text>
              <v-row class="mb-3 mt-2 ml-1">
                <h4>Proses Rekruitmen</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row class="mr-2 mb-2">
                <v-timeline dense>
                  <v-timeline-item
                    small
                    color="#25695c"
                    v-for="item in listSchedule"
                    :key="item.id_schedule"
                  >
                    <!-- <span slot="opposite">Tus eu perfecto</span> -->
                    <v-card class="elevation-2">
                      <!-- <v-card-title class="text-h5"> Lorem ipsum </v-card-title> -->
                      <v-card-text class="pa-2">
                        <h4 style="color: #25695c">
                          {{ item.nama_schedule }}
                        </h4>
                        <h5 style="color: #bf9168">
                          {{ gettanggal(item.tanggal_schedule) }}
                        </h5>
                        <hr />
                        <h5>Peserta :</h5>
                        <v-chip
                          v-for="tag in item.listvaljobseeker"
                          :key="tag.id_job_seeker"
                          label
                          color="cyan"
                          small
                          dark
                          class="mr-1 mt-1"
                        >
                          <v-icon style="font-size: medium" left>
                            mdi-account-circle-outline
                          </v-icon>
                          {{ tag.nama }}
                        </v-chip>
                        <h5 style="color: #bf9168">
                          {{ item.jmlh_job_seeker }} Peserta
                        </h5>
                      </v-card-text>
                      <v-card-actions
                        v-if="item.nama_schedule == status_schedule_global"
                      >
                        <v-spacer></v-spacer>
                        <!-- <v-btn
                          dark
                          :loading="loading"
                          color="#25695c"
                          @click="editpesertaschedule(item)"
                          x-small
                          elevation="2"
                        >
                          Edit Peserta
                        </v-btn> -->
                      </v-card-actions>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- Modal Edit Selesai -->
    <v-dialog persistent v-model="dialogEditSelesai" max-width="800px">
      <v-card>
        <v-card-title class="headermodalstyle">
          Update Status Selesai dan Terpenuhi
          <v-spacer></v-spacer>
          <v-btn icon dark large class="right" @click="close()">
            <v-icon>mdi-close-box-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="fontall">
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="6" md="6" class="pa-1">                
                <v-text-field
                  v-model="statusRekruitmen"
                  outlined
                  label="Status Rekruitmen"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="pa-1">                
                <v-text-field
                  v-model="statusSchedule"
                  outlined
                  label="Status Schedule"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>            
            <v-row class="mb-3 mt-2 ml-1">
                <h4>Form Tanggal Selesai dan Peserta Lolos</h4>
                <v-divider class="ml-0 mr-2 mt-1 mb-5"></v-divider>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6" class="pa-1">  
                            <v-menu
                              v-model="menu1"
                              transition="scale-transition"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="datepicker1"
                                  slot="activator"
                                  label="Tanggal Selesai Seleksi"
                                  outlined
                                  readonly
                                  
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                  v-model="datepicker1"
                                  @input="menu1 = false"
                              ></v-date-picker>
                            </v-menu>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="pa-1">
                <v-combobox
                  v-model="list_job_seeker_global"
                  item-text="nama"
                  :items="itemspesertasemua"
                  chips
                  clearable
                  label="Pilih Peserta Lolos Seleksi"
                  multiple
                  prepend-icon="mdi-filter-variant"
                  solo
                >
                  <template
                    v-slot:selection="{ attrs, item, select, selected }"
                  >
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="removeselectedpeserta(item)"
                    >
                      <strong>{{ item.nama }}</strong>
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>              
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="close">
            <v-icon left> mdi-close-circle-outline </v-icon> Cancel
          </v-btn>
          <v-btn
            dark
            :loading="loading"
            color="#25695c"
            @click="saveSelesai"
          >
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Edit Peserta -->
    <v-dialog persistent v-model="dialogEditPeserta" max-width="800px">
      <v-card>
        <v-card-title class="headermodalstyle">
          Edit Peserta
          <v-spacer></v-spacer>
          <v-btn icon dark large class="right" @click="close()">
            <v-icon>mdi-close-box-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="fontall">
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="12" md="12" class="pa-1">
                <v-combobox
                  v-model="list_job_seeker_global"
                  item-text="nama"
                  :items="itemspesertasemua"
                  chips
                  clearable
                  label="Pilih Peserta"
                  multiple
                  prepend-icon="mdi-filter-variant"
                  solo
                >
                  <template
                    v-slot:selection="{ attrs, item, select, selected }"
                  >
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="removeselectedpeserta(item)"
                    >
                      <strong>{{ item.nama }}</strong>
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="close">
            <v-icon left> mdi-close-circle-outline </v-icon> Cancel
          </v-btn>
          <v-btn
            dark
            :loading="loading"
            color="#25695c"
            @click="saveeditpeserta"
          >
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Detail Job Seeker -->
    <v-dialog persistent v-model="dialogDetailJobSeeker" max-width="1000px">
      <v-card>
        <v-card-title class="headermodalstyle">
          Detail Item JobSeeker
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
                      v-model="jobSeekerItem.nama"
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
                      v-model="jobSeekerItem.no_ktp"
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
                      v-model="jobSeekerItem.telp"
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
                      v-model="jobSeekerItem.email"
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
                      v-model="jobSeekerItem.alamat"
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
                  <h4 style="color: black; font-size: 18px">Berkas Lamaran</h4>
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
                            <h4 style="color: black; font-size: 13px">{{getdokname(jobSeekerItem.berkas_1)}}</h4>
                            <v-btn v-if=' jobSeekerItem.berkas_1!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(jobSeekerItem.berkas_1, 'Dok Ijazah '+jobSeekerItem.nama)" color="#25695c">
                              <v-icon small>mdi-download-circle-outline</v-icon>
                            </v-btn>
                          </div>
                        </v-col>
                        <v-col cols="6" sm="4" md="4" class="pa-1">
                          Pas Foto :
                        </v-col>
                        <v-col cols="6" sm="8" md="8" class="pa-1">                        
                          <div style="display:flex">
                            <h4 style="color: black; font-size: 13px">{{getdokname(jobSeekerItem.berkas_2)}}</h4>
                            <v-btn v-if=' jobSeekerItem.berkas_2!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(jobSeekerItem.berkas_2, 'Dok Ijazah '+jobSeekerItem.nama)" color="#25695c">
                              <v-icon small>mdi-download-circle-outline</v-icon>
                            </v-btn>
                          </div>
                        </v-col>
                        <v-col cols="6" sm="4" md="4" class="pa-1">
                          Ijazah :
                        </v-col>
                        <v-col cols="6" sm="8" md="8" class="pa-1">                       
                          <div style="display:flex">
                            <h4 style="color: black; font-size: 13px">{{getdokname(jobSeekerItem.berkas_3)}}</h4>
                            <v-btn v-if=' jobSeekerItem.berkas_3!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(jobSeekerItem.berkas_3, 'Dok Ijazah '+jobSeekerItem.nama)" color="#25695c">
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
  name: "ResultRecruitmentDetail",
  data: () => ({
    itemsbr: [
      {
        text: "Recruitment",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Result Recruitment Detail",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    dialogEditPeserta: false,
    dialogDetailJobSeeker: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    dialogEditSelesai:false,

    disabledStatus: true,
    textButtonStatus: "Edit",

    defaultItem: {
      nama_recruitment: "",
      jabatan: "",
      department: "",
      lokasi_penempatan: "",
      jumlah_kebutuhan: "",
      source_pemenuhan: "",
      tanggal_permintaan: "",
      target_tanggal_pemenuhan: "",
      status_schedule: "",
      listSchedule: "list",
      dok:'-',
    },

    status_schedule_global: "",

    headersPelamar: [
      { text: "Nama", value: "nama" },
      { text: "", value: "actions", sortable: false, width: "8%" },
    ],

    listPelamar: [],
    jmlPelamar: 0,
    listSchedule: [],
    listResult: [],
    listJobSeekerAll: [],
    tanggalResult :new Date().toISOString().substr(0, 10),

    detailEmp: {},

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
    itemsstatus: [
      { text: "Buka_Lowongan", value: "Buka_Lowongan" },
      { text: "Psikotes", value: "Psikotes" },
      { text: "Interview_HR", value: "Interview_HR" },
      { text: "Interview_Manager", value: "Interview_Manager" },
      { text: "Inteview_User", value: "Inteview_User" },
      { text: "Proses_Selesai", value: "Proses_Selesai" },
    ],
    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 3000,
    colorsnackbar: null,

    admin_id: "",
    id_recruitment: "",

    jobSeekerItem: {
      id_job_seeker: "-",
      no_ktp: "",
      nama: "",
      telp: "",
      email: "",
      alamat: "",
      code_recruitment: "",
      berkas_1:'',
      berkas_2:'',
      berkas_3:'',
    },
    scheduleItem: {
      id_schedule: "",
      nama_schedule: "",
      tanggal_schedule: "",
      list_job_seeker: [],
    },
    resultItem: {
      id_result: "",
      status: "",
      tanggal_selesai: "",
      list_job_seeker: [],
    },
    statusedit: "",
    list_job_seeker_global: [],
    itemspesertasemua: ["Streaming", "Eating"],

    statusRekruitmen: 'Terpenuhi',
    statusSchedule: 'Proses_selesai',
    id_schedule_rslt :'',

    
    datepicker1: new Date().toISOString().substr(0, 10),
    menu1: "",
  }),

  created() {
    this.id_recruitment = localStorage.getItem("id_recruitment_rslt");
    console.log(this.id_emp);
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    this.getDetail();
    this.GetJobSeekerByRecruitment();
  },

  methods: {
    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetDetailRecruitment?id_recruitment=" +
            this.id_recruitment,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = response.data.data.result.GetDetailRecruitment;

          this.id_schedule_rslt =response.data.data.result.GetResult[0].id_result;

          this.listSchedule = response.data.data.result.GetSchedule;
          this.listJobSeekerAll = response.data.data.result.GetJobSeekerAll;
          this.status_schedule_global =
            response.data.data.result.GetDetailRecruitment.status_schedule;
          this.listResult = response.data.data.result.GetResult[0].listvaljobseeker;
          this.tanggalResult = response.data.data.result.GetResult[0].tanggal_selesai;
          this.listPelamar = response.data.data.result.GetJobSeekerAll;
          this.jmlPelamar = this.listPelamar.length;
          // if (response.data.data.result.foto == "-") {
          //   this.detailEmp.foto = "/images/noimage.png";
          // }
          // this.itemlistanak = response.data.data.result.listAnak;
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
    async GetJobSeekerByRecruitment() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetJobSeekerByRecruitment?id_recruitment=" +
            this.id_recruitment,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemspesertasemua = response.data.data.result.data;
          // if (response.data.data.result.foto == "-") {
          //   this.detailEmp.foto = "/images/noimage.png";
          // }
          // this.itemlistanak = response.data.data.result.listAnak;
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

    async editStatusRecruitment(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateStatusRecruitment",
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
          this.dialogEditSelesai = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses Ubah data";
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
    },
    async editSchedulePeserta(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateSchedule",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialogEditPeserta = false;
          this.dialogEditSelesai = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses Ubah data";
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
    },
    async editResultPeserta(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateResult",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialogEditPeserta = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses Ubah data";
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


    detailItem(item) {
      console.log(item);
      this.defaultItem = Object.assign({}, item);
      this.getDetail();
      this.dialog = true;
    },

    btnStatus() {
      if (this.disabledStatus == true) {
        this.disabledStatus = false;
        this.textButtonStatus = "Simpan";
      } else {
        this.disabledStatus = true;
        this.textButtonStatus = "Edit";
        if(this.defaultItem.status_schedule == 'Proses_Selesai'){
          this.dialogEditSelesai = true;
        }else{
          const datapost = {
            id_recruitment: this.id_recruitment,
            status_schedule: this.defaultItem.status_schedule,
          };
          this.editStatusRecruitment(datapost);
        }
      }
    },

    editpesertaschedule(val) {
      console.log(val);
      this.statusedit = "schedule";
      this.scheduleItem.id_schedule = val.id_schedule;
      this.scheduleItem.nama_schedule = val.nama_schedule;
      this.scheduleItem.tanggal_schedule = val.tanggal_schedule;
      this.scheduleItem.list_job_seeker = val.listvaljobseeker;
      this.list_job_seeker_global = val.listvaljobseeker;
      this.dialogEditPeserta = true;
    },
    editpesertaresult(val) {
      console.log(val);
      this.statusedit = "result";
      this.resultItem.id_result = val.id_result;
      this.resultItem.status = "Approved";
      this.resultItem.list_job_seeker = val.listvaljobseeker;
      this.list_job_seeker_global = val.listvaljobseeker;
      this.dialogEditPeserta = true;
    },
    removeselectedpeserta(item) {
      this.list_job_seeker_global.splice(
        this.list_job_seeker_global.indexOf(item),
        1
      );
      this.list_job_seeker_global = [...this.list_job_seeker_global];
    },

    saveeditpeserta() {
      console.log(this.scheduleItem);
      if (this.statusedit == "schedule") {
        this.scheduleItem.list_job_seeker = this.list_job_seeker_global;
        this.editSchedulePeserta(this.scheduleItem);
      } else {
        this.resultItem.list_job_seeker = this.list_job_seeker_global;
        this.editResultPeserta(this.resultItem);
      }
    },
    saveSelesai(){
      console.log(this.list_job_seeker_global.length);
      if(this.list_job_seeker_global.length != 0){
          const datapost = {
            id_recruitment: this.id_recruitment,
            status_schedule: 'Proses_Selesai',
          };
          this.editStatusRecruitment(datapost);

          this.resultItem.id_result = this.id_schedule_rslt;
          this.resultItem.status = "Approved";
          this.resultItem.tanggal_selesai = this.datepicker1;
          this.resultItem.list_job_seeker = this.list_job_seeker_global;
          this.editResultPeserta(this.resultItem);
      }else{        
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Peserta Lolos Seleksi Masih Kosong";
      }
    },

    backButton(){
      this.$router.push("/SelectionResult");
    },

    close() {
      this.dialog = false;
      this.dialogEditSelesai = false;
      this.dialogEditPeserta = false;
      this.dialogDetailJobSeeker = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },

    detailItemJobSeeker(item) {
      // this.getDetailJobSeeker(item.id_job_seeker);
      this.jobSeekerItem.no_ktp = item.no_ktp;
      this.jobSeekerItem.nama = item.nama;
      this.jobSeekerItem.telp = item.telp;
      this.jobSeekerItem.email = item.email;
      this.jobSeekerItem.alamat = item.alamat;
      this.jobSeekerItem.berkas_1 = item.berkas_1;
      this.jobSeekerItem.berkas_2 = item.berkas_2;
      this.jobSeekerItem.berkas_3 = item.berkas_3;

      this.dialogDetailJobSeeker = true;
      //   this.$router.push("/EmpDetail");
      //   localStorage.setItem("id_emp", item.id);
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

