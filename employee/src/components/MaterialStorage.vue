<template>
  <v-app>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 xl12 style="text-align:left">
          <h1 class="header" style="display:inline-flex;float:left;">Material Storage</h1>
          <div style="display:inline-flex;float:right;">
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn v-if="isAdmin" depressed color="amber" dark slot="activator" class="mb-2" round >+ Add New Material</v-btn> 
                <v-card  style="padding:24px; border-radius: 10px;">
                  <v-card-title>
                    <span class="headline" style="padding:0x;">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md6 style="padding: 18px 0px;">
                          <p style="text-align:left;">Material Name</p>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field label="Enter material name" v-model="editedItem.MaterialName"></v-text-field>
                        </v-flex>
                        
                        <v-flex xs12 sm6 md6 style="padding: 18px 0px;">
                          <p style="text-align:left;">Material Unit</p>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field label="Enter material unit" v-model="editedItem.Unit"></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6 md6 v-if="editedItem.MaterialName != ''" style="padding: 18px 0px;">
                          <p style="text-align:left;">Amount</p>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field 
                            v-if="editedItem.MaterialName != ''"
                            v-model="editedItem.Amount" 
                            :value="0" 
                            label="Amount"
                            return-masked-value
                            mask="#####"
                            ></v-text-field>  
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed outline color="grey" @click.native="close" round>Cancel</v-btn>
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
              :items="materialStorageList"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.ID }}</td>
                <td class="text-xs-center">{{ props.item.MaterialName }}</td>
                <td class="text-xs-center">{{ props.item.Unit }}</td>
                <td class="text-xs-center">{{ props.item.Amount }}</td>
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
import MaterialStorageService from '@/services/MaterialStorageService'
import {mapGetters} from 'vuex'
export default {
  data: () => ({
    dropdowns: [{text:'Edit',value: 1},{text:'Delete',value:2}],
    dialog: false,
    headers: [
      {
        text: 'Material ID',
        align: 'center',
        sortable: true,
        value: 'materialID'
      },
      {
        text: 'Material Name',
        align: 'center',
        sortable: true,
        value: 'materialName'
      },
      {
        text: 'Unit',
        align: 'center',
        sortable: true,
        value: 'unit'
      },
      {
        text: 'Amount',
        align: 'center',
        sortable: true,
        value: 'amount'
      }
    ],
    update : false,
    materialStorageList: [],
    editedIndex: -1,
    editedItem: {
      ID : 0,
      MaterialName: '',
      Unit: '',
      Amount: 0
    },
    defaultItem: {
      ID : 0,
      MaterialName: '',
      Unit: '',
      Amount: 0
    }
  }),
  computed: {
    ...mapGetters([
      'isAdmin'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'Add New Material' : 'Edit Material'
    },

    pages () {
      if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null) 
          return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
  },
  async mounted() {
    this.materialStorageList = (await MaterialStorageService.getMaterial()).data
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    materialStorageList (val) {
      val || this.getMaterialStorage()
    }
  },
  methods: {

    dropdownAction (dropdownValue,item) {
      this.editedIndex = this.materialStorageList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if (dropdownValue == 1) {
        this.editItem (item)
      } else if (dropdownValue == 2) {
        this.deleteItem (item)
      }
    },
    async getMaterialStorage () {
      this.materialStorageList = (await MaterialStorageService.getMaterial()).data
      console.log('materialStorageList : ', this.materialStorageList)
    },

    editItem (item) {
      this.dialog = true
      this.update = true
    },

    async deleteItem (item) {
      await MaterialStorageService.deleteMaterial(item.ID)
      this.getMaterialStorage()
    },

    close () {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.dialog = false
    },
    
    async save () {
      console.log('enterrrrrrrrrrrrrrrrrr')
      console.log(this.editedItem)
      if (this.editedIndex > -1) {
        await MaterialStorageService.updateMaterial(this.editedItem).then( e => {
          this.getMaterialStorage()
        }).catch( e=> {
          console.log(e)
        })
      } else {
        if(this.editedItem.MaterialName == '' || this.editedItem.Unit == '' || this.editedItem.Amount == 0 )
          this.close()
        else{
          await MaterialStorageService.createMaterial(this.editedItem).then( e => {
            console.log('e : ', e)
          }).catch(e=> {
            console.log(e)
          })
        }
      }
      this.getMaterialStorage()
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

p {
    font-size: 18px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.24;
    letter-spacing: normal;
    text-align: left;
    color: #606060;
}
</style>
