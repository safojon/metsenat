<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: Array,
});

function format(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
</script>

<template>
  <div class="w-[1200px] h-[68px] hover:bg-[#eeeeee] bg-white rounded-[8px] flex justify-start items-center">
    <div class="w-[50px] px-3 py-2 text-left text-[rgba(29,29,31,1)] font-medium text-[15px] leading-[21px">{{ data.id }}</div>
    <div class="w-[290px] px-3 py-2 text-left text-[#292d32] font-medium text-[15px] leading-[21px]">{{ data.full_name }}</div>
    <div class="w-[180px] px-3 py-2 text-left text-[#292d32] font-medium text-[14px] leading-[21px]">{{ data.phone}}</div>
    <div class="w-[170px] px-3 py-2 text-left text-[#292d32] font-medium text-[14px] leading-[21px]">{{ format(data.sum) }} <span class="text-[rgba(178,183,193,1)] font-medium text-[14px]"> UZS</span></div>
    <div class="w-[170px] px-3 py-2 text-left text-[#292d32] font-medium text-[14px] leading-[21px]">{{ format(data.spent) }} <span class="text-[rgba(178,183,193,1)] font-medium text-[14px]"> UZS</span></div>
    <div class="w-[100px] px-3 py-2 text-left text-[#292d32] font-medium text-[14px] leading-[21px]">{{ data.created_at.split("T")[0] }}</div>
    <div :class="data.get_status_display == 'Moderatsiyada' ? 'text-[rgba(255,164,69,1)]' : data.get_status_display == 'Tasdiqlangan' ? 'text-[rgba(0,207,131,1)]' : data.get_status_display == 'Yangi' ? 'text-[rgba(91,171,242,1)]' : 'text-[rgba(151,151,151,1)]'" class="ml-[10px] w-[150px] px-3 py-2 text-left font-medium text-sm leading-[21px]">{{ data.get_status_display }}</div>
    <div class="">
      <button>
        <img class="ml-[15px]" src="../../../public/eye.svg" alt="">
      </button>
    </div>
  </div>
</template>

<style scoped></style>