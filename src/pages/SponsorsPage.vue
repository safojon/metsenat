<script setup>
import Navbar from '../components/Navbar/main.vue';
import SponsorList from '../components/Sponsors/SponsorList.vue';
import SponsorFilter from '../components/Sponsors/SponsorFilter.vue';
import api from '../api/api';
import { onMounted, ref, defineEmits } from 'vue';

let Result = ref({});
const search = ref('');
const page = ref(1);
const page_size = ref(10);
const page_status = ref(false);

const Get = async () => {
  try {
    const data = await api.get('sponsor-list/', {
      params: {
        page: page.value,
        page_size: page_size.value,
      }
    })
    Result.value = data.data.results
  } catch (error) {
    console.log(error)
  }
}

const InputValue = async (newValue) => {
  search.value = newValue;
  if (search.value) {
    try {
      const response = await api.get('sponsor-list/', {
        params: {
          page: page.value,
          page_size: Result.value.count,
        }
      });
      const data = response.data.results;
      const filter = data.filter((row) =>
        row.full_name.toString() === search.value.toString()
      );
      Result.value = filter;
    } catch (error) {
      console.error(error);
    }
  } else {
    Get()
  }
};

onMounted(() => {
  Get()
})

const Page = (number) => {
  Get()
}

const OpenPageSize = () => {
  page_status.value = !page_status.value;
}

const PageSize = (number) => {
  page_status.value = false;
  page_size.value = number;
  Get()
}

const Next = () => {
  page.value = page.value == Math.ceil(Result.value.count / page_size) ? page.value : page.value + 1;
  Get()
}

const Back = () => {
  page.value = page.value == 1 ? 1 : page.value - 1;
  Get()
}

</script>

<template>
  <Navbar type="top-buttom" @InputValue="InputValue" />
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
          <SponsorList v-for="sponsor in Result" :key="sponsor.id" :data="sponsor" />
        </div>
        <div class="mt-[28px] font-normal text-[15px] flex justify-between ">
          <div>
            {{ Result.count }} tadan {{ page == 1 ? 1 : (page - 1) * page_size + 1 }}-{{
              (page ?? 1) == 1 ? page_size : (page) * page_size }}
            ko‘rsatilmoqda
          </div>
          <div class="flex gap-[12px] items-center">
            <div class="font-normal	text-[15px]">Ko‘rsatish</div>
            <button @click="OpenPageSize"
              class="rounded-[4px] cursor-pointer font-normal	text-[15px] w-[54px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] bg-[rgba(255,255,255,1)] flex justify-center items-center gap-[7px]">
              {{ page_size }}
              <span class="icon-angle-down text-[rgba(29,29,31,1)] text-[9px]"></span>
            </button>
            <div v-if="page_status"
              class="w-[54px] h-auto border-[1px] border-[rgba(223,227,232,1)] bg-[rgba(255,255,255,1)] absolute z-50 mt-[190px] ml-[75px] flex flex-col">
              <button @click="PageSize(5)" class="border-b-[1px] border-[rgba(223,227,232,1)] py-1">5</button>
              <button @click="PageSize(10)" class="border-b-[1px] border-[rgba(223,227,232,1)] py-1">10</button>
              <button @click="PageSize(20)" class="border-b-[1px] border-[rgba(223,227,232,1)] py-1">20</button>
              <button @click="PageSize(30)" class="border-b-[1px] border-[rgba(223,227,232,1)] py-1">30</button>
              <button @click="PageSize(40)" class="border-b-[1px] border-[rgba(223,227,232,1)] py-1">40</button>
            </div>
            <div class="flex gap-[8px]">
              <button @click="Back" :class="page == 1 ? 'bg-[rgba(223,227,232,1)]' : 'bg-white'"
                class="icon-angle-down rotate-90 text-[rgba(151,151,151,1)] text-[12px] w-[32px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] rounded-[4px]"></button>
              <button @click="Next"
                :class="page == Math.ceil(Result.count / page_size) ? 'bg-[rgba(223,227,232,1)]' : 'bg-white'"
                class="-rotate-90 icon-angle-down text-[rgba(151,151,151,1)] text-[12px] w-[32px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] rounded-[4px]"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>