<script setup>
import Navbar from '../components/Navbar/main.vue';
import StudentList from '../components/Students/StudentList.vue';
import StudentFilter from '../components/Students/StudentFilter.vue';
import api from '../api/api';
import { onMounted, ref } from 'vue';

let Result = ref({});
const page = ref(1);
const page_size = ref(10);
const page_count = ref(0);
const page_status = ref(false);
const search = ref('');
const filterStatus = ref(false);
const filter = ref(false);

const Get = async () => {
  try {
    const response = await api.get('student-list/', {
      params: {
        page: page.value,
        page_size: page_size.value,
      }
    })
    const data = response.data.results;
    Result.value = data;
    page_count.value = response.data.count;
  } catch (error) {
    console.log(error)
  }
}

const InputValue = async (newValue) => {
  search.value = newValue;
  if (search.value) {
    try {
      const response = await api.get('student-list/', {
        params: {
          page: page.value,
          page_size: Result.value.count,
        }
      });
      const data = response.data.results;
      const filter = data.filter((row) =>
        row.full_name.toString().toLowerCase()
        === search.value.toString().toLowerCase()
      );
      Result.value = filter;
    } catch (error) {
      console.error(error);
    }
  } else {
    Get()
  }
};

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

const FilterStatus = () => {
  filterStatus.value = !filterStatus.value;
}

const Filter = (value) => {
  filter.value = value;
  Get()
}

onMounted(() => {
  Get()
})
</script>

<template>
  <Navbar type="top-buttom" @InputValue="InputValue" @FilterStatus="FilterStatus" />
  <div class="w-full h-[2000px] bg-[rgba(245,245,247,1)] flex justify-center">
    <div class="w-[1200px] mt-[48px]  flex flex-col">
      <div class="w-[1200px] flex justify-end">
        <div>
          <RouterLink to="/student/add">
            <button
              class="w-[198px] h-[42px] rounded-[5px] bg-[rgba(51,102,255,1)] flex items-center justify-center gap-[10px] text-[rgba(255,255,255,1)]"><span
                class="icon-plus text-[20px]"></span> Talaba qo‘shish</button>
          </RouterLink>
        </div>
      </div>
      <div class="flex mt-[29px]">
        <div class="px-3 py-2 text-left text-[#b5b7c0] font-medium text-[12px] leading-[21px]">
          #
        </div>
        <div class="ml-[20px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
          F.I.SH.
        </div>
        <div class="ml-[227px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
          TALABALIK TURI
        </div>
        <div class="ml-[100px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
          OTM
        </div>
        <div class="ml-[100px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
          AJRATILINGAN SUMMA
        </div>
        <div class="ml-[40px] x-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
          KONTRAKT MIQDORI
        </div>
        <div class="ml-[36px] px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
          AMALLAR
        </div>
      </div>
      <div class="flex flex-col gap-[12px]">
        <StudentList v-for="student in Result" :key="student.id" :data="student" />
      </div>
      <div class="mt-[28px] font-normal text-[15px] flex justify-between ">
        <div>
          {{ page_count }} tadan {{ page == 1 ? 1 : (page - 1) * page_size + 1 }}-{{
            (page ?? 1) == 1 ? page_size : (page) * page_size }}
          ko‘rsatilmoqda
        </div>
        <div class="flex gap-[12px] items-center">
          <div class="font-normal	text-[15px]">Ko‘rsatish</div>
          <button @click="OpenPageSize"
            class="rounded-[4px] cursor-pointer font-normal	text-[15px] w-[54px] h-[32px] border-[1px] border-[rgba(223,227,232,1)] bg-[rgba(255,255,255,1)] flex justify-center items-center gap-[7px]">
            {{ page_size }}
            <span :class="page_status ? `rotate-180` : ''"
              class="icon-angle-down text-[rgba(29,29,31,1)] text-[9px]"></span>
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
  <StudentFilter v-if="filterStatus" @ClouseFilter="FilterStatus" @Filter="Filter" :filter="filter" />
</template>

<style scoped></style>