import * as fs from 'fs'
import data from './symulacja_zuzycia_energii.json' assert { type: 'json' }

export function getEnergyData(
  callback: (
    error: Error | null,
    data?: { totalUsage: number; avgUsagePerHour: number; avgPower: number }
  ) => void
): void {
  fs.readFile('symulacja_zuzycia_energii.json', 'utf-8', (error, data) => {
    if (error) {
      console.error('Błąd podczas odczytu pliku:', error)
      callback(error as Error)
      return
    }

    try {
      const energyData = JSON.parse(data)

      let totalUsage = 0
      let totalHours = 0

      // Iterowanie przez każdą linię
      for (const line in energyData) {
        if (Object.prototype.hasOwnProperty.call(energyData, line)) {
          const usageArray = energyData[line]

          // Sumowanie zużycia energii i liczby godzin
          totalUsage += usageArray.reduce((sum: number, value: number) => sum + value, 0)
          totalHours += usageArray.length
        }
      }

      const avgUsagePerHour = totalUsage / totalHours

      const avgPower = avgUsagePerHour

      callback(null, { totalUsage, avgUsagePerHour, avgPower })
    } catch (parseError) {
      console.error('Błąd podczas parsowania danych:', parseError)
      callback(parseError as Error) // Rzutowanie typu `unknown` na `Error`
    }
  })
}
