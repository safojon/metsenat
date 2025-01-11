<script setup>
import Navbar from '../components/Navbar/main.vue';
import Vue3autocounter from 'vue3-autocounter';
import api from '../api/api'
import { onMounted, ref } from 'vue'

let dashboardResult = ref({})

const Get = async () => {
  try {
    const data = await api.get('dashboard/')
    dashboardResult.value = data.data
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
  <div class="w-full h-[500px] bg-[rgba(245,245,247,1)] flex justify-center ">
    <div class="w-[1200px] mt-[48px] justify-between flex">
      <div class="flex gap-[29px]">
        <div class="pl-[24px] flex items-center w-[381px] h-[96px] bg-[rgba(255,255,255,1)] rounded-[8px]">
          <div
            class="flex justify-center items-center icon-money text-[28px] text-[rgba(76,111,255,1)] w-[48px] h-[48px] bg-[rgba(76,111,255,0.1)] rounded-[12px]">
          </div>
          <div class="ml-[16px]">
            <div class="text-[12px] font-normal text-[rgba(122,122,157,1)]">Jami to‘langan summa</div>
            <div class="">
              <vue3-autocounter class="font-bold	text-[20px] text-[rgba(46,56,77,1)]" ref='counter' :startAmount='0' :endAmount='dashboardResult.total_paid' :duration='3' prefix='' suffix='' separator=' ' decimalSeparator='' :decimals='0' :autoinit='true'/>
              <span class="text-[rgba(178,183,193,1)] font-bold text-[20px]"> UZS</span>
            </div>
          </div>
        </div>
        <div class="pl-[24px] flex items-center w-[381px] h-[96px] bg-[rgba(255,255,255,1)] rounded-[8px]">
          <div
            class="flex justify-center items-center icon-money text-[28px] text-[rgba(237,199,0,1)] w-[48px] h-[48px] bg-[rgba(237,199,0,0.1)] rounded-[12px]">
          </div>
          <div class="ml-[16px]">
            <div class="text-[12px] font-normal text-[rgba(122,122,157,1)]">Jami so‘ralgan summa</div>
            <div>
              <vue3-autocounter class="font-bold	text-[20px] text-[rgba(46,56,77,1)]" ref='counter' :startAmount='0' :endAmount='dashboardResult.total_need' :duration='3' prefix='' suffix='' separator=' ' decimalSeparator='' :decimals='0' :autoinit='true'/>
              <span class="text-[rgba(178,183,193,1)] font-bold text-[20px]"> UZS</span>
            </div>
          </div>
        </div>
        <div class="pl-[24px] flex items-center w-[381px] h-[96px] bg-[rgba(255,255,255,1)] rounded-[8px]">
          <div
            class="flex justify-center items-center icon-money text-[28px] text-[rgba(237,114,0,1)] w-[48px] h-[48px] bg-[rgba(237,114,0,0.1)] rounded-[12px]">
          </div>
          <div class="ml-[16px]">
            <div class="text-[12px] font-normal text-[rgba(122,122,157,1)]">To‘lanishi kerak summa</div>
            <div>
              <vue3-autocounter class="font-bold	text-[20px] text-[rgba(46,56,77,1)]" ref='counter' :startAmount='0' :endAmount='dashboardResult.total_must_pay' :duration='3' prefix='' suffix='' separator=' ' decimalSeparator='' :decimals='0' :autoinit='true'/>
              <span class="text-[rgba(178,183,193,1)] font-bold text-[20px]"> UZS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>