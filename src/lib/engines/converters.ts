// Unit conversion engines

// Length conversions (all to/from meters)
const LENGTH_TO_METERS: Record<string, number> = {
  mm: 0.001, cm: 0.01, m: 1, km: 1000,
  inch: 0.0254, ft: 0.3048, yd: 0.9144, mile: 1609.344,
  nautical_mile: 1852, furlong: 201.168, chain: 20.1168,
  fathom: 1.8288, hand: 0.1016, rod: 5.0292,
};

export function convertLength(value: number, from: string, to: string) {
  const meters = value * (LENGTH_TO_METERS[from] ?? 1);
  const result = meters / (LENGTH_TO_METERS[to] ?? 1);
  return { result: +result.toFixed(6), from, to };
}

// Specific converters
export function inchesToCm(inches: number) { return { result: +(inches * 2.54).toFixed(4) }; }
export function cmToInches(cm: number) { return { result: +(cm / 2.54).toFixed(4) }; }
export function feetToMeters(feet: number) { return { result: +(feet * 0.3048).toFixed(4) }; }
export function metersToFeet(meters: number) { return { result: +(meters / 0.3048).toFixed(4) }; }
export function milesToKm(miles: number) { return { result: +(miles * 1.60934).toFixed(4) }; }
export function kmToMiles(km: number) { return { result: +(km / 1.60934).toFixed(4) }; }
export function feetToInches(feet: number) { return { result: +(feet * 12).toFixed(4) }; }
export function inchesToFeet(inches: number) { return { result: +(inches / 12).toFixed(4) }; }
export function yardsToMeters(yards: number) { return { result: +(yards * 0.9144).toFixed(4) }; }
export function metersToYards(meters: number) { return { result: +(meters / 0.9144).toFixed(4) }; }
export function milesToFeet(miles: number) { return { result: +(miles * 5280).toFixed(2) }; }
export function feetToMiles(feet: number) { return { result: +(feet / 5280).toFixed(6) }; }
export function mmToInches(mm: number) { return { result: +(mm / 25.4).toFixed(4) }; }
export function inchesToMm(inches: number) { return { result: +(inches * 25.4).toFixed(4) }; }
export function kmToFeet(km: number) { return { result: +(km * 3280.84).toFixed(2) }; }
export function feetToKm(feet: number) { return { result: +(feet / 3280.84).toFixed(6) }; }
export function milesToMeters(miles: number) { return { result: +(miles * 1609.344).toFixed(2) }; }
export function metersToMiles(meters: number) { return { result: +(meters / 1609.344).toFixed(6) }; }
export function inchesToYards(inches: number) { return { result: +(inches / 36).toFixed(4) }; }
export function yardsToInches(yards: number) { return { result: +(yards * 36).toFixed(4) }; }
export function yardsToFeet(yards: number) { return { result: +(yards * 3).toFixed(4) }; }
export function feetToYards(feet: number) { return { result: +(feet / 3).toFixed(4) }; }
export function cmToMm(cm: number) { return { result: +(cm * 10).toFixed(4) }; }
export function mmToCm(mm: number) { return { result: +(mm / 10).toFixed(4) }; }
export function cmToM(cm: number) { return { result: +(cm / 100).toFixed(6) }; }
export function mToCm(m: number) { return { result: +(m * 100).toFixed(4) }; }
export function mToKm(m: number) { return { result: +(m / 1000).toFixed(6) }; }
export function kmToM(km: number) { return { result: +(km * 1000).toFixed(2) }; }

// Weight conversions
const WEIGHT_TO_KG: Record<string, number> = {
  kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495,
  ton_us: 907.185, ton_uk: 1016.047, tonne: 1000,
  stone: 6.35029, grain: 0.0000647989,
};

export function convertWeight(value: number, from: string, to: string) {
  const kg = value * (WEIGHT_TO_KG[from] ?? 1);
  const result = kg / (WEIGHT_TO_KG[to] ?? 1);
  return { result: +result.toFixed(6) };
}

