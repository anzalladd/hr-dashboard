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
      <template v-slot:item.role_name="{ item }">
        <v-chip label :color="getColorStatus(item.role_code)" dark>
          {{ item.role_name }}
        </v-chip>
      </template>
      <template v-slot:item.is_dell="{ item }">
          {{ getDeleteStatus(item.is_dell)}}
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-btn
            dark
            class="mx-1 mt-1 d-none d-md-block"
            @click="showFilterEmp()"
            color="#25695c"
          >
            <v-icon class="mx-2" small>mdi-filter-variant</v-icon> Filter
            Employee
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
          <v-btn dark class="mb-2" @click="addEmp()" color="#25695c">
            <v-icon small>mdi-plus</v-icon> Add Item
          </v-btn>
          <downloadexcel
            class            = "button ml-3"
            :fetch           = "fetchData"
            :fields          = "json_fields"
            worksheet        ="My Worksheet"
            name             ="DataKaryawan.xls">
            <v-btn dark class="mb-2" color="#b9a700">
            <v-icon small>mdi-download</v-icon> Download
          </v-btn>
          </downloadexcel>

          <!-- Modal Filter Emp -->
          <v-dialog persistent v-model="dialogFilterEmp" max-width="500px">
            <v-card>
              <v-card-title class="headermodalstyle">
                Filter Pencarian Employee
                <v-spacer></v-spacer>
                <v-btn icon dark large class="right" @click="close()">
                  <v-icon>mdi-close-box-outline</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="fontall pb-1">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container fluid>
                    <!-- <v-row class="mb-3 mt-0 ml-0">
                      <h4>Unit Perusahaan</h4>
                      <v-divider class="mx-2 mt-3"></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          v-model="selectUnitPerusahaan"
                          :items="itemsunitperusahaan"
                          item-value="unit_perusahaan_code"
                          item-text="nama"
                          label="Pilih Unit Perusahaan"
                          clearable
                          outlined
                          dense
                        ></v-select>
                      </v-col>
                    </v-row> -->
                    <v-row v-if="showDeptDivisi == true" class="mb-3 mt-2 ml-0">
                      <h4>Divisi & Department</h4>
                      <v-divider class="mx-2 mt-3"></v-divider>
                    </v-row>
                    <v-row v-if="showDeptDivisi == true">
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          v-model="selectDivisi"
                          :items="itemsdivisi"
                          item-value="divisi_code"
                          item-text="nama"
                          v-on:change="selectedDivisi"
                          label="Pilih Divisi"
                          clearable
                          outlined
                          dense
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          v-model="selectDepartment"
                          :items="itemsdept"
                          item-value="department_code"
                          item-text="dept_nama"
                          label="Pilih Departement"
                          clearable
                          outlined
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row class="mb-3 mt-2 ml-0">
                      <h4>Status Karyawan</h4>
                      <v-divider class="mx-2 mt-3"></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          v-model="selectStatusKaryawan"
                          :items="itemsstatuskaryawan"
                          item-value="id"
                          item-text="nama"
                          label="Pilih Status"
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
                      v-model="deleteDetailItem.no_induk_karyawan"
                      label="Nomor Induk Karyawan"
                      outlined
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="px-7 py-0">
                    <v-text-field
                      v-model="deleteDetailItem.nama_lengkap"
                      label="Nomor Induk Karyawan"
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
        <v-icon class="mr-1" @click="editEmp(item)" color="#bf9168">
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

import downloadexcel from "vue-json-excel";

