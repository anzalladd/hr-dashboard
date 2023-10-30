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
    <v-card class="pr-5 mx-3 pb-3">
            <v-col
              cols="12"
              align="center"
              justify="center"
              class="px-5 pt-3 pb-0 d-md-none"
            >
              <v-select
                :items="itemstabs"
                label="Pilih Tabs"
                item-value="value"
                item-text="text"
                v-on:change="selectedTabs"
                solo
              ></v-select>
            </v-col>
            <v-tabs class="d-none d-md-block mt-3 ml-3 mr-3 mb-5">
              <v-tab @click="tabsdetail(1)">Permintaan Rekrutmen</v-tab>
              <v-tab @click="tabsdetail(2)">Calendar Timeline</v-tab>
            </v-tabs>

      <v-card class="px-5 mx-3 mb-4">
        <v-row
          v-if="calendar == true">
          <v-col>
            <!-- <v-sheet height="400">
              <v-calendar
                ref="calendar"                
                :now="today"
                :value="today"
                color="primary"
              >
                 <template v-slot:day="{ date }">
                  <template v-for="event in eventsMap[date]">
                    <v-menu
                      :key="event.title"
                      v-model="event.open"
                      full-width
                      offset-x
                    >
                      <template v-slot:activator="{ on }">
                        <div
                          v-if="!event.time"
                          v-ripple
                          class="my-event"
                          v-on="on"
                          v-html="event.title"
                        ></div>
                      </template>
                      <v-card
                        color="grey lighten-4"
                        min-width="350px"
                        flat
                      >
                        <v-toolbar
                          color="primary"
                          dark
                        >
                          <v-btn icon>
                            <v-icon>edit</v-icon>
                          </v-btn>
                          <v-toolbar-title v-html="event.title"></v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn icon>
                            <v-icon>favorite</v-icon>
                          </v-btn>
                          <v-btn icon>
                            <v-icon>more_vert</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-card-title primary-title>
                          <span v-html="event.details"></span>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn
                            flat
                            color="secondary"
                          >
                            Cancel
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </template>
                </template>
              </v-calendar>
            </v-sheet> -->

            <div>
              <v-sheet
                tile
                height="54"
                class="d-flex"
              >
                
                <v-select
                  v-model="type"
                  :items="types"
                  dense
                  outlined
                  hide-details
                  class="ma-2"
                  label="type"
                  style="max-width: 150px"
                ></v-select>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  class="ma-2"
                  @click="$refs.calendar.prev()"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar" style="align-self: center;">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-btn
                  icon
                  class="ma-2"
                  @click="$refs.calendar.next()"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark class="mb-2" @click="addEvent()" color="#25695c">
              <v-icon small>mdi-plus</v-icon> Add Item
            </v-btn>
              </v-sheet>
              <v-sheet>
                <v-calendar
                  ref="calendar"
                  v-model="value"
                  color="primary"
                  :type="type"
                  :events="events"
                  :event-overlap-threshold="30"
                  :event-color="getEventColor"
                  @change="getEvents"
                  @click:event="showEvent"
                ></v-calendar>
                <v-menu
                  v-model="selectedOpen"
                  :close-on-content-click="false"
                  :activator="selectedElement"
                  offset-x
                >
                  <v-card
                    color="grey lighten-4"
                    width="400px"
                    flat
                  >
                    <v-toolbar
                      :color="selectedEvent.color"
                      dark
                    >
                      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                      <span></span>
                      <h3>{{selectedEvent.deskripsi}}</h3>
                      <br/>
                      <h4>Created By {{selectedEvent.pembuat}}</h4>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="danger"
                        @click="editEvent"
                        class="mr-1"
                      >
                        <v-icon>mdi-pencil</v-icon> Edit
                      </v-btn>
                      <v-btn
                        text
                        color="danger"
                        @click="deleteEvent"
                      >
                        <v-icon>mdi-delete-outline</v-icon> Hapus
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-sheet>

              <!-- Modal Add Edit -->
            <v-dialog persistent v-model="dialogTimeline" max-width="600px">
              <v-card>
                <v-card-title class="headermodalstyle">
                  {{ formTitleTimeline }}
                  <v-spacer></v-spacer>
                  <v-btn icon dark large class="right" @click="close()">
                    <v-icon>mdi-close-box-outline</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text class="fontall">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-text-field
                            v-model="detailItemTimeline.nama"
                            outlined
                            label="Nama"
                            class="fontall"
                            color="#25695c"
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" class="pa-1">
                          <v-textarea
                            v-model="detailItemTimeline.deskripsi"
                            outlined
                            label="Deskripsi"
                            class="fontall"
                            color="#25695c"
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-menu
                            v-model="menu10"
                            :close-on-content-click="false"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="datepicker10"
                                slot="activator"
                                label="Tanggal Awal"
                                outlined
                                dense
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="datepicker10"
                              @input="menu10 = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-menu
                            v-model="menu11"
                            :close-on-content-click="false"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="datepicker11"
                                slot="activator"
                                label="Tanggal Akhir"
                                outlined
                                dense
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="datepicker11"
                              @input="menu11 = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-select
                            :items="itemscolors"
                            v-model="detailItemTimeline.warna"
                            outlined
                            label="Pilih Warna"
                            class="fontall"
                            color="#25695c"
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row class="mb-1 mt-0">
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark color="red" @click="close">
                    <v-icon left> mdi-close-circle-outline </v-icon> Cancel
                  </v-btn>
                  <v-btn dark :loading="loading" color="#25695c" @click="saveTimeline">
                    <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            
            <!-- Modal Delete -->
            <v-dialog v-model="dialogDeleteTimeline" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-text>
                  <v-row class="mb-5 mt-5 ml-0 px-2">
                    <h4>Detail Data Event</h4>
                    <v-divider class="mx-2 mt-3"></v-divider>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12" class="px-7 py-0">
                      <v-text-field
                        v-model="detailItemTimeline.nama"
                        label="Nama Event"
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
                  <v-btn dark color="#25695c" @click="deleteDataTimeLine">
                    <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                    OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            </div>
          </v-col>
        </v-row>
      </v-card>      

      <v-data-table
        v-if="rekrutmen == true"
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
            <v-btn dark class="mb-2" @click="add()" color="#25695c">
              <v-icon small>mdi-plus</v-icon> Add Item
            </v-btn>

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

            <!-- Modal Add Edit -->
            <v-dialog persistent v-model="dialog" max-width="800px">
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
                      <v-row class="mb-1 mt-0">
                        <h4 style="color: black; font-size: 18px">Recruitment</h4>
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-text-field
                            v-model="defaultItem.nama_recruitment"
                            outlined
                            label="Nama Recruitment"
                            class="fontall"
                            color="#25695c"
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-text-field
                            v-model="defaultItem.jabatan"
                            outlined
                            label="Jabatan"
                            class="fontall"
                            color="#25695c"
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" class="pa-1">
                          <v-select
                            v-model="defaultItem.department"
                            :items="itemsdept"
                            item-value="department_code"
                            item-text="dept_nama"
                            label="Pilih Department"
                            clearable
                            outlined
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-text-field
                            v-model="defaultItem.lokasi_penempatan"
                            outlined
                            label="Penempatan"
                            class="fontall"
                            color="#25695c"
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-text-field
                            v-model="defaultItem.jumlah_kebutuhan"
                            outlined
                            label="Jumlah Kebutuhan"
                            class="fontall"
                            color="#25695c"
                            type="number"
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="datepicker1"
                                slot="activator"
                                label="Tanggal Permintaan"
                                outlined
                                dense
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="datepicker1"
                              @input="menu1 = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="datepicker2"
                                slot="activator"
                                label="Target Tanggal Pemenuhan"
                                outlined
                                dense
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="datepicker2"
                              @input="menu2 = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-select
                            v-model="defaultItem.source_pemenuhan"
                            :items="itemsSource"
                            item-value="value"
                            item-text="text"
                            label="Pilih Source"
                            clearable
                            outlined
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row class="mb-1 mt-0">
                        <h4 style="color: black; font-size: 18px">Upload Dokumen PTK</h4>
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
                      </v-row>
                      <v-row>                      
                        <v-col cols="12" sm="12" md="12" class="py-0">
                              <v-file-input
                                class="pt-1 mt-0"
                                placeholder="Pilih File"
                                prepend-icon="mdi-file-document-multiple-outline"
                                outlined
                                dense
                                v-model="file"
                                v-on:change="pilihfile"
                              ></v-file-input>
                        </v-col> 
                          <v-col v-if=' isEdit == true'  style="margin-bottom: 20px" cols="6" sm="4" md="4" class="pa-1">
                            Dokumen :
                          </v-col>
                          <v-col v-if=' isEdit == true' cols="6" sm="8" md="8" class="pa-1">                        
                            <div style="display:flex">
                              <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.dok)}}</h4>
                              <v-btn v-if=' defaultItem.dok!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.dok, defaultItem.nama_recruitment)" color="#25695c">
                                <v-icon small>mdi-download-circle-outline</v-icon> Download File
                              </v-btn>
                            </div>
                          </v-col>
                      </v-row>
                      <v-row class="mb-1 mt-0">
                        <h4 style="color: black; font-size: 18px">
                          Recruitment Schedule
                        </h4>
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12" class="pa-1">
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">Name Schedule</th>
                                  <th class="text-left">Tanggal Schedule</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Psikotes</td>
                                  <td class="pt-5">
                                    <v-menu
                                      v-model="menu3"
                                      :close-on-content-click="false"
                                      transition="scale-transition"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="datepicker3"
                                          slot="activator"
                                          label="Tanggal Permintaan"
                                          outlined
                                          dense
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker
                                        v-model="datepicker3"
                                        @input="menu3 = false"
                                      ></v-date-picker>
                                    </v-menu>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Interview_HR</td>
                                  <td class="pt-5">
                                    <v-menu
                                      v-model="menu4"
                                      :close-on-content-click="false"
                                      transition="scale-transition"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="datepicker4"
                                          slot="activator"
                                          label="Tanggal Permintaan"
                                          outlined
                                          dense
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker
                                        v-model="datepicker4"
                                        @input="menu4 = false"
                                      ></v-date-picker>
                                    </v-menu>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Interview_Manager</td>
                                  <td class="pt-5">
                                    <v-menu
                                      v-model="menu5"
                                      :close-on-content-click="false"
                                      transition="scale-transition"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="datepicker5"
                                          slot="activator"
                                          label="Tanggal Permintaan"
                                          outlined
                                          dense
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker
                                        v-model="datepicker5"
                                        @input="menu5 = false"
                                      ></v-date-picker>
                                    </v-menu>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Inteview_User</td>
                                  <td class="pt-5">
                                    <v-menu
                                      v-model="menu6"
                                      :close-on-content-click="false"
                                      transition="scale-transition"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="datepicker6"
                                          slot="activator"
                                          label="Tanggal Permintaan"
                                          outlined
                                          dense
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker
                                        v-model="datepicker6"
                                        @input="menu6 = false"
                                      ></v-date-picker>
                                    </v-menu>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-col>
                      </v-row>
                      <v-row class="mb-1 mt-0">
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
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
                            Recruitment
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
                              label="Nama Recruitment"
                              class="fontall"
                              color="#25695c"
                              dense
                              readonly
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-select
                              v-model="defaultItem.department"
                              :items="itemsdept"
                              item-value="department_code"
                              item-text="dept_nama"
                              label="Pilih Department"
                              readonly
                              outlined
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.jabatan"
                              outlined
                              label="Jabatan"
                              class="fontall"
                              color="#25695c"
                              dense
                              readonly
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.lokasi_penempatan"
                              outlined
                              label="Penempatan"
                              class="fontall"
                              color="#25695c"
                              dense
                              readonly
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="defaultItem.jumlah_kebutuhan"
                              outlined
                              label="Jumlah Kebutuhan"
                              class="fontall"
                              color="#25695c"
                              type="number"
                              dense
                              readonly
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="datepicker1"
                              slot="activator"
                              label="Tanggal Permintaan"
                              outlined
                              dense
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-text-field
                              v-model="datepicker2"
                              slot="activator"
                              label="Target Tanggal Pemenuhan"
                              outlined
                              dense
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-select
                              v-model="defaultItem.source_pemenuhan"
                              :items="itemsSource"
                              item-value="value"
                              item-text="text"
                              label="Pilih Source"
                              readonly
                              outlined
                              dense
                              :rules="[(v) => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <!-- <v-row class="mb-1 mt-0">
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row> -->
                        <v-row class="mb-1 mt-0">
                          <h4 style="color: black; font-size: 18px">
                            Dokumen PTK
                          </h4>
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                        <v-row>                      
                          <v-col style="margin-bottom: 20px" cols="6" sm="4" md="4" class="pa-1">
                            Dokumen :
                          </v-col>
                          <v-col cols="6" sm="8" md="8" class="pa-1">                        
                            <div style="display:flex">
                              <h4 style="color: black; font-size: 13px">{{getdokname(defaultItem.dok)}}</h4>
                              <v-btn v-if=' defaultItem.dok!= "-"' dark small class="mb-2 ml-5 mt-2" @click="downloadFile(defaultItem.dok, defaultItem.nama_recruitment)" color="#25695c">
                                <v-icon small>mdi-download-circle-outline</v-icon> Download File
                              </v-btn>
                            </div>
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
                            Recruitment Schedule
                          </h4>
                          <v-divider
                            class="mx-2 mt-3"
                            style="border-color: black"
                          ></v-divider>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" md="12" class="pa-1">
                            <v-simple-table>
                              <template v-slot:default>
                                <tbody>
                                  <tr>
                                    <td>Psikotes</td>
                                    <td class="pt-5">
                                      <v-text-field
                                        v-model="datepicker3"
                                        slot="activator"
                                        label="Tanggal Permintaan"
                                        outlined
                                        dense
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[
                                          (v) => !!v || 'Field is required',
                                        ]"
                                      ></v-text-field>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Interview_HR</td>
                                    <td class="pt-5">
                                      <v-text-field
                                        v-model="datepicker4"
                                        slot="activator"
                                        label="Tanggal Permintaan"
                                        outlined
                                        dense
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[
                                          (v) => !!v || 'Field is required',
                                        ]"
                                      ></v-text-field>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Interview_Manager</td>
                                    <td class="pt-5">
                                      <v-text-field
                                        v-model="datepicker5"
                                        slot="activator"
                                        label="Tanggal Permintaan"
                                        outlined
                                        dense
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[
                                          (v) => !!v || 'Field is required',
                                        ]"
                                      ></v-text-field>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Inteview_User</td>
                                    <td class="pt-5">
                                      <v-text-field
                                        v-model="datepicker6"
                                        slot="activator"
                                        label="Tanggal Permintaan"
                                        outlined
                                        dense
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[
                                          (v) => !!v || 'Field is required',
                                        ]"
                                      ></v-text-field>
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
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

            <!-- Modal Pilihan Edit -->
            <v-dialog v-model="dialogEditPilih" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Pilih yang akan di edit?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark color="blue" @click="editStatusRekruitmen">
                    <v-icon left> mdi-close-circle-outline </v-icon>
                    Edit Status
                  </v-btn>
                  <v-btn dark color="#25695c" @click="editDataRekruitmen">
                    <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                    Edit Data</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- Modal Edit Status -->
            <v-dialog persistent v-model="dialogEditStatus" max-width="750px">
              <v-card>
                <v-card-title class="headermodalstyle">
                  Edit Status Rekruitmen
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
                            v-model="defaultItem.status"
                            :items="itemsStatus"
                            item-value="value"
                            item-text="text"
                            label="Pilih Status"
                            clearable
                            outlined
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" class="pa-1">
                          <h4>Status 'On Progress'. Rekruitmen akan berpindah ke Menu Proses Rekruitmen dan tidak bisa kembali ke menu awal. </h4> <br>
                          <h4>Status 'Ditunda' maka Rekruitmen akan masih di menu semula</h4><br>
                        </v-col>
                      </v-row>
                      <v-row class="mb-1 mt-0">
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark color="red" @click="close">
                    <v-icon left> mdi-close-circle-outline </v-icon> Cancel
                  </v-btn>
                  <v-btn dark :loading="loading" color="#25695c" @click="saveEditStatus">
                    <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                    Save
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
                        v-model="defaultItem.nama_recruitment"
                        label="Nama Recruitment"
                        outlined
                        readonly
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="px-7 py-0">
                      <v-text-field
                        v-model="defaultItem.jabatan"
                        label="Jabatan"
                        outlined
                        readonly
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="px-7 py-0">
                      <v-text-field
                        v-model="defaultItem.jumlah_kebutuhan"
                        label="Jumlah Kebutuhan"
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
          <v-icon class="mr-1" @click="edit(item)" color="#bf9168">
            mdi-pencil-outline
          </v-icon>
          <v-icon @click="showDeleteModal(item)" color="#d42f2f">
            mdi-delete-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    

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
  name: "Recruitment",
  data: () => ({
    itemsbr: [
      {
        text: "Recruitment",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Recruitment",
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
    dialogEditPilih: false,
    dialogEditStatus:false,
    dialogTimeline: false,
    dialogDeleteTimeline: false,
    formTitleTimeline:'Update Timeline',
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "Nama", value: "nama_recruitment" },
      { text: "Department", value: "dept_nama" },
      // { text: "Unit Perusahaan", value: "unit_perusahan_nama" },
      // { text: "Jabatan", value: "jabatan" },
      { text: "Penempatan", value: "lokasi_penempatan" },
      // { text: "Jumlah", value: "jumlah_kebutuhan" },
      { text: "Tanggal Pemenuhan", value: "target_tanggal_pemenuhan" },
      { text: "Status Proses", value: "status" },
      { text: "Status Persetujuan", value: "status_pt" },
      //   { text: "User ID", value: "username" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    dataobject: [],

    readOnly: {
      id_recruitment: "",
      code_timeline:"",
    },
    defaultItem: {
      nama_recruitment: "",
      jabatan: "",
      department: "",
      lokasi_penempatan: "",
      jumlah_kebutuhan: "",
      source_pemenuhan: "",
      tanggal_permintaan: "",
      target_tanggal_pemenuhan: "",
      listSchedule: "list",
      status:'-',
      dok: '-',
    },

    
    detailItemTimeline: {
      code_timeline:"-",
      nama: "",
      deskripsi: "",
      tanggal_mulai:'',
      tanggal_akhir:'',
      warna:'',
    },

    
    itemstabs: [
      { text: "Permintaan Rekrutmen", value: "1" },
      { text: "Calendar Timeline", value: "2" },
    ],

    deleteDetailItem: {
      id: "",
      no_induk_karyawan: "",
      nama_lengkap: "",
    },

    itemsdept: [],
    itemsdivisi: [],
    itemsSource: [
      { text: "internal", value: "internal" },
      { text: "eksternal", value: "eksternal" },
    ],
    itemsStatus:[
      // { text: "Rekruitment_Dibuka", value: "Rekruitment_Dibuka" },
      { text: "On_Progress", value: "On_Progress" },
      // { text: "Terpenuhi", value: "Terpenuhi" },
      { text: "Ditunda", value: "Ditunda" },
    ],

    id_schedule1: "",
    id_schedule2: "",
    id_schedule3: "",
    id_schedule4: "",

    datepicker1: "2022-10-01",
    menu1: false,
    datepicker2: "2022-10-01",
    menu2: false,
    datepicker3: "2022-10-01",
    menu3: false,
    datepicker4: "2022-10-01",
    menu4: false,
    datepicker5: "2022-10-01",
    menu5: false,
    datepicker6: "2022-10-01",
    menu6: false,
    
    datepicker10: "2022-10-01",
    menu10: false,
    datepicker11: "2022-10-01",
    menu11: false,

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

    fileUpload: '',
    fileUploadReady: false,
    file:'',

    isEdit: false,

    rekrutmen: true,
    calendar: false,
    // today: '2019-01-08',
    //   events: [
    //     {
    //       title: 'Vacation',
    //       details: 'Going to the beach!',
    //       date: '2022-10-30',
    //       open: false
    //     },
    //     {
    //       title: 'Vacation',
    //       details: 'Going to the beach!',
    //       date: '2022-10-22',
    //       open: false
    //     },
    //     {
    //       title: 'Vacation',
    //       details: 'Going to the beach!',
    //       date: '2022-10-15',
    //       open: false
    //     },
    //     {
    //       title: 'Meeting',
    //       details: 'Spending time on how we do not have enough time',
    //       date: '2022-10-11',
    //       open: false
    //     },
    //     {
    //       title: '30th Birthday',
    //       details: 'Celebrate responsibly',
    //       date: '2022-10-02',
    //       open: false
    //     },
    //     {
    //       title: 'New Year',
    //       details: 'Eat chocolate until you pass out',
    //       date: '2022-10-01',
    //       open: false
    //     },
    //     {
    //       title: 'Conference',
    //       details: 'Mute myself the whole time and wonder why I am on this call',
    //       date: '2019-01-21',
    //       open: false
    //     },
    //     {
    //       title: 'Hackathon',
    //       details: 'Code like there is no tommorrow',
    //       date: '2019-02-01',
    //       open: false
    //     }
    //   ]
    itemscolors: [
      { text: "blue", value: "blue" },
      { text: "indigo", value: "indigo" },
      { text: "cyan", value: "cyan" },
      { text: "green", value: "green" },
      { text: "orange", value: "orange" },
      { text: "red", value: "red" },
    ],

    type: 'month',
    types: ['month'],
    value: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

    startDateCalendar:'',
    endDateCalendar:'',
  }),

  computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        console.log('map->', map);
        return map
      }
    },

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
    this.getDateNow();
  },
  setup() {},

  methods: {
    open (event) {
        alert(event.title)
      },
    getDateNow(){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy+'-'+mm+'-'+dd;
      this.today = today;
    },
    showEvent ({ nativeEvent, event }) {
      // console.log('event',event)
      this.detailItemTimeline = Object.assign({}, event);
      this.detailItemTimeline.nama = event.name;
      this.datepicker10 = event.tanggal_mulai;
      this.datepicker11 = event.tanggal_akhir;
      this.detailItemTimeline.warna = event.color;
      console.log('detailItemTimeline',this.detailItemTimeline)
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
    },
    async getEvents () {
        const events = []
        console.log('ref->',this.$refs.calendar.title);

        await this.getStartEndTime(this.$refs.calendar.title);
        var startDate = this.startDateCalendar;
        var endDate = this.endDateCalendar;

        try {
          const response = await axios.get(
            this.BaseUrlGet + "GetTimeline?tanggal_mulai=" +startDate+"&tanggal_akhir="+endDate,
            {
              headers: {
                Authorization: `Bearer ` + this.authtoken,
              },
            }
          );
          console.log('response timeline ->',response.data.data.result.data);
          if (response.data.length != 0) {
            var arrayRslt = response.data.data.result.data;
            // this.dataobject = response.data.data.result.data;
              console.log('arrayRslt->',arrayRslt);
            for (let i = 0; i < arrayRslt.length; i++) {
              const allDay = this.rnd(0, 3) === 0

              // console.log('i->',i);
              
              let texttanggal_mulai = arrayRslt[i].tanggal_mulai;
              var myArrayTglMulai = texttanggal_mulai.split(" ");
              var tgl_mulai = new Date(`${myArrayTglMulai[0]}T00:00:00`)

              let texttanggal_akhir = arrayRslt[i].tanggal_akhir;
              var myArrayTglAKhir = texttanggal_akhir.split(" ");
              var tgl_akhir = new Date(`${myArrayTglAKhir[0]}T00:00:00`)

              var firstTimestamp = tgl_mulai.getTime();
              var first = new Date(firstTimestamp - (firstTimestamp % 900000))
              var secondTimestamp = tgl_akhir.getTime();
              var second = new Date(secondTimestamp - (secondTimestamp % 900000))

              events.push({
                name: arrayRslt[i].nama,
                start: first,
                end: second,
                color: arrayRslt[i].warna,
                timed: !allDay,
                tanggal_mulai: arrayRslt[i].tanggal_mulai,
                tanggal_akhir: arrayRslt[i].tanggal_akhir,
                pembuat: arrayRslt[i].pembuat,
                code_timeline: arrayRslt[i].code_timeline,
                deskripsi: arrayRslt[i].deskripsi,
              })
            }

            this.events = events
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
            this.events = [];
          }
        }

        
        // console.log('events->', this.events)
    },
    getStartEndTime(val){
      var myArray = val.split(" ");
      var year = myArray[1];
      var month = this.getNumberofMonth(myArray[0]);
      var endDay = new Date(year, month, 0).getDate();

      this.startDateCalendar = year+'-'+month+'-01';
      this.endDateCalendar = year+'-'+month+'-'+endDay;
    },
    getNumberofMonth(val){
      switch (val) {
        case 'January':
          return "01";
        case "February":
          return "02";
        case "March":
          return "03";
        case "April":
          return "04";
        case "May":
          return "05";
        case "June":
          return "06";
        case "July":
          return "07";
        case "August":
          return "08";
        case "September":
          return "09";
        case "October":
          return "10";
        case "November":
          return "11";
        case "December":
          return "12";
      }
    },
    getEventColor (event) {
        return event.color
    },
    rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
    },

    addEvent(){
      this.dialogTimeline = true;
      this.formTitleTimeline = 'Add Timeline';
      this.detailItemTimeline.code_timeline = '-';
    },
    editEvent(){
      this.selectedOpen = false;
      this.dialogTimeline = true;
      this.formTitleTimeline = 'Edit Timeline';
    },
    deleteEvent(){
      this.selectedOpen = false;
      this.dialogDeleteTimeline = true;
      // this.dialogTimeline = true;
    },


    async initialize(dept) {
      var dept_code = "";
      if (dept) {
        dept_code = dept;
      }
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetRecruitment?department_code=" + dept_code,
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
    // async getDept(val) {
    //   var div_code = "";
    //   if (val) {
    //     div_code = val;
    //   }
    //   try {
    //     const response = await axios.get(
    //       this.BaseUrlGet + "GetAllDepartment?divisi_code=" + div_code,
    //       {
    //         headers: {
    //           Authorization: `Bearer ` + this.authtoken,
    //         },
    //       }
    //     );
    //     console.log(response.data.data.result.data);
    //     if (response.data.length != 0) {
    //       this.itemsdept = response.data.data.result.data;
    //     } else {
    //       console.log("Kosong");
    //       this.itemsdept = [];
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     if (error.response.status == 401) {
    //       localStorage.removeItem("token");
    //       this.$router.push("/");
    //     } else {
    //       this.itemsdept = [];
    //     }
    //   }
    // },
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
    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetDetailRecruitment?id_recruitment=" +
            this.readOnly.id_recruitment,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = response.data.data.result.GetDetailRecruitment;
          this.datepicker1 =
            response.data.data.result.GetDetailRecruitment.tanggal_permintaan.substring(
              0,
              10
            );
          this.datepicker2 =
            response.data.data.result.GetDetailRecruitment.target_tanggal_pemenuhan.substring(
              0,
              10
            );

          this.datepicker3 =
            response.data.data.result.GetSchedule[0].tanggal_schedule.substring(
              0,
              10
            );
          this.datepicker4 =
            response.data.data.result.GetSchedule[1].tanggal_schedule.substring(
              0,
              10
            );
          this.datepicker5 =
            response.data.data.result.GetSchedule[2].tanggal_schedule.substring(
              0,
              10
            );
          this.datepicker6 =
            response.data.data.result.GetSchedule[3].tanggal_schedule.substring(
              0,
              10
            );

          this.id_schedule1 =
            response.data.data.result.GetSchedule[0].id_schedule;
          this.id_schedule2 =
            response.data.data.result.GetSchedule[1].id_schedule;
          this.id_schedule3 =
            response.data.data.result.GetSchedule[2].id_schedule;
          this.id_schedule4 =
            response.data.data.result.GetSchedule[3].id_schedule;

          //   if (response.data.data.result.foto == "-") {
          //     this.detailEmp.foto = "/images/noimage.png";
          //   }
          //   this.itemlistanak = response.data.data.result.listAnak;
          //   this.itemlistriwayatkerja =
          //     response.data.data.result.listRiwayatPekerjaan;
          //   this.itemlistpengalamankerja =
          //     response.data.data.result.listPengalamanKerja;
          //   this.detailTask = response.data.data.result.GetDetailTask;
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
    async addData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddRecruitment",
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
    async editData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateRecruitment",
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
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses ubah data";
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
    async editStatus(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateStatusRecruitmentSchedule",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialogEditStatus = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses ubah data";
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
        id_recruitment: this.readOnly.id_recruitment,
        // no_induk_karyawan: this.deleteDetailItem.no_induk_karyawan,
      };
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "DeleteRecruitment",
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

    async showFilter() {
      // console.log(localStorage.getItem("token"));
      //   await this.resetFilter();
      this.dialogFilter = true;
    },

    async addDataTimeLine(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddTimeline",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialogTimeline = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses tambah data";
          this.getEvents ();
          // location.reload();this.calendar = true
          // this.initialize();
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
    async editDataTimeLine(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateTimeLine",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialogTimeline = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses ubah data";
          this.getEvents ();
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
    async deleteDataTimeLine() {
      const datapost = {
        code_timeline: this.detailItemTimeline.code_timeline,
        // no_induk_karyawan: this.deleteDetailItem.no_induk_karyawan,
      };
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "DeleteTimeline",
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

          this.dialogDeleteTimeline = false;
          this.getEvents ();
        } else {
          this.dialogDeleteTimeline = true;
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

    
    async uploadApi() {
      const formData = new FormData();
      formData.append("file", this.fileUpload);
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
          this.defaultItem.dok = response.data.data.result;
          // console.log(this.defaultItem.foto_barang);
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

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Dokumen  "+nama+"." + myArray[1]); 
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

    
    tabsdetail(val) {
      this.changeTabs(val);
    },
    selectedTabs(val) {
      this.changeTabs(val);
    },
    changeTabs(val) {
      if (val == 1) {
        this.rekrutmen = true;
        this.calendar = false;
        this.initialize('');
      } else {
        this.rekrutmen = false;
        this.calendar = true;
        // this.initializeinternal('');
      }
    },
    
    pilihfile(event) {
      console.log(event);
      if (event != null) {
        this.fileUpload = event;
        this.fileUploadReady = true;
      } else {
        this.fileUploadReady = false;
      }
    },

    selectedDivisi(val) {
      console.log(val);
      this.getDept(val);
    },

    cari() {
      this.initialize(this.selectDepartment);
      this.dialogFilter = false;
    },

    detailItem(item) {
      this.readOnly.id_recruitment = item.id_recruitment;
      this.getDetail();
      this.dialogDetail = true;
      //   this.$router.push("/EmpDetail");
      //   localStorage.setItem("id_emp", item.id);
    },
    add() {
      this.dialog = true;
      this.formTitle = "Add Item";
      this.resetItem();
      this.fileUploadReady = false;
      this.file='';
      this.isEdit = false;
      //   this.$router.push("/EmpAddEdit");
      //   // localStorage.setItem("id_emp", item.id);
      //   localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "add_emp");
    },
    edit(item) {
      this.readOnly.id_recruitment = item.id_recruitment;
      this.getDetail();
      this.dialogEditPilih = true;
      this.formTitle = "Edit Item";
      this.fileUploadReady = false;
      this.file='';
      this.isEdit = true;
      //   this.$router.push("/EmpAddEdit");
      //   localStorage.setItem("id_emp", item.id);
      //   // localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "edit_emp");
    },
    editStatusRekruitmen(){
      console.log(this.defaultItem.status_pt)
      if(this.defaultItem.status_pt != 'Disetujui'){
          this.snackbar = true;
          this.timeoutsnackbar = 4000;
          this.colorsnackbar = "red";
          this.textsnackbar = "Status rekruitmen tidak 'Disetujui' jadi belum bisa di ubah status/dilanjutkan";
      }else{
        this.dialogEditStatus = true;
        this.dialogEditPilih = false;
      }
    },
    editDataRekruitmen(){
      this.dialog = true;
      this.dialogEditPilih = false;
    },
    showDeleteModal(item) {
      this.dialogDelete = true;
      this.readOnly.id_recruitment = item.id_recruitment;
      this.defaultItem.nama_recruitment = item.nama_recruitment;
      this.defaultItem.jabatan = item.jabatan;
      this.defaultItem.jumlah_kebutuhan = item.jumlah_kebutuhan;
      //   this.defaultItem = Object.assign({}, item);
      //   this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.dialogReset = false;
      this.dialogFilter = false;
      this.dialogDetail = false;
      this.dialogEditStatus = false;
      this.dialogTimeline = false;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.dialogFilter = false;
      this.dialogDeleteTimeline = false;
    },

    saveEditStatus(){
      if(this.defaultItem.status){
        const datapost = this.defaultItem;
        console.log(datapost);
        this.editStatus(datapost);
      }else{
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
      }
    },

    async save() {
      let itemsSchedule = [
        {
          id_schedule: this.id_schedule1,
          nama_schedule: "Psikotes",
          tanggal_schedule: this.datepicker3,
        },
        {
          id_schedule: this.id_schedule2,
          nama_schedule: "Interview_HR",
          tanggal_schedule: this.datepicker4,
        },
        {
          id_schedule: this.id_schedule3,
          nama_schedule: "Interview_Manager",
          tanggal_schedule: this.datepicker5,
        },
        {
          id_schedule: this.id_schedule4,
          nama_schedule: "Inteview_User",
          tanggal_schedule: this.datepicker6,
        },
      ];
      //   this.loading = true;

      this.defaultItem.tanggal_permintaan = this.datepicker1;
      this.defaultItem.target_tanggal_pemenuhan = this.datepicker2;

      const datapost = this.defaultItem;

      console.log(datapost);

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        datapost.listSchedule = JSON.stringify(itemsSchedule);
        if(this.fileUploadReady == true){await this.uploadApi()}
        console.log(datapost);
        if (this.readOnly.code_timeline) {
          console.log("Save Edit");
          this.editData(datapost);
        } else {
          console.log("Save Add");
          this.addData(datapost);
        }
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
      }
    },

    saveTimeline(){
      this.detailItemTimeline.tanggal_mulai = this.datepicker10;
      this.detailItemTimeline.tanggal_akhir = this.datepicker11;
      const datapost = this.detailItemTimeline;

      console.log(datapost);

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        if(this.datepicker10 <= this.datepicker11){
            if (this.detailItemTimeline.code_timeline != '-') {
              console.log("Save Edit");
              this.editDataTimeLine(datapost);
            } else {
              console.log("Save Add");
              this.addDataTimeLine(datapost);
            }
        }else{
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar =
            "Gagal Simpan, Tanggal Akhir tidak boleh kurang dari Tanggal Awal";
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
    resetItem() {
      //   this.defaultItem.user_id = item.user_id;
      this.defaultItem.nama_recruitment = "";
      this.defaultItem.jabatan = "";
      this.defaultItem.department = "";
      this.defaultItem.lokasi_penempatan = "";
      this.defaultItem.jumlah_kebutuhan = "";
      this.defaultItem.source_pemenuhan = "";
      this.defaultItem.tanggal_permintaan = "";
      this.defaultItem.target_tanggal_pemenuhan = "";

      this.readOnly.id_recruitment = "";
      this.$refs.form.resetValidation();
    },

    gettanggal(val) {
      return HelperGlobalService.gettanggal(val);
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
  },
};
</script>

<style scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>

