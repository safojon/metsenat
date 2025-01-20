<script setup>
import api from '../../api/api';
import { defineEmits, defineProps, ref } from 'vue';
const emit = defineEmits();

const props = defineProps({
  data: Array,
});

const id = ref(props.data.id);
const name = ref(props.data.full_name);
const number = ref(props.data.phone);
const sum = ref(props.data.sum);
const Result = ref('');

const Save = async () => {
  if (id.value && name.value && number.value) {
    try {
      const data = {
        full_name: name.value,
        phone: number.value,
        sum: sum.value,
        is_legal: false,
        firm: "",
        comment: "",
      };
      const response = await api.put(`/sponsor-update/${id.value}/`, data);
      Result.value = response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<template>
  <div class="w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="w-[586px] h-[742px] bg-white rounded-[12px] flex flex-col p-[28px] ">
      {{ Result }}
      <div class="flex justify-between items-center">
        <div class="text-[24px] font-bold text-[rgba(40,41,61,1)]">Tahrirlash</div>
        <div><button @click="emit('ClouseEdit')" class="icon-cansol text-[25px] text-[rgba(178,183,193,1)]"></button>
        </div>
      </div>
      <div class="w-[530px] h-[2px] bg-[rgba(245,245,247,1)] mt-[25px]"></div>
      <div class="flex mt-[28px]">
        <button
          class="w-[50%] h-[40px] bg-[rgba(51,102,255,1)] font-medium text-white text-[12px] tracking-[1.13px] rounded-l-[6px]">JISMONIY
          SHAXS</button>
        <button
          class="w-[50%] h-[40px] font-medium text-[rgba(51,102,255,0.6)] text-[12px] tracking-[1.13px] rounded-r-[6px] border-[2px] border-[rgba(224,231,255,1)]">YURIDIK
          AHAXS</button>
      </div>
      <div class="mt-[32px]">
        <div class="font-medium text-[12px] tracking-[1.13px]">F.I.SH. (FAMILIYA ISM SHARIFINGIZ)</div>
        <div class="mt-[8px] w-[530px] h-[42px]">
          <input v-model="name" :class="!name ? 'border-red-600' : ''"
            class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
          </input>
        </div>
      </div>
      <div class="mt-[28px]">
        <div class="font-medium text-[12px] tracking-[1.13px]">TELEFON RAQAM</div>
        <div class="mt-[8px] w-[530px] h-[42px]">
          <input v-model="number" :class="!number ? 'border-red-600' : ''"
            class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
          </input>
        </div>
      </div>
      <div class="mt-[28px]">
        <div class="font-medium text-[12px] tracking-[1.13px]">HOLATI</div>
        <div class="mt-[8px] w-[530px] h-[42px]">
          <button :class="filter ? 'border-[rgba(46,91,255,1)]' : ''" @click="Filter"
            class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
            Tasdiqlangan
          </button>
          <p :class="filter ? 'text-[rgba(46,91,255,1)] rotate-180' : ''"
            class="icon-angle-down text-[#B5B5C3] text-[10px] mt-[-25px] ml-[500px] absolute"></p>
        </div>
      </div>
      <div class="mt-[32px]">
        <div class="font-medium text-[12px] tracking-[1.13px]">HOMIYLIK SUMMASI</div>
        <div class="mt-[8px] w-[530px] h-[42px]">
          <input v-model="sum" :class="!sum ? 'border-red-600' : ''"
            class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
          </input>
        </div>
      </div>
      <div class="mt-[28px]">
        <div class="font-medium text-[12px] tracking-[1.13px]">TO‘LOV TURI</div>
        <div class="mt-[8px] w-[530px] h-[42px]">
          <button :class="filter ? 'border-[rgba(46,91,255,1)]' : ''" @click="Filter"
            class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
            Pul o‘tkazmalari
          </button>
          <p :class="filter ? 'text-[rgba(46,91,255,1)] rotate-180' : ''"
            class="icon-angle-down text-[#B5B5C3] text-[10px] mt-[-25px] ml-[500px] absolute"></p>
        </div>
      </div>
      <div class="flex justify-end mt-[28px]">
        <div><button @click="Save"
            class="w-[150px] h-[42px] bg-[rgba(51,102,255,1)] rounded-[5px] text-white font-medium text-[14px]"><span
              class="icon-save pr-[10px]"></span> Saqlash</button></div>
      </div>
    </div>
  </div>
</template>