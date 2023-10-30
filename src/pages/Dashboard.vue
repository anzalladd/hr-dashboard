<template>
  <div>
    <v-container fluid>
      <v-row dense class="mt-5">
        <v-col class="pa-2" cols="12" md="12">
          <v-card>
            <v-card-title class="fontall" v-if="isMorning()">
              Good Morning,</v-card-title
            >
            <v-card-title class="fontall" v-else>
              Good Afternoon, </v-card-title
            >
            <v-card-subtitle class="fontall">
              it's
              {{
                new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="3" class="d-flex align-end">
                  <v-avatar size="50" rounded class="elevation-1">
                    <v-icon dark size="40" color="#444941"
                      >mdi-account-multiple
                    </v-icon>
                  </v-avatar>
                  <div class="ms-3">
                    <p class="itemparent mb-0">
                      {{ data1.Judul }}
                    </p>
                    <h3 class="fontall">
                      {{ data1.Count }}
                    </h3>
                  </div>
                </v-col>

                <v-col cols="12" md="3" class="d-flex align-end">
                  <v-avatar size="50" rounded class="elevation-1">
                    <v-icon size="40" color="#444941">mdi-account-remove</v-icon>
                  </v-avatar>
                  <div class="ms-3">
                    <p class="itemparent mb-0">
                      {{ data2.Judul }}
                    </p>
                    <h3 class="fontall">
                      {{ data2.Count }}
                    </h3>
                  </div>
                </v-col>

                <v-col cols="12" md="3" class="d-flex align-end">
                  <v-avatar size="50" rounded class="elevation-1">
                    <v-icon size="40" color="#444941">mdi-account-check</v-icon>
                  </v-avatar>
                  <div class="ms-3">
                    <p class="itemparent mb-0">
                      {{ data4.Judul }}
                    </p>
                    <h3 class="fontall">
                      {{ data4.Count }}
                    </h3>
                  </div>
                </v-col>
                <v-col cols="3">
                  <v-row align="center" justify="center" class="mb-0">
                    <v-img
                      max-width="150"
                      src="/images/people.png"
                      style="margin-top: 2px"
                    ></v-img>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col class="pa-2 mb-3" sm="12" md="4">
          <v-card class="fontall pa-md-4" height="355px" elevation="5">
            <header class="fontall pa-2 mb-3" style="text-align: center">
              Employee Age Breakdown
            </header>
            <div>
              <apexchart
                type="bar"
                height="250"
                width="100%"
                :options="chartOptionsColumn"
                :series="seriesColumn"
                class="fontall"
                ref="realtimeColumn"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
        <v-col class="pa-2 mb-3" sm="12" md="4">
          <v-card class="fontall pa-md-4" height="355px" elevation="5">
            <header class="fontall pa-2 mb-3" style="text-align: center">
              Employment Status
            </header>

            <div id="chart" class="fontall">
              <apexchart
                type="bar"
                height="250"
                width="100%"
                :options="chartOptionsBar"
                :series="seriesBar"
                ref="realtimeChartStatus"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
        <v-col class="pa-2 mb-3" sm="12" md="4">
          <v-card class="fontall pa-md-4" height="355px" elevation="5">
            <header class="fontall pa-2 mb-3" style="text-align: center">
              Gender Diversity
            </header>
            <div class="d-flex justify-center">
              <apexchart
                width="350"
                type="donut"
                :options="chartOptionsDonut"
                :series="seriesDonut"
                :color="colors"
                class="fontall"
                ref="realtimeChartGender"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
        <v-col class="pa-2 mb-3" sm="12" md="6">
          <v-card class="fontall pa-md-4" height="355px" elevation="5">
            <header
              class="fontall pa-2 mb-3"
              style="text-align: center"
              table-header-color="orange"
            >
              List Karyawan Terlambat
            </header>

            <v-data-table
              id="mytable"
              :headers="headers"
              :items="profils"
              hide-default-footer
              disable-sort
            >
            </v-data-table>
          </v-card>
        </v-col>
        <v-col class="pa-2 mb-3" sm="12" md="6">
          <v-card class="fontall pa-md-4" height="355px" elevation="5">
            <header class="fontall pa-2 mb-3" style="text-align: center">
              Info & Task
            </header>

            <v-tabs v-model="tab" background-color="#27DEBF" color="black" grow>
              <v-tab class="itemparent" href="#persetujuan"> Persetujuan </v-tab>
              <v-tab class="itemparent" href="#perpanjangkontrak"
                >Perpanjang Kontrak</v-tab
              >
            </v-tabs>

            <v-tabs-items v-model="tab">

              <v-tab-item :key="2" value="persetujuan">
                <v-card flat>
                  <v-data-table
                    :headers="headersPengumuman"
                    :items="itemPengumuman"
                    hide-default-footer
                    disable-sort
                    hide-default-header
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-simple-checkbox
                        v-model="item.actions"
                      ></v-simple-checkbox>

                      <v-icon @click="showDeleteModal(item)" color="#d42f2f">
                        mdi-alpha-x-circle-outline
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-card>
              </v-tab-item>

              <v-tab-item :key="3" value="perpanjangkontrak">
                <v-card flat>
                  <v-card flat>
                    <v-data-table
                      :headers="headersKontrak"
                      :items="itemKontrak"
                      hide-default-footer
                      disable-sort
                      hide-default-header
                    >
                      <template v-slot:item.actions="{ item }">
                        <v-simple-checkbox
                          v-model="item.actions"
                        ></v-simple-checkbox>

                        <v-icon @click="showDeleteModal(item)" color="#d42f2f">
                          mdi-alpha-x-circle-outline
                        </v-icon>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import axios from "axios";
import axios from "axios";

import VueApexCharts from "vue-apexcharts";
import SkeletonDashboard from "../components/SkeletonDashboard.vue"

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "black"],
  ["purple", "violet"],
  ["#FF0", "#F0F", "#00c6ff"],
  ["#1feaea", "#ffd200", "#f72047"],
];

