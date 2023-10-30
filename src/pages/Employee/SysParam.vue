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
        <v-col class="pt-1 px-2" cols="12" sm="4" md="4">
          <v-card elevation="7">
            <v-card-title class="px-3 py-2 fontall">
              <v-icon left style="color: black"> mdi-cogs </v-icon>
              <h4>Divisi</h4>
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
                :headers="headersdivisi"
                :items="itemsdivisi"
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
                      @click="showAddModalDivisi()"
                      color="#25695c"
                    >
                      <v-icon small>mdi-plus</v-icon> Add Item
                    </v-btn>
                    <!-- Modal Add Edit -->
                    <v-dialog v-model="dialog" max-width="800px"> </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    class="mr-1"
                    @click="showEditModalDivisi(item)"
                    color="warning"
                  >
                    mdi-pencil-circle-outline
                  </v-icon>
                  <v-icon @click="showDeleteModalDivisi(item)" color="#d42f2f">
                    mdi-delete-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="pt-1 px-2" cols="12" sm="8" md="8">
          <v-card elevation="7">
            <v-card-title class="px-3 py-2 fontall">
              <v-icon left style="color: black"> mdi-cogs </v-icon>
              <h4>Department</h4>
            </v-card-title>
            <v-divider
              style="border-color: black"
              class="mx-2 mt-0"
            ></v-divider>
            <v-card-text class="fontall px-24 pt-0 pb-2">
              <v-data-table
                :headers="headersdept"
                :items="itemsdept"
                :loading="loadtable"
                loading-text="Loading... Please wait"
                class="rounded elevation-0 mx-1 pa-1 mb-5 fontall"
                :disable-pagination="true"
                :hide-default-footer="true"
              >
                <template v-slot:item.is_aktif="{ item }">
                  <h5 :color="getColorStatus(item.is_aktif)">
                    {{ getTextStatus(item.is_aktif) }}
                  </h5>
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
                      @click="showAddModalDept()"
                      color="#25695c"
                    >
                      <v-icon small>mdi-plus</v-icon> Add Item
                    </v-btn>
                    <!-- Modal Add Edit -->
                    <v-dialog v-model="dialog" max-width="800px"> </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    class="mr-1"
                    @click="showEditModalDept(item)"
                    color="warning"
                  >
                    mdi-pencil-circle-outline
                  </v-icon>
                  <v-icon @click="showDeleteModalDept(item)" color="#d42f2f">
                    mdi-delete-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Modal Add Edit Divisi-->
    <v-dialog persistent v-model="dialogDivisi" max-width="500px">
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
                    v-model="defaultItem.nama"
                    outlined
                    label="Nama Divisi"
                    class="fontall"
                    color="#25695c"
                    dense
                    :rules="[rules.required]"
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
          <v-btn dark :loading="loading" color="#25695c" @click="savedivisi">
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Add Edit Dept-->
    <v-dialog persistent v-model="dialogDept" max-width="500px">
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
                    v-model="defaultItem.divisi_code"
                    :items="itemsdivisi"
                    label="Pilih Divisi"
                    class="fontall"
                    item-text="nama"
                    item-value="divisi_code"
                    outlined
                    color="#25695c"
                    dense
                    clearable
                    :rules="[(v) => !!v || 'Field is required']"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="pa-1">
                  <v-text-field
                    v-model="defaultItem.dept_nama"
                    outlined
                    label="Nama Department"
                    class="fontall"
                    color="#25695c"
                    dense
                    :rules="[rules.required]"
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
          <v-btn dark :loading="loading" color="#25695c" @click="savedept">
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Delete Divisi -->
    <v-dialog v-model="dialogDivisiDelete" max-width="500px">
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
          <v-btn dark color="#25695c" @click="deleteItemConfirmDivisi">
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Delete Dept-->
    <v-dialog v-model="dialogDeptDelete" max-width="500px">
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
          <v-btn dark color="#25695c" @click="deleteItemConfirmDept">
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
  name: "SysParam",
  data: () => ({
    itemsbr: [
      {
        text: "Employee",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "System Parameter",
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
    dialogDivisi: false,
    dialogDivisiDelete: false,
    dialogReset: false,
    dialogDept: false,
    dialogDeptDelete: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headersdivisi: [
      { text: "Code", value: "divisi_code" },
      { text: "Nama", value: "nama" },
      { text: "Actions", value: "actions", sortable: false, width: "30%" },
    ],
    headersdept: [
      { text: "Divisi", value: "divisi_nama" },
      { text: "Department_code", value: "department_code" },
      { text: "Nama Department", value: "dept_nama" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],

    defaultItem: {
      user_id: "",
      nama: "",
      divisi_code: "",
      divisi_nama: "",
      department_code: "",
      dept_nama: "",
      id: "",
    },

    itemsdept: [],
    itemsdivisi: [],
    itemsrole: [],
    itemsemp: [],
    itemsstatus_admin: [
      { text: "Aktif", value: 0 },
      { text: "Tidak_Aktif", value: 1 },
    ],

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
    this.getDivisi();
    this.getDept();
  },

  methods: {
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

    async addApiDivisi(datapost) {
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddDivisi",
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
          this.dialogDivisi = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.getDivisi();
        } else {
          this.dialogDivisi = true;
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
    async editApiDivisi(datapost) {
      console.log(datapost);
      try {
        const response = await axios.post(
          this.BaseUrlGet + "EditDivisi",
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
          this.dialogDivisi = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.getDivisi();
        } else {
          this.dialogDivisi = true;
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
    async deleteApiDivisi() {
      const datapost = {
        divisi_code: this.defaultItem.divisi_code,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "SoftDeleteDivisi",
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

          this.dialogDivisiDelete = false;
          this.dialogDeptDelete = false;
          this.getDivisi();
        } else {
          this.dialogDivisiDelete = true;
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },

    async addApiDept(datapost) {
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddDepartment",
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
          this.dialogDept = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.getDept();
        } else {
          this.dialogDept = true;
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
    async editApiDept(datapost) {
      console.log(datapost);
      try {
        const response = await axios.post(
          this.BaseUrlGet + "EditDepartment",
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
          this.dialogDept = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.getDept();
        } else {
          this.dialogDept = true;
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
    async deleteApiDept() {
      const datapost = {
        department_code: this.defaultItem.department_code,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "SoftDeleteDepartment",
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

          this.dialogDivisiDelete = false;
          this.dialogDeptDelete = false;
          this.getDept();
        } else {
          this.dialogDeptDelete = true;
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },

    showAddModalDivisi() {
      this.defaultItem.divisi_code = "";
      this.defaultItem.nama = "";
      this.formTitle = "Add Item";
      // console.log();
      this.AddModal = true;
      this.dialogDivisi = true;
    },
    showEditModalDivisi(item) {
      this.defaultItem = Object.assign({}, item);
      this.formTitle = "Edit Item";
      console.log(this.defaultItem);
      this.AddModal = false;
      this.dialogDivisi = true;
    },
    showDeleteModalDivisi(item) {
      this.defaultItem = Object.assign({}, item);
      this.dialogDivisiDelete = true;
    },

    showAddModalDept() {
      this.defaultItem.divisi_code = "";
      this.defaultItem.nama = "";
      this.defaultItem.department_code = "";
      this.defaultItem.dept_nama = "";
      this.formTitle = "Add Item";
      // console.log();
      this.AddModal = true;
      this.dialogDept = true;
    },
    showEditModalDept(item) {
      this.defaultItem = Object.assign({}, item);
      this.formTitle = "Edit Item";
      console.log(this.defaultItem);
      this.AddModal = false;
      this.dialogDept = true;
    },
    showDeleteModalDept(item) {
      this.defaultItem = Object.assign({}, item);
      this.dialogDeptDelete = true;
    },

    close() {
      this.dialogDivisi = false;
      this.dialogDept = false;
      this.dialogReset = false;
    },
    closeDelete() {
      this.dialogDivisiDelete = false;
      this.dialogDeptDelete = false;
    },

    savedivisi() {
      this.loading = true;

      const datapost = {
        divisi_code: "default",
        nama: this.defaultItem.nama,
        // alamat: this.defaultItem.alamat,
      };

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        if (this.defaultItem.divisi_code) {
          console.log("Save Edit");
          datapost.divisi_code = this.defaultItem.divisi_code;
          this.editApiDivisi(datapost);
        } else {
          console.log("Save Add");
          this.addApiDivisi(datapost);
        }
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
      }
    },

    savedept() {
      this.loading = true;

      const datapost = {
        divisi_code: this.defaultItem.divisi_code,
        department_code: "default",
        nama: this.defaultItem.dept_nama,
        // alamat: this.defaultItem.alamat,
      };

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        if (this.defaultItem.department_code) {
          console.log("Save Edit");
          datapost.department_code = this.defaultItem.department_code;
          this.editApiDept(datapost);
        } else {
          console.log("Save Add");
          this.addApiDept(datapost);
        }
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
      }
    },

    deleteItemConfirmDivisi() {
      this.deleteApiDivisi();
    },
    deleteItemConfirmDept() {
      this.deleteApiDept();
    },

    resetItem(item) {
      this.defaultItem.user_id = item.user_id;
      this.defaultItem.email = item.email;
      this.dialogReset = true;
    },
  },
};
</script>

