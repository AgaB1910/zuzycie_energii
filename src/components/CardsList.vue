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
        <span class="card-title">Średnie zużycie energii na dzień:</span>
        <span class="card-timer">{{ minutes }}:{{ formattedSeconds }}</span>
      </div>
      <div class="card-content">
        <p>{{ avgEnergyUsagePerDay }}</p>
      </div>
    </div>

    <div class="card card3">
      <div class="card-header">
        <span class="card-title">Średnia moc na godzinę:</span>
        <span class="card-timer">{{ minutes }}:{{ formattedSeconds }}</span>
      </div>
      <div class="card-content">
        <p>{{ avgPower }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, type PropType } from 'vue'
import { getEnergyData } from '@/getEnergyData'

export default defineComponent({
  name: 'CardsList',
  props: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    totalEnergyUsage: {
      type: String,
      required: true
    },
    avgEnergyUsagePerDay: {
      type: String,
      required: true
    },
    avgPower: {
      type: String,
      required: true
    },
    selectedMachines: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup(props) {
    const minutes = ref(5)
    const seconds = ref(0)

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
          fetchData(props.startDate, props.endDate, props.selectedMachines)
          startTimer()
        }
      }, 1000)
    }

    const fetchData = async (startDate: Date, endDate: Date, machines: string[]): Promise<void> => {
      try {
        console.log('Fetching data in CardsList:', startDate, endDate, machines) // Debugging

        // Call external function to fetch data
        const {
          totalUsage,
          avgUsagePerDay,
          avgPower: calculatedAvgPower
        } = await getEnergyData(startDate, endDate, machines)

        // Log fetched values for debugging
        console.log('Fetched data:', totalUsage, avgUsagePerDay, calculatedAvgPower)
      } catch (error) {
        console.error('Error fetching data in CardsList:', error)
      }
    }

    const formattedSeconds = computed(() =>
      seconds.value < 10 ? `0${seconds.value}` : seconds.value
    )

    onMounted(() => {
      startTimer()
    })

    return {
      minutes,
      seconds,
      formattedSeconds
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