export default {
  name: "Employee",
  components: {
    downloadexcel,
  },
  data: () => ({
    itemsbr: [
      {
        text: "Employee",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Employee",
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
    dialogTesting: false,
    dialogFilterEmp: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "NIK", value: "no_induk_karyawan" },
      { text: "Nama Employee", value: "nama_lengkap" },
      // { text: "Unit Perusahaan", value: "unit_perusahan_nama" },
      { text: "Divisi", value: "divisi_nama" },
      { text: "Department", value: "dept_nama" },
      { text: "Jabatan", value: "jabatan" },
      { text: "Status Karyawan", value: "status_karyawan_nama" },
      //   { text: "Pangkat", value: "pangkat" },
      //   { text: "User ID", value: "username" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    headersManager: [
      { text: "NIK", value: "no_induk_karyawan" },
      { text: "Nama Employee", value: "nama_lengkap" },
      // { text: "Unit Perusahaan", value: "unit_perusahan_nama" },
      { text: "Divisi", value: "divisi_nama" },
      { text: "Department", value: "dept_nama" },
      { text: "Jabatan", value: "jabatan" },
      { text: "Status Karyawan", value: "status_karyawan_nama" },
      //   { text: "Pangkat", value: "pangkat" },
      { text: "Delete", value: "is_dell" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    dataobject: [],

    defaultItem: {
      user_id: "",
      nama: "",
    },

    deleteDetailItem: {
      id: "",
      no_induk_karyawan: "",
      nama_lengkap: "",
    },

    itemsdept: [],
    itemsdivisi: [],
    itemsunitperusahaan: [],
    itemsstatuskaryawan: [],
    itemsstatus_admin: [
      { text: "Aktif", value: 0 },
      { text: "Tidak_Aktif", value: 1 },
    ],

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
    showDeptDivisi: true,
    
    json_fields: {
        'NIK': 'no_induk_karyawan',
        'Nama': 'nama_lengkap',
        'No KTP': 'no_ktp',
        'Divisi': 'divisi_nama',
        'Departement': 'dept_nama',
        'Jabatan': 'jabatan',
        'Alamat_Desa': 'desa',
        'Kecamatan': 'kec',
        'Kab/Kota': 'kab',
        'Agama': 'agama',
        'Gol Darah': 'gol_darah',
        'Jenis Kelamin': 'jenis_kelamin',
        'Tanggal Lahir': 'tanggal_lahir',
        'Tempat Lahir': 'tempat_lahir',
        'No_Telp': 'telpon',
        'No_Telp_Darurat': 'no_telpon_darurat',
        'Hubungan (NoTelpDarurat)': 'hubungan_telp_darurat',
        'Jamsostek': 'nomor_jamsostek',
        'BPJS Kesehatan': 'bpjs_kesehatan',
        'No Koperasi': 'no_anggota_koperasi',
        'Status Pernikahan': 'status_nikah',
        'Nama Istri/Suami': 'nama_istri_suami',
        'Pekerjaan Istri/Suami': 'pekerjaan_istri_suami',
    },

    role_code: '' ,
  }),

  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
      this.role_code = this.User.role_code;
      if(this.User.role_code == '2' || this.User.role_code == '5'){
        this.showDeptDivisi = false;
      }
    }
    
    this.cekRoleAkses();

    localStorage.removeItem("status");
    this.initialize();
    this.getDivisi();
    this.getUnitPerusahaan();
    this.getStatusKaryawan();
  },
  setup() {},

  methods: {
    
    cekRoleAkses(){
      // console.log(this.role_code)
      var roleCode = this.role_code;
      // console.log(roleCode.toString())
      switch (roleCode.toString()) {
        case '99':
          this.headers = this.headersManager;
          // console.log(this.headers)
          break;
        case '1':
          this.headers = this.headersManager;
          break;
        case '2':
          this.headers = this.headersManager;
          break;
      }
    },

    async initialize(divisi, dept, statuskaryawan, unit_perusahaan) {
      var div_code = "";
      if (divisi) {
        div_code = divisi;
      }
      var dept_code = "";
      if (dept) {
        dept_code = dept;
      }
      var status_karyawan = "";
      if (statuskaryawan) {
        status_karyawan = statuskaryawan;
      }
      var unit_perusahaan_code = "";
      if (unit_perusahaan) {
        unit_perusahaan_code = unit_perusahaan;
      }
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetAllEmployee?divisi_code=" +
            div_code +
            "&department_code=" +
            dept_code +
            "&status=" +
            status_karyawan +
            "&unit_perusahaan_code=" +
            unit_perusahaan_code,
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
    async getUnitPerusahaan() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetAllUnitPerusahaan",
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsunitperusahaan = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsunitperusahaan = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsunitperusahaan = [];
        }
      }
    },
    async getStatusKaryawan() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetAllStatusKaryawan",
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsstatuskaryawan = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsstatuskaryawan = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsstatuskaryawan = [];
        }
      }
    },

    async deleteApi() {
      const datapost = {
        id: this.deleteDetailItem.id,
        // no_induk_karyawan: this.deleteDetailItem.no_induk_karyawan,
      };
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "DeleteEmployee",
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

    async showFilterEmp() {
      // console.log(localStorage.getItem("token"));
      //   await this.resetFilter();
      this.dialogFilterEmp = true;
    },

    async fetchData(){
      // const response = await axios.get('https://holidayapi.com/v1/holidays?key=a4b2083b-1577-4acd-9408-6e529996b129&country=US&year=2017&month=09');
      // console.log(response);
      return this.dataobject;
    },
    startDownload(){
        alert('show loading');
    },
    finishDownload(){
        alert('hide loading');
    },
    async downloadFileApi(val){
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
          link.setAttribute("download", "Dokumen "+this.getdokname(imagesvalue)+"." + myArray[1]); 
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

    selectedDivisi(val) {
      console.log(val);
      this.getDept(val);
    },

    cari() {
      this.initialize(
        this.selectDivisi,
        this.selectDepartment,
        this.selectStatusKaryawan,
        this.selectUnitPerusahaan
      );
      this.dialogFilterEmp = false;
    },

    detailItem(item) {
      this.$router.push("/EmpDetail");
      localStorage.setItem("id_emp", item.id);
      // localStorage.removeItem("id_emp");
      localStorage.setItem("status", "detail");
    },
    addEmp() {
      this.$router.push("/EmpAddEdit");
      // localStorage.setItem("id_emp", item.id);
      localStorage.removeItem("id_emp");
      localStorage.setItem("status", "add_emp");
    },
    editEmp(item) {
      this.$router.push("/EmpAddEdit");
      localStorage.setItem("id_emp", item.id);
      // localStorage.removeItem("id_emp");
      localStorage.setItem("status", "edit_emp");
    },
    showDeleteModal(item) {
      this.dialogDelete = true;
      this.deleteDetailItem.no_induk_karyawan = item.no_induk_karyawan;
      this.deleteDetailItem.nama_lengkap = item.nama_lengkap;
      this.deleteDetailItem.id = item.id;
      //   this.defaultItem = Object.assign({}, item);
      //   this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.dialogReset = false;
      this.dialogFilterEmp = false;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.dialogFilterEmp = false;
    },

    save() {
      this.loading = true;

      const datapost = {
        nik: this.defaultItem.nik,
        role_code: this.defaultItem.role_code,
        no_telp: this.defaultItem.no_telp,
        email: this.defaultItem.email,
        password: "default",
        status_admin: "default",
        user_id: "default",
        // alamat: this.defaultItem.alamat,
      };

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        if (this.defaultItem.user_id) {
          console.log("Save Edit");
          (datapost.user_id = this.defaultItem.user_id),
            (datapost.status_admin = this.defaultItem.status_admin),
            this.editApi(datapost);
        } else {
          console.log("Save Add");
          (datapost.password = this.defaultItem.password),
            this.addApi(datapost);
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

    resetItem(item) {
      this.defaultItem.user_id = item.user_id;
      this.defaultItem.email = item.email;
      this.dialogReset = true;
    },

    getDeleteStatus(val){
      if(val == 1){return 'Yes'}
      else{return '-'}
    },
  },
};
</script>

