// Everyday life tools

export function calcAge(birthdate: string) {
  const birth = new Date(birthdate);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  if (days < 0) { months--; days += 30; }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000*60*60*24));
  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000*60*60*24));
  return { years, months, days, totalDays, daysUntilBirthday };
}

export function calcDateDiff(date1: string, date2: string) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const days = Math.floor(diffMs / (1000*60*60*24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.4375);
  const years = Math.floor(days / 365.25);
  const hours = Math.floor(diffMs / (1000*60*60));
  const minutes = Math.floor(diffMs / (1000*60));
  return { days, weeks, months, years, hours, minutes };
}

export function calcCountdown(targetDate: string) {
  const target = new Date(targetDate);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  if (diffMs < 0) return { expired: true, message: 'This date has passed' };
  const days = Math.floor(diffMs / (1000*60*60*24));
  const hours = Math.floor((diffMs % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((diffMs % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((diffMs % (1000*60)) / 1000);
  return { expired: false, days, hours, minutes, seconds };
}

export function calcTimeZone(time: string, fromZone: string, toZone: string) {
  try {
    const d = new Date(`2024-01-01T${time}:00`);
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: toZone, hour: '2-digit', minute: '2-digit', hour12: true
    });
    return { result: formatter.format(d), from: fromZone, to: toZone };
  } catch {
    return { error: 'Invalid timezone' };
  }
}

export function calcSplitBill(total: number, people: number, tipPct: number = 0) {
  const tip = total * tipPct / 100;
  const grandTotal = total + tip;
  const perPerson = grandTotal / people;
  return {
    subtotal: +total.toFixed(2),
    tip: +tip.toFixed(2),
    grandTotal: +grandTotal.toFixed(2),
    perPerson: +perPerson.toFixed(2)
  };
}

export function calcTimeAdd(time: string, hoursToAdd: number, minutesToAdd: number = 0) {
  const [h, m] = time.split(':').map(Number);
  let totalMinutes = h * 60 + m + hoursToAdd * 60 + minutesToAdd;
  const days = Math.floor(totalMinutes / 1440);
  totalMinutes = totalMinutes % 1440;
  const newH = Math.floor(totalMinutes / 60);
  const newM = totalMinutes % 60;
  const period = newH >= 12 ? 'PM' : 'AM';
  const h12 = newH % 12 || 12;
  return {
    time24: `${String(newH).padStart(2,'0')}:${String(newM).padStart(2,'0')}`,
    time12: `${h12}:${String(newM).padStart(2,'0')} ${period}`,
    daysAdded: days
  };
}

export function calcHoursWorked(startTime: string, endTime: string, breakMinutes: number = 0) {
  const toMinutes = (t: string) => {
    const [h,m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  let diffMin = toMinutes(endTime) - toMinutes(startTime);
  if (diffMin < 0) diffMin += 1440; // next day
  diffMin -= breakMinutes;
  const hours = Math.floor(diffMin / 60);
  const minutes = diffMin % 60;
  const decimalHours = diffMin / 60;
  return { hours, minutes, decimalHours: +decimalHours.toFixed(2), totalMinutes: diffMin };
}

export function calcGrade(score: number, maxScore: number) {
  const pct = (score / maxScore) * 100;
  let letter = '';
  if (pct >= 90) letter = 'A';
  else if (pct >= 80) letter = 'B';
  else if (pct >= 70) letter = 'C';
  else if (pct >= 60) letter = 'D';
  else letter = 'F';
  return { percentage: +pct.toFixed(2), letter, passed: pct >= 60 };
}

export function calcGPA(grades: Array<{grade: string, credits: number}>) {
  const gradePoints: Record<string,number> = {
    'A+':4.0,'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,
    'C+':2.3,'C':2.0,'C-':1.7,'D+':1.3,'D':1.0,'D-':0.7,'F':0.0
  };
  let totalPoints = 0, totalCredits = 0;
  for (const g of grades) {
    const gp = gradePoints[g.grade] ?? 0;
    totalPoints += gp * g.credits;
    totalCredits += g.credits;
  }
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  return { gpa: +gpa.toFixed(2), totalCredits };
}

export function calcFuelCost(miles: number, mpg: number, pricePerGallon: number) {
  const gallons = miles / mpg;
  const cost = gallons * pricePerGallon;
  const costPerMile = cost / miles;
  return {
    gallons: +gallons.toFixed(2),
    cost: +cost.toFixed(2),
    costPerMile: +costPerMile.toFixed(4)
  };
}

export function calcPetrolLitersCost(km: number, lPer100Km: number, pricePerLiter: number) {
  const liters = (km * lPer100Km) / 100;
  const cost = liters * pricePerLiter;
  return { liters: +liters.toFixed(2), cost: +cost.toFixed(2) };
}

export function calcElectricityBill(kwh: number, ratePerKwh: number, days: number = 30) {
  const dailyKwh = kwh / days;
  const monthlyBill = kwh * ratePerKwh;
  const annualBill = monthlyBill * 12;
  return {
    dailyKwh: +dailyKwh.toFixed(2),
    monthlyBill: +monthlyBill.toFixed(2),
    annualBill: +annualBill.toFixed(2),
    costPerKwh: ratePerKwh
  };
}

export function calcLoanPayoff(balance: number, interestRate: number, monthlyPayment: number) {
  const r = interestRate / 100 / 12;
  let months = 0;
  let remaining = balance;
  let totalInterest = 0;
  while (remaining > 0.01 && months < 1200) {
    const interest = remaining * r;
    totalInterest += interest;
    remaining = remaining + interest - monthlyPayment;
    months++;
    if (remaining < 0) remaining = 0;
  }
  const years = Math.floor(months / 12);
  const m = months % 12;
  return {
    months,
    timeStr: `${years} years, ${m} months`,
    totalInterest: +totalInterest.toFixed(2),
    totalPaid: +(balance + totalInterest).toFixed(2)
  };
}

export function calcBabyNameGenerator(gender: string, style: string) {
  const names: Record<string, Record<string, string[]>> = {
    classic: {
      boy: ['James','William','Henry','George','Charles','Edward','Thomas','Arthur','Frederick','Albert'],
      girl: ['Elizabeth','Mary','Anne','Catherine','Victoria','Margaret','Eleanor','Charlotte','Grace','Helen']
    },
    modern: {
      boy: ['Aiden','Liam','Noah','Oliver','Elijah','Lucas','Mason','Logan','Ethan','Jayden'],
      girl: ['Olivia','Emma','Ava','Sophia','Isabella','Mia','Charlotte','Amelia','Harper','Evelyn']
    },
    unique: {
      boy: ['Zephyr','Caspian','Orion','Evander','Theron','Leander','Stellan','Peregrine','Ansel','Cormac'],
      girl: ['Seraphina','Lyra','Calliope','Thessaly','Elowen','Soleil','Vesper','Niamh','Isolde','Aurelia']
    }
  };
  const pool = names[style]?.[gender==='male'?'boy':'girl'] ?? names.classic.boy;
  const picks = [...pool].sort(() => Math.random()-0.5).slice(0,5);
  return { names: picks };
}

export function calcPizzaCalories(slices: number, size: 'small'|'medium'|'large', type: string) {
  const calPerSlice: Record<string, Record<string, number>> = {
    cheese: { small: 200, medium: 250, large: 300 },
    pepperoni: { small: 240, medium: 300, large: 360 },
    veggie: { small: 180, medium: 220, large: 265 },
    meat: { small: 280, medium: 340, large: 410 },
  };
  const cal = (calPerSlice[type]?.[size] ?? 250) * slices;
  return { totalCalories: cal, caloriesPerSlice: calPerSlice[type]?.[size] ?? 250 };
}

export function calcCoffeeCalories(shots: number, milkType: string, syrups: number, size: 'small'|'medium'|'large') {
  const espressoCal = shots * 5;
  const milkCal: Record<string, Record<string, number>> = {
    whole: { small: 75, medium: 110, large: 150 },
    skim: { small: 45, medium: 65, large: 90 },
    oat: { small: 50, medium: 75, large: 100 },
    almond: { small: 15, medium: 25, large: 35 },
    none: { small: 0, medium: 0, large: 0 },
  };
  const milk = milkCal[milkType]?.[size] ?? 0;
  const syrupCal = syrups * 20;
  const total = espressoCal + milk + syrupCal;
  return { total, espresso: espressoCal, milk, syrups: syrupCal };
}

export function calcDaysUntilDate(targetDate: string) {
  const target = new Date(targetDate);
  const today = new Date();
  today.setHours(0,0,0,0);
  target.setHours(0,0,0,0);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000*60*60*24));
  return { days: diff, past: diff < 0, message: diff > 0 ? `${diff} days to go` : diff === 0 ? 'Today!' : `${Math.abs(diff)} days ago` };
}

export function calcDayOfWeek(date: string) {
  const d = new Date(date);
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayName = days[d.getDay()];
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
  return {
    dayName,
    dayNum: d.getDay() + 1,
    monthName: months[d.getMonth()],
    year: d.getFullYear(),
    isWeekend,
    formatted: d.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
  };
}
