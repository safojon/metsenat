<script setup>
import Navbar from '../components/Navbar/main.vue';
import CPlayList from '../components/Dashboard/CPlayList.vue';
import CChart from '../components/Dashboard/CChart.vue';
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
  <Navbar type="top-buttom"/>
  <div class="w-full h-[1000px] bg-[rgba(245,245,247,1)] flex justify-center">
    <div>
      <div class="w-[1200px] mt-[48px] justify-between flex">
        <div class="flex gap-[29px]">
          <CPlayList text="Jami to‘langan summa" :number="dashboardResult.total_paid"
            styles="text-[rgba(76,111,255,1)] bg-[rgba(76,111,255,0.1)]" />
          <CPlayList text="Jami so‘ralgan summa" :number="dashboardResult.total_need"
            styles="text-[rgba(237,199,0,1)] bg-[rgba(237,199,0,0.1)]" />
          <CPlayList text="To‘lanishi kerak summa" :number="dashboardResult.total_must_pay"
            styles="text-[rgba(237,114,0,1)] w-[48px] h-[48px] bg-[rgba(237,114,0,0.1)]" />
        </div>
      </div>
      <div class="chart">
        <CChart />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>