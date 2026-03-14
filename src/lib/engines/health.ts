// Health & fitness calculation engines
// DISCLAIMER: For informational purposes only. Not medical advice.

export function calcBMI(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  return { bmi: +bmi.toFixed(1), category };
}

export function calcCalories(weight: number, height: number, age: number, gender: 'male'|'female', activity: string) {
  // Mifflin-St Jeor Equation
  let bmr: number;
  if (gender === 'male') bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  else bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  const factors: Record<string, number> = {
    sedentary: 1.2, lightly_active: 1.375, moderately_active: 1.55,
    very_active: 1.725, extra_active: 1.9
  };
  const tdee = bmr * (factors[activity] ?? 1.55);
  return {
    bmr: +bmr.toFixed(0),
    tdee: +tdee.toFixed(0),
    weightLoss: +(tdee - 500).toFixed(0),
    weightGain: +(tdee + 500).toFixed(0)
  };
}

export function calcBodyFat(gender: 'male'|'female', waist: number, neck: number, height: number, hip?: number) {
  // US Navy formula
  let bodyFat: number;
  if (gender === 'male') {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    const h = hip ?? waist;
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + h - neck) + 0.22100 * Math.log10(height)) - 450;
  }
  return { bodyFat: +Math.max(0, bodyFat).toFixed(1) };
}

export function calcWaterIntake(weightKg: number, activityLevel: string, climate: string) {
  let base = weightKg * 0.033; // liters
  const actAdj: Record<string, number> = { sedentary: 0, light: 0.3, moderate: 0.5, intense: 0.8 };
  const climAdj: Record<string, number> = { cold: -0.2, temperate: 0, hot: 0.4 };
  const total = base + (actAdj[activityLevel] ?? 0) + (climAdj[climate] ?? 0);
  return { liters: +total.toFixed(1), cups: +Math.ceil(total * 4.227).toFixed(0), oz: +(total * 33.814).toFixed(0) };
}

export function calcMacros(calories: number, goal: string) {
  const splits: Record<string, [number,number,number]> = {
    weight_loss: [0.40, 0.30, 0.30],
    muscle_gain: [0.30, 0.35, 0.35],
    maintenance: [0.45, 0.30, 0.25],
    keto: [0.05, 0.25, 0.70],
  };
  const [carbPct, protPct, fatPct] = splits[goal] ?? [0.45, 0.30, 0.25];
  const carbs = (calories * carbPct) / 4;
  const protein = (calories * protPct) / 4;
  const fat = (calories * fatPct) / 9;
  return {
    carbs: +carbs.toFixed(0),
    protein: +protein.toFixed(0),
    fat: +fat.toFixed(0),
    carbCalories: +(calories * carbPct).toFixed(0),
    proteinCalories: +(calories * protPct).toFixed(0),
    fatCalories: +(calories * fatPct).toFixed(0),
  };
}

export function calcRunningPace(distance: number, timeMinutes: number, unit: 'mile'|'km' = 'mile') {
  const paceMinPerUnit = timeMinutes / distance;
  const paceMin = Math.floor(paceMinPerUnit);
  const paceSec = Math.round((paceMinPerUnit - paceMin) * 60);
  const speedMph = unit === 'mile' ? 60 / paceMinPerUnit : (60 / paceMinPerUnit) * 0.621371;
  const speedKph = unit === 'km' ? 60 / paceMinPerUnit : (60 / paceMinPerUnit) * 1.60934;
  return {
    paceStr: `${paceMin}:${String(paceSec).padStart(2,'0')} per ${unit}`,
    speedMph: +speedMph.toFixed(2),
    speedKph: +speedKph.toFixed(2)
  };
}

export function calcTargetHeartRate(age: number, restingHR: number = 60) {
  const maxHR = 220 - age;
  const hrr = maxHR - restingHR;
  const zones = {
    warmup: { min: +(restingHR + hrr * 0.50).toFixed(0), max: +(restingHR + hrr * 0.60).toFixed(0) },
    fatBurn: { min: +(restingHR + hrr * 0.60).toFixed(0), max: +(restingHR + hrr * 0.70).toFixed(0) },
    aerobic: { min: +(restingHR + hrr * 0.70).toFixed(0), max: +(restingHR + hrr * 0.80).toFixed(0) },
    anaerobic: { min: +(restingHR + hrr * 0.80).toFixed(0), max: +(restingHR + hrr * 0.90).toFixed(0) },
    max: { min: +(restingHR + hrr * 0.90).toFixed(0), max: maxHR },
  };
  return { maxHR, zones };
}

