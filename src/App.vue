<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
// import "./style/night.css";

export default {
        data(){
          return {
            theme:""
          }
        },	 
        mounted(){
          this.theme=localStorage.getItem("theme")
          if(!this.theme){
            this.theme='day'
          }
        },
        methods:{
          changeTheme(){
            if(this.theme=="day"){
              this.theme='night'
              localStorage.setItem('theme',this.theme);
            }else if(this.theme=="night"){
              this.theme='day'
              localStorage.setItem('theme',this.theme);
            }
            
          }
        }
      }

</script>

<template>
  <article :class="theme">
    <button @click="changeTheme" class="changeTheme">Змінити тему</button>
    <div class="content">
        <router-view></router-view>
    </div>
  </article>
</template>

<style>
/* @import "./style/day.css"; */
button{
  margin: 0;
  box-sizing: border-box;
  height: 30px;
  width: 100px;
}
.day section{
  background-color:rgba(220, 220, 220, 0.4);
}
article.day {
  background-color: #FDF5E6;
}
.night h1, .night p, .night button, .night table{
  color: ivory;
  background-color: #91787e;
}
.night section{
  background-color:#91787e;
}
article.night{
  background-color: #ae9299;
}
article{
  height: 100%;
  width: 100%;
  overflow:auto;
  position: fixed;
  height: 100%;
  margin: 0px;
}
section{
  display: flex;
  flex-direction: row;
  min-width: max-content;
  width: 60%;
  margin-left:auto;
  margin-right: auto;
  margin-top: 100px;
  padding: 30px;
  
  border-radius: 30px;
}
.addCity,.selectCity{
  margin-left:auto;
  margin-right: auto;
}
hr{
  width: 100px;
  height: 2px;
  border-radius: 5px;
  background:aquamarine;
  margin-left:0px ; 
}
input, select{
  box-sizing: border-box;
  width: 300px;
  height: 30px;
}

table {
  width: 100%;
}
td{
  padding: 10px;
}
</style>
