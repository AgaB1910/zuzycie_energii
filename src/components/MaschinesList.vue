<template>
  <div class="grid">
    <div class="col-fixed" style="width: 400px">
      <div class="text-center p-3 border-round-sm bg-primary font-bold">
        <div class="card">
          <h3>Zużycie na maszynach:</h3>
          <div class="flex-container">
            <!-- Maszyny -->
            <div class="col" style="line-height: 1">
              <div
                v-for="machine in machines"
                :key="machine"
                class="text-center p-3 border-round-sm bg-primary font-bold"
              >
                {{ machine }}
              </div>
            </div>
            <!-- Zużycie energii -->
            <div class="col" style="line-height: 1">
              <div
                v-for="(usage, index) in energyUsages"
                :key="index"
                class="text-center p-3 border-round-sm bg-primary font-bold"
              >
                {{ usage.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="text-center p-3 border-round-sm bg-primary font-bold">
        <div>
          <EnergyCharts />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import EnergyCharts from './EnergyCharts.vue'
import { getEnergyData } from '@/getEnergyData'

export default defineComponent({
  name: 'MaschinesList',
  components: {
    EnergyCharts
  },
  setup() {
    const machines = ref<string[]>([])
    const energyUsages = ref<number[]>([])

    const fetchEnergyData = async () => {
      try {
        // Użyj odpowiednich dat lub przenieś je do komponentu, jeśli są dynamiczne
        const startDate = new Date() // Przykladowa data, zmień na właściwą
        const endDate = new Date() // Przykladowa data, zmień na właściwą
        const data = await getEnergyData(startDate, endDate)
        console.log('Otrzymane dane:', data)

        // Ustaw maszyny dynamicznie na podstawie dostępnych danych
        machines.value = Object.keys(data.averageUsages)

        // Przetwarzanie danych dla wyświetlenia
        energyUsages.value = machines.value.map((machine) => {
          return data.averageUsages[machine] || 0
        })

        console.log('Przetworzone zużycia energii:', energyUsages.value)
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error)
      }
    }

    onMounted(() => {
      console.log('Komponent zamontowany, wywoływanie fetchEnergyData')
      fetchEnergyData()
    })

    return {
      machines,
      energyUsages
    }
  }
})
</script>

<style scoped>
.flex-container {
  display: flex;
  gap: 10px;
}

.col {
  line-height: 2.5;
  color: #000000;
}

.flex-container {
  display: flex;
  gap: 10px;
}

.grid {
  margin: 1rem;
}
.card {
  background-color: #e6e3e3;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(51, 50, 50, 0.1);
  padding: 10px;
}

h3 {
  color: #000000;
}
</style>
