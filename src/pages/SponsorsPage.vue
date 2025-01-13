<script setup>
import Navbar from '../components/Navbar/main.vue';
import SponsorList from '../components/Sponsors/SponsorList.vue';
import SponsorFilter from '../components/Sponsors/SponsorFilter.vue';
import api from '../api/api';
import { onMounted, ref, defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';

let Result = ref({})
const route = useRoute();
const router = useRouter();
const emit = defineEmits();

const Get = async () => {
  try {
    const data = await api.get(`${route.path}?ordering=${route.query.ordering}&page=${route.query.page ?? 1}`)
    Result.value = data.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  Get()
})

const Page = (number) => {
  router.push({ query: { ...route.query, page: number } });
  Get()
}

const Next = () => {
  router.push({ query: { ...route.query, page: Math.floor(Result.value.count / 10) == route.query.page ? route.query.page : Number(route.query.page ?? 1) + 1 } });
  Get()
}

const Back = () => {
  router.push({ query: { ...route.query, page: (Number(route.query.page ?? 1) == 1 ? 1 : Number(route.query.page ?? 1) - 1) } });
  Get()
}

const inputValue = ref('');
const filterStatus = ref(false);

const InputValue = (newValue) => {
  inputValue.value = newValue;
};

const FilterStatus = (newValue) => {
  filterStatus.value = newValue;
};
</script>

<template>
  {{ filterStatus }}
  <Navbar @InputValue="InputValue" @FilterStatus="FilterStatus" />
  <div class="w-full h-[2000px] bg-[rgba(245,245,247,1)] flex justify-center">
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
        <div class="mt-[28px] font-normal text-[15px] flex justify-between ">
          <div>
            {{ Result.count }} tadan {{ (route.query.page ?? 1) == 1 ? 1 : ((route.query.page ?? 1) - 1) * 10 + 1 }}-{{
              (route.query.page ?? 1) == 1 ? 10 : (route.query.page ?? 1) * 10 }}
            ko‘rsatilmoqda
          </div>
          <div class="flex gap-[12px] items-center">
            <div class="font-normal	text-[15px]">Ko‘rsatish</div>
            <div
              class="rounded-[4px] cursor-pointer font-normal	text-[15px] w-[54px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] bg-[rgba(255,255,255,1)] flex justify-center items-center gap-[7px]">
              10
              <span class="icon-angle-down text-[rgba(29,29,31,1)] text-[9px]"></span>
            </div>
            <div class="flex gap-[8px]">
              <button @click="Back" :class="route.query.page == 1 ? 'bg-[rgba(223,227,232,1)]' : 'bg-white'"
                class="icon-angle-down rotate-90 text-[rgba(151,151,151,1)] text-[12px] w-[32px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] rounded-[4px]"></button>
              <button @click="Page(1)"
                class="text-[rgba(29,29,31,1)] text-[12px] w-[32px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] bg-[rgba(255,255,255,1)] rounded-[4px]">1</button>
              <button
                class="text-[rgba(29,29,31,1)] text-[12px] w-[32px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] bg-[rgba(255,255,255,1)] rounded-[4px]">2</button>
              <button
                class="text-[rgba(29,29,31,1)] text-[12px] w-[32px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] bg-[rgba(255,255,255,1)] rounded-[4px]">...</button>
              <button @click="Page(Math.floor(Result.count / 10))"
                class="text-[rgba(29,29,31,1)] text-[12px] w-[32px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] bg-[rgba(255,255,255,1)] rounded-[4px]">9</button>
              <button @click="Page(Math.floor(Result.count / 10))"
                :class="route.query.page == Math.floor(Result.count / 10) ? 'text-[rgba(51,102,255,1)] border-[rgba(51,102,255,1)]' : ''"
                class="text-[rgba(29,29,31,1)] text-[12px] w-[32px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] bg-[rgba(255,255,255,1)] rounded-[4px]">{{
                  Math.floor(Result.count / 10) }}</button>
              <button @click="Next"
                :class="route.query.page == Math.floor(Result.count / 10) ? 'bg-[rgba(223,227,232,1)]' : 'bg-white'"
                class="-rotate-90 icon-angle-down text-[rgba(151,151,151,1)] text-[12px] w-[32px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] rounded-[4px]"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SponsorFilter v-if="filterStatus" @FilterStatus="FilterStatus"/>
</template>

<style scoped></style>