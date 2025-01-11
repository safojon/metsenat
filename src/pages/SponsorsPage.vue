<script setup>
import Navbar from '../components/Navbar/main.vue';
import SponsorList from '../components/Sponsors/SponsorList.vue';
import api from '../api/api';
import { onMounted, ref } from 'vue';

let Result = ref({})

const Get = async () => {
  try {
    const data = await api.get('sponsor-list/')
    Result.value = data.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  Get()
})
</script>

<template>
  <Navbar />
  <div class="w-full h-full bg-[rgba(245,245,247,1)] flex justify-center">
    <div class="w-[1200px] mt-[48px] justify-between flex">
      <div class="w-full">
        <div class="flex">
          <div class="px-3 py-2 text-left text-[#b5b7c0] font-medium text-[12px] leading-[21px]">
            #
          </div>
          <div class="ml-[20px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
            F.I.SH.
          </div>
          <div class="ml-[227px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
            TEL.RAQAMI
          </div>
          <div class="ml-[75px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
            HOMIYLIK SUMMASI
          </div>
          <div class="ml-[10px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
            SARFLANGAN SUMMA
          </div>
          <div class="ml-[0px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
            SANA
          </div>
          <div class="ml-[50px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
            HOLATI
          </div>
          <div class="ml-[60px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
            AMALLAR
          </div>
        </div>
        <div class="flex flex-col gap-[12px]">
          <SponsorList v-for="sponsor in Result.results" :key="sponsor.id" :data="sponsor" />
        </div>
        <div>
          <div>
            59 tadan  1-10 ko‘rsatilmoqda
          </div>
          <div>
            <div>Ko‘rsatish</div>
            <div></div>
            div3
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>