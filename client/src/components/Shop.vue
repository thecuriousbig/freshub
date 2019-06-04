<template>
  <v-app id="inspire">
    <v-navigation-drawer
          fixed
          :clipped="$vuetify.breakpoint.lgAndUp"
          app
          v-model="drawer"
        >
      <v-list dense>
        <template v-for="item in items" >
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group 
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator" >
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile 
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
              :to="{name:'category',params:{name:child.path}}"
              append
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.name }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
            :to="{name:'category',params:{name:'all'}}">
              <v-list-tile-content>
                <v-list-tile-title>
                  All
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="" :key="item.text" :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <!-- logout item -->
        <v-list-tile v-if="isLoggedIn" @click="onLogOut" :key="logOutItem">
          <v-list-tile-action>
            <v-icon>{{ logOutItem.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ logOutItem.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- end logout item -->
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar
          color="white"
          app
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          fixed
        >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <img class="hidden-sm-and-down" src="@/assets/logo.svg" style="width: 5%; vertical-align: baseline;">
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          
        </v-toolbar-title>
        <!-- <v-text-field
            placeholder="Search..."
            append-icon="search"
          ></v-text-field> -->
        <v-spacer></v-spacer> 
        <!-- name -->
        <v-btn icon :to="{name:'cart'}">
          <v-badge overlap bottom left>
            <span slot="badge">{{cart_amount}}</span>
            <v-icon>shopping_cart</v-icon>
          </v-badge>
        </v-btn>
        <h2 v-if="isLoggedIn">{{user.UserName}}</h2>
        <v-btn icon class="material-icons md-dark">
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-btn 
          v-if="!isLoggedIn" 
          flat 
          @click.stop="loginDialog = true">
          Login / Register
        </v-btn>
    </v-toolbar>
    <v-content>
      <v-container 
        fill-height v-bind="{ fluid: isFullWidth }" 
        style="margin: 0px 0px;
               max-width: 100%;
              ">
        <v-layout justify-start row wrap>
            <router-view></router-view>
        </v-layout>
        
        <!-- Login/Register modal -->
        <div v-if="!isLoggedIn">
          <v-dialog v-model="registerDialog" max-width="1075px">
            <register @click="onLoginRegisterClick"></register>
          </v-dialog>
          <v-dialog v-model="loginDialog" max-width="1075px">
            <login @click="onLoginRegisterClick"></login>
          </v-dialog>
        </div>
        <!-- End of Login/Register modal -->
      </v-container>
    </v-content>
  </v-app>  
</template>

<script>
import Login from '@/components/Login';
import Register from '@/components/Register';
import Api from '@/services/Api'
import {mapState,mapGetters,mapActions} from 'vuex'
export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'home', text: 'Home' ,path:{name:'home-page'},},
        { icon: 'shopping_cart', text: 'Cart' ,path:{name:'cart'}},
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Category',
          model: false,
          children: []
        },
        { icon: 'history', text: 'History', path:{name:'history'}},
        { icon: 'account_box', text: 'Profile',path:{name:'profile'} },
      ],
      logOutItem : {icon: 'exit_to_app', text: 'Log Out'},
      registerDialog:false,
      loginDialog:false,
    }),
    components: {
      // 'profile' : Profile,
      'login' : Login,
      'register' : Register,
      // 'home-page' : HomePage,
    },
    computed:{
      ...mapGetters([
        'cart_amount','user','isLoggedIn'
      ])
    },
    mounted(){
      this.GET_USER();
      this.getCategories();
      this.GET_CART();
    },
    methods:{
      ...mapActions([
        'LOGOUT','GET_CART','GET_USER'
      ]),
      onLogOut(){
        this.LOGOUT()
      },
      onLoginRegisterClick(obj){
        console.log(obj['regis']);
        this.registerDialog = obj['regis'];
        this.loginDialog = obj['login'];
      },
      async getCategories(){
        try {
          let categories = await Api().get('/api/category')
          this.items[2].children = categories.data.map(category => {
            var newObj = {};
            newObj['name'] = category.Name;
            newObj['path'] = category.Name.toLowerCase();
            return newObj
          })
        } catch (error) {
          console.log('error : '+error);
        }
      } 
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a{
  color: #ef8a17 !important;
}
.material-icons.primary--text, #vuetify-theme-stylesheet{
  color: #ef8a17 !important;
}

</style>
