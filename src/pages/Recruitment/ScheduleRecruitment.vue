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
      <template v-slot:item.target_tanggal_pemenuhan="{ item }">
        {{ gettanggal(item.target_tanggal_pemenuhan) }}
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
            Recruitment
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
  name: "ScheduleRecruitment",
  data: () => ({
    itemsbr: [
      {
        text: "Recruitment",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Schedule Recruitment",
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
      { text: "Nama", value: "nama_recruitment" },
      { text: "Department", value: "dept_nama" },
      // { text: "Unit Perusahaan", value: "unit_perusahan_nama" },
      { text: "Jabatan", value: "jabatan" },
      { text: "Jumlah", value: "jumlah_kebutuhan" },
      { text: "Tanggal Pemenuhan", value: "target_tanggal_pemenuhan" },
      { text: "Status Schedule", value: "status_schedule" },
      //   { text: "Pangkat", value: "pangkat" },
      //   { text: "User ID", value: "username" },
      { text: "Actions", value: "actions", sortable: false, width: "10%" },
    ],
    dataobject: [],

    readOnly: {
      id_recruitment: "",
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
          this.BaseUrlGet + "GetSchedule?department_code=" + dept_code,
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
      this.$router.push("/ScheduleDetail");
      localStorage.setItem("id_recruitment", item.id_recruitment);
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

    gettanggal(val) {
      return HelperGlobalService.gettanggal(val);
    },
  },
};
</script>

