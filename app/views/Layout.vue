<template>
  <div class="layout">
    <header>
      <div class="logo"><a>logo</a></div>
      <div class="nav">
        <ul>
          <li><a>nav list</a></li>
        </ul>
      </div>
    </header>
    <aside>
      <div class="sidebar">
        <ul>
          <li v-for="route in routes" :key="route.path">
            <router-link :to="route.path" :class="key===route.path?'active':''">{{route.name}}</router-link>
          </li>
        </ul>
      </div>
    </aside>
    <main>
      <div class="container">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import {constantRoutes} from '../router';
export default {
  name: 'Layout',
  data() {
    return {
      routes: constantRoutes[0].children,
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  methods:{},
};
</script>

<style scoped>
  .layout{
    position: relative;
    min-height:100vh;
  }
  header{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:60px;
    line-height:60px;
    display:flex;
    background:#eee;
  }
  .logo{
    width:220px;
    padding:0 12px;
  }
  .nav{
    flex:auto;
    padding:0 12px;
  }
  aside{
    position:fixed;
    left:0;
    top:60px;
    bottom:0;
    width:220px;
    background:#ccc;
  }
  main{
    position:absolute;
    left:220px;
    top:60px;
    padding:10px 12px;
    background:#f5f5f5;
    width:calc(100% - 220px);
    height: calc(100% - 60px);
  }
  .container{
    background:#fff;
  }
  ul{list-style:none;padding:0;margin:0;}
  a:active,a:hover,a.active{color: #c30;}
  a{
    display:block;
    color: #444;
    padding:0 12px;
    text-decoration:none;
    cursor: pointer;
  }
  .sidebar li{
    height:42px;
    line-height:42px;
  }
</style>

