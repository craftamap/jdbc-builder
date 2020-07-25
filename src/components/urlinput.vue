<template>
  <div class="form-group" >
    <label :for="index">{{displayName}}</label>
    <input :id="index" v-if="typeof item === 'string' && item === 'hostname'"
      type="text" v-model="toEmit"/>
    <input :id="index" v-if="typeof item === 'string' && item === 'text'"
      type="text" v-model="toEmit"/>
    <input :id="index" v-if="typeof item === 'string' && item === 'port'"
      type="number" min="0" v-model="toEmit"/>
    <input :id="index" v-if="typeof item === 'string' && item === 'boolean'"
      type="checkbox" v-model="toEmit"/>
    <span v-for="(it, idx) in item" :key="idx">
      <urlinput :id="idx" v-if="typeof item === 'object'" :item="it"
      :index="index+'--'+idx" @handle-data="handleData"/>
    </span>
  </div>
</template>

<script>
export default {
  name: 'urlinput',
  props: ['item', 'index'],
  data: () => ({
    toEmit: '',
  }),
  computed: {
    displayName() {
      return this.index.split('--')[this.index.split('--').length - 1];
    },
  },
  watch: {
    toEmit() {
      this.$emit('handle-data', this.displayName, this.toEmit);
    },
  },
  methods: {
    handleData(index, data) {
      if (this.toEmit === '') this.toEmit = {};
      this.toEmit[index] = data;
      this.$emit('handle-data', this.displayName, this.toEmit);
    },
  },
};

</script>
