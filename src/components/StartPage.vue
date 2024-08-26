<template>
  <div class="flex flex-row flex-wrap">
    <div
      class="flex align-items-center justify-content-center w-15rem h-4rem bg-primary font-bold border-round m-2"
    >
      <Calendar v-model="selectedDates" selectionMode="range" showIcon />
    </div>
    <div
      class="flex align-items-center justify-content-center w-10rem h-4rem bg-primary font-bold border-round m-2"
    >
      <MultiSelect
        v-model="selectedMachines"
        display="chip"
        :options="machines"
        optionLabel="name"
        placeholder="Maszyny"
        :maxSelectedLabels="10"
        class="w-full md:w-20rem"
      />
    </div>
    <div
      class="flex align-items-center justify-content-center w-6rem h-4rem bg-primary font-bold border-round m-2"
    >
      <Button label="Save" icon="pi pi-check" />
    </div>
  </div>

  <CardsList />
  <FiltersData />
  <MaschinesList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardsList from './CardsList.vue'
import FiltersData from './FiltersData.vue'
import MaschinesList from './MaschinesList.vue'

export default defineComponent({
  name: 'StartPage',
  components: {
    CardsList,
    FiltersData,
    MaschinesList
  },

  data() {
    return {
      selectedDates: null,
      machines: [
        { name: 'Parker1' },
        { name: 'Parker2' },
        { name: 'Parker3' },
        { name: 'Parker4' },
        { name: 'Parker5' },
        { name: 'Parker6' },
        { name: 'Parker7' },
        { name: 'Parker8' },
        { name: 'Parker9' },
        { name: 'Parker10' }
      ],
      selectedMachines: []
    }
  },
  watch: {
    selectedDates(newValue: Date[]) {
      console.log('Selected date range:', newValue)
    }
  }
})
</script>

<style scoped></style>
