<template>
  <div class="form-group" :class="hasChildren">
    <label :for="index">{{displayName}}</label>
    <!-- hostname -->
    <input
      v-if="typeof item === 'string' && item === 'hostname'"
      :id="index"
      v-model="toEmit"
      type="text"
      pattern="^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$"
      />

    <!-- (normal) text -->
    <input
      v-if="typeof item === 'string' && item === 'text'"
      :id="index"
      v-model="toEmit"
      type="text"
      />
    <!-- port -->
    <input
      v-if="typeof item === 'string' && item === 'port'"
      :id="index"
      type="number"
      min="0"
      v-model="toEmit"
      />
    <!-- boolean -->
    <input
      v-if="typeof item === 'string' && item === 'boolean'"
      :id="index"
      type="checkbox"
      v-model="toEmit"
      true-value="true"
      false-value="false"
      />

    <span
v-if="typeof item === 'object'"
      >
      <urlinput
        :id="idx"
        v-for="(it, idx) in item"
       :key="idx" :item="it"
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
    hasChildren() {
      return (typeof this.item === 'object') ? 'hasChildren' : '';
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
