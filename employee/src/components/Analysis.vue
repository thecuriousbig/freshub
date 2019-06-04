<template>
  <v-app>
    <v-container grid-list-lg align-center>
      <v-layout row wrap>
        <v-flex xs12 xl12 style="text-align:left">
          <h1 class="header" style="display:inline-flex;float:left;">Analysis Data naja</h1>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Most Best Month that order Vegetable category product</p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders1"
          :items="analysisDataset1"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" style="font-weight: bold;">{{ props.item.label }}</td>
            <td class="text-xs-center">{{ props.item.data }}</td>
          </template>
        </v-data-table>
        </v-flex>
        <!-- <p>{{analysis2}}</p> -->
        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Most Best Purchase Order ID that order meat category product</p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders2"
          :items="analysis2"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" style="font-weight: bold;">{{ props.item.ID }}</td>
            <td class="text-xs-center">{{ props.item.TotalAmount }}</td>
          </template>
        </v-data-table>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Most Saler Category is </p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders3"
          :items="analysis3"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" style="font-weight: bold;">{{ props.item.Name }}</td>
            <td class="text-xs-center">{{ props.item.Amount }}</td>
          </template>
        </v-data-table>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Most Saler Meat is  </p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders4"
          :items="analysis4"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" style="font-weight: bold;">{{ props.item.Name }}</td>
            <td class="text-xs-center">{{ props.item.Amount }}</td>
          </template>
        </v-data-table>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Staff works  </p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders5"
          :items="analysis5"
          hide-actions
          class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.FirstName }}</td>
              <td class="text-xs-center">{{ props.item.LastName }}</td>
              <td class="text-xs-center">{{ props.item.WO_Count }}</td>
            </template>
          </v-data-table>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">ยอดสั่งซื้อสินค้าของแต่ละ Manufacturer </p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders12"
          :items="analysis12"
          hide-actions
          class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.ManufacturerName }}</td>
              <td class="text-xs-center">{{ props.item.amount }}</td>
            </template>
          </v-data-table>
        </v-flex>
          <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Most Saler Fruit is  </p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders4"
          :items="analysis8"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" style="font-weight: bold;">{{ props.item.Name }}</td>
            <td class="text-xs-center">{{ props.item.Amount }}</td>
          </template>
        </v-data-table>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Most Saler Vegetable is  </p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders4"
          :items="analysis9"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" style="font-weight: bold;">{{ props.item.Name }}</td>
            <td class="text-xs-center">{{ props.item.Amount }}</td>
          </template>
        </v-data-table>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Most Best Purchase Order ID that order fruit category product  </p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders13"
          :items="analysis13"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.FirstName }}</td>
            <td class="text-xs-center">{{ props.item.LastName }}</td>
            <td class="text-xs-center">{{ props.item.TotalAmount }}</td>
          </template>
        </v-data-table>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Most Best Purchase Order ID that order vegetable category product  </p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders13"
          :items="analysis14"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.FirstName }}</td>
            <td class="text-xs-center">{{ props.item.LastName }}</td>
            <td class="text-xs-center">{{ props.item.TotalAmount }}</td>
          </template>
        </v-data-table>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Amount of purchase order for each user  </p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders15"
          :items="analysis15"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.FirstName }}</td>
            <td class="text-xs-center">{{ props.item.LastName }}</td>
            <td class="text-xs-center">{{ props.item.TotalPO }}</td>
          </template>
        </v-data-table>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Income per month statistic</p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders11"
          :items="analysis10"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" style="font-weight: bold;">{{ props.item.month }}</td>
            <td class="text-xs-center">{{ props.item.monthcost }}</td>
            </template>
        </v-data-table>
        </v-flex>
          <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Most Best Month that order Meat category product</p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders6"
          :items="analysisDataset6"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" style="font-weight: bold;">{{ props.item.label }}</td>
            <td class="text-xs-center">{{ props.item.data }}</td>
          </template>
        </v-data-table>
        </v-flex>

        <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Outcome per month statistic</p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders10"
          :items="analysis11"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" style="font-weight: bold;">{{ props.item.month }}</td>
            <td class="text-xs-center">{{ props.item.monthcost }}</td>
            </template>
        </v-data-table>
        </v-flex>
          <v-flex xs12 xl12 style="text-align:left">
          <p class="headline" style="display:inline-flex;float:left;">Most Best Month that order Fruit category product</p>
        </v-flex>
        <v-flex xs12 xl12 style="text-align:left">
          <v-data-table
          :headers="analysisHeaders7"
          :items="analysisDataset7"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" style="font-weight: bold;">{{ props.item.label }}</td>
            <td class="text-xs-center">{{ props.item.data }}</td>
          </template>
        </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<script>
