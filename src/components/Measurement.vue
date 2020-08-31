<template>
  <div class="measurement">
    <h3>Measurements</h3>
    <button type="button" class="btn btn-secondary btn-sm" @click="convertUOM">Convert UOM</button>
    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Value</th>
          <th>UOM</th>
          <th>Enabled</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(measurement, index) in measurements" v-bind:key="measurement.id">
          <td>{{ measurement.id }}</td>
          <td>{{ measurement.value }}</td>
          <td>{{ measurement.uom }}</td>
          <td>
            <!-- NOTE: Using v-model here was causing a delay between handler being called and data actually updated -->
            <input type="checkbox" id="checkbox" :checked="measurement.enabled" @click="updateRcdEnabled(index, $event)">
          </td>
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
        measurements: [],
        UOMcurrent: 'ft2',
        UOMconversion: 10.764
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
      },
      convertUOM() {
        if (this.UOMcurrent == 'ft2') {
          this.UOMcurrent = 'm2';
          this.UOMconversion = 0.093;
        }
        else {
          this.UOMcurrent = 'ft2';
          this.UOMconversion = 10.764;
        }
        for (const measurement of this.measurements) {
          measurement.value = measurement.value * this.UOMconversion;
          if (this.UOMcurrent == 'ft2') {
            measurement.value = Math.round(measurement.value);
          }
          measurement.uom = this.UOMcurrent;
        }
      },
      updateRcdEnabled(index, event) {
        if (event.target.checked) {
          this.measurements[index].enabled = true;
        }
        else {
          this.measurements[index].enabled = false;
        }
        //console.log('id: ' + this.measurements[index].id + ', enabled:' + this.measurements[index].enabled)
        // Call API to update 'measurement.enabled' on server
      }
    },
    created() {
      this.getMeasurements();
    }
  }
</script>

<style scoped>
  table {
    margin-top: 1em;
  }

</style>