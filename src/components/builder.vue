
<template>
  <div>
    <div class="jdbc-url">
      <span v-if="jdbc">
        {{jdbc}}
      </span>
      <span v-else>
        Select your driver and start typing...
      </span>
    </div>
    <select class="driver" v-model="driver">
      <option disabled selected>select your driver here...</option>
      <option v-for="dr in Object.entries(drivers)" v-bind:key="dr[0]" v-bind:value="dr[1]">
        {{dr[1].description}}
      </option>
    </select>
    <urlform :driver="driver" @updateurl="updateUrl"/>
  </div>
</template>


<script>
import urlform from './urlform';
import postgres from '../drivers/postgres';
import sqlserver from '../drivers/sqlserver';

export default {

  data: () => ({
    jdbc: '',
    driver: {},
    drivers: {
      postgres,
      sqlserver,
    },
  }),
  components: {
    urlform,
  },
  methods: {
    updateUrl(newValue) {
      this.jdbc = newValue;
    },
  },
};

</script>

<style>
.jdbc-url {
  font-family: monospace !important;
  background: #30475e;
  padding: 1em;
}

select.driver {
  margin: 1em 0;
  padding: 1em;
  background: #30475e;
  border: none;
  width: 100%;
  color: white;
}
</style>
