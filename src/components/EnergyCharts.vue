<template>
  <div class="chart-container">
    <!-- Pierwszy wykres -->
    <canvas id="myChart" ref="canvasRef1"></canvas>

    <!-- Drugi wykres -->
    <canvas id="myChartLine" ref="canvasRef2"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  name: 'MyChartComponent',
  setup() {
    const canvasRef1 = ref(null)
    const canvasRef2 = ref(null)

    onMounted(() => {
      const ctx1 = canvasRef1.value.getContext('2d')
      const ctx2 = canvasRef2.value.getContext('2d')

      const chartData = {
        labels: [
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
        ],
        datasets: [
          {
            label: 'Zużycie energii w czasie',
            data: [12, 19, 3, 5, 2, 3, 7, 12, 5, 10],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      }

      const lineChartData = {
        labels: [
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
        ],
        datasets: [
          {
            label: 'Zużycie mocy',
            data: [40, 40.5, 39.9, 41, 45, 40, 40.1, 39.8, 40.1, 40.2],
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Opcjonalne, jeśli chcesz mieć tło wypełnione
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
          }
        ]
      }

      // Pierwszy wykres - słupkowy
      new Chart(ctx1, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })

      // Obliczenia do osi Y dla wykresu liniowego
      const dataValues = lineChartData.datasets[0].data
      const minValue = Math.min(...dataValues) - 5
      const maxValue = Math.max(...dataValues) + 5

      // Drugi wykres - liniowy
      new Chart(ctx2, {
        type: 'line',
        data: lineChartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              min: minValue,
              max: maxValue
            }
          }
        }
      })
    })

    return {
      canvasRef1,
      canvasRef2
    }
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: auto; /* Kontener automatycznie dopasuje się do obu wykresów */
  position: relative;
  display: flex;
  flex-direction: column; /* Ustawienie wykresów w kolumnie */
  gap: 20px; /* Odstęp między wykresami */
}

canvas {
  width: 100% !important;
  height: 400px !important; /* Możesz zmienić wysokość dla każdego wykresu */
}
</style>
