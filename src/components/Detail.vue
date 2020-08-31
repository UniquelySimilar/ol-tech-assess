<template>
  <div class="detail">
    <h3>Detail for Record ID {{ id }}</h3>
    <router-link class="btn btn-secondary btn-sm" :to="{ name: 'measurement' }">Back</router-link>
  </div>  
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        measurement: {}
      }
    },
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    methods: {
      getDetail() {
        // NOTE: This API url NOT implemented so will throw an error
        let url = 'http://localhost:8008/olrestapi/api/measurements/' + this.id;
        axios.get(url)
        .then(response => {
          this.measurement = response.data;
        })
        .catch(error => console.log(error))
      },
    },
    created() {
      // Retrieve detail record from server API
      this.getDetail();
    }
  }
</script>

<style scoped>

</style>