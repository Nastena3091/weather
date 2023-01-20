<template>
    <router-link :to="'/'"><button>Назад</button></router-link>
  <section :class="theme">
      <table >
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
</template>

<script>
import axios from 'axios'

export default {
    props: {
           city: '',
       },
    data(){
          return {
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
          }
            
        },
    mounted(){
            if(this.city!='coord'){
              console.log(this.city)
              axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=7914d5a440960cfd5df3bd0388a7ad0f&units=metric&lang=ua`).then(response =>{
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
              })
                });
              } else {
                alert("Geolocation is not supported by this browser.");
              }
            
          }
    }
}
</script>

<style>

</style>