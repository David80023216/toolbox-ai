// Finance calculation engines

export function calcLoan(principal: number, annualRate: number, termMonths: number) {
  if (annualRate === 0) return { payment: principal / termMonths, totalPaid: principal, totalInterest: 0 };
  const r = annualRate / 100 / 12;
  const payment = principal * (r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
  const totalPaid = payment * termMonths;
  const totalInterest = totalPaid - principal;
  return { payment: +payment.toFixed(2), totalPaid: +totalPaid.toFixed(2), totalInterest: +totalInterest.toFixed(2) };
}

export function calcCompoundInterest(principal: number, rate: number, years: number, n: number = 12) {
  const amount = principal * Math.pow(1 + rate / 100 / n, n * years);
  const interest = amount - principal;
  return { amount: +amount.toFixed(2), interest: +interest.toFixed(2) };
}

export function calcSimpleInterest(principal: number, rate: number, years: number) {
  const interest = principal * rate / 100 * years;
  return { interest: +interest.toFixed(2), total: +(principal + interest).toFixed(2) };
}

export function calcRetirement(currentAge: number, retireAge: number, currentSavings: number, monthlyContrib: number, annualReturn: number) {
  const years = retireAge - currentAge;
  const r = annualReturn / 100 / 12;
  const months = years * 12;
  const fvSavings = currentSavings * Math.pow(1 + r, months);
  const fvContrib = monthlyContrib * (Math.pow(1 + r, months) - 1) / r;
  const total = fvSavings + fvContrib;
  return { total: +total.toFixed(2), years };
}

export function calcProfitMargin(revenue: number, cost: number) {
  if (revenue === 0) return { margin: 0, profit: 0 };
  const profit = revenue - cost;
  const margin = (profit / revenue) * 100;
  return { margin: +margin.toFixed(2), profit: +profit.toFixed(2) };
}

export function calcMarkup(cost: number, markupPct: number) {
  const price = cost * (1 + markupPct / 100);
  const profit = price - cost;
  return { price: +price.toFixed(2), profit: +profit.toFixed(2) };
}

export function calcDiscount(originalPrice: number, discountPct: number) {
  const savings = originalPrice * discountPct / 100;
  const finalPrice = originalPrice - savings;
  return { finalPrice: +finalPrice.toFixed(2), savings: +savings.toFixed(2) };
}

export function calcBreakEven(fixedCosts: number, pricePerUnit: number, variableCostPerUnit: number) {
  const contribution = pricePerUnit - variableCostPerUnit;
  if (contribution <= 0) return { units: null, revenue: null };
  const units = fixedCosts / contribution;
  const revenue = units * pricePerUnit;
  return { units: +units.toFixed(0), revenue: +revenue.toFixed(2) };
}

export function calcCommission(saleAmount: number, commissionPct: number) {
  const commission = saleAmount * commissionPct / 100;
  return { commission: +commission.toFixed(2), net: +(saleAmount - commission).toFixed(2) };
}

export function calcPaycheck(hourlyRate: number, hoursPerWeek: number, taxRate: number) {
  const grossWeekly = hourlyRate * hoursPerWeek;
  const grossAnnual = grossWeekly * 52;
  const taxWeekly = grossWeekly * taxRate / 100;
  const netWeekly = grossWeekly - taxWeekly;
  return { grossWeekly: +grossWeekly.toFixed(2), netWeekly: +netWeekly.toFixed(2), grossAnnual: +grossAnnual.toFixed(2) };
}

export function calcHourlyToSalary(hourlyRate: number, hoursPerWeek: number = 40) {
  const annual = hourlyRate * hoursPerWeek * 52;
  const monthly = annual / 12;
  const biweekly = annual / 26;
  return { annual: +annual.toFixed(2), monthly: +monthly.toFixed(2), biweekly: +biweekly.toFixed(2) };
}

export function calcSalaryToHourly(annualSalary: number, hoursPerWeek: number = 40) {
  const hourly = annualSalary / 52 / hoursPerWeek;
  const monthly = annualSalary / 12;
  return { hourly: +hourly.toFixed(2), monthly: +monthly.toFixed(2) };
}

export function calcOvertime(regularRate: number, regularHours: number, overtimeHours: number, multiplier: number = 1.5) {
  const regularPay = regularRate * regularHours;
  const overtimePay = regularRate * multiplier * overtimeHours;
  const totalPay = regularPay + overtimePay;
  return { regularPay: +regularPay.toFixed(2), overtimePay: +overtimePay.toFixed(2), totalPay: +totalPay.toFixed(2) };
}

export function calcAPR(loanAmount: number, fees: number, monthlyPayment: number, termMonths: number) {
  // Approximate APR using Newton's method
  const totalLoan = loanAmount - fees;
  let r = 0.05 / 12;
  for (let i = 0; i < 1000; i++) {
    const f = totalLoan * r * Math.pow(1+r,termMonths) / (Math.pow(1+r,termMonths)-1) - monthlyPayment;
    const df = totalLoan * (Math.pow(1+r,termMonths)*(1+r*termMonths) - Math.pow(1+r,termMonths+1)) / Math.pow(Math.pow(1+r,termMonths)-1,2);
    const rNew = r - f/df;
    if (Math.abs(rNew - r) < 1e-10) break;
    r = rNew;
  }
  return { apr: +(r * 12 * 100).toFixed(3) };
}

export function calcROI(gain: number, cost: number) {
  if (cost === 0) return { roi: 0 };
  const roi = ((gain - cost) / cost) * 100;
  return { roi: +roi.toFixed(2), profit: +(gain - cost).toFixed(2) };
}

export function calcSalesTax(price: number, taxRate: number) {
  const tax = price * taxRate / 100;
  const total = price + tax;
  return { tax: +tax.toFixed(2), total: +total.toFixed(2) };
}

export function calcTip(billAmount: number, tipPct: number, numPeople: number = 1) {
  const tip = billAmount * tipPct / 100;
  const total = billAmount + tip;
  const perPerson = total / numPeople;
  return { tip: +tip.toFixed(2), total: +total.toFixed(2), perPerson: +perPerson.toFixed(2) };
}

export function calcConversionRate(visitors: number, conversions: number) {
  if (visitors === 0) return { rate: 0 };
  const rate = (conversions / visitors) * 100;
  return { rate: +rate.toFixed(2) };
}

export function calcEbayFee(salePrice: number, shippingCost: number = 0) {
  const finalValueFee = (salePrice + shippingCost) * 0.1295;
  const paypalFee = (salePrice + shippingCost) * 0.029 + 0.30;
  const total = finalValueFee + paypalFee;
  const net = salePrice - total;
  return { finalValueFee: +finalValueFee.toFixed(2), paypalFee: +paypalFee.toFixed(2), total: +total.toFixed(2), net: +net.toFixed(2) };
}

export function calcEtsyFee(salePrice: number, shippingCost: number = 0) {
  const listingFee = 0.20;
  const transactionFee = salePrice * 0.065;
  const processingFee = (salePrice + shippingCost) * 0.03 + 0.25;
  const total = listingFee + transactionFee + processingFee;
  const net = salePrice - total;
  return { listingFee, transactionFee: +transactionFee.toFixed(2), processingFee: +processingFee.toFixed(2), total: +total.toFixed(2), net: +net.toFixed(2) };
}

export function calcAmazonFee(salePrice: number, category: string = 'general') {
  const referralRates: Record<string, number> = { general: 0.15, electronics: 0.08, books: 0.15, clothing: 0.17 };
  const rate = referralRates[category] ?? 0.15;
  const referralFee = Math.max(salePrice * rate, 0.30);
  const net = salePrice - referralFee;
  return { referralFee: +referralFee.toFixed(2), net: +net.toFixed(2), rate: `${(rate*100).toFixed(0)}%` };
}

export function calcInventoryTurnover(cogs: number, avgInventory: number) {
  if (avgInventory === 0) return { turnover: 0, daysToSell: 0 };
  const turnover = cogs / avgInventory;
  const daysToSell = 365 / turnover;
  return { turnover: +turnover.toFixed(2), daysToSell: +daysToSell.toFixed(0) };
}

export function calcAdSpend(budget: number, cpc: number, conversionRate: number, orderValue: number) {
  const clicks = budget / cpc;
  const conversions = clicks * conversionRate / 100;
  const revenue = conversions * orderValue;
  const roas = revenue / budget;
  return { clicks: +clicks.toFixed(0), conversions: +conversions.toFixed(0), revenue: +revenue.toFixed(2), roas: +roas.toFixed(2) };
}
