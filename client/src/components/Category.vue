<template>
<v-flex md8 offset-xs2>
  <v-container fluid grid-list-md>
  <v-layout row wrap>
    <v-flex xs12 style="text-align:left">
      <p class="display-3">{{this.$route.params.name}}</p>
      <p class="display-1">Sort by price</p>
      <v-radio-group v-model="sortPrice" :mandatory="false" row>
        <v-radio color="warning" label="Low to high" value="asc" ></v-radio>
        <v-radio color="warning" label="High to low" value="desc"></v-radio>
      </v-radio-group>
    </v-flex>  
  </v-layout>
      <!-- another product -->
        <v-layout row wrap>
          <v-flex
          v-for="product in show_products"
          :key="product.ID"
          text-md-center>
            <product-card :product="product"></product-card>
          </v-flex>
        </v-layout>
      <!-- another product -->
  </v-container>
</v-flex>

</template>

<script>
import Api from '@/services/Api'
import ProductCard from '@/components/ProductCard'
export default {
  name:'category',
  components:{
    'product-card' : ProductCard
  },
  data(){
    return{
      show_products:{},
      sortPrice : 'asc'
    }
  },
  mounted(){
    this.getCategoryProduct();
  },
  watch:{
    $route(to,from){
      this.getCategoryProduct();
    },
    sortPrice(val,oldVal){
      this.sortPrice = val
      if(val==='asc'){
        this.show_products.sort(this.sortBy('Price'))
      }else if(val==='desc'){
        this.show_products.sort(this.sortBy('Price',true))
      }
    }
  },
  methods:{
    
    async getCategoryProduct(){
      const category = String(this.$route.params.name).toLowerCase();
      var url = ''
      if (category ==='all') {
        url = '/api/product'
      } else {
        url = '/api/product/category/'+category
      }
      try {
        let products = await Api().get(url)
        var reverse = false
        if(this.sortPrice==='desc')
          reverse = true
        this.show_products = products.data.sort(this.sortBy('Price',reverse))
      } catch (error) {
        console.log('error : '+error);
      }
    },
    sortBy(field,reverse=false){
      var orderFn;
      if(reverse){
        orderFn = function (a,b){
          if(a[field]<b[field]) return 1;
          else if (a[field]>b[field]) return -1;
          return 0;
        }
      }else{
        orderFn = function (a,b){
          if(a[field]<b[field]) return -1;
          else if (a[field]>b[field]) return 1;
          return 0;
        }
      }
      return orderFn
    }
  }
}
</script>

<style scoped>

</style>
