<script setup>
import Navbar from '../components/Navbar/main.vue';
import SponsorEdit from '../components/Sponsors/SponsorEdit.vue';
import api from '../api/api';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

let Result = ref({});
const route = useRoute();
const id = ref(route.params.id);
const sponserEditStatus = ref(false);

const Get = async () => {
  try {
    const count = await api.get('sponsor-list/');
    const response = await api.get('sponsor-list/', {
      params: {
        page_size: count.data.count,
      }
    });
    const data = response.data.results;
    const filter = data.filter((row) =>
      row.id.toString() === id.value.toString()
    );
    Result.value = filter[0];
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  Get()
})

function Format(number) {
  return Number(number).toLocaleString('en-US').replace(/,/g, " ");
}

const SponserEditStatus = () => {
  sponserEditStatus.value = !sponserEditStatus.value;
}
</script>

<template>
  <Navbar type="top" />
  <main class="w-full h-[88px] bg-[#fdfdfd] flex justify-center items-center">
    <div class="w-[1200px] h-full flex items-center">
      <RouterLink to="/sponsor-list">
        <div class="icon-arrow-left text-[20px]"></div>
      </RouterLink>
      <div v-if="Result.full_name" class="ml-[16px] font-bold text-[24px] text-[rgba(40,41,61,1)]">{{ Result.full_name }}</div>
        <div :class="Result.get_status_display == 'Moderatsiyada' ? 'text-[rgba(255,164,69,1)]' : Result.get_status_display == 'Tasdiqlangan' ? 'text-[rgba(0,207,131,1)]' : Result.get_status_display == 'Yangi' ? 'text-[rgba(91,171,242,1)]' : 'text-[rgba(151,151,151,1)]'" class="rounded-[5px] ml-[10px] w-[150px] px-3 py-2 text-left font-medium text-[12px] leading-[21px]">{{ Result.get_status_display }}</div>
    </div>
  </main>
  <div class="w-full h-full bg-[rgba(245,245,247,1)] flex justify-center items-center">
    <div class="w-[1200px] h-[2000px] flex flex-col items-center  mt-[40px]">
      <div class="w-[793px] h-[259px] bg-[rgba(255,255,255,1)] rounded-[12px] p-[32px]">
        <div class="flex items-center justify-between">
          <div class="font-bold text-[rgba(40,41,61,1)] text-[24px]">Homiy haqida</div>
          <div class=""><button
              @click="SponserEditStatus"
              class="w-[166px] h-[42px] rounded-[5px] font-medium	 bg-[rgba(237,241,253,1)] text-[rgba(51,101,252,1)] text-[14px] flex items-center justify-center"><span
                class="icon-edit mr-[7px] text-[22px]"></span>Tahrirlash</button></div>
        </div>
        <div class="flex gap-[20px] mt-[32px] h-[64px]">
          <div
            class="w-[64px] h-[64px] bg-[rgba(234,236,240,1)] border-[1px] border-[rgba(224,231,255,1)] rounded-[6px] flex justify-center items-center">
            <img src="../../public/user.svg" alt="">
          </div>
          <div v-if="!Result.full_name" class="mt-[30px] w-[100px] h-[16px] bg-slate-200 animate-bounce"></div>
          <div v-if="Result.full_name" class="w-[160px] text-[16px] font-medium	text-[rgba(33,33,33,1)] flex justify-start items-center">
            {{ Result.full_name }}
          </div>
          <div></div>
        </div>
        <div class="flex gap-[227px] mt-[24px]">
          <div class="text-[rgba(181,181,195,1)] font-medium text-[12px] w-[160px]">
            TELEFON RAQAM
            <p v-if="!Result.phone" class="mt-[15px] w-[100px] h-[12px] bg-slate-200 animate-bounce"></p>
            <p v-if="Result.phone" class="text-[rgba(33,33,33,1)] mt-[5px] text-[16px] font-medium">{{ Result.phone }}
            </p>
          </div>  
          <div class="text-[rgba(181,181,195,1)] font-medium text-[12px] w-[132px]">
            HOMIYLIK SUMMASI
            <p v-if="!Result.phone" class="mt-[15px] w-[100px] h-[12px] bg-slate-200 animate-bounce"></p>
            <p v-if="Result.sum" class="text-[rgba(33,33,33,1)] mt-[5px] text-[16px] font-medium">{{ Format(Result.sum)
              }} UZS</p>
          </div>
        </div>
      </div>
      <div class="mt-[100px]">
        <img src="../../public/img.svg" alt="">
      </div>
    </div>
  </div>
  <SponsorEdit v-if="sponserEditStatus" @ClouseEdit="SponserEditStatus" :data="Result"/>
</template>

<style></style>