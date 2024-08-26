"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Funkcja generująca losowe zużycie energii dla jednej linii produkcyjnej
function generateEnergyConsumption(line, startDate, endDate, intervalMinutes) {
    var data = [];
    var currentTime = startDate;
    var _loop_1 = function () {
        var dayOfWeek = currentTime.getDay();
        var currentHour = currentTime.getHours();
        var isWorking = line.shifts.some(function (shift) {
            return shift.workDays.has(dayOfWeek) &&
                currentHour >= shift.startHour &&
                currentHour < shift.endHour;
        });
        var consumption = isWorking ? Math.random() * 100 : 0; // Losowe zużycie energii lub 0, jeśli linia nie pracuje
        data.push(consumption);
        currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    };
    while (currentTime <= endDate) {
        _loop_1();
    }
    return data;
}
// Definicja linii produkcyjnych i ich harmonogramów pracy
var lines = [
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
];
// Parametry symulacji
var startDate = new Date('2023-05-01T00:00:00');
var endDate = new Date('2023-08-01T00:00:00');
var intervalMinutes = 5;
// Generowanie danych dla każdej linii produkcyjnej
var energyConsumptionData = {};
lines.forEach(function (line) {
    energyConsumptionData[line.name] = generateEnergyConsumption(line, startDate, endDate, intervalMinutes);
});
// Zapisanie danych do pliku JSON
fs.writeFileSync('symulacja_zuzycia_energii.json', JSON.stringify(energyConsumptionData, null, 2));
console.log('Dane symulacyjne zostały wygenerowane i zapisane do pliku symulacja_zuzycia_energii.json.');
