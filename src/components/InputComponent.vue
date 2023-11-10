<template>
  <q-input :label="label" :rules="rules" :mask="mask" />
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: String,
  rules: [Object, Array],
  mask: String,
});
</script>
