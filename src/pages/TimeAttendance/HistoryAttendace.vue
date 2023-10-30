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

    <!-- <v-card elevation="2" class="mr-3 ml-3 mb-5">
        <v-card-text>
            <div style="text-align: center;"><h3>Riwayat Absen Karyawan</h3></div>
        </v-card-text>
    </v-card> -->
    
    <v-card elevation="2" class="mr-3 ml-3 mb-5">
        <v-card-text class="pb-0">
            <div style="display: flex;">
                <div>
                    <v-btn dark class="mx-1 mt-1 d-none d-md-block" @click="showFilter()" color="#25695c">
                        <v-icon class="mx-2" small>mdi-filter-variant</v-icon> Filter Karyawan
                    </v-btn>
                </div>
                <div class="pt-1 pl-4">
                    <v-menu v-model="menu1" transition="scale-transition">
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="datepicker1"
                                slot="activator"
                                label="Pilih Tanggal"
                                class=" mr-2"
                                outlined
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                dense
                        ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="datepicker1"
                                @input="menu1 = false"
                                @change='changedate()'
                        ></v-date-picker>
                    </v-menu>
                </div>                
            </div>
        </v-card-text>
        <v-card-text>
            <v-simple-table>
                <thead>
                    <tr>
                        <th class="text-left" style="width:16%">Karyawan</th>
                        <th v-for="item in days_date_range" :key="item.date" class="text-center">{{item.days}} <br> {{gettanggal(item.date)}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="itemval in dataobject" :key="itemval.nama_lengkap">
                        <td class="text-left" style="width:16%">{{ itemval.nama_lengkap }}</td>
                        <td class="text-center"><a @click="detail(itemval.val_id1)">{{itemval.status1}}</a></td>
                        <td class="text-center"><a @click="detail(itemval.val_id2)">{{itemval.status2}}</a></td>
                        <td class="text-center"><a @click="detail(itemval.val_id3)">{{itemval.status3}}</a></td>
                        <td class="text-center"><a @click="detail(itemval.val_id4)">{{itemval.status4}}</a></td>
                        <td class="text-center"><a @click="detail(itemval.val_id5)">{{itemval.status5}}</a></td>
                        <td class="text-center"><a @click="detail(itemval.val_id6)">{{itemval.status6}}</a></td>
                        <td class="text-center"><a @click="detail(itemval.val_id7)">{{itemval.status7}}</a></td>

                        <!-- <td class="text-left" style="width:16%">{{ itemval.nama_lengkap }}</td>
                        <td v-if='itemval.status1!="-"'  class="text-center"><a @click="detail(itemval.val_id1)">{{itemval.status1}}</a></td>
                        <td v-if='itemval.status1=="-"' class="text-center">{{itemval.status1}}</td>
                        <td v-if='itemval.status2!="-"'  class="text-center"><a @click="detail(itemval.val_id2)">{{itemval.status2}}</a></td>
                        <td v-if='itemval.status2=="-"' class="text-center">{{itemval.status2}}</td>
                        <td v-if='itemval.status3!="-"'  class="text-center"><a @click="detail(itemval.val_id3)">{{itemval.status3}}</a></td>
                        <td v-if='itemval.status3=="-"' class="text-center">{{itemval.status3}}</td>
                        <td v-if='itemval.status4!="-"'  class="text-center"><a @click="detail(itemval.val_id4)">{{itemval.status4}}</a></td>
                        <td v-if='itemval.status4=="-"' class="text-center">{{itemval.status4}}</td>
                        <td v-if='itemval.status5!="-"'  class="text-center"><a @click="detail(itemval.val_id5)">{{itemval.status5}}</a></td>
                        <td v-if='itemval.status5=="-"' class="text-center">{{itemval.status5}}</td>
                        <td v-if='itemval.status6!="-"'  class="text-center"><a @click="detail(itemval.val_id6)">{{itemval.status6}}</a></td>
                        <td v-if='itemval.status6=="-"' class="text-center">{{itemval.status6}}</td>
                        <td v-if='itemval.status7!="-"'  class="text-center"><a @click="detail(itemval.val_id7)">{{itemval.status7}}</a></td>
                        <td v-if='itemval.status7=="-"' class="text-center">{{itemval.status7}}</td> -->

                    </tr>
                </tbody>
            </v-simple-table>
            <div  class="v-data-footer mt-3">
                <h4 class="mr-5">* : Karyawan melakukan absensi kurang sesuai waktu <br> (klik untuk melihat detail)</h4>
                <v-spacer></v-spacer>
                <h4 class="mr-5">Rows per page : {{paging.size}}</h4>
                <h4 class="mr-5">{{paging.awal}} - {{paging.akhir}} of {{paging.total_data}}</h4>
                <v-icon class="mr-2" :disabled="isDisabledPrev" @click="prevPage(paging.page)" color="#25695C">
                    mdi-chevron-left
                </v-icon>
                <v-icon class="mr-2" :disabled="isDisabledNext" @click="nextPage(paging.page)" color="#25695C">
                    mdi-chevron-right
                </v-icon>
            </div>
        </v-card-text>
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

          <v-dialog v-model="dialogAbsenKosong" max-width="500px">
            <v-card>
                <v-card-text>
                    <div style="text-align:center;font-weight:800;font-size:18px" class="pt-3">Tidak ada riwayat absensi dari karyawan di tanggal yang dipilih</div>
                </v-card-text>
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
  name: "HistoryAttendance",
  data: () => ({
    itemsbr: [
      {
        text: "Attendance",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "History Attendance",
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
    dialogAbsenKosong: false,
    isDisabledPrev:true,
    isDisabledNext:false,
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
    days_date_range : [],
    // todayDate : '',

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
        lama_cuti:"",
    },
    paging:{
        awal: 1,
        akhir: 10,
        total_data: 10,
        size: 10,
        page: 1,
    },

    itemsdept: [],
    itemsdivisi: [],
    itemsSource: [
      { text: "internal", value: "internal" },
      { text: "eksternal", value: "eksternal" },
    ],

    listHeader:[
        { date: "2022-08-15", days:"Senin"},
        { date: "2022-08-16", days:"Selasa"},
        { date: "2022-08-17", days:"Rabu"},
        { date: "2022-08-18", days:"Kamis"},
        { date: "2022-08-19", days:"Jumat"},
        { date: "2022-08-20", days:"Sabtu"},
        { date: "2022-08-21", days:"Minggu"},
    ],

    id_schedule1: "",
    id_schedule2: "",
    id_schedule3: "",
    id_schedule4: "",

    datepicker1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu1: false,

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
          this.BaseUrlGet + "GetHistoryAttendance?department_code="+dept_code+
          "&date="+this.datepicker1+
          "&page="+this.paging.page+
          "&size="+this.paging.size,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        // console.log(response.data.data.result.data);
        if (response.data.length != 0) {
            this.days_date_range = response.data.data.result.days_date_range;
            this.dataobject = response.data.data.result.list_data;
            this.paging.awal = response.data.data.result.data_awal;
            this.paging.akhir = response.data.data.result.data_akhir;
            this.paging.total_data = response.data.data.result.countAll;
            // this.todayDate = response.data.data.result.todayDate;
            // this.dataobject = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.dataobject = [];
        }
      } catch (error) {
        console.log(error.response.data.data.result);
        // this.dayShow = error.response.data.data.result.dayShow;
        // this.todayDate = error.response.data.data.result.todayDate;
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
    
    async getDetail(val_id) {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAttendanceDetail/"+val_id, {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = Object.assign({},response.data.data.result.data);
        } else {
          console.log("Kosong");
          // this.itemskab = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          // this.itemskab = [];
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
    changedate(){
      this.initialize(this.selectDepartment);
    },

    prevPage(page){
        if(page>1){
            this.paging.page = page-1;
            if(this.paging.page == 1){
                this.isDisabledPrev = true;
            }
            this.initialize();
            this.isDisabledNext = false;
        }
    },
    async nextPage(page){
        this.paging.page = page+1;
        await this.initialize();
        this.isDisabledPrev = false;
        if(this.paging.akhir == this.paging.total_data){
                this.isDisabledNext = true;
        }
    },

    // detailItem(item) {
    //   this.readOnly.id_recruitment = item.id_recruitment;
    //   this.getDetail();
    //   this.dialogDetail = true;
    //   //   this.$router.push("/EmpDetail");
    //   //   localStorage.setItem("id_emp", item.id);
    // },
    detail(val){
        if(val != '-'){
            this.getDetail(val);
            this.dialogDetail = true;
        }else{
            this.dialogAbsenKosong = true;
        }
    },
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