import Api from '@/services/Api'
import ImportService from '@/services/ImportService'
import PurchaseOrderService from '@/services/PurchaseOrderService'
import ProductStorageService from '@/services/ProductStorageService'
import StaffService from '@/services/StaffService'
import WorkOrderService from '@/services/WorkOrderService'
import MaterialOrderService from '@/services/MaterialOrderService'
import ManufacturerService from '@/services/ManufacturerService'
import UserService from '@/services/UserService'
export default {
  data: () => ({
    analysisHeaders1: [
      {
        text: 'Month',
        align: 'center',
        sortable: true,
        value: 'label'
      },
      {
        text: 'Veggie sale',
        align: 'center',
        sortable: true,
        value: 'data'
      },
    ],
    analysisHeaders2: [
      {
        text: 'Product ID',
        align: 'center',
        sortable: true,
        value: 'label'
      },
      {
        text: 'Amount Meat sale',
        align: 'center',
        sortable: true,
        value: 'data'
      },
    ],
    analysisHeaders3: [
      {
        text: 'Product Name',
        align: 'center',
        sortable: true,
        value: 'label'
      },
      {
        text: 'Amount sale',
        align: 'center',
        sortable: true,
        value: 'data'
      },
      
    ],
    analysisHeaders4: [
      {
        text: 'Product Name',
        align: 'center',
        sortable: true,
        value: 'label'
      },
      {
        text: 'Amount sale',
        align: 'center',
        sortable: true,
        value: 'data'
      }
    ],
    analysisHeaders5: [
      {
        text: 'First Name',
        align: 'center',
        sortable: true,
        value: 'FirstName'
      },
      {
        text: 'Last Name',
        align: 'center',
        sortable: true,
        value: 'LastName'
      },
      {
        text: 'Work Count',
        align: 'center',
        sortable: true,
        value: 'WO_Count'
      }
    ],
    analysisHeaders6: [
      {
        text: 'Month',
        align: 'center',
        sortable: true,
        value: 'label'
      },
      {
        text: 'Meat sale',
        align: 'center',
        sortable: true,
        value: 'data'
      }
    ],
    analysisHeaders10: [
      {
        text: 'Month',
        align: 'center',
        sortable: true,
        value: 'label'
      },
      {
        text: 'Value',
        align: 'center',
        sortable: true,
        value: 'data'
      }
    ],
    analysisHeaders7: [
      {
        text: 'Month',
        align: 'center',
        sortable: true,
        value: 'label'
      },
      {
        text: 'Fruit sale',
        align: 'center',
        sortable: true,
        value: 'data'
      }
    ],
    analysisHeaders11: [
      {
        text: 'Month',
        align: 'center',
        sortable: true,
        value: 'label'
      },
      {
        text: 'Value',
        align: 'center',
        sortable: true,
        value: 'data'
      }
    ],

    analysisHeaders12: [
      {
        text: 'Manufacturer',
        align: 'center',
        sortable: true,
        value: 'manufacturer'
      },
      {
        text: 'Amount',
        align: 'center',
        sortable: true,
        value: 'amount'
      }
    ],
    analysisHeaders13: [
      {
        text: 'First Name',
        align: 'center',
        sortable: true,
        value: 'FirstName'
      },
      {
        text: 'Last Name',
        align: 'center',
        sortable: true,
        value: 'LastName'
      },
      {
        text: 'Product Amount',
        align: 'center',
        sortable: true,
        value: 'TotalAmount'
      }
    ],
    analysisHeaders15: [
      {
        text: 'First Name',
        align: 'center',
        sortable: true,
        value: 'FirstName'
      },
      {
        text: 'Last Name',
        align: 'center',
        sortable: true,
        value: 'LastName'
      },
      {
        text: 'Total PO',
        align: 'center',
        sortable: true,
        value: 'TotalPO'
      }
    ],
    analysis1:{},
    analysisDataset1:{},
    analysis2:{},
    analysisDataset2:[],
    analysis3:{},
    analysis4:{},
    analysis5:{},
    analysis6:{},
    analysisDataset6:[],
    analysis7:{},
    analysisDataset7:[],
    analysis8:{},
    analysis9:{},
    analysis10:{},
    analysis11:{},
    analysis12:{},
    analysis13:{},
    analysis14:{},
    analysis15:{}
  }),
  mounted(){
    this.getMaterialOrderFromManufacturer()
    this.getPopularFruit()
    this.getPopularVegetable()
    this.getFruitPOQuarter()
    this.getVegetablePOQuarter()
    this.getUserTotalPrice()
    this.getVeggiePO()
    this.getMeatPOQuarter()
    this.getCateAmnt()
    this.getPopularMeat()
    this.getStaffWork()
    this.getIncomeEachMonth()
    this.getOutcomeEachMonth()
    this.getMeatPO()
    this.getFruitPO()
    
  },
  computed: {
  },
  watch: {
    analysis1 (val) {
      val || this.analysis1
    },
  },
  methods: {
    async getVeggiePO(){
      this.analysis1['labels'] = []
      this.analysis1['datasets'] = []
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let PO of res) {
        PO['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(PO.ID)).data
      }
      var veggie_PO = res.filter(PO=>{
        let POs = PO.PODetail
        if(POs){
          POs = POs.filter(PO_Detail=>
            PO_Detail.Product.CategoryName ==='Vegetable'
          )
          return POs.length > 0
        }
        return false
      })
      // console.log(veggie_PO);
      let _this = this;
      [...Array(12).keys()].forEach(month_gen=>{
        var PO_in_month = veggie_PO.filter(PO=>{
            var month = _this.moment(PO.OrderDate).format("YYYY-MM-DD")
            return this.moment(month).month()===month_gen
          })
        _this.analysis1.labels.push(month_gen)
        var data_obj ={
          label : _this.moment().month(month_gen).format("MMMM"),
          data: [PO_in_month.length]
        }
        _this.analysis1.datasets.push(data_obj)
      })
      this.analysisDataset1 = this.analysis1.datasets
    },
    async getMeatPOQuarter(){
      // this.analysis2['labels'] = []
      // this.analysis2['datasets'] = []
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let PO of res) {
        PO['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(PO.ID)).data
      }
      let meat_PO = res.filter(PO=>{
        let POs = PO.PODetail
        if(POs){
          POs = POs.filter(PO_Detail=>
            PO_Detail.Product.CategoryName ==='Meat'
          )
          if(POs.length > 0)
            var TotalAmount = 0;
            POs.forEach(PO_Detail=>{
              TotalAmount+=PO_Detail.Amount
            })
            PO['TotalAmount'] = TotalAmount
          return POs.length > 0
        }
        return false
      })
      let _this = this;
      let PO_in_month = meat_PO.filter(PO=>{
        var month = _this.moment(PO.OrderDate).format("YYYY-MM-DD")
        return this.moment(month).month() < 4
      })
      console.log(PO_in_month);
      this.analysis2 = PO_in_month
      console.log(this.analysis2);
      // PO_in_month.sort( (a,b)=>{
      //   if(a.PODetail.Product)
      // })
    },
    async getCateAmnt(){
      this.analysis3['labels'] = []
      this.analysis3['datasets'] = []
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let PO of res) {
        PO['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(PO.ID)).data
      }
      const Category = (await Api().get('/api/category')).data
      Category.forEach(cate=>{
        cate['Amount'] = 0
        res.filter(PO=>{
          let POs = PO.PODetail
          if(POs){
            POs = POs.filter(PO_Detail=>
              PO_Detail.Product.CategoryName === cate.Name
            )
            if(POs.length > 0){
              var TotalAmount = 0;
              POs.forEach(PO_Detail=>{
                TotalAmount+=PO_Detail.Amount
              })
              cate.Amount = cate.Amount+TotalAmount
            }
            return POs.length > 0
          }
          return false
        })
      })
      this.analysis3 = Category
      // console.log(this.analysis3)
    },
    async getMaterialOrderFromManufacturer() {
      console.log("msfdkldfskjldfskjldfskjldfskjldfskjldfkjldfkjldfs")
      const manufacturers = (await ManufacturerService.getManufacturer()).data
      const materialOrders = (await MaterialOrderService.getMaterialOrder()).data
      manufacturers.forEach( manufacturer => {
        manufacturer['amount'] = 0
        materialOrders.forEach(materialOrder => {
          var manufacturerInMaterialOrder = materialOrder.ManufacturerID
          if (manufacturer.ID === manufacturerInMaterialOrder) {
            manufacturer.amount = manufacturer.amount + 1
          }
        })
      })
      this.analysis12 = manufacturers
    },
    async getPopularMeat(){
      // this.analysis3['labels'] = []
      // this.analysis3['datasets'] = []
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let PO of res) {
        PO['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(PO.ID)).data
      }
      let meat_PO = res.filter(PO=>{
        let POs = PO.PODetail
        if(POs){
          POs = POs.filter(PO_Detail=>
            PO_Detail.Product.CategoryName ==='Meat'
          )
          if(POs.length > 0)
            var TotalAmount = 0;
            POs.forEach(PO_Detail=>{
              TotalAmount+=PO_Detail.Amount
            })
            PO['TotalAmount'] = TotalAmount
          return POs.length > 0
        }
        return false
      })
      const prods = (await ProductStorageService.getProductByCategory('Meat')).data
      prods.forEach(prod=>{
        prod['Amount']=0
        var popular = meat_PO.filter(PO=>{
          var selected_POD = (PO.PODetail).filter(POD => {
            if(POD.ProductID === prod.ID)
              prod.Amount = prod.Amount + POD.Amount
            return POD.ProductID === prod.ID
          })
          if(selected_POD){
            return selected_POD.ID === prod.ID
          }else 
            return false
        })
      })
      console.log(prods);
      this.analysis4 = prods
      
    },
    async getStaffWork(){
      const staffs = (await StaffService.getStaff()).data
      const WOs = (await WorkOrderService.getWorkOrder()).data
      staffs.forEach(staff=>{
        staff['WO_Count'] = 0
        staff['WO'] = WOs.filter(WO=>{
          return (WO.StaffID === staff.ID)&&(WO.Status==="Finish")            
        })
        if(staff.WO)
          staff['WO_Count'] = staff.WO.length
      })
      console.log(staffs);
      this.analysis5 = staffs
    },

    async getIncomeEachMonth(){
      var poincome=[]
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let purchaseorders of res) {
        purchaseorders['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(purchaseorders.ID)).data
      }
      let _this = this
      for(let i=0;i<12;i++){
        
        var purchaseorderfiltered = res.filter(PO=>{
          var month = _this.moment(PO.OrderDate).format("YYYY-MM-DD")
          return this.moment(month).month() == i
        })
        var sumcostmonth = 0;
        purchaseorderfiltered.forEach(pofilter=>{
          var POs = pofilter.PODetail
          POs.forEach(pod=>{
            sumcostmonth=sumcostmonth+pod.Cost
          })
          console.log(POs,sumcostmonth)
        })
        var obj = { month:_this.moment().month(i).format("MMMM") , monthcost:sumcostmonth }
        console.log(obj)
        poincome.push(obj)
      }
      console.log(poincome)
      this.analysis10 = poincome
      
    },
    async getOutcomeEachMonth(){
      console.log('555555555555555555555555555555555555555555555555555555555555555555')
      var mooutcome=[]
      const res = (await MaterialOrderService.getMaterialOrder()).data
      for (let materialorders of res) {
        materialorders['MODetail'] = (await MaterialOrderService.getMaterialOrderDetailByID(materialorders.ID)).data
      }
      console.log("64549724576544654542")
      let _this = this
      for(let i=0;i<12;i++){
        var materialorderfiltered = res.filter(MO=>{
          var month = _this.moment(MO.OrderDate).format("YYYY-MM-DD")
          return this.moment(month).month() == i
        })
        var sumcostmonth = 0;
        materialorderfiltered.forEach(mofilter=>{
          var MOs = mofilter.MODetail
          MOs.forEach(mod=>{
            sumcostmonth=sumcostmonth+(mod.PricePerUnit*mod.Amount)
          })
          console.log(MOs,sumcostmonth)
        })
        var obj = { month:_this.moment().month(i).format("MMMM") , monthcost:sumcostmonth }
        console.log(obj)
        mooutcome.push(obj)
      }
      console.log(mooutcome)
      this.analysis11 = mooutcome
      
    },
    async getMeatPO(){
      this.analysis6['labels'] = []
      this.analysis6['datasets'] = []
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let PO of res) {
        PO['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(PO.ID)).data
      }
      var meat_PO = res.filter(PO=>{
        let POs = PO.PODetail
        if(POs){
          POs = POs.filter(PO_Detail=>
            PO_Detail.Product.CategoryName ==='Meat'
          )
          return POs.length > 0
        }
        return false
      })
      // console.log('dsfopsdkp '+meat_PO);
      let _this = this;
      [...Array(12).keys()].forEach(month_gen=>{
        var PO_in_month = meat_PO.filter(PO=>{
            var month = _this.moment(PO.OrderDate).format("YYYY-MM-DD")
            return this.moment(month).month()===month_gen
          })
        _this.analysis6.labels.push(month_gen)
        var data_obj ={
          label : _this.moment().month(month_gen).format("MMMM"),
          data: [PO_in_month.length]
        }
        _this.analysis6.datasets.push(data_obj)
      })
      this.analysisDataset6 = this.analysis6.datasets
    },

    async getPopularFruit(){
      // this.analysis3['labels'] = []
      // this.analysis3['datasets'] = []
      console.log("2695946465465464656468465465465468464654686465")
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let PO of res) {
        PO['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(PO.ID)).data
      }
      let fruit_PO = res.filter(PO=>{
        let POs = PO.PODetail
        if(POs){
          POs = POs.filter(PO_Detail=>
            PO_Detail.Product.CategoryName ==='Fruit'
          )
          if(POs.length > 0)
            var TotalAmount = 0;
            POs.forEach(PO_Detail=>{
              TotalAmount+=PO_Detail.Amount
            })
            PO['TotalAmount'] = TotalAmount
          return POs.length > 0
        }
        return false
      })
      const prods = (await ProductStorageService.getProductByCategory('Fruit')).data
      prods.forEach(prod=>{
        prod['Amount']=0
        var popular = fruit_PO.filter(PO=>{
          var selected_POD = (PO.PODetail).filter(POD => {
            if(POD.ProductID === prod.ID)
              prod.Amount = prod.Amount + POD.Amount
            return POD.ProductID === prod.ID
          })
          if(selected_POD){
            return selected_POD.ID === prod.ID
          }else 
            return false
        })
      })
      console.log('analysis8'+prods);
      this.analysis8 = prods
    },
    async getPopularVegetable(){
      // this.analysis3['labels'] = []
      // this.analysis3['datasets'] = []
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let PO of res) {
        PO['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(PO.ID)).data
      }
      let vegetable_PO = res.filter(PO=>{
        let POs = PO.PODetail
        if(POs){
          POs = POs.filter(PO_Detail=>
            PO_Detail.Product.CategoryName ==='Vegetable'
          )
          if(POs.length > 0)
            var TotalAmount = 0;
            POs.forEach(PO_Detail=>{
              TotalAmount+=PO_Detail.Amount
            })
            PO['TotalAmount'] = TotalAmount
          return POs.length > 0
        }
        return false
      })
      const prods = (await ProductStorageService.getProductByCategory('Vegetable')).data
      prods.forEach(prod=>{
        prod['Amount']=0
        var popular = vegetable_PO.filter(PO=>{
          var selected_POD = (PO.PODetail).filter(POD => {
            if(POD.ProductID === prod.ID)
              prod.Amount = prod.Amount + POD.Amount
            return POD.ProductID === prod.ID
          })
          if(selected_POD){
            return selected_POD.ID === prod.ID
          }else 
            return false
        })
      })
      console.log('analysis9'+prods);
      this.analysis9 = prods
    },
    async getFruitPOQuarter(){
      // this.analysis2['labels'] = []
      // this.analysis2['datasets'] = []
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let PO of res) {
        PO['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(PO.ID)).data
      }
      let fruit_PO = res.filter(PO=>{
        let POs = PO.PODetail
        if(POs){
          POs = POs.filter(PO_Detail=>
            PO_Detail.Product.CategoryName ==='Fruit'
          )
          if(POs.length > 0)
            var TotalAmount = 0;
            POs.forEach(PO_Detail=>{
              TotalAmount+=PO_Detail.Amount
            })
            PO['TotalAmount'] = TotalAmount
          return POs.length > 0
        }
        return false
      })
      let _this = this;
      let PO_in_month = fruit_PO.filter(PO=>{
        var month = _this.moment(PO.OrderDate).format("YYYY-MM-DD")
        return this.moment(month).month() < 4
      })
      console.log(PO_in_month);
      this.analysis13 = PO_in_month
      console.log(this.analysis13);
      // PO_in_month.sort( (a,b)=>{
      //   if(a.PODetail.Product)
      // })
    },
    async getVegetablePOQuarter(){
      // this.analysis2['labels'] = []
      // this.analysis2['datasets'] = []
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let PO of res) {
        PO['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(PO.ID)).data
      }
      let vegetable_PO = res.filter(PO=>{
        let POs = PO.PODetail
        if(POs){
          POs = POs.filter(PO_Detail=>
            PO_Detail.Product.CategoryName ==='Vegetable'
          )
          if(POs.length > 0)
            var TotalAmount = 0;
            POs.forEach(PO_Detail=>{
              TotalAmount+=PO_Detail.Amount
            })
            PO['TotalAmount'] = TotalAmount
          return POs.length > 0
        }
        return false
      })
      let _this = this;
      let PO_in_month = vegetable_PO.filter(PO=>{
        var month = _this.moment(PO.OrderDate).format("YYYY-MM-DD")
        return this.moment(month).month() < 4
      })
      console.log(PO_in_month);
      this.analysis14 = PO_in_month
      console.log(this.analysis14);
      // PO_in_month.sort( (a,b)=>{
      //   if(a.PODetail.Product)
      // })
    },
    async getUserTotalPrice(){
      const POs = (await PurchaseOrderService.getPurchaseOrder()).data
      const Users = (await UserService.getUser()).data
      console.log('User: '+Users)
      Users.forEach(user=>{
        user['TotalPrice'] = 0
        user['TotalPO'] = 0
        user['PO'] = POs.filter(PO=>{
          return (PO.UserID === user.ID)      
        })
        if(user.PO){
          user.TotalPO = user.PO.length
          var POEachUser = user.PO
          console.log(user.TotalPO)
        }
      })
      console.log('dfjks :'+Users);
      this.analysis15 = Users
    },
    async getFruitPO(){
      this.analysis7['labels'] = []
      this.analysis7['datasets'] = []
      const res = (await PurchaseOrderService.getPurchaseOrder()).data
      for (let PO of res) {
        PO['PODetail'] = (await PurchaseOrderService.getPurchaseOrderDetailByID(PO.ID)).data
      }
      var fruit_PO = res.filter(PO=>{
        let POs = PO.PODetail
        if(POs){
          POs = POs.filter(PO_Detail=>
            PO_Detail.Product.CategoryName ==='Fruit'
          )
          return POs.length > 0
        }
        return false
      })
      // console.log('dsfopsdkp '+fruit_PO);
      let _this = this;
      [...Array(12).keys()].forEach(month_gen=>{
        var PO_in_month = fruit_PO.filter(PO=>{
            var month = _this.moment(PO.OrderDate).format("YYYY-MM-DD")
            return this.moment(month).month()===month_gen
          })
        _this.analysis7.labels.push(month_gen)
        var data_obj ={
          label : _this.moment().month(month_gen).format("MMMM"),
          data: [PO_in_month.length]
        }
        _this.analysis7.datasets.push(data_obj)
      })
      this.analysisDataset7 = this.analysis7.datasets
    },
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
</style>
