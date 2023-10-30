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

    <v-card elevation="2" class="mr-3 ml-3 mb-5">
        <v-card-text>
            <div style="text-align: center;"><h3>Daftar Absen Karyawan</h3></div>
            <div style="text-align: center;"><h4>{{dayShow}}, {{gettanggal(todayDate)}}</h4></div>
        </v-card-text>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="dataobject"
      :search="search"
      class="rounded elevation-6 mx-3 pa-1 itemchild"
    >
      <template v-slot:item.nama_cuti="{ item }">
        {{ getnama_cuti(item.nama_cuti) }}
      </template>
      <template v-slot:item.check_out="{ item }">
        {{ getvalueabsen(item.check_out) }}
      </template>
      <template v-slot:item.check_in="{ item }">
        {{ getvalueabsen(item.check_in) }}
      </template>
      <template v-slot:item.break_in_atd="{ item }">
        {{ getvalueabsen(item.break_in_atd) }}
      </template>
      <template v-slot:item.break_out_atd="{ item }">
        {{ getvalueabsen(item.break_out_atd) }}
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-btn
            dark
            class="mx-1 mt-1 d-none d-md-block"
            @click="showFilter()"
            color="#25695c"
          >
            <v-icon class="mx-2" small>mdi-filter-variant</v-icon> Filter
            Pencarian
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
                    <v-row class="mb-3 mt-2 ml-0">
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

          
          <v-dialog v-model="dialogDetail" max-width="600px">
            <v-card>
              <v-card-title >
                <div style="text-align:center;width:100%">Detail Absen</div> 
              </v-card-title>
              <!-- <v-card-text class="fontall pb-1">
                  <div style="text-align:center" class="pt-5"><h3 style="font-weight: 800;">Detail Absen</h3></div>
              </v-card-text> -->
              <v-card-text class="fontall pb-1">
                  <v-container fluid>
                    <v-row class="mb-1 mt-0 ml-0">
                      <h4>Karyawan</h4>
                      <v-divider class="mx-2 mt-3"></v-divider>
                    </v-row>
                    <v-row class="pl-4">
                      <v-col cols="4" sm="4" md="4">
                          <div><h4>Nama</h4></div>
                      </v-col>
                      <v-col cols="8" sm="8" md="8">
                          <div><h4>{{defaultItem.nama_lengkap}}</h4></div>
                      </v-col>
                      <v-col cols="4" sm="4" md="4">
                          <div><h4>NIK</h4></div>
                      </v-col>
                      <v-col cols="8" sm="8" md="8">
                          <div><h4>{{defaultItem.emp_nik}}</h4></div>
                      </v-col>
                    </v-row>
                    <v-row class="mb-1 mt-4 ml-0">
                      <h4>Absensi</h4>
                      <v-divider class="mx-2 mt-3"></v-divider>
                    </v-row>
                    <v-row class="pl-4">
                      <v-col cols="4" sm="4" md="4">
                          <div><h4>Jenis Shift</h4></div>
                      </v-col>
                      <v-col cols="8" sm="8" md="8">
                          <div><h4>{{defaultItem.nama_shift}}</h4></div>
                      </v-col>
                    </v-row>
                    <v-row class="pl-4">
                      <v-simple-table style="width: 100%;border: 1px solid black;border-collapse: collapse;" class="ml-2 mt-2 mb-3">
                            <!-- <template v-slot:default> -->
                            <thead>
                                <tr>
                                    <th class="text-left">-</th>
                                    <th class="text-left">Jam Shift</th>
                                    <th class="text-left">Jam Karyawan</th>
                                    <th class="text-left">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jam Masuk</td>
                                    <td>{{ defaultItem.sechedule_in }}</td>
                                    <td>{{ getvalueabsen(defaultItem.check_in) }}</td>
                                    <td>{{ getketjammasuk(defaultItem.sechedule_in,defaultItem.check_in) }}</td>
                                </tr>
                                <tr>
                                    <td>Istirahat Keluar</td>
                                    <td>{{ defaultItem.break_out }}</td>
                                    <td>{{ getvalueabsen(defaultItem.break_out_atd) }}</td>
                                    <td>{{ getketjamistirahatkeluar(defaultItem.break_out,defaultItem.break_out_atd) }}</td>
                                </tr>
                                <tr>
                                    <td>Istirahat Masuk</td>
                                    <td>{{ defaultItem.break_in }}</td>
                                    <td>{{ getvalueabsen(defaultItem.break_in_atd) }}</td>
                                    <td>{{ getketjamistirahatmasuk(defaultItem.break_in,defaultItem.break_in_atd) }}</td>
                                </tr>
                                <tr>
                                    <td>Jam Keluar</td>
                                    <td>{{ defaultItem.sechedule_out }}</td>
                                    <td>{{ getvalueabsen(defaultItem.check_out) }}</td>
                                    <td>{{ getketjamkeluar(defaultItem.sechedule_out,defaultItem.check_out) }}</td>
                                </tr>
                            </tbody>
                            <!-- </template> -->
                      </v-simple-table>
                    </v-row>
                    <v-row class="mb-1 mt-4 ml-0">
                      <h4>Ijin/Cuti</h4>
                      <v-divider class="mx-2 mt-3"></v-divider>
                    </v-row>
                    <v-row class="pl-4">
                      <v-col cols="4" sm="4" md="4">
                          <div><h4>Ijin/Cuti</h4></div>
                      </v-col>
                      <v-col cols="8" sm="8" md="8">
                          <div><h4>{{getstatusijin(defaultItem.nama_cuti)}}</h4></div>
                      </v-col>
                      <v-col cols="4" sm="4" md="4">
                          <div><h4>Tanggal</h4></div>
                      </v-col>
                      <v-col v-if='getstatusijin(defaultItem.nama_cuti) != "Tidak"' cols="8" sm="8" md="8">
                          <div><h4>{{gettanggal(defaultItem.tgl_mulai_cuti)}}</h4></div>
                      </v-col>
                      <v-col v-if='getstatusijin(defaultItem.nama_cuti) == "Tidak"' cols="8" sm="8" md="8">
                          <div><h4>-</h4></div>
                      </v-col>
                      <v-col cols="4" sm="4" md="4">
                          <div><h4>Lama Ijin</h4></div>
                      </v-col>
                      <v-col v-if='getstatusijin(defaultItem.nama_cuti) != "Tidak"' cols="8" sm="8" md="8">
                          <div><h4>{{defaultItem.lama_cuti}} hari</h4></div>
                      </v-col>
                      <v-col v-if='getstatusijin(defaultItem.nama_cuti) == "Tidak"' cols="8" sm="8" md="8">
                          <div><h4>-</h4></div>
                      </v-col>
                    </v-row>
                    <v-row class="mb-1 mt-4 ml-0">
                      <h4>Keterangan Absensi</h4>
                      <v-divider class="mx-2 mt-3"></v-divider>
                    </v-row>
                    <v-row class="pl-4">
                      <v-col cols="4" sm="4" md="4">
                          <div><h4>Keterangan</h4></div>
                      </v-col>
                      <v-col cols="8" sm="8" md="8">
                          <div><h4>{{defaultItem.keterangan}}</h4></div>
                      </v-col>
                    </v-row>
                  </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="#25695c" @click="close">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon> Ok
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
  name: "DailyAttendance",
  data: () => ({
    itemsbr: [
      {
        text: "Attendance",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Daily Attendance",
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
      { text: "Karyawan", value: "nama_lengkap" },
      { text: "Shift", value: "nama_shift" },
      { text: "Jam Masuk", value: "check_in" },
      { text: "Istirahat Keluar", value: "break_out_atd" },
      { text: "Istirahat Masuk", value: "break_in_atd" },
      { text: "Jam Keluar", value: "check_out" },
      { text: "Ijin/Cuti", value: "nama_cuti" },
      { text: "Actions", value: "actions", sortable: false, width: "10%" },
    ],
    dataobject: [],
    dayShow : '',
    todayDate : '',

    readOnly: {
        id: "",
    },
    defaultItem:{
        break_in: "",
        break_in_atd: "",
        break_out: "",
        break_out_atd: "",
        check_in: "",
        check_out: "",
        departement: "",
        divisi: "",
        emp_nik: "",
        jenis_cuti_id: "",
        jenis_kelamin: "",
        keterangan: "",
        keterangan_shift: "",
        nama_lengkap: "",
        nama_shift: "",
        no_ktp: "",
        overtime_after: "",
        permit_id: "",
        sechedule_in: "",
        sechedule_out: "",
        shift_id: "",
        status_karyawan: "",
        tanggal: "",
        tgl_akhir_cuti: "",
        tgl_mulai_cuti: "",
        lama_cuti: "",
    },

    itemsdept: [],
    itemsdivisi: [],
    itemsSource: [
      { text: "internal", value: "internal" },
      { text: "eksternal", value: "eksternal" },
    ],

    id_schedule1: "",
    id_schedule2: "",
    id_schedule3: "",
    id_schedule4: "",

    datepicker1: "2022-01-01",
    menu1: false,
    datepicker2: "2022-01-01",
    menu2: false,
    datepicker3: "2022-01-01",
    menu3: false,
    datepicker4: "2022-01-01",
    menu4: false,
    datepicker5: "2022-01-01",
    menu5: false,
    datepicker6: "2022-01-01",
    menu6: false,

    selectDivisi: "",
    selectDepartment: "",
    selectStatusKaryawan: "",
    selectDepartment: "",
    selectUnitPerusahaan: "",
    AddModal: true,
    valid: true,

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
      this.admin_id = this.User.code;
    }
    localStorage.removeItem("status");
    this.initialize();
    this.getDept();
  },
  setup() {},

  methods: {
    async initialize(dept) {
      var dept_code = "";
      if (dept) {
        dept_code = dept;
      }
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetAttendance?department_code="+dept_code,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        // console.log(response.data.data.result.data);
        if (response.data.length != 0) {
            this.dayShow = response.data.data.result.dayShow;
            this.todayDate = response.data.data.result.todayDate;
            this.dataobject = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.dataobject = [];
        }
      } catch (error) {
        console.log(error.response.data.data.result);
        this.dayShow = error.response.data.data.result.dayShow;
        this.todayDate = error.response.data.data.result.todayDate;
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

    // detailItem(item) {
    //   this.readOnly.id_recruitment = item.id_recruitment;
    //   this.getDetail();
    //   this.dialogDetail = true;
    //   //   this.$router.push("/EmpDetail");
    //   //   localStorage.setItem("id_emp", item.id);
    // },
    detailItem(item) {        
        this.defaultItem = Object.assign({},item);
        console.log(this.defaultItem);
        this.dialogDetail = true;
    //   this.$router.push("/ScheduleDetail");
    //   localStorage.setItem("id_recruitment", item.id_recruitment);
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
    getketjammasuk(defaulttime, value){
        if(value == '00:00:00'){
            return '-'
        }else{
            if(defaulttime<value){
                return 'Terlambat Masuk'
            }else{
                return '-'
            }
        }
    },
    getketjamistirahatkeluar(defaulttime, value){
        if(value == '00:00:00'){
            return '-'
        }else{
            if(defaulttime>value){
                return 'Terlalu Awal Istirahat'
            }else{
                return '-'
            }
        }
    },
    getketjamistirahatmasuk(defaulttime, value){
        if(value == '00:00:00'){
            return '-'
        }else{
            if(defaulttime<value){
                return 'Terlambat Masuk'
            }else{
                return '-'
            }
        }
    },
    getketjamkeluar(defaulttime, value){
        if(value == '00:00:00'){
            return '-'
        }else{
            if(defaulttime>value){
                return 'Terlalu Awal Pulang'
            }else{
                return '-'
            }
        }
    },

    getvalueabsen(val){
        if(val == '00:00:00'){
            return '-';
        }else{
            return val;
        }
    },

    gettanggal(val) {
      return HelperGlobalService.gettanggal(val);
    },
    getnama_cuti(val){
        if(val){
            return val;
        }else{
            return '-';
        }
    },
    getstatusijin(val){
        if(val){
            return 'Iya, Karyawan Ijin/Cuti';
        }else{
            return 'Tidak';
        }
    },
  },
};
</script>

