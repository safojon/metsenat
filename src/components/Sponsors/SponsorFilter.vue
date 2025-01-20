<script setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({
  filter: Array,
});

const emit = defineEmits();

const filter = ref(false);

const Filter = () => {
  filter.value = !filter.value;
}
</script>

<template>
  <div class="w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="w-[586px] h-[568px] bg-white rounded-[12px] flex flex-col p-[28px] ">
      <div class="w-full flex items-center justify-between">
        <div class="text-[24px] font-bold text-[#28293D]">Filter</div>
        <div class=""><button @click="emit('ClouseFilter')" class="icon-cansol text-[20px] text-[#B2B7C1]"></button>
        </div>
      </div>
      <div class="mt-[28px] w-[530px] h-[1px] bg-[#F5F5F7]"></div>
      <div class="mt-[28px]">
        <div class="font-medium text-[12px] tracking-[1.13px]">ARIZA HOLATI</div>
        <div class="mt-[8px] w-[530px] h-[42px]">
          <button :class="filter ? 'border-[rgba(46,91,255,1)]' : ''" @click="Filter"
            class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
            {{ !props.filter ? 'Barchasi' : props.filter}}
          </button>
          <p :class="filter ? 'text-[rgba(46,91,255,1)] rotate-180' : ''"
          class="icon-angle-down text-[#B5B5C3] text-[10px] mt-[-25px] ml-[500px] absolute"></p>
        </div>
      </div>
      <div v-if="filter" class="absolute mt-[164px] rounded-[5px] flex flex-col w-[530px] bg-white border-[1px] z-10" @click="Filter">
        <button @click="emit('Filter', 'Barchasi')" class="h-[41px] border-b-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px]">Barchasi</button>
        <button @click="emit('Filter', 'Yangi')" class="h-[41px] border-b-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px]">Yangi</button>
        <button @click="emit('Filter', 'Moderatsiyada')" class="h-[41px] border-b-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px]">Moderatsiyada</button>
        <button @click="emit('Filter', 'Tasdiqlangan')" class="h-[41px] border-b-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px]">Tasdiqlangan</button>
        <button @click="emit('Filter', 'Bekor qilingan')" class="h-[41px] border-b-[1px] rounded-b-[5px] border-[rgba(224,231,255,1)] text-start pl-[16px]">Bekor
          qilingan</button>
      </div>
      <div class="mt-[28px]">
        <div class="font-medium text-[12px] text-[#1D1D1F] tracking-[1.13px]">HOMIYLIK SUMMASI</div>
        <div class="flex gap-[12px] mt-[12px]">
          <div><button class="w-[124px] h-[52px] bg-[#E0E7FF] rounded-[5px] text-[14px] font-medium">Barchasi</button>
          </div>
          <div><button
              class="w-[124px] h-[52px] bg-white border-[1px] border-[#E0E7FF] rounded-[5px] text-[14px] font-medium">1
              000 000 <span class="text-[12px] font-normal text-[#2E5BFF]">UZS</span></button></div>
          <div><button
              class="w-[124px] h-[52px] bg-white border-[1px] border-[#E0E7FF] rounded-[5px] text-[14px] font-medium">5
              000 000 <span class="text-[12px] font-normal text-[#2E5BFF]">UZS</span></button></div>
          <div><button
              class="w-[124px] h-[52px] bg-white border-[1px] border-[#E0E7FF] rounded-[5px] text-[14px] font-medium">7
              000 000 <span class="text-[12px] font-normal text-[#2E5BFF]">UZS</span></button></div>
        </div>
        <div class="flex gap-[12px] mt-[12px]">
          <div><button
              class="w-[124px] h-[52px] bg-white border-[1px] border-[#E0E7FF] rounded-[5px] text-[14px] font-medium">10
              000 000 <span class="text-[12px] font-normal text-[#2E5BFF]">UZS</span></button></div>
          <div><button
              class="w-[124px] h-[52px] bg-white border-[1px] border-[#E0E7FF] rounded-[5px] text-[14px] font-medium">30
              000 000 <span class="text-[12px] font-normal text-[#2E5BFF]">UZS</span></button></div>
          <div><button
              class="w-[124px] h-[52px] bg-white border-[1px] border-[#E0E7FF] rounded-[5px] text-[14px] font-medium">50
              000 000 <span class="text-[12px] font-normal text-[#2E5BFF]">UZS</span></button></div>
        </div>
        <div class="mt-[28px]">
          <div class="text-[12px] font-medium	">SANA</div>
          <div class="mt-[8px]">
            <input class="border-[1px] w-[253px] h-[42px] rounded-[6px] text-[#2E384D59] px-[16px] " type="date" name=""
              id="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>