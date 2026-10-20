<template>
  <div>{{ config }}</div>
</template>

<script setup lang="ts">
import { getAppConfig } from "./utils/config-util";

const config = getAppConfig();
</script>

<style scoped></style>
