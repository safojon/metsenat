<script setup>
import Navbar from '../components/Navbar/main.vue';
import StudentEdit from '../components/Students/StudentEdit.vue';
import SponsorAdd from '../components/Students/SponsorAdd.vue';
import SponsorEdit from '../components/Students/SponsorEdit.vue';
import api from '../api/api';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

let Result = ref({});
let Sponsors = ref({});
let SponrosResult = ref('');
const route = useRoute();
const id = ref(route.params.id);
const studentEditStatus = ref(false);
const openSponsor = ref(false);
const openSponsorEdit = ref(false);

const Get = async () => {
  try {
    const count = await api.get('student-list/');
    const response = await api.get('student-list/', {
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

const getSponsors = async () => {
  try {
    const response = await api.get(`/student-sponsor/${id.value}/`)
    Sponsors.value = response.data.sponsors;
  } catch (error) {
    console.log(error)
  }
};

function Format(number) {
  return Number(number).toLocaleString('en-US').replace(/,/g, " ");
}

const SponserEditStatus = () => {
  studentEditStatus.value = !studentEditStatus.value;
  getSponsors()
}

const OpenSponsor = () => {
  openSponsor.value = !openSponsor.value;
} 

const OpenSponsorEdit = (data) => {
  SponrosResult.value = data;
  openSponsorEdit.value = !openSponsorEdit.value;
} 

onMounted(() => {
  Get()
  getSponsors()
})
</script>

<template>
  <Navbar type="top" />
  <main class="w-full h-[88px] bg-[#fdfdfd] flex justify-center items-center">
    <div class="w-[1200px] h-full flex items-center">
      <RouterLink to="/students-list">
        <div class="icon-arrow-left text-[20px]"></div>
      </RouterLink>
      <div v-if="Result.full_name" class="ml-[16px] font-bold text-[24px] text-[rgba(40,41,61,1)]">{{ Result.full_name
        }}</div>
    </div>
  </main>
  <div class="w-full h-full bg-[rgba(245,245,247,1)] flex justify-center items-center">
    <div class="w-[1200px] h-[2000px] flex flex-col items-center  mt-[40px]">
      <div class="w-[793px] h-auto bg-[rgba(255,255,255,1)] rounded-[12px] p-[32px]">
        <div class="flex items-center justify-between">
          <div class="font-bold text-[rgba(40,41,61,1)] text-[24px]">Talaba haqida</div>
          <div class=""><button @click="SponserEditStatus"
              class="w-[166px] h-[42px] rounded-[5px] font-medium	 bg-[rgba(237,241,253,1)] text-[rgba(51,101,252,1)] text-[14px] flex items-center justify-center"><span
                class="icon-edit mr-[7px] text-[22px]"></span>Tahrirlash</button></div>
        </div>
        <div class="flex items-center mt-[32px]">
          <div class="text-[rgba(51,102,255,1)] font-medium text-[12px] bg-[rgba(229,235,255,1)] px-[11px] py-[2px]">
            ASOSIY MA’LUMOTLAR
          </div>
          <div class="bg-[rgba(228,232,240,1)] w-[554px] h-[1px]">
          </div>
        </div>
        <div class="flex gap-[20px] mt-[32px] h-[64px]">
          <div
            class="w-[64px] h-[64px] bg-[rgba(234,236,240,1)] border-[1px] border-[rgba(224,231,255,1)] rounded-[6px] flex justify-center items-center">
            <img src="../../public/user.svg" alt="">
          </div>
          <div v-if="!Result.full_name" class="mt-[30px] w-[100px] h-[16px] bg-slate-200 animate-bounce"></div>
          <div v-if="Result.full_name"
            class="w-[160px] text-[16px] font-medium	text-[rgba(33,33,33,1)] flex justify-start items-center">
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
        </div>
        <div class="flex items-center mt-[32px]">
          <div class="text-[rgba(51,102,255,1)] font-medium text-[12px] bg-[rgba(229,235,255,1)] px-[11px] py-[2px]">
            O‘QISH JOYI HAQIDA MA’LUMOT
          </div>
          <div class="bg-[rgba(228,232,240,1)] w-[496px] h-[1px]">
          </div>
        </div>
        <div class="flex">
          <div class="text-[rgba(181,181,195,1)] font-medium text-[12px] w-[349px] mt-[24px]">
            OTM
            <p v-if="!Result.phone" class="mt-[15px] w-[100px] h-[12px] bg-slate-200 animate-bounce"></p>
            <p v-if="Result.phone" class="text-[rgba(33,33,33,1)] mt-[5px] text-[16px] font-medium">{{
              Result.institute['name'] }}
            </p>
          </div>
          <div class="text-[rgba(181,181,195,1)] font-medium text-[12px] w-[349px] mt-[24px]">
            TALABALIK TURI
            <p v-if="!Result.phone" class="mt-[15px] w-[100px] h-[12px] bg-slate-200 animate-bounce"></p>
            <p v-if="Result.phone" class="text-[rgba(33,33,33,1)] mt-[5px] text-[16px] font-medium">{{ Result.type == 1
              ? 'Bakalavr' : 'Magistr' }}
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="text-[rgba(181,181,195,1)] font-medium text-[12px] w-[349px] mt-[24px]">
            AJRATILINGAN SUMMA
            <p v-if="!Result.phone" class="mt-[15px] w-[100px] h-[12px] bg-slate-200 animate-bounce"></p>
            <p v-if="Result.phone" class="text-[rgba(33,33,33,1)] mt-[5px] text-[16px] font-medium">{{
              Format(Result.given) }} UZS
            </p>
          </div>
          <div class="text-[rgba(181,181,195,1)] font-medium text-[12px] w-[349px] mt-[24px]">
            KONTRAKT MIQDORI
            <p v-if="!Result.phone" class="mt-[15px] w-[100px] h-[12px] bg-slate-200 animate-bounce"></p>
            <p v-if="Result.phone" class="text-[rgba(33,33,33,1)] mt-[5px] text-[16px] font-medium">{{ Format(Result.contract)
              }} UZS
            </p>
          </div>
        </div>
      </div>
      <div class="w-[790px] h-auto bg-[rgba(255,255,255,1)] mt-[40px] rounded-[12px]">
        <div class="p-[32px] w-full">
          <div class="flex justify-between">
            <div class="font-bold text-[24px] text-[rgba(40,41,61,1)]">Talabaga homiylar</div>
            <div><button @click="OpenSponsor()" class="w-[197px] h-[42px] bg-[rgba(237,241,253,1)] rounded-[5px] text-[14px] text-[rgba(51,101,252,1)] flex items-center justify-center gap-[10px] font-medium"><span class="icon-plus text-[20px]"></span> Homiy qo‘shish</button></div>
          </div>
          <div v-if="Sponsors.length > 0" class="mt-[35px]">
            <div class="flex text-[rgba(177,177,184,1)] text-[13px] font-medium">
              <div class="ml-[15px]">#</div>
              <div class="ml-[33px]">F.I.SH</div>
              <div class="ml-[340px]">AJRATILINGAN SUMMA</div>
              <div class="ml-[90px]">AMALLAR</div>
            </div>
            <div class="mt-[12px] flex flex-col gap-[12px]">
              <div v-for="(sponsor, index) in Sponsors" :key="sponsor.id" class="flex text-[15px] items-center font-medium bg-[rgba(46,91,255,0.08)] h-[68px] rounded-[8px] border-[1px] border-[rgba(46,91,255,0.08)]">
                <div class="w-[40px] ml-[15px]">{{ index + 1}}</div>
                <div class="w-[390px]">{{ sponsor.sponsor.full_name }}</div>
                <div class="w-[234px] text-[14px]">{{ Format(sponsor.summa) }} UZS</div>
                <div class=""><button @click="OpenSponsorEdit(sponsor)" class="icon-edit text-[25px] text-[rgba(52,103,255,1)]"></button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[100px]">
        <img src="../../public/img.svg" alt="">
      </div>
    </div>
  </div>
  <StudentEdit v-if="studentEditStatus" @ClouseEdit="SponserEditStatus" :data="Result" />
  <SponsorAdd v-if="openSponsor" @ClouseEdit="OpenSponsor" :data="Result"/>
  <SponsorEdit v-if="openSponsorEdit" @ClouseEdit="OpenSponsorEdit" :data="Result" :sponsor="SponrosResult"/>
</template>

<style></style>