export default {
  name: "Dashboard",

  components: {
    apexchart: VueApexCharts,
    SkeletonDashboard,
  },
  data: () => ({
    tab: null,
    isLoading: true,
    isMorning() {
      return new Date().getHours() < 12 ? true : false;
    },
    seriesDonut: [100, 55],
    chartOptionsDonut: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: undefined,
          options: {},
        },
      ],
      legend: {
        position: "bottom",
        fontWeight: "bold",
      },
      labels: ["Laki-laki", "Perempuan"],
      colors: ["#48b5c4", "#76c68f"],
    },
    seriesBar: [
      {
        name: "Permanent",
        data: [100],
      },
      {
        name: "Contract",
        data: [212],
      },
      {
        name: "Probation",
        data: [333],
      },
    ],
    chartOptionsBar: {
      chart: {
        type: "bar",
        height: 200,
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: ["Status"],
      },

      fill: {
        opacity: 1,
      },
      colors: ["#22a7f0", "#48b5c4", "#76c68f"],
      legend: {
        position: "bottom",
        horizontalAlign: "left",
        offsetX: 40,
        fontWeight: "bold",
      },
    },
    seriesColumn: [
      {
        name: "Age Groups",
        data: [35, 50, 47, 38, 25],
      },
    ],
    chartOptionsColumn: {
      chart: {
        type: "bar",
        height: 200,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      colors: ["#1984c5", "#22a7f0"],
      legend: {
        position: "bottom",
        horizontalAlign: "left",
        offsetX: 40,
        fontWeight: "bold",
      },
      xaxis: {
        categories: ["20'an", "30'an", "40'an", "50'an", "60'an"],
        title: {
          text: "Age Groups",
        },
      },
      yaxis: {
        title: {
          text: "Employee",
        },
      },
      fill: {
        opacity: 1,
      },
    },

    drawer: null,
    BaseUrlGet: "",
    authtoken: "",

    headers: [
      
      { text: "NIK", value: "emp_nik", align: "center" },
      {
        text: "Nama",
        align: "center",
        sortable: false,
        value: "nama_lengkap",
      },
      { text: "Kedatangan", value: "check_in", align: "center" },
    ],
    profils: [
      {
        name: "Admin1",
        email: "admin1@mail.com",
        time: "10.00",
        status: "1",
      },
      {
        name: "Admin2",
        email: "admin2@mail.com",
        time: "09.33",
        status: "1",
      },
      {
        name: "Cust1",
        email: "cust1@mail.com",
        time: "09.55",
        status: "1",
      },
      {
        name: "Cust2",
        email: "cust2@mail.com",
        time: "09.25",
        status: "1",
      },
    ],
    headersPengumuman: [
      {
        text: "Judul",
        align: "start",
        sortable: false,
        value: "judul",
      },
    ],
    itemPengumuman: [
      {
        isi: "Akhir bulan akan diadakan kerja bakti untuk seluruh kantor",
      },
      {
        isi: "Peresmian kepala cabang akan dilakukan pada hari selasa",
      },
      {
        isi: "Karena Hari Minggu tanggal merah, kita libur",
      },
    ],
    headersKontrak: [
      {
        text: "Nama",
        align: "center",
        sortable: false,
        value: "nama_lengkap",
      },
      { text: "Tanggal Habis", value: "tanggal_kontrak_selesai", align: "center" },
    ],
    itemKontrak: [
      {
        name: "Admin1",
        email: "admin1@mail.com",
        status: "1",
      },
      {
        name: "Admin2",
        email: "admin2@mail.com",

        status: "1",
      },
      {
        name: "Cust1",
        email: "cust1@mail.com",
        status: "1",
      },
      {
        name: "Cust2",
        email: "cust2@mail.com",
        status: "1",
      },
    ],
    defaultItem: {
      code: "",
      nama: "",
      email: "",
      status: "",
      status_name: "",
    },

    data1: {
      Judul: "Jumlah Karyawan",
      Deskripsi: "Detail Data Total Karyawan",
      Count: "1",
      link: "/",
    },
    data2: {
      Judul: "Jumlah Karyawan Ijin",
      Deskripsi: "Detail Data Karyawan Ijin",
      Count: "11",
      link: "/",
    },
    data3: {
      Judul: "Persetujuan",
      Deskripsi: "Detail Data Persetujuan",
      Count: "111",
      link: "/",
    },
    data4: {
      Judul: "Karyawan Terlambat",
      Deskripsi: "Detail Karywan Terlambat",
      Count: "1111",
      link: "/",
    },

    gradientDirection: "top",
    gradients,
    gradient: gradients[10],
    labelsSparkline: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "August",
      "Sept",
      "Okt",
      "Nop",
      "Dec",
    ],
    valueSparkline: [350, 200, 410, 390, 310, 460, 250, 240, 0, 0, 0, 0],
    srcimage: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
    datacollection: null,
    namaAdmin: "Nama Admin",

    chartData: [
      ["Tempat", "Total"],
      ["Lokasi1", 1000],
      ["Lokasi2", 1170],
      ["Lokasi3", 760],
      ["Lokasi4", 1030],
      ["Lokasi5", 600],
    ],
    chartOptionsGoogle: {
      title: "Chart Dashboard",
      // pieHole: 0.4,
      is3D: true,
      legend: "none",
      pieSliceText: "label",
      width: $(window).width() * 0.25,
      height: $(window).height() * 0.45,
    },
    chartOptionsGoogleMobile: {
      title: "Chart Dashboard",
      // pieHole: 0.4,
      is3D: true,
      legend: "none",
      pieSliceText: "label",
    },
  }),
  mounted() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.firstinitialize();
    this.getDashboardEmployee();
    this.GetDashboardAttendance();
    this.GetDashboardPendingTask();
    this.GetDashboardKaryawanHabisKontrak();
  },
  methods: {
    async firstinitialize() {
      if (this.authtoken) {
      } else {
        localStorage.removeItem("token");
        this.$router.push("/");
      }
    },

    async getDashboardEmployee() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetDashboardKaryawan", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log('dashboard emp------>',response.data.data.result);
        if (response.data.length != 0) {
          console.log('seriesBar--->',this.seriesBar[0])
          // this.seriesBar[0].name = 'Bulanan';
          this.data1.Count = response.data.data.result.countAllEmp;

          this.$refs.realtimeColumn.updateSeries([
            {
              name: "Age Groups",
              data: [
                      response.data.data.result.countAllEmp20an, 
                      response.data.data.result.countAllEmp30an, 
                      response.data.data.result.countAllEmp40an, 
                      response.data.data.result.countAllEmp50an, 
                      response.data.data.result.countAllEmp60an
                    ],
            },
          ], false, true)


          this.$refs.realtimeChartStatus.updateSeries([
            {
              name: 'Bulanan',
              data: [response.data.data.result.countAllEmpBulanan]
            },
            {
              name: 'Harian',
              data: [response.data.data.result.countAllEmpHarian]
            },
            {
              name: 'Borong',
              data: [response.data.data.result.countAllEmpBorong]
            },
          ], false, true);


          this.$refs.realtimeChartGender.updateSeries([response.data.data.result.countAllEmpMale, response.data.data.result.countAllEmpFemale], false, true);
           
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

    async GetDashboardAttendance() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetDashboardAttendance", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log('dashboard attandance------>',response.data.data.result);
        if (response.data.length != 0) {
          this.data2.Count = response.data.data.result.GetDashboardCountPermit;
          this.data4.Count = response.data.data.result.GetCountKaryawanTerlambat;

          this.profils = response.data.data.result.GetDashboardKaryawanTerlambatPagi;
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

    async GetDashboardPendingTask() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetDashboardPendingTask", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log('dashboard PT------>',response.data.data.result);
        if (response.data.length != 0) {
          this.itemPengumuman = response.data.data.result.GetDashboardPendingTask;
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

    async GetDashboardKaryawanHabisKontrak() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetDashboardKaryawanHabisKontrak", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log('dashboard Emp Habis Kontrak------>',response.data.data.result);
        if (response.data.length != 0) {
          this.itemKontrak = response.data.data.result.getEmpHabisKontrak;
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
  },
  handleSectionClick(section, event) {
    console.log(`${section.label} clicked.`);
  },
  getColorStatus(status_name) {
    if (status_name == "1") return "green";
    else if (status_name == "2") return "orange";
    else if (stastatus_nametus == "3") return "red";
    else return "blue";
  },
};
</script>