export function poundsToKg(lbs: number) { return { result: +(lbs * 0.453592).toFixed(4) }; }
export function kgToPounds(kg: number) { return { result: +(kg / 0.453592).toFixed(4) }; }
export function ouncesToGrams(oz: number) { return { result: +(oz * 28.3495).toFixed(4) }; }
export function gramsToOunces(g: number) { return { result: +(g / 28.3495).toFixed(4) }; }
export function stonesToPounds(stones: number) { return { result: +(stones * 14).toFixed(4) }; }
export function poundsToStones(lbs: number) { return { result: +(lbs / 14).toFixed(4) }; }
export function kgToGrams(kg: number) { return { result: +(kg * 1000).toFixed(2) }; }
export function gramsToKg(g: number) { return { result: +(g / 1000).toFixed(6) }; }
export function tonToKg(tons: number) { return { result: +(tons * 907.185).toFixed(2) }; }
export function kgToTon(kg: number) { return { result: +(kg / 907.185).toFixed(6) }; }
export function lbsToOunces(lbs: number) { return { result: +(lbs * 16).toFixed(4) }; }
export function ouncesToLbs(oz: number) { return { result: +(oz / 16).toFixed(6) }; }

// Temperature
export function celsiusToFahrenheit(c: number) { return { result: +((c * 9/5) + 32).toFixed(2) }; }
export function fahrenheitToCelsius(f: number) { return { result: +((f - 32) * 5/9).toFixed(2) }; }
export function celsiusToKelvin(c: number) { return { result: +(c + 273.15).toFixed(2) }; }
export function kelvinToCelsius(k: number) { return { result: +(k - 273.15).toFixed(2) }; }
export function fahrenheitToKelvin(f: number) { return { result: +((f - 32) * 5/9 + 273.15).toFixed(2) }; }
export function kelvinToFahrenheit(k: number) { return { result: +((k - 273.15) * 9/5 + 32).toFixed(2) }; }

// Volume
const VOLUME_TO_LITERS: Record<string, number> = {
  liter: 1, ml: 0.001, gal_us: 3.78541, gal_uk: 4.54609,
  qt: 0.946353, pt: 0.473176, cup: 0.236588, fl_oz: 0.0295735,
  tbsp: 0.0147868, tsp: 0.00492892, cubic_m: 1000,
  cubic_ft: 28.3168, cubic_in: 0.0163871,
};

export function convertVolume(value: number, from: string, to: string) {
  const liters = value * (VOLUME_TO_LITERS[from] ?? 1);
  const result = liters / (VOLUME_TO_LITERS[to] ?? 1);
  return { result: +result.toFixed(6) };
}

export function gallonsToLiters(gal: number) { return { result: +(gal * 3.78541).toFixed(4) }; }
export function litersToGallons(l: number) { return { result: +(l / 3.78541).toFixed(4) }; }
export function mlToOunces(ml: number) { return { result: +(ml / 29.5735).toFixed(4) }; }
export function ouncesToMl(oz: number) { return { result: +(oz * 29.5735).toFixed(4) }; }
export function cupsToMl(cups: number) { return { result: +(cups * 236.588).toFixed(2) }; }
export function mlToCups(ml: number) { return { result: +(ml / 236.588).toFixed(4) }; }
export function litersToMl(l: number) { return { result: +(l * 1000).toFixed(2) }; }
export function mlToLiters(ml: number) { return { result: +(ml / 1000).toFixed(6) }; }
export function quartsToLiters(qt: number) { return { result: +(qt * 0.946353).toFixed(4) }; }
export function litersToQuarts(l: number) { return { result: +(l / 0.946353).toFixed(4) }; }
export function pintsToMl(pt: number) { return { result: +(pt * 473.176).toFixed(2) }; }
export function mlToPints(ml: number) { return { result: +(ml / 473.176).toFixed(4) }; }
export function tablespoonToMl(tbsp: number) { return { result: +(tbsp * 14.7868).toFixed(4) }; }
export function mlToTablespoon(ml: number) { return { result: +(ml / 14.7868).toFixed(4) }; }
export function teaspoonToMl(tsp: number) { return { result: +(tsp * 4.92892).toFixed(4) }; }
export function mlToTeaspoon(ml: number) { return { result: +(ml / 4.92892).toFixed(4) }; }
export function cubicFeetToGallons(cf: number) { return { result: +(cf * 7.48052).toFixed(4) }; }
export function gallonsToCubicFeet(gal: number) { return { result: +(gal / 7.48052).toFixed(4) }; }
export function ukGallonsToUsGallons(ukgal: number) { return { result: +(ukgal * 1.20095).toFixed(4) }; }
export function usGallonsToUkGallons(usgal: number) { return { result: +(usgal / 1.20095).toFixed(4) }; }
export function litersToOunces(l: number) { return { result: +(l * 33.8141).toFixed(2) }; }
export function ouncesToLiters(oz: number) { return { result: +(oz / 33.8141).toFixed(4) }; }