export function calcProtein(weightKg: number, goal: string, activityLevel: string) {
  const multipliers: Record<string, number> = {
    sedentary: 0.8, active: 1.2, build_muscle: 1.8, lose_weight: 1.6, athlete: 2.0
  };
  const mult = multipliers[activityLevel] ?? 1.2;
  const dailyG = weightKg * mult;
  return {
    dailyG: +dailyG.toFixed(0),
    perMeal3: +(dailyG / 3).toFixed(0),
    perMeal4: +(dailyG / 4).toFixed(0),
  };
}

export function calcPregnancyDueDate(lmpDate: string) {
  const lmp = new Date(lmpDate);
  const dueDate = new Date(lmp.getTime() + (280 * 24 * 60 * 60 * 1000));
  const today = new Date();
  const weeksPregnant = Math.floor((today.getTime() - lmp.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return {
    dueDate: dueDate.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }),
    weeksPregnant: Math.max(0, weeksPregnant),
    trimester: weeksPregnant < 13 ? 'First' : weeksPregnant < 27 ? 'Second' : 'Third'
  };
}

export function calcOvulation(cycleStartDate: string, cycleLength: number = 28) {
  const start = new Date(cycleStartDate);
  const ovulation = new Date(start.getTime() + ((cycleLength - 14) * 24 * 60 * 60 * 1000));
  const fertileStart = new Date(ovulation.getTime() - (5 * 24 * 60 * 60 * 1000));
  const fertileEnd = new Date(ovulation.getTime() + (1 * 24 * 60 * 60 * 1000));
  const nextPeriod = new Date(start.getTime() + (cycleLength * 24 * 60 * 60 * 1000));
  return {
    ovulationDate: ovulation.toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' }),
    fertileWindowStart: fertileStart.toLocaleDateString('en-US', { month:'long', day:'numeric' }),
    fertileWindowEnd: fertileEnd.toLocaleDateString('en-US', { month:'long', day:'numeric' }),
    nextPeriod: nextPeriod.toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' }),
  };
}

export function calcIdealWeight(heightCm: number, gender: 'male'|'female') {
  // Hamwi formula
  const heightInches = heightCm / 2.54;
  const baseInches = 60;
  const extraInches = Math.max(0, heightInches - baseInches);
  let idealLb: number;
  if (gender === 'male') idealLb = 106 + extraInches * 6;
  else idealLb = 100 + extraInches * 5;
  const idealKg = idealLb * 0.453592;
  const rangeLow = idealLb * 0.9;
  const rangeHigh = idealLb * 1.1;
  return {
    idealLb: +idealLb.toFixed(1),
    idealKg: +idealKg.toFixed(1),
    rangeLowLb: +rangeLow.toFixed(1),
    rangeHighLb: +rangeHigh.toFixed(1)
  };
}

export function calcSleepTime(wakeTime: string, cycleCount: number = 5) {
  const [h, m] = wakeTime.split(':').map(Number);
  const wakeMinutes = h * 60 + m;
  const cycleDuration = 90; // minutes
  const fallAsleepTime = 15; // minutes to fall asleep
  const bedtimes: string[] = [];
  for (let c = cycleCount; c >= 3; c--) {
    const sleepMinutes = wakeMinutes - (c * cycleDuration) - fallAsleepTime;
    const adjusted = ((sleepMinutes % 1440) + 1440) % 1440;
    const bh = Math.floor(adjusted / 60);
    const bm = adjusted % 60;
    bedtimes.push(`${String(bh).padStart(2,'0')}:${String(bm).padStart(2,'0')}`);
  }
  return { bedtimes, recommendation: `${cycleCount} cycles = ${cycleCount * 1.5} hours of sleep` };
}

export function calcVO2Max(age: number, restingHR: number) {
  // Estimate using heart rate
  const vo2max = 15.3 * ((220 - age) / restingHR);
  let fitness = '';
  if (vo2max < 30) fitness = 'Poor';
  else if (vo2max < 40) fitness = 'Fair';
  else if (vo2max < 50) fitness = 'Good';
  else if (vo2max < 60) fitness = 'Excellent';
  else fitness = 'Superior';
  return { vo2max: +vo2max.toFixed(1), fitness };
}
