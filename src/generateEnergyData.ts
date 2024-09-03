import * as fs from 'fs'

interface Shift {
  startHour: number
  endHour: number
  workDays: Set<number> // 0: Sunday, 1: Monday, ..., 6: Saturday
}

interface Line {
  name: string
  shifts: Shift[]
}

// Funkcja generująca losowe zużycie energii dla jednej linii produkcyjnej
function generateEnergyConsumption(
  line: Line,
  startDate: Date,
  endDate: Date,
  intervalMinutes: number
): number[] {
  const data: number[] = []
  let currentTime = new Date(startDate) // Tworzymy nową instancję dla uniknięcia mutacji

  while (currentTime <= endDate) {
    const dayOfWeek = currentTime.getDay()
    const currentHour = currentTime.getHours()

    const isWorking = line.shifts.some(
      (shift) =>
        shift.workDays.has(dayOfWeek) &&
        currentHour >= shift.startHour &&
        currentHour < shift.endHour
    )

    const consumption = isWorking ? Math.random() * 100 : 0 // Losowe zużycie energii lub 0, jeśli linia nie pracuje
    data.push(consumption)

    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes)
  }

  return data
}

// Definicja linii produkcyjnych i ich harmonogramów pracy
const lines: Line[] = [
  {
    name: 'Packer1',
    shifts: [
      { startHour: 7, endHour: 15, workDays: new Set([1, 2, 3, 4, 5]) },
      { startHour: 16, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }
    ]
  },
  { name: 'Packer2', shifts: [{ startHour: 0, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }] },
  { name: 'Packer3', shifts: [{ startHour: 0, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }] },
  {
    name: 'Packer4',
    shifts: [{ startHour: 8, endHour: 16, workDays: new Set([0, 1, 2, 3, 4, 5, 6]) }]
  },
  {
    name: 'Packer5',
    shifts: [
      { startHour: 7, endHour: 15, workDays: new Set([1, 2, 3, 4, 5]) },
      { startHour: 16, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }
    ]
  },
  {
    name: 'Packer6',
    shifts: [{ startHour: 8, endHour: 16, workDays: new Set([0, 1, 2, 3, 4, 5, 6]) }]
  },
  {
    name: 'Packer7',
    shifts: [{ startHour: 8, endHour: 16, workDays: new Set([0, 1, 2, 3, 4, 5, 6]) }]
  },
  {
    name: 'Packer8',
    shifts: [
      { startHour: 7, endHour: 15, workDays: new Set([1, 2, 3, 4, 5]) },
      { startHour: 16, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }
    ]
  },
  { name: 'Packer9', shifts: [{ startHour: 0, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }] },
  {
    name: 'Packer10',
    shifts: [{ startHour: 8, endHour: 16, workDays: new Set([0, 1, 2, 3, 4, 5, 6]) }]
  }
]

// Parametry symulacji
const startDate = new Date('2023-05-01T00:00:00')
const endDate = new Date('2023-08-01T00:00:00')
const intervalMinutes = 5

// Generowanie danych dla każdej linii produkcyjnej
const energyConsumptionData: { [key: string]: number[] } = {}
const failedLines = new Set<string>()

lines.forEach((line) => failedLines.add(line.name))

while (failedLines.size > 0) {
  lines.forEach((line) => {
    if (!failedLines.has(line.name)) {
      return // Skip lines that already have data generated
    }

    try {
      const data = generateEnergyConsumption(line, startDate, endDate, intervalMinutes)
      energyConsumptionData[line.name] = data
      failedLines.delete(line.name)

      // Debugowanie
      console.log(`Dane dla ${line.name} wygenerowane pomyślnie.`)
    } catch (error) {
      console.error(`Błąd podczas generowania danych dla ${line.name}:`, error)
    }
  })
}

// Weryfikacja poprawności danych przed zapisem
console.log('Weryfikacja danych przed zapisaniem do pliku:')
Object.entries(energyConsumptionData).forEach(([lineName, data]) => {
  console.log(
    `Linia: ${lineName}, Liczba rekordów: ${data.length}, Pierwsze 5 wartości: ${data.slice(0, 5)}`
  )
})

// Zapisanie danych do pliku JSON
try {
  fs.writeFileSync('symulacja_zuzycia_energii.json', JSON.stringify(energyConsumptionData, null, 2))
  console.log(
    'Dane symulacyjne zostały wygenerowane i zapisane do pliku symulacja_zuzycia_energii.json.'
  )
} catch (error) {
  console.error('Błąd podczas zapisywania pliku:', error)
}
