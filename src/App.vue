<template>
  <v-app id="Trees">
    <v-navigation-drawer :width="277" v-if="isLogin" v-model="drawer" app>
      <!-- <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            style="color: #00ffff; font-weight: 550; font-size: 125%"
            class="fontall"
          >
            BackOffice
          </v-list-item-title>
          <v-list-item-subtitle style="color: #00ffff"
            >System Management</v-list-item-subtitle
          >
          <v-img height="52" src="/images/adms_header.png"></v-img>
        </v-list-item-content>
      </v-list-item> mx-2 mt-1-->

      <v-layout column align-center>
        <!-- setting margin profil kiri -->
        <v-flex class="pa-6 pb-4 text-center">
          <v-avatar size="80">
            <img src="images/avatar.png" />
          </v-avatar>
          <v-list-item-title class="fontall" style="color: #25695c">
            {{ nameadmin }}
          </v-list-item-title>
          <v-list-item-subtitle class="fontall" style="color: #787a91">{{
            statusadmin
          }}</v-list-item-subtitle>
        </v-flex>
      </v-layout>

      <v-divider style="background-color: white !important"></v-divider>

      <v-list color="transparent" dense nav>
        <v-list-item color="#25695c" :to="DashboardLink" link>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="itemparent">Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
          color="#25695c"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                class="itemparent"
                color="#25695c"
                v-text="item.title"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.to"
            link
          >
            <v-list-item-content>
              <v-list-item-title
                class="itemchild"
                v-text="child.title"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <h5
        class="fontall footernav"
        style="color: #25695c; font-weight: 550; font-size: 80%"
      >
        Copyright 2021 © DEV
      </h5>
    </v-navigation-drawer>

    <v-app-bar v-if="isLogin" app>
      <v-app-bar-nav-icon
        style="color: #25695c"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title
        style="color: lime; font-weight-medium"
        class="pl-1 fontall"
      >
        <v-img
          max-height="48"
          max-width="220"
          src="/images/hris_header.png"
        ></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y open-on-hover min-width="230">
        <template v-slot:activator="{ on }">
          <v-btn class="px-1 mr-1" text color="black" v-on="on">
            <!-- <div style="text-align: right" class="mr-2">
              <p style="font-weight: bold" class="font-weight-bolder mb-0">
                {{ nameadmin }}
              </p>
              <span style="font-size: 9px">{{ statusadmin }}</span>
            </div> -->
            <v-badge
              bottom
              color="success"
              overlap
              offset-x="12"
              offset-y="12"
              class="ms-4"
              dot
            >
              <v-avatar size="35">
                <img src="images/avatar.png" />
              </v-avatar>
            </v-badge>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-bell-outline</v-icon>
          </v-btn>
        </template>
        <v-list class="fontall">
          <div class="pb-3 pt-2">
            <v-badge
              bottom
              color="success"
              overlap
              offset-x="12"
              offset-y="12"
              class="ms-4"
              dot
            >
              <v-avatar size="35">
                <img src="images/avatar.png" />
              </v-avatar>
            </v-badge>
            <div
              class="d-inline-flex flex-column justify-center ms-3"
              style="vertical-align: middle"
            >
              <span class="text--primary font-weight-semibold mb-n1">
                {{ nameadmin }}
              </span>
              <small class="text--disabled text-capitalize">{{
                statusadmin
              }}</small>
            </div>
          </div>
          <v-divider></v-divider>

          <!-- Reset&Logout -->

          <v-list-item-content>
            <v-list-item
              v-for="(item, index) in itemsprofile"
              :key="index"
              @click="selectSection(item)"
            >
              <v-list-item-icon class="me-2">
                <v-icon size="22">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-content>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main style="background-color: #E0F2F1">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import NotificationBell from "vue-notification-bell";

