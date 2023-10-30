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
            <v-card-title class="px-3 py-2 fontall">
              <v-icon left style="color: black"> mdi-cogs </v-icon>
              <h4>Jenis Shift</h4>
            </v-card-title>
            <v-divider
              style="border-color: black"
              class="mx-2 mt-0"
            ></v-divider>
            <v-card-text
              class="fontall px-24 pt-0 pb-2"
              style="padding-left: 2px; padding-right: 2px"
            >
              <v-data-table
                :headers="headersshift"
                :items="itemsshift"
                :loading="loadtable"
                loading-text="Loading... Please wait"
                class="rounded elevation-0 mx-1 pa-1 mb-5 fontall"
                :disable-pagination="true"
                :hide-default-footer="true"
              >
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
                      @click="showAddModalShift()"
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
                    @click="showEditModalShift(item)"
                    color="warning"
                  >
                    mdi-pencil-circle-outline
                  </v-icon>
                  <v-icon v-if="item.id != 1"  @click="showDeleteModalShift(item)" color="#d42f2f">
                    mdi-delete-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="pt-1 px-2" cols="12" sm="9" md="9">
          <v-card elevation="7">
            <v-card-title class="px-3 py-2 fontall">
              <v-icon left style="color: black"> mdi-cogs </v-icon>
              <h4>Jenis Cuti</h4>
            </v-card-title>
            <v-divider
              style="border-color: black"
              class="mx-2 mt-0"
            ></v-divider>
            <v-card-text class="fontall px-24 pt-0 pb-2">
              <v-data-table
                :headers="headersdept"
                :items="itemsJenisCuti"
                :loading="loadtable"
                loading-text="Loading... Please wait"
                class="rounded elevation-0 mx-1 pa-1 mb-5 fontall"
                :disable-pagination="true"
                :hide-default-footer="true"
              >
                
                <template v-slot:item.jumlah_cuti="{ item }">
                    {{ item.jumlah_cuti }} Hari
                </template>
                <template v-slot:item.start_date="{ item }">
                    {{ getTanggal(item.start_date) }}
                </template>
                <template v-slot:item.end_date="{ item }">
                    {{ getTanggal(item.end_date) }}
                </template>
                <template v-slot:item.approval="{ item }">
                    {{ getapproval(item.approval) }}
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
                      @click="showAddModalJenisCuti()"
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
                    @click="showEditModalJenisCuti(item)"
                    color="warning"
                  >
                    mdi-pencil-circle-outline
                  </v-icon>
                  <v-icon v-if="item.id != 1 && item.id != 2 && item.id != 3  && item.id != 4" @click="showDeleteModalJenisCuti(item)" color="#d42f2f">
                    mdi-delete-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Modal Add Edit Shift-->
    <v-dialog persistent v-model="dialogShift" max-width="650px">
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
                  <v-text-field
                    v-model="defaultItem.nama_shift"
                    outlined
                    label="Nama Shift"
                    class="fontall"
                    color="#25695c"
                    :rules="[rules.required]"
                  ></v-text-field>
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
                <v-col cols="12" sm="6" md="6" class="pa-1">
                  <v-menu
                    ref="menu3"
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time3"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="time3"
                        label="Pilih Jam Istirahat Keluar"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                    v-if="menu3"
                    v-model="time3"
                    full-width
                    @click:minute="$refs.menu3.save(time3)"
                    ></v-time-picker>
                </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pa-1">
                  <v-menu
                    ref="menu4"
                    v-model="menu4"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time4"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="time4"
                        label="Pilih Jam Istirahat Masuk"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                    v-if="menu4"
                    v-model="time4"
                    full-width
                    @click:minute="$refs.menu4.save(time4)"
                    ></v-time-picker>
                </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6" class="pa-1">
                  <v-menu
                    ref="menu5"
                    v-model="menu5"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time5"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="time5"
                        label="Jam Lembur Setelah"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                    v-if="menu5"
                    v-model="time5"
                    full-width
                    @click:minute="$refs.menu5.save(time5)"
                    ></v-time-picker>
                </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12" class="pa-1">
                  <v-textarea
                    v-model="defaultItem.keterangan_shift"
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
          <v-btn dark :loading="loading" color="#25695c" @click="saveShift">
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Add Edit Jenis Cuti-->
    <v-dialog persistent v-model="dialogJenisCuti" max-width="650px">
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
                  <v-text-field
                    v-model="defaultItem.nama_cuti"
                    outlined
                    label="Nama Jenis Cuti"
                    class="fontall"
                    color="#25695c"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pa-1">
                  <v-text-field
                    v-model="defaultItem.jumlah_cuti"
                    outlined
                    label="Jumlah Hari Berlaku"
                    type="number"
                    class="fontall"
                    color="#25695c"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pa-1">                  
                    <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date1"
                            label="Tanggal Mulai Berlaku"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date1"
                        @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pa-1">
                    <v-select
                        v-model="defaultItem.approval"
                        :items="itemsApproval"
                        label="Perlu Persetujuan"
                        item-value="value"
                        item-text="text"
                        outlined
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
          <v-btn dark :loading="loading" color="#25695c" @click="saveJenisCuti">
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Delete Shift -->
    <v-dialog v-model="dialogShiftDelete" max-width="500px">
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
          <v-btn dark color="#25695c" @click="deleteItemConfirmShift">
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Delete Jenis Cuti-->
    <v-dialog v-model="dialogJenisCutiDelete" max-width="500px">
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
          <v-btn dark color="#25695c" @click="deleteItemConfirmJenisCuti">
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
  name: "AttendanceSetting",
  data: () => ({
    itemsbr: [
      {
        text: "Time Attendance",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Attendance Setting",
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
    dialogShift: false,
    dialogShiftDelete: false,
    dialogReset: false,
    dialogJenisCuti: false,
    dialogJenisCutiDelete: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headersshift: [
      { text: "Nama Shift", value: "nama_shift", width: "17%"  },
      { text: "Jam Masuk", value: "sechedule_in" },
      { text: "Jam Keluar", value: "sechedule_out" },
      { text: "Jam Istirahat Keluar", value: "break_out" },
      { text: "Jam Istirahat Masuk", value: "break_in" },
      { text: "Lembur Setelah", value: "overtime_after" },
      { text: "Keterangan", value: "keterangan_shift" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    headersdept: [
      { text: "Nama Cuti", value: "nama_cuti", width: "30%"  },
      { text: "Jumlah Hari Berlaku", value: "jumlah_cuti" },
      { text: "Tanggal Mulai Berlaku", value: "start_date" },
      { text: "Memerlukan Persetujuan", value: "approval" },
    //   { text: "Tanggal Berakhir Berlaku", value: "end_date" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],

    defaultItem: {
      id_shift:'',
      nama_shift: "",
      sechedule_in: "",
      sechedule_out: "",
      break_out: "",
      break_in: "",
      overtime_after: "",
      keterangan_shift:'',
      id_jeniscuti: "",
      nama_cuti: "",
      jumlah_cuti: 0,
      start_date: "",
      end_date: "",
      approval: "",
    },

    itemsJenisCuti: [],
    itemsshift: [],
    
    itemsApproval: [
      { text: "Tidak Perlu", value: 0},
      { text: "Perlu", value: 1},
    ],

    time1: '07:00',
    menu1: false,
    time2: '17:00',
    menu2: false,
    time3: '12:00',
    menu3: false,
    time4: '13:00',
    menu4: false,
    time5: '18:00',
    menu5: false,

    date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
  }),

  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    this.getShift();
    this.getJenisCuti();
  },

  methods: {
    async getShift() {
      this.loadtable = true;
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAttendanceShift", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsshift = response.data.data.result.data;
            this.loadtable = false;
        } else {
          console.log("Kosong");
          this.itemsshift = [];
            this.loadtable = false;
        }
      } catch (error) {
        console.error(error);
        this.loadtable = false;
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsshift = [];
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

    async addApiShift(datapost) {
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddAttendanceShift",
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
          this.dialogShift = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.getShift();
        } else {
          this.dialogShift = true;
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
    async editApiShift(datapost) {
      console.log(datapost);
      try {
        const response = await axios.put(
          this.BaseUrlGet + "EditAttendanceShift/"+this.defaultItem.id_shift,
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
          this.dialogShift = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.getShift();
        } else {
          this.dialogShift = true;
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
    async deleteApiShift() {
      const datapost = {
        id_shift: this.defaultItem.id_shift,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.delete(
          this.BaseUrlGet + "DeleteAttendanceShift/"+this.defaultItem.id_shift,
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

          this.dialogShiftDelete = false;
          this.dialogJenisCutiDelete = false;
          this.getShift();
        } else {
          this.dialogShiftDelete = true;
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },

    async addApiJenisCuti(datapost) {
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddAttendanceJenisCuti",
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
          this.dialogJenisCuti = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.getJenisCuti();
        } else {
          this.dialogJenisCuti = true;
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
    async editApiJenisCuti(datapost) {
      console.log(datapost);
      try {
        const response = await axios.put(
          this.BaseUrlGet + "EditAttendanceJenisCuti/"+this.defaultItem.id_jeniscuti,
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
          this.dialogJenisCuti = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.getJenisCuti();
        } else {
          this.dialogJenisCuti = true;
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
    async deleteApiJenisCuti() {
      const datapost = {
        id_jeniscuti: this.defaultItem.id_jeniscuti,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.delete(
          this.BaseUrlGet + "DeleteAttendanceJenisCuti/"+this.defaultItem.id_jeniscuti,
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

          this.dialogShiftDelete = false;
          this.dialogJenisCutiDelete = false;
          this.getJenisCuti();
        } else {
          this.dialogJenisCutiDelete = true;
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },

    showAddModalShift() {
      this.defaultItem.id_shift = "";
      this.defaultItem.nama_shift = "";
      this.defaultItem.keterangan_shift = "";
      this.formTitle = "Add Item";
      // console.log();
      this.AddModal = true;
      this.dialogShift = true;
    },
    showEditModalShift(item) {
    //   this.defaultItem = Object.assign({}, item); 
    console.log(item);   
      this.defaultItem.id_shift = item.id;
      this.defaultItem.nama_shift = item.nama_shift;
      this.defaultItem.keterangan_shift = item.keterangan_shift;
      this.time1 = item.sechedule_in;
      this.time2 = item.sechedule_out;
      this.time3 = item.break_out;
      this.time4 = item.break_in;
      this.time5 = item.overtime_after;
      this.formTitle = "Edit Item";
    //   console.log(this.defaultItem);
      this.AddModal = false;
      this.dialogShift = true;
    },
    showDeleteModalShift(item) {
      this.defaultItem.id_shift = item.id;
      this.dialogShiftDelete = true;
    },

    showAddModalJenisCuti() {
      this.defaultItem.id_jeniscuti = "";
      this.defaultItem.nama_cuti = "";
      this.defaultItem.jumlah_cuti = "";
      this.formTitle = "Add Item";
      // console.log();
      this.AddModal = true;
      this.dialogJenisCuti = true;
    },
    showEditModalJenisCuti(item) {
      this.defaultItem.id_jeniscuti = item.id;
      this.defaultItem.nama_cuti = item.nama_cuti;
      this.defaultItem.jumlah_cuti = item.jumlah_cuti;
      this.defaultItem.approval = item.approval;
      this.date1 = item.start_date;
      this.date2 = item.end_date;
      this.formTitle = "Edit Item";
    //   console.log(this.defaultItem);
      this.AddModal = false;
      this.dialogJenisCuti = true;
    },
    showDeleteModalJenisCuti(item) {
      this.defaultItem.id_jeniscuti = item.id;
      this.dialogJenisCutiDelete = true;
    },

    close() {
      this.dialogShift = false;
      this.dialogJenisCuti = false;
      this.dialogReset = false;
    },
    closeDelete() {
      this.dialogShiftDelete = false;
      this.dialogJenisCutiDelete = false;
    },

    saveShift() {
      this.loading = true;

      const datapost = {
        nama_shift: this.defaultItem.nama_shift,
        keterangan_shift: 'default',
        sechedule_in: this.time1,
        sechedule_out: this.time2,
        break_out: this.time3,
        break_in: this.time4,
        overtime_after: this.time5,
        // alamat: this.defaultItem.alamat,
      };

      console.log(datapost)

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        datapost.keterangan_shift = this.defaultItem.keterangan_shift;
        if (this.defaultItem.id_shift) {
          console.log("Save Edit");
          this.editApiShift(datapost);
            this.loading = false;
        } else {
          console.log("Save Add");
          this.addApiShift(datapost);
            this.loading = false;
        }
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
        this.loading = false;
      }
    },

    saveJenisCuti() {
      this.loading = true;

      const datapost = {
        nama_cuti: this.defaultItem.nama_cuti,
        jumlah_cuti: this.defaultItem.jumlah_cuti,
        start_date: this.date1,
        end_date: this.date1,
        approval: this.defaultItem.approval,

        // alamat: this.defaultItem.alamat,
      };

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        if (this.defaultItem.id_jeniscuti) {
          console.log("Save Edit");
          this.editApiJenisCuti(datapost);
          this.loading = false;
        } else {
          console.log("Save Add");
          this.addApiJenisCuti(datapost);
          this.loading = false;
        }
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
        this.loading = false;
      }
    },

    deleteItemConfirmShift() {
      this.deleteApiShift();
    },
    deleteItemConfirmJenisCuti() {
      this.deleteApiJenisCuti();
    },

    resetItem(item) {
      this.defaultItem.user_id = item.user_id;
      this.defaultItem.email = item.email;
      this.dialogReset = true;
    },
     
    getTanggal(val) {
      return HelperGlobalService.gettanggal(val);
    },

    getapproval(val){
      if(val == 0){
        return 'Tidak Perlu'
      }else{
        return 'Perlu'
      }
    },
  },
};
</script>

