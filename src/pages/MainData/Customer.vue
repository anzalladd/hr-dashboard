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
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search here..."
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn dark class="mb-2" @click="showAddModal()" color="#25695c">
            <v-icon small>mdi-plus</v-icon> Add Item
          </v-btn>
          <!-- Prevent dialog from closing -->
          <v-dialog persistent v-model="dialog" max-width="700px">
            <v-card>
              <v-card-title class="headermodalstyle" style="margin-bottom: 2px">
                <span>{{ formTitle }}</span>
                <v-spacer></v-spacer>
                <v-btn icon dark large class="right" @click="close()">
                  <v-icon>mdi-close-box-outline</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="pa-0 fontall">
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step
                      editable
                      :complete="e1 > 1"
                      step="1"
                      class="itemparent"
                    >
                      Data Utama
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step
                      editable
                      :complete="e1 > 2"
                      step="2"
                      class="itemparent"
                    >
                      Data Tambahan
                    </v-stepper-step>
                    <v-stepper-step
                      editable
                      :complete="e1 > 3"
                      step="3"
                      class="itemparent"
                    >
                      Data Pembelian
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step editable step="4" class="itemparent">
                      Data Pemilik
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class="pa-3" step="1">
                      <v-container class="mb-0">
                        <v-row class="mb-0">
                          <v-col class="pb-0" cols="12" sm="12" md="12">
                            <v-select
                              v-model="defaultItem.code_salesman"
                              :items="dataadmin"
                              item-value="code"
                              item-text="nama"
                              dense
                              outlined
                              label="Pilih Salesman"
                              class="fontall"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="12" md="12">
                            <v-text-field
                              v-model="defaultItem.nama_customer"
                              outlined
                              dense
                              label="Nama Customer"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.telephone"
                              outlined
                              label="No Telephone"
                              class="itemparent"
                              color="#25695c"
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.no_hp_wa"
                              outlined
                              dense
                              label="No HP/WA"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="12" md="12">
                            <v-combobox
                              v-model="defaultItem.kabROCombobox"
                              :items="itemsKabRO"
                              item-value="id_alamat"
                              item-text="text"
                              outlined
                              dense
                              label="Pilih Kec/Kab"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-combobox>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="12" md="12">
                            <v-textarea
                              v-model="defaultItem.alamat_customer"
                              outlined
                              dense
                              label="Alamat"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                              rows="3"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>

                      <v-row class="mx-2 mb-2">
                        <v-spacer></v-spacer>
                        <v-btn
                          dark
                          class="mr-1"
                          color="#D42F2F"
                          elevation="1"
                          @click="close"
                        >
                          <v-icon left> mdi-close-circle-outline </v-icon>
                          Cancel
                        </v-btn>
                        <v-btn
                          dark
                          elevation="1"
                          color="#25695c"
                          @click="e1 = 2"
                        >
                          <v-icon left>
                            mdi-chevron-right-circle-outline
                          </v-icon>
                          Next
                        </v-btn>
                      </v-row>
                    </v-stepper-content>

                    <v-stepper-content class="pa-3" step="2">
                      <v-container class="mb-0">
                        <v-row class="mb-0">
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.kode_rayon"
                              outlined
                              dense
                              label="Kode Rayon"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.no_npwp"
                              outlined
                              dense
                              label="No NPWP"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.bentuk_bidang_usaha"
                              outlined
                              dense
                              label="Bentuk Bidang Usaha"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.bidang_usaha"
                              outlined
                              dense
                              label="Bidang Usaha"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="12" md="12">
                            <v-text-field
                              v-model="defaultItem.profil_pelanggan"
                              outlined
                              dense
                              label="Profil Pelanggan"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>

                      <v-row class="mx-2 mb-2">
                        <v-spacer></v-spacer>
                        <v-btn
                          dark
                          class="mr-1"
                          color="#D42F2F"
                          elevation="1"
                          @click="close"
                        >
                          <v-icon left> mdi-close-circle-outline </v-icon>
                          Cancel
                        </v-btn>
                        <v-btn
                          dark
                          elevation="1"
                          color="#25695c"
                          @click="e1 = 3"
                        >
                          <v-icon left>
                            mdi-chevron-right-circle-outline
                          </v-icon>
                          Next
                        </v-btn>
                      </v-row>
                    </v-stepper-content>

                    <v-stepper-content class="pa-3" step="3">
                      <v-container class="mb-0">
                        <v-row class="mb-1">
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-select
                              v-model="defaultItem.permintaan_barang"
                              :items="itemsPermintaan"
                              item-value="value"
                              item-text="text"
                              outlined
                              dense
                              label="Permintaan Barang"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-select
                              v-model="defaultItem.metode_pembayaran"
                              :items="itemsPembayaran"
                              item-value="value"
                              item-text="text"
                              outlined
                              dense
                              label="Metode Pembayaran"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.bank"
                              outlined
                              dense
                              label="Bank"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.no_rek"
                              outlined
                              dense
                              label="No Rek"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.code_limit"
                              outlined
                              dense
                              label="Credit Limit"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>

                      <v-row class="mx-2 mb-2">
                        <v-spacer></v-spacer>
                        <v-btn
                          dark
                          class="mr-1"
                          color="#D42F2F"
                          elevation="1"
                          @click="close"
                        >
                          <v-icon left> mdi-close-circle-outline </v-icon>
                          Cancel
                        </v-btn>
                        <v-btn
                          dark
                          elevation="1"
                          color="#25695c"
                          @click="e1 = 4"
                        >
                          <v-icon left>
                            mdi-chevron-right-circle-outline
                          </v-icon>
                          Next
                        </v-btn>
                      </v-row>
                    </v-stepper-content>

                    <v-stepper-content class="pa-3" step="4">
                      <v-container class="mb-0">
                        <v-row class="mb-1">
                          <v-col class="pb-0" cols="12" sm="12" md="12">
                            <v-select
                              v-model="defaultItem.kepemilikan_usaha"
                              :items="itemsKepemilikan"
                              item-value="value"
                              item-text="text"
                              outlined
                              dense
                              label="Kepemilikan Usaha"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.nama_pemilik"
                              outlined
                              dense
                              label="Nama Pemilik"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="defaultItem.no_ktp_pemilik"
                              outlined
                              dense
                              label="No KTP Pemilik"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col class="pb-0" cols="12" sm="12" md="12">
                            <v-textarea
                              v-model="defaultItem.alamat_pemilik"
                              outlined
                              dense
                              label="Alamat Pemilik"
                              class="itemparent"
                              color="#25695c"
                              :rules="[(v) => !!v || 'Field is required']"
                              rows="3"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>

                      <v-row class="mx-2 mb-2">
                        <v-spacer></v-spacer>
                        <v-btn
                          dark
                          class="mr-1"
                          color="#D42F2F"
                          elevation="1"
                          @click="close"
                        >
                          <v-icon left> mdi-close-circle-outline </v-icon>
                          Cancel
                        </v-btn>
                        <v-btn
                          dark
                          :loading="loading"
                          elevation="1"
                          color="#25695c"
                          @click="save"
                        >
                          <v-icon left>
                            mdi-checkbox-marked-circle-outline
                          </v-icon>
                          Save
                        </v-btn>
                      </v-row>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" elevation="1" outlined @click="close">
                  <v-icon left> mdi-close-circle-outline </v-icon>
                  Cancel
                </v-btn>
                <v-btn color="success" elevation="1" outlined @click="save">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Save
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card class="fontall">
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="#D42F2F" elevation="1" @click="closeDelete">
                  <v-icon left> mdi-close-circle-outline </v-icon> Cancel</v-btn
                >
                <v-btn
                  dark
                  color="#25695c"
                  elevation="1"
                  @click="deleteItemConfirm"
                >
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            persistent
            v-model="dialogDetail"
            max-width="800px"
            class="pa-1"
          >
            <v-card>
              <v-card-title class="mb-0 headermodalstyle">
                <span>Detail Customer</span>
                <v-spacer></v-spacer>
                <v-btn icon dark large @click="dialogDetail = false">
                  <v-icon>mdi-close-box-outline</v-icon>
                </v-btn>
              </v-card-title>

              <v-card-text class="fontall pa-1">
                <v-container class="pa-1">
                  <!-- <v-divider
                    style="border-color: black !important"
                    class="mx-1 mb-2"
                  ></v-divider> -->
                  <v-simple-table>
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <th
                            class="text-left"
                            style="width: 250px !important; font-size: 14px"
                          >
                            Nama Customer
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.nama_customer }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Kode Customer
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.code_customer }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Telephone
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.telephone }} /
                            {{ defaultItem.no_hp_wa }}
                          </td>
                        </tr>
                        <tr>
                          <th
                            rowspan="2"
                            class="text-left"
                            style="font-size: 14px"
                          >
                            Alamat
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.alamat_cust_ro }}
                          </td>
                        </tr>
                        <tr>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.alamat_customer }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Bidang Usaha
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            <tr>
                              {{
                                defaultItem.bidang_usaha
                              }}
                            </tr>
                            <tr>
                              {{
                                defaultItem.bentuk_bidang_usaha
                              }}
                            </tr>
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Profil Customer
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.profil_pelanggan }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Kode Rayon
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.kode_rayon }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Permintaan Barang
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.permintaan_barang }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Metode Pembayaran
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.metode_pembayaran }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Bank/No Rek
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.bank }} / {{ defaultItem.no_rek }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Credit Limit
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.code_limit }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            No Npwp
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.no_npwp }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Kepemilikan Usaha
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.kepemilikan_usaha }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Nama Pemilik
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.nama_pemilik }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            No KTP Pemilik
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.no_ktp_pemilik }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left" style="font-size: 14px">
                            Alamat Pemilik
                          </th>
                          <td
                            class="text-left"
                            style="font-size: 14px; itemchild"
                          >
                            {{ defaultItem.alamat_pemilik }}
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-1" @click="detailItem(item)" color="#25695C">
          mdi-information-outline
        </v-icon>
        <v-icon class="mr-1" @click="editItem(item)" color="#bf9168">
          mdi-pencil-outline
        </v-icon>
        <v-icon class="mr-1" @click="deleteItem(item)" color="#d42f2f">
          mdi-delete-outline
        </v-icon>
      </template>
    </v-data-table>

    <v-snackbar
      v-model="snackbar"
      :color="colorsnackbar"
      :timeout="timeoutsnackbar"
      class="fontall"
    >
      {{ textsnackbar }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Customer",
  data: () => ({
    itemsbr: [
      {
        text: "Main Data",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Customer",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],
    loading: false,
    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    dialogReset: false,
    dialogDetail: false,
    detailorderready: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      {
        text: "Kode Cust",
        value: "code_customer",
      },
      { text: "Nama", value: "nama_customer", width: "20%" },
      { text: "No Telp", value: "telephone" },
      { text: "Bidang Usaha", value: "bidang_usaha" },
      { text: "Alamat", value: "alamat_cust_ro" },
      //   { text: "User ID", value: "username" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    headersOrderCust: [
      {
        text: "No Inv",
        value: "id",
      },
      { text: "Barang", value: "total_barang" },
      { text: "Total Belanja", value: "total_harga" },
      { text: "Tanggal", value: "created_at" },
      { text: "Update", value: "updated_at" },
    ],
    dataobject: [],
    dataadmin: [],
    listordercust: [],
    itemsKabRO: [],

    defaultItem: {
      id: "",
      code_customer: "",
      nama_customer: "",
      telephone: "",
      bidang_usaha: "",
      alamat_cust_ro: "",

      alamat_customer: "",
      alamat_pemilik: "",
      bank: "",
      bentuk_bidang_usaha: "",
      bidang_usaha: "",
      code_alamat_cust_ro: "",
      code_limit: "",
      code_salesman: "",
      id: "",
      kepemilikan_usaha: "",
      kode_rayon: "",
      metode_pembayaran: "",
      nama_pemilik: "",
      no_hp_wa: "",
      no_npwp: "",
      no_ktp_pemilik: "",
      no_rek: "",
      permintaan_barang: "",
      profil_pelanggan: "",
      kabROCombobox: "",
    },

    itemsStatus: [
      { text: "Reseller", value: "1" },
      { text: "Cust Reguler", value: "0" },
    ],
    itemsPermintaan: [
      { text: "-", value: "-" },
      { text: "Nanolite", value: "Nanolite" },
    ],
    itemsPembayaran: [
      { text: "-", value: "-" },
      { text: "Tunai", value: "Tunai" },
      { text: "Transfer", value: "Transfer" },
    ],
    itemsKepemilikan: [
      { text: "-", value: "-" },
      { text: "Milik Sendiri", value: "Milik_sendiri" },
      { text: "Induk", value: "Induk" },
      { text: "Sewa", value: "Sewa" },
      { text: "Cabang", value: "Cabang" },
      { text: "Proyek", value: "Proyek" },
    ],

    e1: 1,
    stepperdone: false,

    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    diskonReset: "",
    jenisResellerReset: "",
    kodeAdminTrx: "",
  }),

  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.kodeAdminTrx = this.User.kodeAdminTrx;
    }
    this.initialize();
    this.GetAdmin();
    this.getKabKotaROAll();
  },

  methods: {
    async initialize() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetCustomer", {
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
    async GetAdmin() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAdmin", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.dataadmin = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.dataadmin = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.dataadmin = [];
        }
      }
    },
    async getDetail(val) {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetCustomerDetail?code_customer=" +
            this.defaultItem.code_customer,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = response.data.data.result.customer_detail;
          this.defaultItem.kabROCombobox = {
            id_alamat:
              response.data.data.result.customer_detail.code_alamat_cust_ro,
            text: response.data.data.result.customer_detail.alamat_cust_ro,
          };
          console.log(this.defaultItem);
        } else {
          console.log("Kosong");
          // this.dataobject = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          // this.detailOrder.defaultItem = [];
        }
      }
    },
    async getKabKotaROAll() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetKotaKabRO", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsKabRO = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsKabRO = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsKabRO = [];
        }
      }
    },
    async verifDelete() {
      const datapost = {
        code_customer: this.defaultItem.code_customer,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "SoftDeleteCustomer",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        // console.log(response.data.data.result.data);
        if (response.data.data.result == "success") {
          this.dialogDelete = false;
          this.snackbar = true;
          this.colorsnackbar = "#25695C";
          this.textsnackbar = "Sukses hapus data";
          this.initialize();
        } else {
          this.dialogDelete = false;
        }
      } catch (error) {
        console.error(error.response);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },
    async addData() {
      const datapost = {
        nama_customer: this.defaultItem.nama_customer,
        nama_pemilik: this.defaultItem.nama_pemilik,
        alamat_customer: this.defaultItem.alamat_customer,
        code_alamat_cust_ro: this.defaultItem.kabROCombobox.id_alamat,
        alamat_cust_ro: this.defaultItem.kabROCombobox.text,
        alamat_pemilik: this.defaultItem.alamat_pemilik,
        no_ktp_pemilik: this.defaultItem.no_ktp_pemilik,
        kode_rayon: this.defaultItem.kode_rayon,
        profil_pelanggan: this.defaultItem.profil_pelanggan,
        bentuk_bidang_usaha: this.defaultItem.bentuk_bidang_usaha,
        bidang_usaha: this.defaultItem.bidang_usaha,
        telephone: this.defaultItem.telephone,
        no_hp_wa: this.defaultItem.no_hp_wa,
        no_npwp: this.defaultItem.no_npwp,
        kepemilikan_usaha: this.defaultItem.kepemilikan_usaha,
        permintaan_barang: this.defaultItem.permintaan_barang,
        metode_pembayaran: this.defaultItem.metode_pembayaran,
        no_rek: this.defaultItem.no_rek,
        bank: this.defaultItem.bank,
        code_limit: this.defaultItem.code_limit,
        code_salesman: this.defaultItem.code_salesman,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddCustomer",
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
          this.snackbar = true;
          this.colorsnackbar = "#25695C";
          this.textsnackbar = "Sukses tambah data";
          this.initialize();
        } else {
          //   this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "#D42F2F";
          this.textsnackbar = "Gagal merubah data";
        }
      } catch (error) {
        console.error(error.response);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.snackbar = true;
          this.colorsnackbar = "#D42F2F";
          this.textsnackbar = "Gagal merubah data";
        }
      }
    },
    async updateData() {
      const datapost = {
        code_customer: this.defaultItem.code_customer,
        nama_customer: this.defaultItem.nama_customer,
        nama_pemilik: this.defaultItem.nama_pemilik,
        alamat_customer: this.defaultItem.alamat_customer,
        code_alamat_cust_ro: this.defaultItem.kabROCombobox.id_alamat,
        alamat_cust_ro: this.defaultItem.kabROCombobox.text,
        alamat_pemilik: this.defaultItem.alamat_pemilik,
        no_ktp_pemilik: this.defaultItem.no_ktp_pemilik,
        kode_rayon: this.defaultItem.kode_rayon,
        profil_pelanggan: this.defaultItem.profil_pelanggan,
        bentuk_bidang_usaha: this.defaultItem.bentuk_bidang_usaha,
        bidang_usaha: this.defaultItem.bidang_usaha,
        telephone: this.defaultItem.telephone,
        no_hp_wa: this.defaultItem.no_hp_wa,
        no_npwp: this.defaultItem.no_npwp,
        kepemilikan_usaha: this.defaultItem.kepemilikan_usaha,
        permintaan_barang: this.defaultItem.permintaan_barang,
        metode_pembayaran: this.defaultItem.metode_pembayaran,
        no_rek: this.defaultItem.no_rek,
        bank: this.defaultItem.bank,
        code_limit: this.defaultItem.code_limit,
        code_salesman: this.defaultItem.code_salesman,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "EditCustomer",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        // console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "#25695C";
          this.textsnackbar = "Sukses merubah data";
          this.initialize();
        } else {
          //   this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "#D42F2F";
          this.textsnackbar = "Gagal merubah data";
        }
      } catch (error) {
        console.error(error.response);
        if (error.response.status == 401) {
          this.dialog = false;
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.snackbar = true;
          this.colorsnackbar = "#D42F2F";
          this.textsnackbar = "Gagal merubah data";
        }
      }
    },

    showAddModal() {
      this.value = "add";
      this.formTitle = "Add Item";
      // this.defaultItem = [];

      this.defaultItem.code_customer = "";
      this.defaultItem.nama_customer = "";
      this.defaultItem.telephone = "";
      this.defaultItem.bidang_usaha = "";
      this.defaultItem.alamat_cust_ro = "";
      this.defaultItem.alamat_customer = "";
      this.defaultItem.alamat_pemilik = "";
      this.defaultItem.bank = "";
      this.defaultItem.bentuk_bidang_usaha = "";
      this.defaultItem.code_alamat_cust_ro = "";
      this.defaultItem.code_limit = "";
      this.defaultItem.code_salesman = "";
      this.defaultItem.kepemilikan_usaha = "";
      this.defaultItem.kode_rayon = "";
      this.defaultItem.metode_pembayaran = "";
      this.defaultItem.nama_pemilik = "";
      this.defaultItem.no_hp_wa = "";
      this.defaultItem.no_npwp = "";
      this.defaultItem.no_ktp_pemilik = "";
      this.defaultItem.no_rek = "";
      this.defaultItem.permintaan_barang = "";
      this.defaultItem.profil_pelanggan = "";

      this.dialog = true;
    },
    editItem(item) {
      console.log(item);
      this.formTitle = "Edit Item";
      this.defaultItem = Object.assign({}, item);
      this.getDetail("edit");
      this.value = "edit";
      this.dialog = true;
    },
    deleteItem(item) {
      this.defaultItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    detailItem(item) {
      this.defaultItem = Object.assign({}, item);
      this.getDetail("detail");
      this.dialogDetail = true;
    },

    deleteItemConfirm() {
      this.closeDelete();
      this.verifDelete();
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      this.loading = true;
      if (this.defaultItem.nama_customer.length != 0) {
        if (this.defaultItem.code_customer) {
          console.log(this.defaultItem);
          this.updateData();
        } else {
          console.log("add");
          console.log(this.defaultItem);
          this.addData();
        }
        // this.close();

        // console.log(this.defaultItem.kabROCombobox.text);
      } else {
        this.snackbar = true;
        this.colorsnackbar = "#D42F2F";
        this.textsnackbar = "Gagal Menambah, Kolom tidak boleh ada yang kosong";
      }
    },
  },
};
</script>

