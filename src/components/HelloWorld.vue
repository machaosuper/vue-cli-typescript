<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <div class="flex">
      <div class="col">{{ info.data }}</div>
      <div class="col">{{ testMixinArg }}</div>
      <RC></RC>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Getter } from 'vuex-class'
  import TestMixin from '../mixins/test-mixin'
  import RC from './renderComponent.vue'


  @Component({
    components: { RC },
    mixins: [TestMixin],
  })
  export default class HelloWorld extends Vue {
    msg: string = 'Welcome to Your Vue.js App HOT'

    private $http

    @Getter info

    created () {
      // console.log(this)
      // this.$http.get('api/imgList', {pageSize: 10, pageNo: 5}).then(res => {
      //   console.log(res);
      this.$http.post('/linktownFront/user/login.do', {userName:15214380665, pwd: 'e10adc3949ba59abbe56e057f20f883e', deviceOS:4, deviceType:0}).then(res => {
        console.log(res);
      })
      // this.$http.post('lincombFront/sos/queryOrderList4Lbn.do', {
      //   businessId: 'BD2017011916590800004527', 
      //   status: '',
      //   startTime: '',
      //   endTime: '',
      //   pageNo:0,
      //   serNum: '20160000000000',
      //   source: 'app',
      //   clientType: 'H5',
      //   reqTime: '20160106000000',
      //   sign: '4d84d86f1c0ca4bbd6489bd0878d549d'
      // }).then(res => {
      //   console.log(res);
      // })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.flex{
  display: flex;
  justify-content: space-around;
  .col{
    color: red;
  }
}
h1, h2 {
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
a {
  color: #42b983;
}
</style>
