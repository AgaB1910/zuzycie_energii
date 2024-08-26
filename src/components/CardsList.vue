<template>
  <div class="card-container">
    <div class="card card1">
      <div class="card-header">
        <span class="card-title">Sumaryczne zużycie energii:</span>
        <span class="card-timer">{{ minutes }}:{{ formattedSeconds }}</span>
      </div>
      <div class="card-content">
        <p>{{ totalEnergyUsage }}</p>
      </div>
    </div>

    <div class="card card2">
      <div class="card-header">
        <span class="card-title">Średnie zużycie energii na godzinę:</span>
        <span class="card-timer">{{ minutes }}:{{ formattedSeconds }}</span>
      </div>
      <div class="card-content">
        <p>{{ avgEnergyUsagePerHour }}</p>
      </div>
    </div>

    <div class="card card3">
      <div class="card-header">
        <span class="card-title">Średnia moc:</span>
        <span class="card-timer">{{ minutes }}:{{ formattedSeconds }}</span>
      </div>
      <div class="card-content">
        <p>{{ avgPower }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { getEnergyData } from '@/getEnergyData'

export default defineComponent({
  name: 'MachinesList',
  setup() {
    const minutes = ref(5)
    const seconds = ref(0)
    const totalEnergyUsage = ref('Ładowanie danych...')
    const avgEnergyUsagePerHour = ref('Ładowanie danych...')
    const avgPower = ref('Ładowanie danych...')

    // Licznik odliczający 5 minut
    const startTimer = () => {
      const timerInterval = setInterval(() => {
        if (seconds.value > 0) {
          seconds.value--
        } else if (minutes.value > 0) {
          minutes.value--
          seconds.value = 59
        } else {
          clearInterval(timerInterval)

          minutes.value = 5
          seconds.value = 0

          fetchData()

          startTimer()
        }
      }, 1000)
    }

    const fetchData = async (): Promise<void> => {
      try {
        const {
          totalUsage,
          avgUsagePerHour,
          avgPower: calculatedAvgPower
        }: {
          totalUsage: number
          avgUsagePerHour: number
          avgPower: number
        } = await getEnergyData()

        totalEnergyUsage.value = `${totalUsage.toFixed(2)} kWh`
        avgEnergyUsagePerHour.value = `${avgUsagePerHour.toFixed(2)} kWh/godz.`
        avgPower.value = `${calculatedAvgPower.toFixed(2)} kW`
      } catch (error) {
        totalEnergyUsage.value = 'Błąd pobierania danych'
        avgEnergyUsagePerHour.value = 'Błąd pobierania danych'
        avgPower.value = 'Błąd pobierania danych'
      }
    }

    onMounted(() => {
      startTimer()
      fetchData()
    })

    const formattedSeconds = computed(() =>
      seconds.value < 10 ? `0${seconds.value}` : seconds.value.toString()
    )

    return {
      minutes,
      formattedSeconds,
      totalEnergyUsage,
      avgEnergyUsagePerHour,
      avgPower
    }
  }
})
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
}

.card {
  width: 30%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card1 {
  background-color: #3986ba;
}

.card2 {
  background-color: #4b9c6d;
}

.card3 {
  background-color: #b9473a;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-weight: bold;
  font-size: 1em;
}

.card-content {
  margin-top: 20px;
  font-size: 1.5em;
  text-align: center;
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 100%;
    margin-bottom: 20px;
  }

  .card:last-child {
    margin-bottom: 0;
  }
}
</style>
