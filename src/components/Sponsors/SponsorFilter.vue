<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits();
const FilterStatus = ref(false);

const OpenFilter = () => {
  emit('FilterStatus', FilterStatus.value = !FilterStatus.value);
};
</script>

<template>
  {{ FilterStatus }}
  <div class="w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="w-[378px] h-[550px] bg-white rounded-[12px] flex flex-col p-[16px]">
      <div class="w-full bg-[rgba(255,255,255,1)] rounded-[12px]">
        <button @click="OpenFilter">x</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>