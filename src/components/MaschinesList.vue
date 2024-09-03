<template>
  <div class="grid">
    <div class="col-fixed" style="width: 400px">
      <div class="text-center p-3 border-round-sm bg-primary font-bold">
        <div class="card">
          <h3>Zużycie na maszynach:</h3>
          <div class="flex-container">
            <!-- Maszyny -->
            <div class="col" style="line-height: 1">
              <div class="text-center p-3 border-round-sm bg-primary font-bold">Packer1</div>
              <div class="text-center p-3 border-round-sm bg-primary font-bold">Packer2</div>
              <div class="text-center p-3 border-round-sm bg-primary font-bold">Packer3</div>
              <div class="text-center p-3 border-round-sm bg-primary font-bold">Packer4</div>
              <div class="text-center p-3 border-round-sm bg-primary font-bold">Packer5</div>
              <div class="text-center p-3 border-round-sm bg-primary font-bold">Packer6</div>
              <div class="text-center p-3 border-round-sm bg-primary font-bold">Packer7</div>
              <div class="text-center p-3 border-round-sm bg-primary font-bold">Packer8</div>
              <div class="text-center p-3 border-round-sm bg-primary font-bold">Packer9</div>
              <div class="text-center p-3 border-round-sm bg-primary font-bold">Packer10</div>
            </div>
            <!-- Zużycie energii -->
            <div class="col" style="line-height: 1">
              <div
                v-for="(usage, index) in energyUsages"
                :key="index"
                class="text-center p-3 border-round-sm bg-primary font-bold"
              >
                {{ usage }}
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
import Chart from 'chart.js'

export default defineComponent({
  name: 'MaschinesList',
  components: {
    EnergyCharts
  },
  setup() {
    const energyUsages = ref<number[]>([])

    const fetchEnergyData = async () => {
      try {
        const data = await getEnergyData()
        console.log('Otrzymane dane:', data)

        const machines = [
          'Packer1',
          'Packer2',
          'Packer3',
          'Packer4',
          'Packer5',
          'Packer6',
          'Packer7',
          'Packer8',
          'Packer9',
          'Packer10'
        ]

        // Przetwarzanie danych dla wyświetlenia
        energyUsages.value = machines.map((machine) => {
          return data.averageUsages[machine] || 0 // Pobierz średnie zużycie lub 0, jeśli brak danych
        })

        console.log('Przetworzone zużycia energii:', energyUsages.value)
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error)
      }
    }

    onMounted(() => {
      console.log('Komponent zamontowany, wywoływanie fetchEnergyData') // Sprawdź, czy komponent jest montowany
      fetchEnergyData()
    })

    return {
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
