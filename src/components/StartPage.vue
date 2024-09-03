<template>
  <div class="flex flex-row flex-wrap">
    <!-- Twoje elementy interfejsu -->
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
    :avgEnergyUsagePerDay="avgEnergyUsagePerHour"
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
import { getEnergyData } from '@/getEnergyData'

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
      console.log('Save clicked')
      console.log('Selected Dates:', selectedDates.value)
      if (selectedDates.value && selectedDates.value.length === 2) {
        const [start, end] = selectedDates.value

        if (start > end) {
          alert('Data zakończenia nie może być przed datą rozpoczęcia.')
          return
        }

        startDate.value = start
        endDate.value = end

        console.log('Start Date:', startDate.value)
        console.log('End Date:', endDate.value)

        fetchData(start, end, selectedMachines.value)
      } else {
        alert('Proszę wybrać prawidłowy zakres dat.')
      }
    }

    const fetchData = async (startDate: Date, endDate: Date, selectedMachines: string[]) => {
      try {
        console.log('Fetching data for range:', startDate, endDate, selectedMachines)

        if (!startDate || !endDate) {
          throw new Error('Nieprawidłowy zakres dat')
        }

        if (!Array.isArray(selectedMachines)) {
          throw new Error('selectedMachines powinien być tablicą')
        }

        console.log('Wywołanie getEnergyData z argumentami:', startDate, endDate, selectedMachines)
        const data = await getEnergyData(startDate, endDate, selectedMachines)

        console.log('Fetched data:', data)

        const { totalUsage, avgUsagePerHour, avgPower } = data

        if (totalUsage === undefined || avgUsagePerHour === undefined || avgPower === undefined) {
          throw new Error('Dane zwrócone przez getEnergyData są nieprawidłowe')
        }

        console.log('Przypisywanie wartości:', { totalUsage, avgUsagePerHour, avgPower })
        console.log(
          'Typ totalEnergyUsage:',
          typeof totalEnergyUsage,
          'Typ wartości:',
          typeof totalUsage
        )

        if (typeof totalEnergyUsage.value !== 'string') {
          console.error('totalEnergyUsage.value jest nadpisywane:', totalEnergyUsage)
        }

        // Przypisywanie wartości do ref
        totalEnergyUsage.value = totalUsage.toString()
        avgEnergyUsagePerHour.value = avgUsagePerHour.toString()
        avgPower.value = avgPower.toString()

        console.log('Total Energy Usage:', totalEnergyUsage.value)
        console.log('Average Energy Usage Per Hour:', avgEnergyUsagePerHour.value)
        console.log('Average Power:', avgPower.value)
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error)

        // Sprawdzenie typu błędu i logowanie, aby lepiej go zdiagnozować
        console.log('Typ błędu:', typeof error)

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
