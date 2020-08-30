<template>
  <div class="measurement">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Value</th>
          <th>UOM</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="measurement in measurements" v-bind:key="measurement.id">
          <td>{{ measurement.id }}</td>
          <td>{{ measurement.value }}</td>
          <td>{{ measurement.uom }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        measurements: []
      }
    },
    methods: {
      getMeasurements() {
        let url = 'http://localhost:8008/olrestapi/api/measurements';
        axios.get(url)
        .then(response => {
          this.measurements = response.data;
        })
        .catch(error => console.log(error))
      }
    },
    created() {
      this.getMeasurements();
    }
  }
</script>

<style scoped>

</style>