// Area
export function acresToSqFt(acres: number) { return { result: +(acres * 43560).toFixed(2) }; }
export function sqFtToAcres(sqft: number) { return { result: +(sqft / 43560).toFixed(6) }; }
export function sqFtToSqM(sqft: number) { return { result: +(sqft * 0.0929).toFixed(4) }; }
export function sqMToSqFt(sqm: number) { return { result: +(sqm / 0.0929).toFixed(4) }; }
export function hectaresToAcres(ha: number) { return { result: +(ha * 2.47105).toFixed(4) }; }
export function acresToHectares(acres: number) { return { result: +(acres / 2.47105).toFixed(4) }; }
export function sqKmToSqMiles(sqkm: number) { return { result: +(sqkm * 0.386102).toFixed(4) }; }
export function sqMilesToSqKm(sqmi: number) { return { result: +(sqmi / 0.386102).toFixed(4) }; }
export function sqInchesToSqCm(sqin: number) { return { result: +(sqin * 6.4516).toFixed(4) }; }
export function sqCmToSqInches(sqcm: number) { return { result: +(sqcm / 6.4516).toFixed(4) }; }
export function sqYardsToSqFt(sqyd: number) { return { result: +(sqyd * 9).toFixed(2) }; }
export function sqFtToSqYards(sqft: number) { return { result: +(sqft / 9).toFixed(4) }; }
export function sqMilesToAcres(sqmi: number) { return { result: +(sqmi * 640).toFixed(2) }; }
export function acresToSqMiles(acres: number) { return { result: +(acres / 640).toFixed(6) }; }

// Pressure
export function psiToBar(psi: number) { return { result: +(psi * 0.0689476).toFixed(4) }; }
export function barToPsi(bar: number) { return { result: +(bar / 0.0689476).toFixed(4) }; }
export function psiToKpa(psi: number) { return { result: +(psi * 6.89476).toFixed(4) }; }
export function kpaToPsi(kpa: number) { return { result: +(kpa / 6.89476).toFixed(4) }; }
export function atmToPsi(atm: number) { return { result: +(atm * 14.696).toFixed(4) }; }
export function psiToAtm(psi: number) { return { result: +(psi / 14.696).toFixed(6) }; }
export function barToKpa(bar: number) { return { result: +(bar * 100).toFixed(2) }; }
export function kpaToBar(kpa: number) { return { result: +(kpa / 100).toFixed(6) }; }
export function paToKpa(pa: number) { return { result: +(pa / 1000).toFixed(6) }; }
export function kpaToPa(kpa: number) { return { result: +(kpa * 1000).toFixed(2) }; }
export function barToAtm(bar: number) { return { result: +(bar / 1.01325).toFixed(4) }; }
export function atmToBar(atm: number) { return { result: +(atm * 1.01325).toFixed(4) }; }
export function mmhgToPsi(mmhg: number) { return { result: +(mmhg * 0.0193368).toFixed(6) }; }
export function psiToMmhg(psi: number) { return { result: +(psi / 0.0193368).toFixed(2) }; }

// Speed
export function mphToKph(mph: number) { return { result: +(mph * 1.60934).toFixed(4) }; }
export function kphToMph(kph: number) { return { result: +(kph / 1.60934).toFixed(4) }; }
export function mphToMs(mph: number) { return { result: +(mph * 0.44704).toFixed(4) }; }
export function msToMph(ms: number) { return { result: +(ms / 0.44704).toFixed(4) }; }
export function kphToMs(kph: number) { return { result: +(kph / 3.6).toFixed(4) }; }
export function msToKph(ms: number) { return { result: +(ms * 3.6).toFixed(4) }; }
export function knotsToMph(knots: number) { return { result: +(knots * 1.15078).toFixed(4) }; }
export function mphToKnots(mph: number) { return { result: +(mph / 1.15078).toFixed(4) }; }
export function knotsToKph(knots: number) { return { result: +(knots * 1.852).toFixed(4) }; }
export function kphToKnots(kph: number) { return { result: +(kph / 1.852).toFixed(4) }; }
export function mphToFps(mph: number) { return { result: +(mph * 1.46667).toFixed(4) }; }
export function fpsToMph(fps: number) { return { result: +(fps / 1.46667).toFixed(4) }; }

