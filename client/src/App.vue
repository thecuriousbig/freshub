<!--initial page -->
<template>
 <div id="app">
    <v-app>
      <main>
        <v-container fluid style="padding: 0 0;">
          <router-view/>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.input-group--text-field input{
  border-bottom: 1px solid #bfbfbf;
}
:host::v-text-area.primary--text input, .primary--text textarea{
  caret-color: #ef8a17 !important;
  color: #ef8a17 !important;
}
.input-group.input-group--required.input-group--text-field.primary--text,
.hidden-sm-and-down.input-group.input-group--prepend-icon.elevation-0.input-group--text-field.primary--text,
.input-group.input-group--append-icon.input-group--placeholder.input-group--text-field.primary--text,
.input-group.input-group--prepend-icon.input-group--text-field.primary--text,
.input-group.input-group--text-field.primary--text{
  color: #ef8a17 !important;
  caret-color: #ef8a17 !important;
}

</style>
