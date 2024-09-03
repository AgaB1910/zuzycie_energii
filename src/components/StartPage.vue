<template>
  <div class="flex flex-row flex-wrap">
    <div
      class="flex align-items-center justify-content-center w-15rem h-4rem bg-primary font-bold border-round m-2"
    >
      <Calendar
        v-model="selectedDates"
        selectionMode="range"
        showIcon
        :minDate="new Date(2023, 4, 1)"
        :maxDate="new Date(2023, 7, 1)"
      />
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
      <Button label="Save" icon="pi pi-check" @click="handleSave" />
    </div>
  </div>

  <CardsList
    :startDate="startDate ?? new Date()"
    :endDate="endDate ?? new Date()"
    :totalEnergyUsage="totalEnergyUsage"
    :avgEnergyUsagePerHour="avgEnergyUsagePerHour"
    :avgPower="avgPower"
    :selectedMachines="selectedMachines"
  />
  <FiltersData />
  <MaschinesList />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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

  setup() {
    const selectedDates = ref<Date[] | null>(null)
    const selectedMachines = ref<string[]>([])
    const totalEnergyUsage = ref<string>('Ładowanie danych...')
    const avgEnergyUsagePerHour = ref<string>('Ładowanie danych...')
    const avgPower = ref<string>('Ładowanie danych...')
    const startDate = ref<Date | null>(null)
    const endDate = ref<Date | null>(null)
    const machines = ref<{ name: string }[]>([
      { name: 'Packer1' },
      { name: 'Packer2' },
      { name: 'Packer3' },
      { name: 'Packer4' },
      { name: 'Packer5' },
      { name: 'Packer6' },
      { name: 'Packer7' },
      { name: 'Packer8' },
      { name: 'Packer9' },
      { name: 'Packer10' }
    ])

    const handleSave = () => {
      console.log('Save clicked') // Debugging: Check if the function is called
      if (selectedDates.value && selectedDates.value.length === 2) {
        const [start, end] = selectedDates.value

        // Check if startDate is before endDate
        if (start > end) {
          alert('Data zakończenia nie może być przed datą rozpoczęcia.')
          return
        }

        // Update startDate and endDate
        startDate.value = start
        endDate.value = end

        // Call the method to calculate data
        fetchData(start, end)
      } else {
        alert('Proszę wybrać prawidłowy zakres dat.')
      }
    }

    const fetchData = async (startDate: Date, endDate: Date) => {
      try {
        console.log('Fetching data for range:', startDate, endDate, selectedMachines.value) // Debugging

        // Simulate fetching and processing data
        // In real case, replace this with your fetch call logic
        totalEnergyUsage.value = '200 kWh' // Replace with actual data fetching logic
        avgEnergyUsagePerHour.value = '20 kWh/godz.'
        avgPower.value = '5 kW'
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error)
        totalEnergyUsage.value = 'Błąd pobierania danych'
        avgEnergyUsagePerHour.value = 'Błąd pobierania danych'
        avgPower.value = 'Błąd pobierania danych'
      }
    }

    return {
      selectedDates,
      selectedMachines,
      totalEnergyUsage,
      avgEnergyUsagePerHour,
      avgPower,
      machines,
      handleSave,
      startDate,
      endDate
    }
  }
})
</script>

<style scoped></style>
