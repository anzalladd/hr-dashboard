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
          v-if="eksternaldata == true"
          :headers="headers"
          :items="dataobject"
          :search="search"
          class="rounded elevation-6 mx-3 pa-1 itemchild"
        >
          <template v-slot:item.updated_at="{ item }">
            {{ gettanggal(item.updated_at) }}
          </template>
          <template v-slot:item.tunjangan_jabatan="{ item }">
            {{ getRupiah(item.tunjangan_jabatan) }}
          </template>
          <template v-slot:item.tunjangan_transport="{ item }">
            {{ getRupiah(item.tunjangan_transport) }}
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
              <v-dialog persistent v-model="dialog" max-width="500px">
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
                          <v-col cols="12" sm="12" md="12" class="pa-1">
                            <v-select
                              v-model="defaultItem.no_induk_karyawan"
                              :items="itemskaryawan"
                              item-value="no_induk_karyawan"
                              item-text="nama_lengkap"
                              label="Pilih Karyawan"
                              clearable
                              outlined
                              dense
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="12" md="12" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.tunjangan_jabatan"
                              outlined
                              label="Tunjangan Jabatan"
                              class="fontall"
                              color="#25695c"
                              dense
                              type='number'
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.tunjangan_transport"
                              outlined
                              label="Tunjangan Transport"
                              class="fontall"
                              color="#25695c"
                              dense
                              type='number'
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
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
                    <v-btn dark :loading="loading" color="#25695c" @click="save()">
                      <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-1" @click="edit(item)" color="#bf9168">
              mdi-pencil-outline
            </v-icon>
            <v-icon @click="showDeleteModal(item)" color="#d42f2f">
              mdi-delete-outline
            </v-icon>
          </template>
        </v-data-table>

    

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
                              v-model="dept_value"
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
  name: "Tunjangan",
  data: () => ({
    itemsbr: [
      {
        text: "Penggajian",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Tunjangan",
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
      { text: "NIK", value: "emp_nik" },
      { text: "Nama", value: "nama_lengkap" },
      { text: "Tunjangan Jabatan", value: "tunjangan_jabatan" },
      { text: "Tunjangan Transport", value: "tunjangan_transport" },
      // { text: "Unit Perusahaan", value: "unit_perusahan_nama" },
      { text: "Updated Date", value: "updated_at" },
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
      id: "",
    },
    defaultItem: {
      id: "-",
      emp_nik: "",
      tunjangan_jabatan: 0,
      tunjangan_transport: 0,
      tunjangan_lain_lain_bulanan: 0,
    },

    deleteDetailItem: {
      id: "",
    },


    itemstabs: [
      { text: "Tunjangan Jabatan", value: "1" },
      { text: "Tunjangan Transport", value: "2" },
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

  beforeMount() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    localStorage.removeItem("status");
    this.initialize();
    this.getDept();
    this.getEmp();
  },

  methods: {
    async initialize(val) {
      var val_code = "";
      if (val) {
        val_code = val;
      }
      try {
        const response = await axios.get(this.BaseUrlGet + "GetPayrollTunjangan?department_code="+val_code, {
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
    async addData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddPayrollTunjangan",
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
        const response = await axios.put(
          this.BaseUrlGet + "EditPayrollTunjangan/"+this.readOnly.id,
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
        id: this.readOnly.id,
        // no_induk_karyawan: this.deleteDetailItem.no_induk_karyawan,
      };
      // this.dialogDetail = false;
      try {
        const response = await axios.delete(
          this.BaseUrlGet + "DeletePayrollTunjangan/"+this.readOnly.id,
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

    async getEmp() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetAllEmployee" ,
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
      this.initialize(this.dept_value);
    },

    pilihkaryawan(){
      this.getDetailKaryawan()
    },


    selectedDivisi(val) {
      console.log(val);
      this.getDept(val);
    },

    cari() {
        this.initialize(this.dept_value);
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
    },
    edit(item) {
        console.log(item);
      this.readOnly.id = item.id;
      this.defaultItem.id = item.id;
      this.defaultItem.no_induk_karyawan = item.emp_nik;
      this.defaultItem.tunjangan_jabatan = item.tunjangan_jabatan;
      this.defaultItem.tunjangan_transport = item.tunjangan_transport;
      this.dialog = true;
      this.isEdit = true,
      this.formTitle = "Edit Item";
    },
    showDeleteModal(item) {
      this.dialogDelete = true;
      this.readOnly.id = item.id;
      this.defaultItem.id = item.id;
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

    async save() {
      //   this.loading = true;
      const datapost = {
        emp_nik : this.defaultItem.no_induk_karyawan,
        tunjangan_jabatan : this.defaultItem.tunjangan_jabatan,
        tunjangan_transport : this.defaultItem.tunjangan_transport       
      }

      console.log(datapost);

      if (datapost.emp_nik == '' || datapost.emp_nik == null) {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
      } else {
        console.log(datapost);
        if (this.readOnly.id) {
          this.editData(datapost);
        } else {
          this.addData(datapost);
        }
      }
    },

    deleteItemConfirm() {
      this.deleteApi();
    },
    resetItem() {
      //   this.defaultItem.user_id = item.user_id;
      this.readOnly.id = "";
      this.defaultItem.id = "";
      this.defaultItem.no_induk_karyawan = "";
      this.defaultItem.tunjangan_jabatan = 0;
      this.defaultItem.tunjangan_transport = 0;
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
    gettanggal(val) {
      return HelperGlobalService.gettanggal(val);
    },

    getRupiah(val){
      return HelperGlobalService.getRupiah(val);
    },
  },
};
</script>

