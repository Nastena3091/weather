<template>
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
          <option value="coord">Моє місцезнаходження</option>
          <option v-for="c in cities" :key="c.city" :value="c.city">{{c.city}}</option>
        </select>
        <router-link :to="'/weather-info/'+selectedCity"><button>Погода</button></router-link>
      </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    data(){
          return {
            city:'',
            cities:[
            ],
            selectedCity:'',
          }
            
        },
    mounted(){
        this.cities=JSON.parse(localStorage.getItem('cities'))
        //   if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((pos)=>{
        //       console.log(pos.coords.latitude)
        //       console.log(pos.coords.longitude)
        //       axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=7914d5a440960cfd5df3bd0388a7ad0f&units=metric&lang=ua`).then(response =>{
        //         console.log(response.data);
        //         this.lon=response.data.coord.lon
        //         this.lat=response.data.coord.lat
        //         this.country=response.data.sys.country
        //         this.name=response.data.name
        //         this.weather=response.data.weather[0].description
        //         this.temp=response.data.main.temp
        //         this.feels_like=response.data.main.feels_like
        //         this.wind=response.data.wind.speed
        //         this.humidity=response.data.main.humidity
        //         this.pressure=response.data.main.pressure
        //         this.select=true
        //   })
        //     });
        //   } else {
        //     alert("Geolocation is not supported by this browser.");
        //   }
    },
    methods:{
          addCity(){
            console.log(this.city)
            this.cities.push({'city' : this.city})
            console.log(this.cities)
            localStorage.setItem('cities',JSON.stringify(this.cities) )
            this.city = ''

          },
          
        }
}
</script>

<style scoped>
button{
  margin-left: 20px;
  margin-right: 20px;
}
</style>