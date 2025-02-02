<script setup>
import Navbar from '../components/Navbar/main.vue';
import api from '../api/api';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const type = ref('');
const number = ref('');
const contract = ref('');
const institute = ref('');

const Institutes = ref('');  
const openInstitutes = ref(false);
const openType = ref(false);

const router = useRouter();

const Result = ref('');

const Save = async () => {
  if (name.value && number.value && contract.value && type.value && institute.value) {
    try {
      const data = {
        full_name: name.value,
        type: type.value,
        phone: number.value,
        institute: institute.value.id,
        contract: contract.value,
        given: 0
      };
      const response = await api.post(`student-create/`, data);
      Result.value = response;
      if (response) {
        router.push(`/student/single/${response.data.id}`);
      }
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

const OpenInstitute = () => {
  openType.value = false;
  openInstitutes.value = !openInstitutes.value;
}

const thisInstitute = async (data) => {
  institute.value = data;
  openInstitutes.value = false;
};

const OpenType = () => {
  openInstitutes.value = false;
  openType.value = !openType.value;
}

const thisType = async (id) => {
  type.value = id;
  openType.value = false;
};

onMounted(() => {
  Institute()
})
</script>

<template>
  <Navbar type="top" />
  <main class="w-full h-[88px] bg-[#fdfdfd] flex justify-center items-center">
    <div class="w-[1200px] h-full flex items-center">
      <RouterLink to="/students-list">
        <div class="icon-arrow-left text-[20px]"></div>
      </RouterLink>
      <div class="ml-[16px] font-bold text-[24px] text-[rgba(40,41,61,1)]">Talaba qo‘shish</div>
    </div>
  </main>
  <div class="w-full h-full bg-[rgba(245,245,247,1)] flex justify-center items-center">
    <div class="w-[1200px] h-[2000px] flex flex-col items-center  mt-[40px]">
      <div class="bg-white w-[790px] h-[402px] rounded-[12px] p-[28px]">
        <div class="flex gap-[28px]">
          <div class="">
            <div class="font-medium text-[12px] tracking-[1.13px]">F.I.SH. (FAMILIYA ISM SHARIF)</div>
            <div class="mt-[8px] w-[353px] h-[42px]">
              <input v-model="name"
                class="w-[353px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
              </input>
            </div>
          </div>
          <div class="">
            <div class="font-medium text-[12px] tracking-[1.13px]">TELEFON RAQAM</div>
            <div class="mt-[8px] w-[353px] h-[42px]">
              <input v-model="number"
                class="w-[353px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
              </input>
            </div>
          </div>
        </div>
        <div class="flex gap-[28px] mt-[28px]">
          <div class="">
            <div class="font-medium text-[12px] tracking-[1.13px]">OTM</div>
            <div class="mt-[8px] w-[734px] h-[42px]">
              <button :class="filter ? 'border-[rgba(46,91,255,1)]' : '' "  @click="OpenInstitute"
                class="w-[734px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
                {{ institute.name ? institute.name : 'OTM ni tanlang' }}
              </button>
              <p :class="openInstitutes ? 'rotate-180' : ''"
                class="icon-angle-down text-[#B5B5C3] text-[10px] mt-[-25px] ml-[710px] absolute"></p>
            </div>
            <div v-if="openInstitutes" class="absolute mt-[10px] rounded-[5px] flex flex-col w-[734px] bg-white border-[1px] z-10 overflow-hidden">
              <div class="max-h-[205px] overflow-y-auto flex flex-col">
                <button v-for="institute in Institutes" :key="institute.id" @click="thisInstitute(institute)" class="h-auto p-[5px] border-t-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px] hover:bg-gray-100 transition">
                  {{ institute.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-[28px] mt-[28px]">
          <div class="">
            <div class="font-medium text-[12px] tracking-[1.13px]">TALABALIK TURI</div>
            <div class="mt-[8px] w-[353px] h-[42px]">
              <button :class="filter ? 'border-[rgba(46,91,255,1)]' : '' "  @click="OpenType"
                class="w-[353px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
                {{ type ? type == 1 ? 'Bakalavr' : 'Magistr' : 'Barchasi' }}
              </button>
              <p :class="openType ? 'rotate-180' : ''"
                class="icon-angle-down text-[#B5B5C3] text-[10px] mt-[-25px] ml-[330px] absolute"></p>
            </div>
            <div v-if="openType" class="absolute mt-[10px] rounded-[5px] flex flex-col w-[353px] bg-white border-[1px] z-10 overflow-hidden">
              <div class="max-h-[205px] overflow-y-auto flex flex-col">
                <button @click="thisType(1)" class="h-auto p-[5px] border-t-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px] hover:bg-gray-100 transition">
                  Bakalavr
                </button>
                <button @click="thisType(2)" class="h-auto p-[5px] border-t-[1px] border-[rgba(224,231,255,1)] text-start pl-[16px] hover:bg-gray-100 transition">
                  Magistr
                </button>
              </div>
            </div>
          </div>
          <div class="">
            <div class="font-medium text-[12px] tracking-[1.13px]">KONTRAKT SUMMA</div>
            <div class="mt-[8px] w-[353px] h-[42px]">
              <input v-model="contract"
                class="w-[353px] h-[42px] bg-[#E0E7FF33] border-[1px] border-[#E0E7FF] rounded-[6px] text-[15px] font-normal flex items-center pl-[16px]">
              </input>
            </div>
          </div>
        </div>
        <div class="w-[734px] h-[2px] bg-[rgba(245,245,247,1)] mt-[28px]"></div>
        <div class="mt-[28px] flex justify-end">
          <button
          @click="Save"
          class="w-[155px] h-[42px] rounded-[5px] bg-[rgba(51,102,255,1)] flex items-center justify-center gap-[10px] text-[rgba(255,255,255,1)]"><span
            class="icon-plus text-[20px]"></span> Qo‘shish</button>
        </div>
      </div>
    </div>
  </div>
</template>
