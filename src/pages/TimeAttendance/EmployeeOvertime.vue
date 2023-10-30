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

              
                <template v-slot:item.tanggal="{ item }">
                    {{ getTanggal(item.tanggal) }}
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
                <v-col cols="12" sm="8" md="8" class="pa-1">
                    <v-combobox
                        v-model="defaultItem.employee"
                        :items="itemlistemployee"
                        item-value="no_induk_karyawan"
                        item-text="nama_lengkap"
                        label="Pilih Karyawan"
                        outlined
                    ></v-combobox>
                </v-col>
                <v-col cols="12" sm="4" md="4" class="pa-1">
                    <v-menu
                        v-model="menu3"
                        transition="scale-transition"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="datepicker1"
                            slot="activator"
                            label="Tanggal Lembur"
                            class=" mr-2"
                            outlined
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="datepicker1"
                            @input="menu3 = false"
                            @change='changefromdate()'
                        ></v-date-picker>
                    </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6" class="pa-1">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time1"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="time1"
                        label="Pilih Jam Masuk"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                    v-if="menu1"
                    v-model="time1"
                    full-width
                    @click:minute="$refs.menu1.save(time1)"
                    ></v-time-picker>
                </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pa-1">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time2"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="time2"
                        label="Pilih Jam Keluar"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                    v-if="menu2"
                    v-model="time2"
                    full-width
                    @click:minute="$refs.menu2.save(time2)"
                    ></v-time-picker>
                </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12" class="pa-1">
                  <v-textarea
                    v-model="defaultItem.keterangan_lembur"
                    outlined
                    label="Keterangan"
                    class="fontall"
                    color="#25695c"
                  ></v-textarea>
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
  name: "AttendanceOvertime",
  data: () => ({
    itemsbr: [
      {
        text: "Time Attendance",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Attendance Overtime",
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
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "Nama Karyawan", value: "nama_lengkap", width: "17%"  },
      { text: "Tanggal Lembur", value: "tanggal" },
      { text: "Jam Mulai", value: "waktu_awal_lembur" },
      { text: "Jam Akhir", value: "waktu_akhir_lembur" },
      { text: "Keterangan", value: "keterangan_lembur" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false, width: "12%" },
    ],

    time1: '07:00',
    menu1: false,
    time2: '17:00',
    menu2: false,

    defaultItem: {
      id:'',
      employee:[],
      status:'',
      keterangan_lembur:'',
    },

    items: [],
    itemsJenisCuti: [],
    itemlistemployee:[],


    datepicker1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    datepicker2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu3: false,
    //   menu2: false,

    AddModal: true,
    valid: true,

    loadtable: false,

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
    this.initialize();
    this.getJenisCuti();
    this.getEmp();
  },

  methods: {
    async initialize() {
      this.loadtable = true;
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAttendanceOvertime", {
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
          this.BaseUrlGet + "AddAttendanceOvertime",
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
          this.BaseUrlGet + "EditAttendanceOvertime/"+this.defaultItem.id,
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
          this.BaseUrlGet + "DeleteAttendanceOvertime/"+this.defaultItem.id,
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

    showAddModal() {
      this.defaultItem.id = "";
      this.defaultItem.employee = [];
      this.defaultItem.keterangan = "";
      this.defaultItem.jenis_cuti_id = "";
      this.formTitle = "Add Item";
      this.datepicker1 = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      this.datepicker2 = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      // console.log();
      this.AddModal = true;
      this.dialog = true;
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
      this.formTitle = "Edit Item";
    //   console.log(this.defaultItem);
      this.AddModal = false;
      this.dialog = true;
    },
    showDeleteModal(item) {
      this.defaultItem.id = item.id;
      this.dialogDelete = true;
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
                waktu_awal_lembur: this.time1,
                waktu_akhir_lembur: this.time2,
                tanggal: this.datepicker1,
                keterangan_lembur: this.defaultItem.keterangan_lembur,
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

