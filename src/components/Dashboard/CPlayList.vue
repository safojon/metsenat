<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: Array,
  number: Array,
  styles: Array,
});
</script>

<template>
  <div class="pl-[24px] flex items-center w-[381px] h-[96px] bg-[rgba(255,255,255,1)] rounded-[8px]">
    <div
      :class="styles"
      class="flex justify-center items-center icon-money text-[28px] w-[48px] h-[48px] rounded-[12px]">
    </div>
    <div class="ml-[16px]">
      <div class="text-[12px] font-normal text-[rgba(122,122,157,1)]">{{ text }}</div>
      <div>
        <vue3-autocounter class="font-bold	text-[20px] text-[rgba(46,56,77,1)]" ref='counter' :startAmount='0'
          :endAmount='number' :duration='3' prefix='' suffix='' separator=' '
          decimalSeparator='' :decimals='0' :autoinit='true' />
        <span class="text-[rgba(178,183,193,1)] font-bold text-[20px]"> UZS</span>
      </div>
    </div>
  </div>
</template>