export default {
  data: () => ({
    components: {
      NotificationBell, // Registering Component
    },
    drawer: null,
    nameadmin: "admin web",
    statusadmin: "admin",
    DashboardLink: "/Dashboard",
    itemsprofile: [
      { title: "Ganti Password", icon: "mdi-lock-reset" },
      { title: "Logout", icon: "mdi-logout-variant" },
    ],
    User: [],
    items: [],
    elevations: [6, 12, 18],
    BaseUrlGet: "",
    authtoken: "",
    listValMenu: [],
    logoutvalue: false,
  }),
  computed: {
    isLogin() {
      var itemroutecheck;
      // this.listValMenu;
      itemroutecheck = ["Home", "Dashboard", "Users", "GantiPassword"];

      const itemConditional = ["PTEmpDetail","EmpDetail", "EmpAddEdit", "ScheduleDetail", "ResultDetail"];

      if (this.listValMenu) {
        if (this.listValMenu.length > 0) {
          // this.listValMenu.push();
          itemroutecheck = this.listValMenu.concat(itemConditional);
          // console.log(itemroutecheck);
        }

        var rslt = itemroutecheck.includes(this.$route.name);
        // console.log(this.$route.name);
        // console.log(itemroutecheck);
        if (rslt == true) {
          // console.log("comp=" + localStorage.getItem("token"));
          this.authtoken = localStorage.getItem("token");
          var authtokenval = this.authtoken;
          if (authtokenval != null) {
            var notspaceauthtoken = authtokenval.trim();
            // console.log(notspaceauthtoken.length);
            // console.log(this.authtoken);
            if (notspaceauthtoken.length > 0) {
              return this.$route.name != "Login";
            } else {
              console.log("auth 0");
              this.$router.push("/");
            }
          } else {
            console.log("auth null");
            this.$router.push("/");
          }
        } else {
          console.log("route false");
          this.authtoken = localStorage.getItem("token");
          var authtokenval = this.authtoken;
          if (authtokenval != null) {
            var notspaceauthtoken = authtokenval.trim();
            if (notspaceauthtoken.length > 0) {
              this.$router.push("/Dashboard");
              return this.$route.name != "Login";
            } else {
              console.log("auth 0");
              this.$router.push("/");
            }
          } else {
            console.log("auth null");
            console.log("logout system");
            if (this.logoutvalue == true) {
              this.logoutvalue = false;
              location.reload();
            } else if (this.$route.name == "Login") {
              console.log("page " + this.$route.name);
            } else {
              this.$router.push("/");
            }
          }
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("User");
        localStorage.removeItem("BaseUrlUpload");
        this.$router.push("/");
      }
    },
  },
  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.items = this.User.list_menu;
      this.listValMenu = this.User.list_val_menu;
      var name = this.User.name;
      const arrayname = name.split(" ");
      this.nameadmin = arrayname[0];
      this.statusadmin = this.User.role;
    }
    // console.log(this.User.list_menu);
  },
  methods: {
    async cekLogout() {
      const datapost = {};
      // console.log(this.BaseUrlGet);
      // console.log(this.authtoken);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "Logout",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.status.code);
        if (response.data.data.status.code == 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("User");
          localStorage.removeItem("BaseUrlUpload");
          this.logoutvalue = true;
          this.$router.push("/");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("User");
          localStorage.removeItem("BaseUrlUpload");
          this.logoutvalue = true;
          this.$router.push("/");
        }
      } catch (error) {
        // console.error(error.response);
        localStorage.removeItem("token");
        localStorage.removeItem("User");
        localStorage.removeItem("BaseUrlUpload");
        this.logoutvalue = true;
        this.$router.push("/");
      }
    },

    logout() {
      // console.log("test");
      this.cekLogout();
    },

    selectSection(item) {
      switch (item.title) {
        case "Ganti Password":
          console.log("Ganti Password");
          this.$router.push("/GantiPassword");
          break;
        case "Logout":
          console.log("Logout");
          this.logout();
      }
    },
  },
};
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

