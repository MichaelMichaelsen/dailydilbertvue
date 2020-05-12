<template>
  <v-app>
    <v-content @keyup.enter="oneDayForward">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-date-picker
              type="date"
              v-model="date"
            ></v-date-picker>
           <v-row>
             <v-col>
               <v-btn @click="oneDayBack">Previous</v-btn>
             </v-col>
             <v-col>
               <v-btn @click="oneDayForward">Next</v-btn>
             </v-col>
           </v-row>
 
          </v-col>
          <v-col>
            <app-daily :imageid="imageid" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import daily from './components/Daily'
import axios from 'axios'
var moment = require('moment')

export default {
  name: 'App',

  components: {
    'app-daily' : daily
  },

  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    data: '',
    pickerDate: new Date().toISOString().substr(0, 10),  
    imageid: ''
  }),
  mounted() {
    this.fetch()
  },
  methods: {

    fetch() {
      let url = 'http://192.168.1.66:8080/strip/' + this.date
      axios.get(url)
        .then(response => {
          let result =  response.data.match(/assets.amuniversal.com\/(?<imageid>\w+)/)
          if (result) {
            this.imageid = result.groups.imageid
          } 
          console.log(this.imageid)
          this.data = response.data
        })
        .catch(error => console.log(error))
    },
    oneDayBack () {
      this.date = moment(this.date).subtract(1, 'days').format('YYYY-MM-DD')
    },
    oneDayForward () {
      this.date = moment(this.date).add(1, 'days').format('YYYY-MM-DD')
    }
  },
  watch: {
      date: function (val) {
        console.log(val)
        this.date = val
        this.fetch()
      },
  }
}
</script>