<template>
  <v-app>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 xl12 style="text-align:left">
          <h1 class="header" style="display:inline-flex;float:left;">Staff List</h1>
          <div style="display:inline-flex;float:right;">
              <v-dialog v-model="dialog" max-width="700px">
                <v-btn v-if="isAdmin" depressed color="amber" dark slot="activator" class="mb-2" round >Add New Staff</v-btn>
                <v-card style="padding:24px; border-radius: 10px;">
                  <v-card-title style="padding:0x;">
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm12 md4 style="padding: 18px 0px;">
                          <p style="text-align:left;">Name</p>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field 
                            label="First Name" 
                            v-model="editedItem.FirstName"
                            :rules="[() => editedItem.FirstName.length > 0 || 'This field is required']"
                            required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field 
                            label="Last Name" 
                            v-model="editedItem.LastName"
                            :rules="[() => editedItem.LastName.length > 0 || 'This field is required']"
                            required></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6 md4 style="padding: 18px 0px;">
                          <p style="text-align:left;">Email</p>
                        </v-flex>
                        <v-flex xs12 sm6 md8>
                          <v-text-field 
                            label="Email Address" 
                            v-model="editedItem.Email" 
                            :rules="[() => editedItem.Email.length > 0 || 'This field is required']"
                            required
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6 md4 style="padding: 18px 0px;">
                          <p style="text-align:left;">Phone Number</p>
                        </v-flex>
                        <v-flex xs12 sm6 md8>
                          <v-text-field 
                            label="Personal phone number" 
                            v-model="editedItem.TelNo"
                            :rules="[() => editedItem.TelNo.length > 0 || 'This field is required' ,
                                    (v) => v.length == 10|| 'Enter 10 numbers']"
                            :mask="mask"
                            required></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6 md4 style="padding: 18px 0px;">
                          <p style="text-align:left;">Position</p>
                        </v-flex>
                        <v-flex xs12 sm6 md8>
                          <v-select
                            :items="positions"
                            v-model="editedItem.Position"
                            label="Positions"
                            class="input-group"
                            item-text="position"
                            :rules="[() => editedItem.Position.length > 0 || 'This field is required']"
                            required
                          ></v-select>
                        </v-flex>

                        <v-flex xs12 sm12 md12>
                          <p style="text-align:left;">Address</p>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                          <v-text-field 
                            v-model="editedItem.Address" 
                            textarea 
                            style="padding: 0;"
                            :rules="[() => editedItem.Address.length > 0 || 'This field is required']"
                            required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                <v-card-actions>
                    <v-btn depressed outline color="grey" flat @click.native="close" round>Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn depressed dark color="amber" @click.native="save" round>Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-flex>
        <v-flex xs12>
          <div>
            <v-data-table
              :headers="headers"
              :items="staffList"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.ID }}</td>
                <td class="text-xs-center">{{ props.item.Email }}</td>
                <td class="text-xs-center">{{ props.item.FirstName }}</td>
                <td class="text-xs-center">{{ props.item.LastName }}</td>
                <td class="text-xs-center">{{ props.item.TelNo }}</td>
                <td class="text-xs-center">{{ props.item.Position.Position }}</td>
                <td class="text-xs-center">{{ props.item.Address }}</td>
                <td class="justify-center layout px-0">
                  <v-menu offset-y>
                    <v-btn icon slot="activator">
                      <v-icon color="grey">more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-for="dropdown in dropdowns" :key="dropdown.text" @click="dropdownAction(dropdown.value,props.item)">
                        <v-list-tile-title>{{ dropdown.text }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-flex>

      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import StaffService from '@/services/StaffService'
const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export default {
  data: () => ({
    mask:'##########',
      positions : ['Manager','Employee','Admin'],
      dropdowns: [{text:'Edit',value:1},{text:'Delete',value:2}],
      dialog: false,
      headers: [
        {
          text: 'Staff ID',
          align: 'center',
          sortable: true,
          value: 'staffID'
        },
        {
          text: 'Email',
          align: 'center',
          sortable: true,
          value: 'email'
        },
        {
          text: 'First Name',
          align: 'center',
          sortable: true,
          value: 'firstName'
        },
        {
          text: 'Last Name',
          align: 'center',
          sortable: true,
          value: 'lastName'
        },
        {
          text: 'Tel No',
          align: 'center',
          sortable: true,
          value: 'telNo'
        },
        {
          text: 'Position',
          align: 'center',
          sortable: true,
          value: 'position'
        },
        {
          text: 'Address',
          align: 'center',
          sortable: true,
          value: 'address'
        }
      ],
      staffList: [],
      editedIndex: -1,
      editedItem: {
        Email: '',
        FirstName: '',
        LastName: '',
        TelNo: '',
        Position: '',
        Address: ''
      },
      defaultItem: {
        Email: '',
        FirstName: '',
        LastName: '',
        TelNo: '',
        Position: '',
        Address: ''
      },
  }),

  computed: {
    ...mapGetters([
      'isAdmin'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'Add New Staff' : 'Edit Staff detail'
    },

    pages () {
      if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null) 
          return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },

  async mounted () {
    this.staffList = (await StaffService.getStaff()).data
    console.log('staffList : ', this.staffList)
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    staffList (val) {
      val || this.getStaffList()
    }
  },
  
  methods: {

    dropdownAction (dropdownValue,item) {
      this.editedItem = Object.assign({}, item)
      if (dropdownValue == 1) {
        this.editItem ()
      } else if (dropdownValue == 2) {
        this.deleteItem (item)
      } 
    },

    async getStaffList() {
      this.staffList = (await StaffService.getStaff()).data
      console.log('staffList : ', this.staffList)
    },

    async deleteItem (item) {
      await StaffService.deleteStaff(item.ID).then( deleteLog => {
        console.log('delete log : ', deleteLog)
        this.getStaffList()
      }).catch( err => {
        console.log('delete error : ', err)
      })
    },

    closeStatusDialog () {
      this.statusRadio = ''
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.statusChangeDialog = false
      },

    editItem () {
      this.dialog = true
      },

    close () {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.dialog = false
      },
    
    async save () {
      await StaffService.createStaff(this.editedItem)
      this.getStaffList()
      this.close()
    }
  }
}
</script>

<style scoped>
.header {
  font-family: Roboto;
  font-size: 30px;
  color: #606060;
}
.row:after {
  content: "";
  clear: both;
}
.column {
  float: left;
  display: table;
  padding: 0px 20px 0px 0px;
}
.attrubuteText {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.24;
  letter-spacing: normal;
  text-align: left;
  color: #606060;
}
.headline{
    font-size: 24px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.68;
    letter-spacing: normal;
    text-align: left;
    color: #ff9f1c;
} 
p {
    font-size: 18px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.24;
    letter-spacing: normal;
    text-align: left;
    margin: 0px;
    color: #606060;
}
</style>