// Energy
export function joulestoKcal(j: number) { return { result: +(j / 4184).toFixed(6) }; }
export function kcalToJoules(kcal: number) { return { result: +(kcal * 4184).toFixed(2) }; }
export function kwhToJoules(kwh: number) { return { result: +(kwh * 3600000).toFixed(0) }; }
export function joulesToKwh(j: number) { return { result: +(j / 3600000).toFixed(8) }; }
export function btuToKwh(btu: number) { return { result: +(btu * 0.000293071).toFixed(6) }; }
export function kwhToBtu(kwh: number) { return { result: +(kwh / 0.000293071).toFixed(2) }; }
export function btuToJoules(btu: number) { return { result: +(btu * 1055.06).toFixed(2) }; }
export function joulesToBtu(j: number) { return { result: +(j / 1055.06).toFixed(6) }; }
export function caloriesToJoules(cal: number) { return { result: +(cal * 4.184).toFixed(4) }; }
export function joulesToCalories(j: number) { return { result: +(j / 4.184).toFixed(4) }; }

// Data
export function gbToMb(gb: number) { return { result: +(gb * 1024).toFixed(4) }; }
export function mbToGb(mb: number) { return { result: +(mb / 1024).toFixed(6) }; }
export function tbToGb(tb: number) { return { result: +(tb * 1024).toFixed(4) }; }
export function gbToTb(gb: number) { return { result: +(gb / 1024).toFixed(6) }; }
export function mbToKb(mb: number) { return { result: +(mb * 1024).toFixed(2) }; }
export function kbToMb(kb: number) { return { result: +(kb / 1024).toFixed(6) }; }
export function gbToBytes(gb: number) { return { result: +(gb * 1073741824).toFixed(0) }; }
export function bytesToGb(bytes: number) { return { result: +(bytes / 1073741824).toFixed(8) }; }
export function kbToBytes(kb: number) { return { result: +(kb * 1024).toFixed(0) }; }
export function bytesToKb(bytes: number) { return { result: +(bytes / 1024).toFixed(4) }; }
export function mbToBytes(mb: number) { return { result: +(mb * 1048576).toFixed(0) }; }
export function bytesToMb(bytes: number) { return { result: +(bytes / 1048576).toFixed(6) }; }
export function tbToBytes(tb: number) { return { result: +(tb * 1099511627776).toFixed(0) }; }

// Time
export function secondsToMinutes(s: number) { return { result: +(s / 60).toFixed(4) }; }
export function minutesToSeconds(m: number) { return { result: +(m * 60).toFixed(2) }; }
export function minutesToHours(m: number) { return { result: +(m / 60).toFixed(4) }; }
export function hoursToMinutes(h: number) { return { result: +(h * 60).toFixed(2) }; }
export function hoursToDays(h: number) { return { result: +(h / 24).toFixed(4) }; }
export function daysToHours(d: number) { return { result: +(d * 24).toFixed(2) }; }
export function daysToWeeks(d: number) { return { result: +(d / 7).toFixed(4) }; }
export function weeksToDays(w: number) { return { result: +(w * 7).toFixed(2) }; }
export function hoursToSeconds(h: number) { return { result: +(h * 3600).toFixed(2) }; }
export function secondsToHours(s: number) { return { result: +(s / 3600).toFixed(6) }; }
export function daysToSeconds(d: number) { return { result: +(d * 86400).toFixed(0) }; }
export function secondsToDays(s: number) { return { result: +(s / 86400).toFixed(6) }; }
export function weeksToHours(w: number) { return { result: +(w * 168).toFixed(2) }; }
export function hoursToWeeks(h: number) { return { result: +(h / 168).toFixed(6) }; }
export function monthsToDays(m: number) { return { result: +(m * 30.4375).toFixed(2) }; }
export function daysToMonths(d: number) { return { result: +(d / 30.4375).toFixed(4) }; }
export function yearsToMonths(y: number) { return { result: +(y * 12).toFixed(2) }; }
export function monthsToYears(m: number) { return { result: +(m / 12).toFixed(4) }; }
export function yearsToDays(y: number) { return { result: +(y * 365.25).toFixed(2) }; }
export function daysToYears(d: number) { return { result: +(d / 365.25).toFixed(6) }; }

// Angle
export function degreesToRadians(deg: number) { return { result: +(deg * Math.PI / 180).toFixed(6) }; }
export function radiansToDegrees(rad: number) { return { result: +(rad * 180 / Math.PI).toFixed(4) }; }
export function degreesToGradians(deg: number) { return { result: +(deg * 10/9).toFixed(4) }; }
export function gradiansToDegrees(grad: number) { return { result: +(grad * 9/10).toFixed(4) }; }
