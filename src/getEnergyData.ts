export async function getEnergyData(
  startDate: Date,
  endDate: Date
): Promise<{
  totalUsage: number
  avgUsagePerHour: number
  avgPower: number
  averageUsages: Record<string, number>
}> {
  try {
    const response = await fetch('public/symulacja_zuzycia_energii.json')

    if (!response.ok) {
      throw new Error(`Błąd sieciowy podczas ładowania danych: ${response.statusText}`)
    }

    const energyData = await response.json()
    let totalUsage = 0
    let totalMinutes = 0
    const averageUsages: Record<string, number> = {}

    for (const [line, usageArray] of Object.entries(energyData)) {
      if (Array.isArray(usageArray)) {
        let lineTotalUsage = 0
        let lineTotalMinutes = 0

        usageArray.forEach((entry: any) => {
          const entryDate = new Date(entry.timestamp)
          if (entryDate >= startDate && entryDate <= endDate) {
            lineTotalUsage += entry.energy
            lineTotalMinutes += 1
          }
        })

        averageUsages[line] = lineTotalMinutes ? lineTotalUsage / (lineTotalMinutes / 12) : 0

        totalUsage += lineTotalUsage
        totalMinutes += lineTotalMinutes
      } else {
        console.warn(`Nieprawidłowy format danych dla linii: ${line}`)
      }
    }

    const avgUsagePerHour = totalMinutes ? totalUsage / (totalMinutes / 12) : 0
    const avgPower = avgUsagePerHour

    return { totalUsage, avgUsagePerHour, avgPower, averageUsages }
  } catch (error) {
    console.error('Błąd podczas przetwarzania danych:', error)
    throw error
  }
}
