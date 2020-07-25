<template>
  <div>
    <p>{{driver.name}} - {{driver.description}}</p>
    <form>
      <urlinput v-for="(item, index) in driver.segments" :key="index" :item="item"
        :index="index" @handle-data="handleData"/>
    </form>
  </div>
</template>

<script>
import urlinput from './urlinput';

export default {
  data() {
    return {
      segments: {

      },
      url: '',
    };
  },
  watch: {
    url(newValue) {
      this.$emit('updateurl', newValue);
    },
  },
  props: ['driver'],
  methods: {
    handleData(index, data) {
      this.segments[index] = data;
      this.url = this.driver.urlbuilder(this.segments);
    },
  },
  components: { urlinput },
};
</script>

<style>

form {
    display: flex;
    flex-direction: column;
}

.form-group {
    display: flex;
    flex-direction: row;
    margin: 0.5em 0;
}

.form-group label {
    flex-basis: 30%;
}
.form-group input {
    flex-basis: 70%;
    margin-right: 8px;
    background-color: #30475e;
    color: #ececec;
    border: none;
    padding: 8px;
}
.form-group input:invalid {
    background-color: #f2a365;
}
.form-group input[type="checkbox"] {
    flex-basis: 10%;
}

</style>
