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
    const response = await fetch('/symulacja_zuzycia_energii.json') // Ścieżka względna lub absolutna

    if (!response.ok) {
      throw new Error(`Błąd sieciowy podczas ładowania danych: ${response.statusText}`)
    }

    const energyData = await response.json()
    let totalUsage = 0
    let totalMinutes = 0
    const averageUsages: Record<string, number> = {}

    // Iteracja przez wszystkie klucze (linie) w danych
    for (const [line, usageArray] of Object.entries(energyData)) {
      if (Array.isArray(usageArray)) {
        let lineTotalUsage = 0
        let lineTotalMinutes = 0

        usageArray.forEach((entry: any) => {
          const entryDate = new Date(entry.timestamp) // Zakładamy, że timestamp jest częścią danych

          // Filtrowanie danych według daty
          if (entryDate >= startDate && entryDate <= endDate) {
            lineTotalUsage += entry.energy
            lineTotalMinutes += 1 // Zliczamy każdą próbkę
          }
        })

        // Obliczanie średniego zużycia energii na godzinę dla każdej maszyny
        averageUsages[line] = lineTotalMinutes
          ? lineTotalUsage / (lineTotalMinutes / 12) // 12 próbek na godzinę (5-minutowe interwały)
          : 0

        totalUsage += lineTotalUsage
        totalMinutes += lineTotalMinutes
      } else {
        throw new Error(`Nieprawidłowy format danych dla linii: ${line}`)
      }
    }

    // Obliczanie średniego zużycia energii na godzinę
    const avgUsagePerHour = totalMinutes ? totalUsage / (totalMinutes / 12) : 0

    // Zakładamy, że "avgPower" to średnia moc, która może być obliczana na podstawie "avgUsagePerHour"
    // Możesz dostosować tę formułę w zależności od konkretnych potrzeb
    const avgPower = avgUsagePerHour // Możesz dostosować tę formułę w zależności od konkretnych danych dotyczących mocy

    // Zwracanie danych jako obiekt
    return { totalUsage, avgUsagePerHour, avgPower, averageUsages }
  } catch (error) {
    console.error('Błąd podczas przetwarzania danych:', error)
    throw error // Przekazanie błędu dalej, aby można było go obsłużyć wyżej
  }
}
