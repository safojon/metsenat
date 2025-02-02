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
    <div class="w-[586px] h-auto bg-white rounded-[12px] flex flex-col p-[28px] ">
      <div class="w-full flex items-center justify-between">
        <div class="text-[24px] font-bold text-[#28293D]">Filter</div>
        <div class=""><button @click="emit('ClouseFilter')" class="icon-cansol text-[20px] text-[#B2B7C1]"></button>
        </div>
      </div>
      <div class="mt-[28px] w-[530px] h-[1px] bg-[#F5F5F7]"></div>
      <div class="mt-[28px]">
        <div class="font-medium text-[12px] tracking-[1.13px]">TALABALIK TURI</div>
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
        <button @click="emit('Filter', 'Bakalavr')" class="h-[41px] border-b-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px]">Bakalavr</button>
        <button @click="emit('Filter', 'Magistr')" class="h-[41px] border-b-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px]">Magistr</button>
      </div>
      <div class="mt-[28px]">
        <div class="font-medium text-[12px] tracking-[1.13px]">OTM</div>
        <div class="mt-[8px] w-[530px] h-[42px]">
          <button :class="filter ? 'border-[rgba(46,91,255,1)]' : ''"
            class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
            {{ !props.filter ? 'Barchasi' : props.filter}}
          </button>
          <p :class="filter ? 'text-[rgba(46,91,255,1)] rotate-180' : ''"
          class="icon-angle-down text-[#B5B5C3] text-[10px] mt-[-25px] ml-[500px] absolute"></p>
        </div>
      </div>
      <div v-if="filter" class="absolute mt-[164px] rounded-[5px] flex flex-col w-[530px] bg-white border-[1px] z-10" @click="Filter">
        <button @click="emit('Filter', 'Bakalavr')" class="h-[41px] border-b-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px]">Bakalavr</button>
        <button @click="emit('Filter', 'Magistr')" class="h-[41px] border-b-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px]">Magistr</button>
      </div>
      <div class="mt-[28px] w-[530px] h-[1px] bg-[#F5F5F7]"></div>
      <div class="flex justify-end">
        <div class="flex gap-[16px]">
          <button class="w-[149px] h-[42px] border-[1px] border-[#3366FF] rounded-[5px] font-medium text-[14px] text-[#3366FF] flex justify-center items-center gap-[6px]"><span class="icon-broom text-[#3366FF] text-[19px]"></span> Tozalash</button>
          <button class="w-[209px] h-[42px] border-[1px] bg-[#3366FF] rounded-[5px] font-medium text-[14px] text-white flex justify-center items-center gap-[10px]"><span class="icon-ere-duo text-white text-[19px]"></span> Natijalarni ko‘rish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>