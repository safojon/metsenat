<script setup>
import api from '../../api/api';
import { defineEmits, defineProps, ref, onMounted } from 'vue';
const emit = defineEmits();

const props = defineProps({
  data: Array,
});

const id = ref(props.data.id);
const name = ref(props.data.full_name);
const number = ref(props.data.phone);
const type = ref(props.data.type);
const institute = ref(props.data.institute);
const contract = ref(props.data.contract);
const Result = ref('');
const Institutes = ref('');
const openInstitutes = ref(false);


const Save = async () => {
  if (id.value && name.value && number.value) {
    emit('ClouseEdit');
    try {
      const data = {
        full_name: name.value,
        type: type.value,
        phone: number.value,
        institute: institute.value.id,
        contract: contract.value
      };
      const response = await api.put(`/student-update/${id.value}/`, data);
      Result.value = response.data;
    } catch (error) {
      console.error(error);
    }
  }
};


const Institute = async (id) => {
  openInstitutes.value = false;
  try {
    const response = await api.get('institute-list')
    Institutes.value = response.data;
  } catch (error) {
    console.log(error)
  }
};

const thisInstitute = async (id) => {
  institute.value = id;
  openInstitutes.value = false;
};

const OpenInstitute = () => {
  openInstitutes.value = !openInstitutes.value;
}

onMounted(() => {
  Institute()
})
</script>

<template>
  <div class="w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="w-[586px] h-auto bg-white rounded-[12px] flex flex-col p-[28px]">
      <div class="flex justify-between items-center">
        <div class="text-[24px] font-bold text-[rgba(40,41,61,1)]">Tahrirlash</div>
        <div><button @click="emit('ClouseEdit')" class="icon-cansol text-[25px] text-[rgba(178,183,193,1)]"></button>
        </div>
      </div>
      <div class="w-[530px] h-[2px] bg-[rgba(245,245,247,1)] mt-[25px]"></div>
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
        <div class="font-medium text-[12px] tracking-[1.13px]">OTM</div>
        <div class="mt-[8px] w-[530px] h-[42px]">
          <button :class="filter ? 'border-[rgba(46,91,255,1)]' : '' "  @click="OpenInstitute"
            class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
            {{ institute.name }}
          </button>
          <p :class="openInstitutes ? 'rotate-180' : ''"
            class="icon-angle-down text-[#B5B5C3] text-[10px] mt-[-25px] ml-[500px] absolute"></p>
        </div>
        <div v-if="openInstitutes" class="absolute mt-[10px] rounded-[5px] flex flex-col w-[530px] bg-white border-[1px] z-10 overflow-hidden">
          <div class="max-h-[205px] overflow-y-auto flex flex-col">
            <button v-for="institute in Institutes" :key="institute.id" @click="thisInstitute(institute)" class="h-auto p-[5px] border-t-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px] hover:bg-gray-100 transition">
              {{ institute.name }}
            </button>
          </div>
        </div>
      </div>
      <div class="mt-[32px]">
        <div class="font-medium text-[12px] tracking-[1.13px]">KONTRAKT MIQDORI</div>
        <div class="mt-[8px] w-[530px] h-[42px]">
          <input v-model="contract" :class="!contract ? 'border-red-600' : ''"
            class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
          </input>
        </div>
      </div>
      <div class="flex justify-end mt-[28px]">
        <div>
          <button @click="Save"
            class="w-[150px] h-[42px] bg-[rgba(51,102,255,1)] rounded-[5px] text-white font-medium text-[14px]"><span
              class="icon-save pr-[10px]"></span> Saqlash</button>
        </div>
      </div>
    </div>
  </div>
</template>