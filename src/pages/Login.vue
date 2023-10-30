<template>
  <v-content
    style="
      background-image: url('/images/BG_Login_edited.png');
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: 100% 100%;
      height: 100%;
    "
  >
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card
        max-width="320"
        class="mx-auto px-5 pb-2"
        style="margin-top: 100px"
        elevation="7"
      >
        <v-row align="center" justify="center" class="mb-4 mt-2 pt-6">
          <v-img contain max-height="100px" src="/images/logo_hris.png"></v-img>
        </v-row>
        <!-- <v-card-title> </v-card-title> -->
        <v-card-text class="pt-1 pb-0 px-3">
          <v-text-field
            style="border-radius: 10px !important"
            label="Email"
            name="email"
            class="fontall"
            v-model="email"
            placeholder="Masukkan Email"
            prepend-inner-icon="mdi-email"
            filled
            required
            rounded
            dense
            v-on:keyup="submitLogin"
            :rules="[(v) => !!v || 'Field is required']"
          ></v-text-field>
          <v-text-field
            style="border-radius: 10px !important"
            label="Password"
            class="fontall"
            v-model="password"
            placeholder="Masukkan Password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            prepend-inner-icon="mdi-lock"
            filled
            required
            rounded
            dense
            v-on:keyup="submitLogin"
            :rules="[(v) => !!v || 'Field is required']"
          ></v-text-field>
          <v-row style="margin-bottom: -8px">
            <v-col cols="10" sm="10" md="10">
              <div
                class="ml-0"
                style="
                  background-image: url('/images/bc_captcha2.jpg');
                  border-radius: 7px !important;
                  height: 40px;
                "
              >
                <div
                  style="
                    text-align: center;
                    font-size: 25px;
                    color: darkgrey;
                    padding-top: 8px;
                    letter-spacing: 5px;
                  "
                >
                  {{ captchavalue }}
                </div>
              </div>
            </v-col>
            <v-col cols="2" sm="2" md="2">
              <v-btn
                style="margin-bottom: -5px; margin-left: -25px"
                text
                class="fontall"
                icon
                color="black"
                @click="generateString(8)"
              >
                <v-icon style="font-weight: 900">mdi-reload</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-text-field
            style="border-radius: 10px !important"
            label="Verification Code"
            name="captcha"
            v-model="captchatextfield"
            placeholder="Masukkan Kode Captcha"
            filled
            class="fontall"
            required
            rounded
            dense
            v-on:keyup="submitLogin"
            :rules="[(v) => !!v || 'Field is required']"
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="pt-0 pb-2 px-3 mb-1">
          <v-btn
            block
            large
            width="200"
            @click="login()"
            color="#9CACA3"
            class="mx-auto"
            :disabled="disablevalue"
            ><v-progress-circular
              v-if="load == true"
              :size="25"
              :width="5"
              indeterminate
              color="#25695C"
            >
            </v-progress-circular>
            <h2 v-if="load == false" class="fontall">Login</h2>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <v-snackbar v-model="snackbar" :color="colorsnackbar" :timeout="timeout">
      {{ text }}
    </v-snackbar>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPages",
  data: () => ({
    showPassword: false,
    email: "",
    password: "",
    authtoken: "",
    captchavalue: "",
    captchatextfield: "",
    load: false,
    disablevalue: false,
    BaseUrlGet: "https://hr.hrdsukun.com/api/",
    BaseUrlUpload: "https://hr.hrdsukun.com/upload.php",
    BaseUrl: "https://hr.hrdsukun.com/",
    BaseUrlDBImage: "hrisapi.salatigaproject.com/",
    snackbar: false,
    text: "Test",
    timeout: 2000,
    colorsnackbar: null,
    valid: true,
  }),
  created() {
    this.firstAccessPage();
    this.generateString(8);
  },
  methods: {
    firstAccessPage() {
      var authtoken = localStorage.getItem("token");
      if (authtoken) {
        localStorage.removeItem("token");
      }
      var User = JSON.parse(localStorage.getItem("User"));
      if (User) {
        localStorage.removeItem("User");
      }
      var BaseUrlGet = localStorage.getItem("BaseUrlGet");
      if (BaseUrlGet) {
        localStorage.removeItem("BaseUrlGet");
      }
      var BaseUrl = localStorage.getItem("BaseUrl");
      if (BaseUrl) {
        localStorage.removeItem("BaseUrl");
      }
      var BaseUrlUpload = localStorage.getItem("BaseUrlUpload");
      if (BaseUrlUpload) {
        localStorage.removeItem("BaseUrlUpload");
      }
      var BaseUrlDBImage = localStorage.getItem("BaseUrlDBImage");
      if (BaseUrlDBImage) {
        localStorage.removeItem("BaseUrlDBImage");
      }
      this.load = false;
      this.disablevalue = false;
    },
    async cekLogin() {
      this.load = true;
      this.disablevalue = true;
      const datapost = {
        email: this.email,
        password: this.password,
      };
      // console.log(datapost);
      // console.log(this.BaseUrlGet);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "LoginUser",
          datapost
        );
        console.log(response.data.data.status.code);
        this.snackbar = true;
        if (response.data.data.status.code == 200) {
          this.load = false;
          this.disablevalue = false;
          this.colorsnackbar = "green";
          this.text = "Sukses Login";
          // console.log(response.data.data.result.access_token);
          localStorage.setItem("token", response.data.data.result.access_token);
          localStorage.setItem(
            "User",
            JSON.stringify(response.data.data.result.User)
          );
          localStorage.setItem("BaseUrlGet", this.BaseUrlGet);
          localStorage.setItem("BaseUrlUpload", this.BaseUrlUpload);
          localStorage.setItem("BaseUrl", this.BaseUrl);
          localStorage.setItem("BaseUrlDBImage", this.BaseUrlDBImage);
          location.reload();
          this.$router.push("/Dashboard");
        } else {
          this.load = false;
          this.disablevalue = false;
          this.colorsnackbar = "red";
          this.text = "Gagal Login, username dan password salah";
          this.generateString(8);
          // this.captchatextfield = "";
        }
      } catch (error) {
        this.load = false;
        this.disablevalue = false;
        console.error(error.response);
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.text = "Gagal Login, username dan password salah";
        this.generateString(8);
        // this.captchatextfield = "";
      }
    },

    login() {
      this.$refs.form.validate();
      // console.log(this.email);
      // console.log(this.password);
      if (this.$refs.form.validate() == true) {
        // console.log(this.captchavalue);
        // console.log(this.captchatextfield);
        if (this.captchatextfield === this.captchavalue) {
          console.log("benar");
          this.cekLogin();
        } else {
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.text = "Code verifikasi captcha salah";
        }
        // this.cekLogin();
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.text = "Data tidak boleh kosong";
      }
    },

    submitLogin: function (e) {
      if (e.keyCode === 13) {
        this.$refs.form.validate();
        if (this.$refs.form.validate() == true) {
          // console.log(this.captchavalue);
          // console.log(this.captchatextfield);
          if (this.captchatextfield === this.captchavalue) {
            console.log("benar");
            this.cekLogin();
          } else {
            this.snackbar = true;
            this.colorsnackbar = "red";
            this.text = "Code verifikasi captcha salah";
          }
          //
        } else {
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.text = "Data tidak boleh kosong";
        }
      }
      // this.log += e.key;
    },

    generateString(length) {
      let result = " ";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      this.captchavalue = result.replace(/\s/g, "");
    },
  },
};
</script>

<style scoped>
.btn,
button,
input {
  border-radius: 10px;
}

.btn:hover,
button:hover {
  transition: 0.5s ease;
}
</style>

