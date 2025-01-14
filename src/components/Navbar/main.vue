<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits();
const InputValue = ref('');

const InputChange = () => {
  emit('InputValue', InputValue.value);
};
</script>

<template>
  <main class="w-full h-[64px] bg-[rgba(255,255,255,1)] flex justify-center items-center">
    <div class="w-[1200px] justify-between flex items-center">
      <div>
        <img src="../../../public/Logo.svg" alt="">
      </div>
      <div class="flex items-center gap-[43px]">
        <div class="w-[135px] h-[40px] bg-[rgba(241,241,243,1)] rounded-[6px]">
          <div class="flex justify-center text-center p-[4px] gap-[24px] cursor-pointer">
            <div class="text-[13px] font-bold ml-[20px]	mt-[6px]">
              Shohrux
            </div>
            <div
              class="pt-[8.1px] icon-user text-white rounded-[4px] w-[360px] h-[32px] text-[24px] bg-[rgba(0,174,105,1)]">
            </div>
          </div>
        </div>
        <div class="">
          <button class="text-[22px] icon-log-out text-[rgba(177,177,184,1)]"></button>
        </div>
      </div>
    </div>
  </main>
  <div class="w-full h-[88px] bg-[#ffffff] justify-center flex items-center">
    <div class="w-[1200px] justify-between flex items-center">
      <div class="flex rounded-[6px]">
        <RouterLink to="/" class="rounded-l-[6px] flex items-center justify-center w-[193px] h-[40px] text-[12px] font-medium text-[rgba(51,102,255,0.6)] border-[2px] border-[rgba(221,227,251,1)]" exact-active-class="bg-[rgba(51,102,255,1)] text-white border-0">
          DASHBOARD
        </RouterLink>
        <RouterLink to="/sponsor-list" class="flex items-center justify-center w-[193px] h-[40px] text-[12px] font-medium text-[rgba(51,102,255,0.6)] border-[2px] border-[rgba(221,227,251,1)]" exact-active-class="bg-[rgba(51,102,255,1)] text-white border-0">
          HOMIYLAR
        </RouterLink>
        <RouterLink to="/students" class="rounded-r-[6px] flex items-center justify-center w-[193px] h-[40px] text-[12px] font-medium text-[rgba(51,102,255,0.6)] border-[2px] border-[rgba(221,227,251,1)]" exact-active-class="bg-[rgba(51,102,255,1)] text-white border-0">
          TALABALAR
        </RouterLink>
      </div>
      <div class="flex gap-[20px]">
        <div class="w-[284px] h-[40px] relative flex">
          <p class="icon-search absolute text-[rgba(177,177,184,1)] text-[20px] left-[12px] top-[12px]"></p>
          <input class="rounded-[5px] pl-[40px] w-full h-full bg-[rgba(232,232,232,1)] text-[15px] font-normal	"
          v-model="InputValue" @input="InputChange"
          type="text" placeholder="Izlash">
        </div>
        <div>
          <button
            class="flex items-center justify-center gap-[10px] w-[123px] h-[40px] bg-[rgba(237,241,253,1)] rounded-[5px] text-[rgba(51,101,252,1)]">
            <p class="icon-filtr"></p>
            <p class="font-medium	text-[14px]">Filter</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>