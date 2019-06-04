<template>
  <v-app>
    <v-container grid-list-lg align-center>
      <v-layout row wrap>
        <v-flex xs12 xl12 style="text-align:left">
          <h1 class="header" style="display:inline-flex;float:left;">Work Order List</h1>
          <div style="display:inline-flex;float:right;">
            <v-btn depressed color="amber" dark slot="activator" class="mb-2" round @click="createWO">+ Create WO</v-btn> 
          </div>
        </v-flex>
       
        <v-flex xs12 xl12>
          <div>
            <v-dialog v-model="statusChangeDialog" max-width="300px">
              <v-card>
                <v-card-title>
                  <span style="text-align:center">Update this status</span>
                </v-card-title>
                <v-card-text>
                  <v-radio-group row v-model="statusRadio">
                    <v-radio label="In Progress" color="blue" value="In Progress"></v-radio>
                    <v-radio label="Finish" color="yellow" value="Finish"></v-radio>
                    <v-radio label="Late" color="red" value="Late"></v-radio>
                  </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="grey" round outline flat @click.native="closeStatusDialog()">Cancel</v-btn>
                    <v-btn color="amber" round  flat @click.native="saveStatus()">Save</v-btn>
                  </v-card-actions>
              </v-card>
            </v-dialog>

            <v-data-table
              :headers="headers"
              :items="this.workOrderList"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.ID }}</td>
                <td class="text-xs-center">{{ moment(props.item.OrderDateTime).format("DD MMMM YYYY") }}</td>
                <td class="text-xs-center">{{ props.item.Staff.FirstName }}</td>
                <td class="text-xs-center">{{ props.item.Duty.DutyName }}</td>
                <td class="text-xs-center">{{ props.item.Manager.FirstName }}</td>
                <td class="text-xs-center">{{ moment(props.item.DueDateTime).format("DD MMMM YYYY") }}</td>
                <td class="text-xs-center">{{ props.item.Status }}</td>
                <td class="justify-center layout px-0">
                  <v-menu offset-y>
                    <v-btn icon slot="activator">
                      <v-icon color="grey">more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-for="(dropdown,i) in dropdowns" :key="i" @click="dropdownAction(dropdown.value,props.item)">
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
import WorkOrderService from '@/services/WorkOrderService'
export default {
  data: () => ({
    dropdowns: [{text:'Update',value: 1},{text:'Delete',value:2}],
    dialog: false,
    statusChangeDialog: false,
    statusRadio: '',
    headers: [
      {
        text: 'Work Order ID',
        align: 'center',
        sortable: true,
        value: 'workOrderID'
      },
      {
        text: 'Order Date/Time',
        align: 'center',
        sortable: true,
        value: 'orderDateTime'
      },
      {
        text: 'Staff Name',
        align: 'center',
        sortable: true,
        value: 'staffName'
      },
      {
        text: 'Duty',
        align: 'center',
        sortable: true,
        value: 'duty'
      },
      {
        text: 'Manager Name',
        align: 'center',
        sortable: true,
        value: 'managerName'
      },
      {
        text: 'Due Date/Time',
        align: 'center',
        sortable: true,
        value: 'dueDateTime'
      },
      {
        text: 'Status',
        align: 'center',
        sortale: true,
        value: 'status'
      }
    ],
    workOrderList: [],
    editedIndex: -1,
    editedItem: {
      ID: 0,
      OrderDateTime: '',
      StaffName: '',
      Duty: '',
      ManagerName: '',
      DueDateTime: '',
      Status: ''
    },
    defaultItem: {
      ID: 0,
      OrderDateTime: '',
      StaffName: '',
      Duty: '',
      ManagerName: '',
      DueDateTime: '',
      Status: ''
    }
  }),
  
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    pages () {
      if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null) 
          return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },

  async mounted() {
    this.workOrderList = (await WorkOrderService.getWorkOrder()).data
    console.log('workOrderList', this.workOrderList)
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    statusChangeDialog (val) {
      val || this.closeStatusDialog()
    },
    workOrderList (val) {
      val || this.workOrderList
    }
  },
  methods: {
    dropdownAction (dropdownValue,item) {
      this.editedItem = Object.assign({}, item)
      if (dropdownValue == 1) {
        this.statusChangeDialog = true
      } else if (dropdownValue == 2) {
        this.deleteItem (item)
      }
    },

    async getWorkOrderList () {
      this.workOrderList = (await WorkOrderService.getWorkOrder()).data
      console.log('workOrderList', this.workOrderList)
    },

    async deleteItem (item) {
      await WorkOrderService.deleteWorkOrder(item.ID).then( deleteLog => {
        console.log('delete log : ', deleteLog)
        this.getWorkOrderList()
      }).catch( err => {
        console.log('delete error : ', err)
      })
    },

    createWO() {
      this.$emit('clicked',{name:'create-work-order'})
    },

    async saveStatus () {
      this.editedItem.Status = this.statusRadio
      await WorkOrderService.updateWorkOrder(this.editedItem).then(a => {
        console.log('update : ', a)
        this.getWorkOrderList()
      })
      
      this.closeStatusDialog()
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
    
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.workOrderList[this.editedIndex], this.editedItem)
      } else {
        this.workOrderList.push(this.editedItem)
      }
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
</style>
