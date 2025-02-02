<script setup>
import api from '../../api/api';
import { defineEmits, defineProps, ref, onMounted } from 'vue';
const emit = defineEmits()

const props = defineProps({
  data: Array,
});

const openSponsor = ref(false);
const sponsor = ref('');
const summa = ref('');
const Sponsors = ref({});;
const Result = ref({});

const Add = async () => {
  if (sponsor.value && summa.value) {
    emit('ClouseEdit');
    try {
      const data = {
        sponsor: sponsor.value.id,
        summa: summa.value,
        student: props.data.id,
      };
      const response = await api.post(`/sponsor-summa-create/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Result.value = response.data;
    } catch (error) {
      console.log(error)
    }
  }
};

// const OpenSponsor = async (id) => {
//   openSponsor.value = !openSponsor.value;
//   try {
//     const response = await api.get(`/student-sponsor/${props.data.id}/`)
//     Sponsors.value = response.data.sponsors;
//   } catch (error) {
//     console.log(error)
//   }
// };

const OpenSponsor = () => {
  openSponsor.value = !openSponsor.value;
};

const thisSponsor = (data) => {
  sponsor.value = data;
  openSponsor.value = false;
};

const sponsors = async () => {
  try {
    const data = await api.get(`/sponsor-list/`)
    const count = data.data.count;
    const response = await api.get(`/sponsor-list?page_size=${count}`);
    Sponsors.value = response.data.results;
  } catch (error) {
    console.log(error)
  }
};

onMounted(() => {
  sponsors()
})
</script>

<template>
  <div class="w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="w-[586px] h-auto bg-white rounded-[12px] flex flex-col p-[28px]">
      <div class="flex items-center justify-between">
        <div class="font-bold text-[24px] text-[rgba(40,41,61,1)]">Homiy qo‘shish</div>
        <div class=" text-[rgba(178,183,193,1)] text-[20px]"><button @click="emit('ClouseEdit')" class="icon-cansol"></button>
        </div>
      </div>
      <div class="w-[530px] h-[2px] bg-[rgba(245,245,247,1)] mt-[28px]"></div>
      <div class="mt-[28px]">
        <div class="font-medium text-[12px] tracking-[1.13px]">F.I.SH. (FAMILIYA ISM SHARIFINGIZ)</div>
        <div class="mt-[8px] w-[530px] h-[42px]">
          <button @click="OpenSponsor"
            class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
            {{ sponsor ? sponsor.full_name : 'Homiyni tanlang'}}
          </button>
          <p :class="openSponsor ? 'rotate-180' : ''"
            class="icon-angle-down text-[#B5B5C3] text-[10px] mt-[-25px] ml-[500px] absolute"></p>
        </div>
        <div v-if="openSponsor" class="absolute mt-[10px] rounded-[5px] flex flex-col w-[530px] bg-white border-[1px] z-10 overflow-hidden">
          <div class="max-h-[205px] overflow-y-auto flex flex-col">
            <button v-for="sponsor in Sponsors" :key="sponsor.id" @click="thisSponsor(sponsor)" class="h-auto p-[5px] border-t-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px] hover:bg-gray-100 transition">
             {{ sponsor.full_name }}
            </button> 
          </div>
        </div>
        <div class="mt-[32px]">
          <div class="font-medium text-[12px] tracking-[1.13px]">AJRATILINGAN SUMMA</div>
          <div class="mt-[8px] w-[530px] h-[42px]">
            <input v-model="summa" placeholder="Summani kiriting"
              class="w-[530px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
            </input>
          </div>
        </div>
        <div class="w-[530px] h-[2px] bg-[rgba(245,245,247,1)] mt-[25px]"></div>
        <div class="flex justify-end mt-[28px]">
          <div>
            <button @click="Add"
              class="w-[150px] h-[42px] bg-[rgba(51,102,255,1)] rounded-[5px] text-white font-medium text-[14px] flex items-center justify-center"><span
                class="icon-plus text-[20px] pr-[10px]"></span> Qo'shish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>