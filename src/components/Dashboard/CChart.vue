<script setup>
import CApexChart from './CApexChart.vue';
</script>

<template>
  <main class="bg-white rounded-[8px]">
    <div class="">
      <div class="bg-rounded-lg mt-7">
        <div class="p-6">
          <h3 class="text-2xl font-bold text-gray-light">
            Homiylar va Talabalar soni
          </h3>
          <div class="flex items-center">
            <div class="flex items-center">
              <p class="w-[7px] h-[7px] rounded-full bg-[#36F]"></p>
              <p class="font-rubik text-gray-light-600 ms-2">Homiylar</p>
            </div>
            <div class="flex items-center ms-5">
              <p class="w-[7px] h-[7px] rounded-full bg-[#F591B3]"></p>
              <p class="font-rubik text-gray-light-600 ms-2">Talabalar</p>
            </div>
          </div>
          <CApexChart></CApexChart>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>