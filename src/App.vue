<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
// import "./style/night.css";

export default {
        data(){
          return {
            city:'',
            cities:[
            ],
            selectedCity:'',
            select:false,
            lon:'',
            lat:'',
            country:'',
            name:'',
            weather:'',
            temp:'',
            feels_like:'',
            wind:'',
            humidity:'',
            pressure:'',
            theme:""
          }
            
        },	 
        mounted(){
          this.theme=localStorage.getItem("theme")
          if(!this.theme){
            this.theme='day'
          }
          this.cities=JSON.parse(localStorage.getItem('cities'))
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
              console.log(pos.coords.latitude)
              console.log(pos.coords.longitude)
              axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=7914d5a440960cfd5df3bd0388a7ad0f&units=metric&lang=ua`).then(response =>{
                console.log(response.data);
                this.lon=response.data.coord.lon
                this.lat=response.data.coord.lat
                this.country=response.data.sys.country
                this.name=response.data.name
                this.weather=response.data.weather[0].description
                this.temp=response.data.main.temp
                this.feels_like=response.data.main.feels_like
                this.wind=response.data.wind.speed
                this.humidity=response.data.main.humidity
                this.pressure=response.data.main.pressure
                this.select=true
          })
            });
          } else {
            alert("Geolocation is not supported by this browser.");
          }
        },
        methods:{
          addCity(){
            console.log(this.city)
            this.cities.push({'city' : this.city})
            console.log(this.cities)
            localStorage.setItem('cities',JSON.stringify(this.cities) )
            this.city = ''

          },
          selectCity(){
            if(this.selectedCity){
              console.log(this.selectedCity)
              axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.selectedCity}&appid=7914d5a440960cfd5df3bd0388a7ad0f&units=metric&lang=ua`).then(response =>{
                console.log(response.data);
                this.lon=response.data.coord.lon
                this.lat=response.data.coord.lat
                this.country=response.data.sys.country
                this.name=response.data.name
                this.weather=response.data.weather[0].description
                this.temp=response.data.main.temp
                this.feels_like=response.data.main.feels_like
                this.wind=response.data.wind.speed
                this.humidity=response.data.main.humidity
                this.pressure=response.data.main.pressure
                this.select=true
            })
            } else{
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos)=>{
                  console.log(pos.coords.latitude)
                  console.log(pos.coords.longitude)
                  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=7914d5a440960cfd5df3bd0388a7ad0f&units=metric&lang=ua`).then(response =>{
                    console.log(response.data);
                    this.lon=response.data.coord.lon
                    this.lat=response.data.coord.lat
                    this.country=response.data.sys.country
                    this.name=response.data.name
                    this.weather=response.data.weather[0].description
                    this.temp=response.data.main.temp
                    this.feels_like=response.data.main.feels_like
                    this.wind=response.data.wind.speed
                    this.humidity=response.data.main.humidity
                    this.pressure=response.data.main.pressure
                    this.select=true
              })
                });
              } else {
                alert("Geolocation is not supported by this browser.");
              }
            }
          },
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
    <section :class="theme">
      <div class="addCity">
        <h1>ДОДАВАННЯ МІСТА</h1>
        <hr>
        <p>ВВЕДІТЬ НАЗВУ МІСТА:</p>
        <input type="text" v-model="city">
        <button @click="addCity">Додати</button>
      </div>
      <div class="selectCity">
        <h1>ВИБІР МІСТА</h1>
        <hr>
        <p>ОБЕРІТЬ МІСТО:</p>
        <select id="selectCity" v-model="selectedCity">
          <option value="">Моє місцезнаходження</option>
          <option v-for="c in cities" :key="c.city" :value="c.city">{{c.city}}</option>
        </select>
        <button @click="selectCity">Погода</button>
      </div>
    </section>
    <section :class="theme">
      <table v-if="this.select==true">
        <tr>
          <td>Координати</td>
          <td>[{{ lon }},{{ lat }}]</td>
        </tr>
        <tr>
          <td>Країна</td>
          <td>{{country}}</td>
        </tr>
        <tr>
          <td>Населений пункт</td>
          <td>{{name}}</td>
        </tr>
        <tr>
          <td>Погода</td>
          <td>{{weather}}</td>
        </tr>
        <tr>
          <td>Температура</td>
          <td>{{temp}} °C</td>
        </tr>
        <tr>
          <td>Відчуття</td>
          <td>{{feels_like}} °C</td>
        </tr>
        <tr>
          <td>Вітер</td>
          <td>{{wind}} м/с</td>
        </tr>
        <tr>
          <td>Вологість</td>
          <td>{{humidity}} %</td>
        </tr>
        <tr>
          <td>Тиск</td>
          <td>{{pressure}} мм рт. ст.</td>
        </tr>
      </table>
    </section>
  </article>
</template>

<style scoped>
/* @import "./style/day.css"; */
.changeTheme{
  margin: 0;
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
button{
  margin-left: 20px;
  margin-right: 20px;
  box-sizing: border-box;
  height: 30px;
  width: 100px;
}
table {
  width: 100%;
}
td{
  padding: 10px;
}
.main{
  height: 100%;
  width: 100%;
}
</style>
