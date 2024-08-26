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
  let currentTime = startDate

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
    name: 'Parker1',
    shifts: [
      { startHour: 7, endHour: 15, workDays: new Set([1, 2, 3, 4, 5]) },
      { startHour: 16, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }
    ]
  },
  { name: 'Parker2', shifts: [{ startHour: 0, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }] },
  { name: 'Parker3', shifts: [{ startHour: 0, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }] },
  {
    name: 'Parker4',
    shifts: [{ startHour: 8, endHour: 16, workDays: new Set([0, 1, 2, 3, 4, 5, 6]) }]
  },
  {
    name: 'Parker5',
    shifts: [
      { startHour: 7, endHour: 15, workDays: new Set([1, 2, 3, 4, 5]) },
      { startHour: 16, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }
    ]
  },
  {
    name: 'Parker6',
    shifts: [{ startHour: 8, endHour: 16, workDays: new Set([0, 1, 2, 3, 4, 5, 6]) }]
  },
  {
    name: 'Parker7',
    shifts: [{ startHour: 8, endHour: 16, workDays: new Set([0, 1, 2, 3, 4, 5, 6]) }]
  },
  {
    name: 'Parker8',
    shifts: [
      { startHour: 7, endHour: 15, workDays: new Set([1, 2, 3, 4, 5]) },
      { startHour: 16, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }
    ]
  },
  { name: 'Parker9', shifts: [{ startHour: 0, endHour: 24, workDays: new Set([1, 2, 3, 4, 5]) }] },
  {
    name: 'Parker10',
    shifts: [{ startHour: 8, endHour: 16, workDays: new Set([0, 1, 2, 3, 4, 5, 6]) }]
  }
]

// Parametry symulacji
const startDate = new Date('2023-05-01T00:00:00')
const endDate = new Date('2023-08-01T00:00:00')
const intervalMinutes = 5

// Generowanie danych dla każdej linii produkcyjnej
const energyConsumptionData: { [key: string]: number[] } = {}
lines.forEach((line) => {
  energyConsumptionData[line.name] = generateEnergyConsumption(
    line,
    startDate,
    endDate,
    intervalMinutes
  )
})

// Zapisanie danych do pliku JSON
fs.writeFileSync('symulacja_zuzycia_energii.json', JSON.stringify(energyConsumptionData, null, 2))

console.log(
  'Dane symulacyjne zostały wygenerowane i zapisane do pliku symulacja_zuzycia_energii.json.'
)
