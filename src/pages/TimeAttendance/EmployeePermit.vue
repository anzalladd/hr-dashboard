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

    <div class="mt-0 ml-5 mr-5">
      <v-row>
        <v-col class="pt-1 px-2" cols="12" sm="12" md="12">
          <v-card elevation="7">
            <!-- <v-card-title class="px-3 py-2 fontall">
              <v-icon left style="color: black"> mdi-cogs </v-icon>
              <h4>Jenis Shift</h4>
            </v-card-title>
            <v-divider
              style="border-color: black"
              class="mx-2 mt-0"
            ></v-divider> -->
            <v-card-text
              class="fontall px-24 pt-0 pb-2"
              style="padding-left: 2px; padding-right: 2px"
            >
              <v-data-table
                :headers="headers"
                :items="items"
                :loading="loadtable"
                loading-text="Loading... Please wait"
                class="rounded elevation-0 mx-1 pa-1 mb-5 fontall"
                :disable-pagination="true"
                :hide-default-footer="true"
              >

              
                <template v-slot:item.tgl_mulai_cuti="{ item }">
                    {{ getTanggal(item.tgl_mulai_cuti) }}
                </template>
                <template v-slot:item.tgl_akhir_cuti="{ item }">
                    {{ getTanggal(item.tgl_akhir_cuti) }}
                </template>
                <template v-slot:item.lama_cuti="{ item }">
                    {{ item.lama_cuti }} Hari
                </template>
                
                <template v-slot:item.status="{ item }">
                    <v-chip label :color="getColorStatus(item.status)" dark>
                    {{ item.status }}
                    </v-chip>
                </template>

                <template v-slot:top>
                  <v-toolbar flat>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search..."
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                      dark
                      class="mb-2"
                      @click="showAddModal()"
                      color="#25695c"
                    >
                      <v-icon small>mdi-plus</v-icon> Add Item
                    </v-btn>
                    <!-- Modal Add Edit -->
                    <!-- <v-dialog v-model="dialog" max-width="800px"> </v-dialog> -->
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    class="mr-1"
                    @click="showEditModal(item)"
                    color="warning"
                  >
                    mdi-pencil-circle-outline
                  </v-icon>
                  <v-icon @click="showDeleteModal(item)" color="#d42f2f">
                    mdi-delete-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Modal Add Edit-->
    <v-dialog persistent v-model="dialog" max-width="650px">
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
              <v-row>
                <v-col cols="12" sm="6" md="6" class="pa-1">
                    <v-combobox
                        v-model="defaultItem.employee"
                        :items="itemlistemployee"
                        item-value="no_induk_karyawan"
                        item-text="nama_lengkap"
                        label="Pilih Karyawan"
                        outlined
                        :disabled='disableEdit'
                        :filled='disableEdit'
                        @change="getDetaiilEmp"
                    ></v-combobox>
                </v-col>
                <v-col v-if='disableEdit == false' cols="12" sm="6" md="6" class="pa-1">
                  <v-text-field
                      v-model="defaultItem.sisa_cuti_lama"
                      label="Sisa Cuti"
                      outlined
                      readonly
                      class="fontall"
                      color="#25695c"
                      type='number'
                      disabled
                      filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col v-if='disableEdit == false' cols="12" sm="12" md="12" class="pa-1">
                    <v-select
                        v-model="defaultItem.jenis_cuti_id"
                        :items="itemsJenisCuti"
                        label="Pilih Ijin"
                        item-value="id"
                        item-text="nama_cuti"
                        outlined
                    ></v-select>
                </v-col>
                <v-col v-if='disableEdit == true' cols="12" sm="10" md="10" class="pa-1">
                    <v-select
                        v-model="defaultItem.jenis_cuti_id"
                        :items="itemsJenisCuti"
                        label="Pilih Ijin"
                        item-value="id"
                        item-text="nama_cuti"
                        outlined
                        disabled
                        filled
                    ></v-select>
                </v-col>
                <v-col v-if='disableEdit == true'  cols="12" sm="2" md="2" class="pa-1">                    
                  <!-- <v-icon large @click="showInfoJenisCuti" style="margin-top:10px" color="primary">
                    mdi-information-outline
                  </v-icon> -->
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon large @click="showInfoJenisCuti" v-bind="attrs" v-on="on" style="margin-top:10px" color="primary">
                            mdi-information-outline
                        </v-icon>
                    </template>
                    <span>Saat Edit tidak akan bisa mengubah pilihan ijin karena tipe ijin ada yang memerlukan persetujuan dan tidak, <br>
                           Jika mau mengubah jenis ijin silahkan dihapus datanya dan dibuat baru</span>
                  </v-tooltip>
                </v-col>
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
                            label="Tanggal Mulai/Dilaksanakan"
                            class=" mr-2"
                            outlined
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        :disabled='disableEdit'
                        :filled='disableEdit'
                        ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="datepicker1"
                            @input="menu1 = false"
                            @change='changefromdate()'
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.lama_cuti"
                              outlined
                              label="Lama Cuti/Waktu dibutuhkan (Hari)"
                              placeholder="Lama Cuti/Waktu dibutuhkan"
                              class="fontall"
                              color="#25695c"
                              type='number'
                        :disabled='disableEdit'
                        :filled='disableEdit'
                            ></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if='disableEdit == true'>
                <v-col cols="12" sm="12" md="12" class="pa-1">
                  <v-textarea
                    v-model ='keteranganSisaCuti'
                    outlined
                    label="Keterangan Sisa Cuti"
                    class="fontall"
                    color="#25695c"
                    rows="3"
                    disabled
                    filled
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12" class="pa-1">
                  <v-textarea
                    v-model="defaultItem.keterangan"
                    outlined
                    label="Keterangan"
                    class="fontall"
                    color="#25695c"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row v-if='checkboxshow== true'>
                <v-col cols="12" sm="12" md="12" class="pa-1">
                  <v-checkbox
                    v-model="checkboxSisaCuti"
                    label="Cuti akan mempengaruhi sisa cuti karyawan"
                    @change="checkBoxSisaCutiChange"
                  ></v-checkbox>
                </v-col>
                <v-col v-if='this.checkboxSisaCuti==true' cols="12" sm="12" md="12" class="pa-1">                  
                  <v-text-field
                      v-model="sisaCutiShow"
                      label="Sisa Cuti Menjadi"
                      outlined
                      readonly
                      class="fontall"
                      color="#25695c"
                      disabled
                      filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if='disableEdit == true'>
                <v-col cols="12" sm="12" md="12" class="pa-1">
                  <h4 style="color:red">## Saat Edit hanya bisa merubah keterangan, jika ingin merubah data yang lain maka dilakukan melalui hapus dan buat baru. Karena data yang lain mempengaruhi absensi jadi tidak bisa dilakukan melalui edit</h4>
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
          <v-btn dark :loading="loading" color="#25695c" @click="save">
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Informasi -->
    <v-dialog v-model="dialogInformasi" max-width="175px">
      <v-card>
        <v-card-text class="pa-2">
            Saat Edit tidak akan bisa mengubah pilihan ijin karena tipe ijin ada yang memerlukan persetujuan dan tidak, <br>
            Jika mau mengubah jenis ijin silahkan dihapus datanya dan dibuat baru
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal Delete Shift -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete this item?</v-card-title
        >
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
  name: "AttendancePermit",
  data: () => ({
    itemsbr: [
      {
        text: "Time Attendance",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Attendance Permit",
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
    dialogDelete: false,
    dialogReset: false,
    dialogInformasi: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "Nama Karyawan", value: "nama_lengkap", width: "17%"  },
      { text: "Jenis Ijin", value: "nama_cuti" },
      { text: "Tanggal Mulai", value: "tgl_mulai_cuti" },
      { text: "Lama Ijin", value: "lama_cuti" },
      { text: "Keterangan", value: "keterangan" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false, width: "12%" },
    ],

    defaultItem: {
      id:'',
      employee:[],
      jenis_cuti_id:'',
      lama_cuti:'',
      keterangan:'',
      sisa_cuti:'',
      sisa_cuti_lama:'',
    },

    items: [],
    itemsJenisCuti: [],
    itemlistemployee:[],


    datepicker1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    datepicker2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,

    AddModal: true,
    valid: true,

    loadtable: false,

    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",
    disableEdit :false,

    checkboxshow : false,
    checkboxSisaCuti: true,
    sisaCutiShow : '',

    keteranganSisaCuti:'',
  }),

  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    this.initialize();
    this.getJenisCuti();
    this.getEmp();
  },

  methods: {
    async initialize() {
      this.loadtable = true;
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAttendancePermit", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.items = response.data.data.result.data;
            this.loadtable = false;
        } else {
          console.log("Kosong");
          this.items = [];
            this.loadtable = false;
        }
      } catch (error) {
        console.error(error);
        this.loadtable = false;
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.items = [];
        }
      }
    },
    async getJenisCuti() {
      this.loadtable = true;
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAttendanceJenisCuti", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsJenisCuti = response.data.data.result.data;
            this.loadtable = false;
        } else {
          console.log("Kosong");
          this.itemsJenisCuti = [];
            this.loadtable = false;
        }
      } catch (error) {
        console.error(error);
        this.loadtable = false;
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsJenisCuti = [];
        }
      }
    },
    async getEmp() {
    //   this.loadtable = true;
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAllEmployee", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemlistemployee = response.data.data.result.data;
            // this.loadtable = false;
        } else {
          console.log("Kosong");
          this.itemlistemployee = [];
            // this.loadtable = false;
        }
      } catch (error) {
        console.error(error);
        // this.loadtable = false;
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemlistemployee = [];
        }
      }
    },

    async addApi(datapost) {
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddAttendancePermit",
          datapost,
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
          this.initialize();
        } else {
          this.dialog = true;
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },
    async editApi(datapost) {
      console.log(datapost);
      try {
        const response = await axios.put(
          this.BaseUrlGet + "EditAttendancePermit/"+this.defaultItem.id,
          datapost,
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
          this.textsnackbar = "Sukses mengubah data";
          this.initialize();
        } else {
          this.dialog = true;
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },
    async deleteApi() {
      const datapost = {
        id_shift: this.defaultItem.id_shift,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.delete(
          this.BaseUrlGet + "DeleteAttendancePermit/"+this.defaultItem.id,
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
          this.dialogDelete = true;
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },

    getDetaiilEmp(){
      // console.log('emp->', this.defaultItem.employee.no_induk_karyawan)
      this.defaultItem.sisa_cuti_lama = this.defaultItem.employee.sisa_cuti;
      this.defaultItem.sisa_cuti = this.defaultItem.employee.sisa_cuti;
      
      var sisaCutiBaru = this.defaultItem.sisa_cuti_lama - this.defaultItem.lama_cuti;
      this.sisaCutiShow = ''+this.defaultItem.sisa_cuti_lama+' - ' + this.defaultItem.lama_cuti + ' = ' +sisaCutiBaru;

      this.checkboxshow = true;
    },
    checkBoxSisaCutiChange(){
      console.log('change', this.checkboxSisaCuti)
      if(this.checkboxSisaCuti == true){
        var sisaCutiBaru = this.defaultItem.sisa_cuti_lama - this.defaultItem.lama_cuti;
        this.sisaCutiShow = ''+this.defaultItem.sisa_cuti_lama+' - ' + this.defaultItem.lama_cuti + ' = ' +sisaCutiBaru;
        this.defaultItem.sisa_cuti = sisaCutiBaru;
      }else{
        this.defaultItem.sisa_cuti = this.defaultItem.sisa_cuti_lama;
      }
    },

    showAddModal() {
      this.defaultItem.id = "";
      this.defaultItem.employee = [];
      this.defaultItem.keterangan = "";
      this.defaultItem.jenis_cuti_id = "";
      this.defaultItem.lama_cuti = 1;
      this.formTitle = "Add Item";
      this.datepicker1 = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      this.datepicker2 = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      // console.log();
      this.AddModal = true;
      this.dialog = true;
      this.disableEdit = false;
      this.checkboxshow = false;
    },
    showEditModal(item) {
    //   this.defaultItem = Object.assign({}, item); 
    console.log(item);   
      this.defaultItem.id = item.id;
      this.defaultItem.employee = { no_induk_karyawan: item.no_induk_karyawan, nama_lengkap: item.nama_lengkap };
      this.defaultItem.keterangan = item.keterangan;
      this.defaultItem.jenis_cuti_id = item.id_jenis_cuti;
      this.datepicker1 = item.tgl_mulai_cuti;
      this.datepicker2 = item.tgl_akhir_cuti;
      this.defaultItem.lama_cuti = item.lama_cuti;
      this.defaultItem.sisa_cuti = item.sisa_cuti;
      this.defaultItem.sisa_cuti_lama = item.sisa_cuti_lama;
      this.formTitle = "Edit Item";
      if(item.sisa_cuti_lama == item.sisa_cuti){
        this.keteranganSisaCuti = 'Admin memilih ijin/cuti tidak berpengaruh ke Sisa Cuti Karyawan';
      }else{
        this.keteranganSisaCuti = 'Admin memilih ijin/cuti berpengaruh ke Sisa Cuti Karyawan. Dengan sisa cuti lama adalah '+this.defaultItem.sisa_cuti_lama+' dan sisa cuti baru menjadi '+this.defaultItem.sisa_cuti;
      }
    //   console.log(this.defaultItem);
      this.AddModal = false;
      this.dialog = true;
      this.disableEdit = true;
      this.checkboxshow = fale;
    },
    showDeleteModal(item) {
      this.defaultItem.id = item.id;
      this.dialogDelete = true;
    },
    showInfoJenisCuti(){
        this.dialogInformasi = true;
    },

    close() {
      this.dialog = false;
      this.dialogReset = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      this.loading = true;

      if(this.defaultItem.employee == null || this.defaultItem.employee.length < 1){
            this.loading = false;
            this.snackbar = true;
            this.colorsnackbar = "#D42F2F";
            this.textsnackbar = "Gagal Simpan, Karyawan tidak boleh kosong";  
       }else{
            const datapost = {
                emp_nik: this.defaultItem.employee.no_induk_karyawan,
                jenis_cuti_id: this.defaultItem.jenis_cuti_id,
                tgl_mulai_cuti: this.datepicker1,
                lama_cuti: this.defaultItem.lama_cuti,
                keterangan: this.defaultItem.keterangan,
                sisa_cuti: this.defaultItem.sisa_cuti,
                sisa_cuti_lama: this.defaultItem.sisa_cuti_lama,
                // alamat: this.defaultItem.alamat,
            };

            console.log(datapost)

              if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
                if (this.defaultItem.id) {
                    this.editApi(datapost);
                    this.loading = false;
                } else {
                    this.addApi(datapost);
                    this.loading = false;
                }
            } else {
                this.snackbar = true;
                this.colorsnackbar = "red";
                this.textsnackbar =
                "Gagal Simpan, Kolom tidak boleh ada yang kosong";
                this.loading = false;
            }
       }

    //   if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
    //     datapost.keterangan_shift = this.defaultItem.keterangan_shift;
    //     if (this.defaultItem.id_shift) {
    //       console.log("Save Edit");
    //       this.editApi(datapost);
    //         this.loading = false;
    //     } else {
    //       console.log("Save Add");
    //       this.addApi(datapost);
    //         this.loading = false;
    //     }
    //   } else {
    //     this.snackbar = true;
    //     this.colorsnackbar = "red";
    //     this.textsnackbar =
    //       "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
    //     this.loading = false;
    //   }
    },

    deleteItemConfirm() {
      this.deleteApi();
    },

    resetItem(item) {
      this.defaultItem.user_id = item.user_id;
      this.defaultItem.email = item.email;
      this.dialogReset = true;
    },
     
    getTanggal(val) {
      return HelperGlobalService.gettanggal(val);
    },

    getColorStatus(status) {
    //   console.log(role_code);
      if (status == 'Menunggu') return "#9CACA3";
      else if (status == 'Disetujui') return "#25695C";
      else return "#a01338";
    },
  },
};
</script>

