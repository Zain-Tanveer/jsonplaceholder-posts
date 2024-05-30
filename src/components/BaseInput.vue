<template>
  <div class="form-control">
    <slot name="label-left">
      <label :for="$attrs.id">{{ label }}</label>
    </slot>
    <slot name="input-field">
      <input
        v-if="focus"
        v-focus
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        class="input"
      />
      <input
        v-else
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        class="input"
      />
    </slot>
    <slot name="label-right"> </slot>
    <slot name="error">
      <div class="error">
        {{ error }}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: { type: String },
    value: { type: String },
    error: { type: String },
    focus: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.form-control {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-control label {
  font-weight: bold;
}

.checkbox {
  flex-direction: row;
}

.checkbox label {
  font-weight: 400;
}

.input {
  padding: 0.6rem 1.2rem;
}

.error {
  font-size: 0.875rem;
  color: #dc3545;
}
</style>
