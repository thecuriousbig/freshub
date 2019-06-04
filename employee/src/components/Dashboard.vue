<template>
  <v-app>
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="(item,i) in sidebarItems">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
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
            <v-list-tile slot="activator" :to="item.path">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.path"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else  :key="item.text" :to="item.path">
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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
      color="white"
    >
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <img class="hidden-sm-and-down" src="@/assets/logo.svg" style="width: 5%; vertical-align: baseline;">
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <!-- <v-btn>
          name
          <v-icon>account_circle</v-icon>  
        </v-btn>
        <v-btn @click="logout()">
          <v-icon>{{ logoutBtn.icon }}</v-icon>
          {{ logoutBtn.text }}
        </v-btn> -->
        <v-menu
          transition="slide-y-transition"
          bottom
          right
          offset-y absolute
        >
        <v-btn flat slot="activator" color="primary" >
          <p>Wellcome back !, {{staff.FirstName}}</p><v-icon>account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item,i) in items" :key="i" @click="logout()">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <!-- content of application -->
      <router-view @clicked="onChildClick"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {
  },
  data: () => ({
    router:{name:''},
    // staff : {
    //   staffID: '0001',
    //   staffName: 'Manju'
    // },
    drawer: null,
    items: [
        { title: 'Log out',action: 'logout()' },
      ],
    sidebarItems : [
      { icon: 'assignment', text: 'Work Order',path:{name:'work-order'}},
      { icon: 'shopping_cart', text: 'Purchase Order',path:{name:'purchase-order'}},
      { icon: 'local_shipping', text: 'Material Order',path:{name:'material-order'}},
      { 
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Storage',
        model: false,
        children: [
          { text: 'Material',path:{name:'material-storage'}},
          { text: 'Product' , path:{name:'product-storage'}}
        ]
      },
      { icon: 'file_download', text: 'Import',path:{name:'import'}},
      { icon: 'file_upload', text: 'Export',path:{name:'export'}},
      { icon: 'account_box', text: 'Staff List',path:{name:'staff-list'}},
      { icon: 'bar_chart', text: 'Analysis',path:{name:'analysis'}}
    ],
    logoutBtn: { icon: 'exit_to_app', text: 'Log Out',path:{name:'login'}}
  }),
  computed:{
    ...mapGetters([
      'staff'
    ])
  },
  created(){
    this.GET_STAFF()
  },
  methods: {
    ...mapActions([
      'GET_STAFF','LOGOUT_STAFF'
    ]),
    logout() {
      this.LOGOUT_STAFF()
      this.$router.push({name:'login'})
    },
    onChildClick(value) {
      console.log(value)
      this.$router.push(value)
    }
  },
}
</script>

<style scoped>
p {
    font-size: 18px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    margin: 0px;
    color: #606060;
}
</style>
