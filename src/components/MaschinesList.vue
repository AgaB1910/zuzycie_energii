<template>
  <div class="grid">
    <div class="col-fixed" style="width: 400px">
      <div class="text-center p-3 border-round-sm bg-primary font-bold">
        <div class="card">
          <h3>Zużycie na maszynach:</h3>
          <div class="flex-container">
            <!-- Maszyny -->
            <div class="col" style="line-height: 2.5">
              <div class="text-center p-3 border-round-sm bg-primary font-bold">
                Packer1 Packer2 Packer3 Packer4 Packer5 Packer6 Packer7 Packer8 Packer9 Packer10
              </div>
            </div>
            <!-- Zużycie energii -->
            <div class="col" style="line-height: 2.5">
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
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getEnergyData } from '@/getEnergyData'
import Chart from 'chart.js'

export default defineComponent({
  name: 'MaschinesList',
  setup() {
    const energyUsages = ref<number[]>([])

    // Funkcja pobierająca dane
    const fetchEnergyData = () => {
      getEnergyData((error: Error | null, data?: { energyData: Record<string, number[]> }) => {
        // Ustawienie odpowiedniego typu dla `error`
        if (error) {
          console.error('Błąd podczas pobierania danych:', error)
          return
        }

        // Przyjmijmy, że chcesz wyświetlić tylko ostatnią wartość zużycia energii dla każdej maszyny
        if (data) {
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
          energyUsages.value = machines.map((machine) => {
            const usageArray = data.energyData[machine] || []
            return usageArray[usageArray.length - 1] || 0
          })
        }
      })
    }

    onMounted(() => {
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
}
</style>

<style scoped>
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
}
</style>
