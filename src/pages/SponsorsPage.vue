<script setup>
import Navbar from '../components/Navbar/main.vue';
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
        <div class="overflow-x-auto">
          <table class="w-full border-collapse my-4">
            <thead>
              <tr>
                <th class="px-3 py-2 text-left text-[#b5b7c0] font-medium text-[12px] leading-[21px]">
                  #
                </th>
                <th class="px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
                  F.I.SH.
                </th>
                <th class="px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
                  TEL.RAQAMI
                </th>
                <th class="px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
                  HOMIYLIK SUMMASI
                </th>
                <th class="px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
                  SARFLANGAN SUMMA
                </th>
                <th class="px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
                  SANA
                </th>
                <th class="px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
                  HOLATI
                </th>
                <th class="px-3 py-2 text-left text-[#b5b7c0] font-medium text-sm leading-[21px]">
                  AMALLAR
                </th>
              </tr>
            </thead>
              <tbody class="">
                <tr v-for="sponsor in Result.results" :key="sponsor.id" class="bg-white h-[68px] rounded-[8px] mb-[10px]">
                  <td class="px-3 py-2 text-left text-[rgba(29,29,31,1)] font-medium text-[15px] leading-[21px]">
                    {{ sponsor.id }}
                  </td>
                  <td class="px-3 py-2 text-left text-[#292d32] font-medium text-[15px] leading-[21px]">
                    {{ sponsor.full_name }}
                  </td>
                  <td class="px-3 py-2 text-left text-[#292d32] font-medium text-[14px] leading-[21px]">
                    {{ sponsor.phone }}
                  </td>
                  <td class="px-3 py-2 text-left text-[#292d32] font-medium text-[14px] leading-[21px]">
                    {{ sponsor.sum }} <span class="text-[rgba(178,183,193,1)] font-medium text-[14px]"> UZS</span>
                  </td>
                  <td class="px-3 py-2 text-left text-[#292d32] font-medium text-[14px] leading-[21px]">
                    {{ sponsor.spent }} <span class="text-[rgba(178,183,193,1)] font-medium text-[14px]"> UZS</span>
                  </td>
                  <td class="px-3 py-2 text-left text-[#292d32] font-medium text-[14px] leading-[21px]">
                    {{ sponsor.created_at.split("T")[0] }}
                  </td>
                  <td :class="sponsor.get_status_display == 'Moderatsiyada' ? 'text-[rgba(255,164,69,1)]' : sponsor.get_status_display == 'Tasdiqlangan' ? 'text-[rgba(0,207,131,1)]' : sponsor.get_status_display == 'Yangi' ? 'text-[rgba(91,171,242,1)]' : 'text-[rgba(151,151,151,1)]'" class="px-3 py-2 text-left font-medium text-sm leading-[21px]">
                    {{ sponsor.get_status_display }}
                  </td>
                  <td class="px-3 py-2 text-left text-[#292d32] font-medium text-sm leading-[21px] cursor-pointer ">
                    <img class="ml-[15px]" src="../../public/eye.svg" alt="">
                  </td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped></style>