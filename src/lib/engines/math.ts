// Math & education engines

export function calcPercentage(value: number, total: number) {
  if (total === 0) return { percentage: 0, remainder: 0 };
  const percentage = (value / total) * 100;
  return { percentage: +percentage.toFixed(4), remainder: +(100 - percentage).toFixed(4) };
}

export function calcPercentageOf(pct: number, total: number) {
  const result = (pct / 100) * total;
  return { result: +result.toFixed(4) };
}

export function calcPercentageChange(oldValue: number, newValue: number) {
  if (oldValue === 0) return { change: null, direction: 'N/A' };
  const change = ((newValue - oldValue) / oldValue) * 100;
  return { change: +change.toFixed(2), direction: change >= 0 ? 'increase' : 'decrease', absolute: +(newValue - oldValue).toFixed(4) };
}

export function calcFraction(numerator: number, denominator: number) {
  function gcd(a: number, b: number): number { return b ? gcd(b, a % b) : a; }
  const g = gcd(Math.abs(numerator), Math.abs(denominator));
  const simplifiedN = numerator / g;
  const simplifiedD = denominator / g;
  const decimal = numerator / denominator;
  const mixed = Math.abs(simplifiedN) >= Math.abs(simplifiedD)
    ? `${Math.trunc(simplifiedN/simplifiedD)} ${Math.abs(simplifiedN%simplifiedD)}/${Math.abs(simplifiedD)}`
    : null;
  return { simplified: `${simplifiedN}/${simplifiedD}`, decimal: +decimal.toFixed(6), mixed };
}

export function calcSlope(x1: number, y1: number, x2: number, y2: number) {
  if (x2 === x1) return { slope: null, yIntercept: null, equation: 'Vertical line (undefined slope)' };
  const slope = (y2 - y1) / (x2 - x1);
  const yIntercept = y1 - slope * x1;
  const equation = `y = ${slope.toFixed(4)}x + ${yIntercept.toFixed(4)}`;
  const distance = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
  return { slope: +slope.toFixed(4), yIntercept: +yIntercept.toFixed(4), equation, distance: +distance.toFixed(4) };
}

export function calcArea(shape: string, params: Record<string, number>) {
  const { l=0, w=0, r=0, b=0, h=0, a=0 } = params;
  switch (shape) {
    case 'rectangle': return { area: +(l * w).toFixed(4), perimeter: +(2*(l+w)).toFixed(4) };
    case 'circle': return { area: +(Math.PI * r * r).toFixed(4), circumference: +(2 * Math.PI * r).toFixed(4) };
    case 'triangle': return { area: +(0.5 * b * h).toFixed(4) };
    case 'square': return { area: +(l * l).toFixed(4), perimeter: +(4*l).toFixed(4) };
    case 'trapezoid': return { area: +(0.5 * (a + b) * h).toFixed(4) };
    case 'ellipse': return { area: +(Math.PI * a * b).toFixed(4) };
    default: return { area: 0 };
  }
}

export function calcPerimeter(shape: string, params: Record<string, number>) {
  const { l=0, w=0, r=0, a=0, b=0, c=0 } = params;
  switch (shape) {
    case 'rectangle': return { perimeter: +(2*(l+w)).toFixed(4) };
    case 'circle': return { perimeter: +(2*Math.PI*r).toFixed(4) };
    case 'square': return { perimeter: +(4*l).toFixed(4) };
    case 'triangle': return { perimeter: +(a+b+c).toFixed(4) };
    default: return { perimeter: 0 };
  }
}

export function calcVolume(shape: string, params: Record<string, number>) {
  const { l=0, w=0, h=0, r=0, b=0 } = params;
  switch (shape) {
    case 'cube': return { volume: +(l*l*l).toFixed(4) };
    case 'box': return { volume: +(l*w*h).toFixed(4) };
    case 'sphere': return { volume: +(4/3*Math.PI*r*r*r).toFixed(4) };
    case 'cylinder': return { volume: +(Math.PI*r*r*h).toFixed(4) };
    case 'cone': return { volume: +(1/3*Math.PI*r*r*h).toFixed(4) };
    case 'pyramid': return { volume: +(1/3*b*h).toFixed(4) };
    default: return { volume: 0 };
  }
}

export function calcRatio(a: number, b: number) {
  function gcd(x: number, y: number): number { return y ? gcd(y, x%y) : x; }
  const g = gcd(Math.round(a), Math.round(b));
  const simplA = a/g, simplB = b/g;
  return {
    ratio: `${simplA}:${simplB}`,
    decimal: +(a/b).toFixed(4),
    percentage: `${+(a/(a+b)*100).toFixed(1)}% : ${+(b/(a+b)*100).toFixed(1)}%`
  };
}

export function calcProbability(favorable: number, total: number) {
  const prob = favorable / total;
  const odds = `${favorable}:${total-favorable}`;
  const percentage = prob * 100;
  return {
    probability: +prob.toFixed(6),
    percentage: +percentage.toFixed(4),
    odds,
    complement: +(1-prob).toFixed(6)
  };
}

export function calcStdDev(numbers: number[]) {
  if (numbers.length === 0) return { mean: 0, stdDev: 0, variance: 0 };
  const mean = numbers.reduce((a,b) => a+b, 0) / numbers.length;
  const variance = numbers.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / numbers.length;
  const stdDev = Math.sqrt(variance);
  const sorted = [...numbers].sort((a,b)=>a-b);
  const median = numbers.length % 2 === 0
    ? (sorted[numbers.length/2-1] + sorted[numbers.length/2]) / 2
    : sorted[Math.floor(numbers.length/2)];
  return {
    mean: +mean.toFixed(4),
    median: +median.toFixed(4),
    stdDev: +stdDev.toFixed(4),
    variance: +variance.toFixed(4),
    min: sorted[0],
    max: sorted[sorted.length-1],
    range: sorted[sorted.length-1] - sorted[0],
    count: numbers.length
  };
}

export function calcScientific(expression: string) {
  // Safe evaluator for basic scientific expressions
  try {
    const sanitized = expression
      .replace(/\^/g, '**')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/abs\(/g, 'Math.abs(')
      .replace(/ceil\(/g, 'Math.ceil(')
      .replace(/floor\(/g, 'Math.floor(')
      .replace(/PI/g, 'Math.PI')
      .replace(/E/g, 'Math.E');
    // Only allow safe characters
    if (!/^[0-9+\-*/().Math\s,_a-zA-Z]+$/.test(sanitized)) {
      return { result: null, error: 'Invalid expression' };
    }
    const result = Function(`"use strict"; return (${sanitized})`)();
    return { result: +Number(result).toFixed(10), error: null };
  } catch (e: any) {
    return { result: null, error: e.message };
  }
}

export function calcFactorial(n: number) {
  if (n < 0) return { result: null, error: 'Cannot compute factorial of negative number' };
  if (n > 170) return { result: null, error: 'Number too large' };
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return { result };
}

export function calcPrime(n: number) {
  if (n < 2) return { isPrime: false };
  if (n === 2) return { isPrime: true };
  if (n % 2 === 0) return { isPrime: false };
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return { isPrime: false, divisor: i };
  }
  return { isPrime: true };
}

export function generatePrimes(max: number) {
  const sieve: boolean[] = new Array(max+1).fill(true);
  sieve[0] = sieve[1] = false;
  for (let i = 2; i <= Math.sqrt(max); i++) {
    if (sieve[i]) for (let j=i*i; j<=max; j+=i) sieve[j]=false;
  }
  return sieve.reduce((primes: number[], isPrime, num) => isPrime ? [...primes, num] : primes, []);
}

export function calcGCDLCM(a: number, b: number) {
  function gcd(x: number, y: number): number { return y ? gcd(y, x%y) : x; }
  const g = gcd(a, b);
  const lcm = (a * b) / g;
  return { gcd: g, lcm };
}

export function calcPythagorean(a: number, b: number) {
  const c = Math.sqrt(a*a + b*b);
  return { c: +c.toFixed(4), a, b };
}

export function calcQuadratic(a: number, b: number, c: number) {
  const discriminant = b*b - 4*a*c;
  if (discriminant < 0) return { x1: null, x2: null, discriminant, note: 'No real solutions' };
  const x1 = (-b + Math.sqrt(discriminant)) / (2*a);
  const x2 = (-b - Math.sqrt(discriminant)) / (2*a);
  return { x1: +x1.toFixed(4), x2: +x2.toFixed(4), discriminant };
}

export function calcMatrixAdd(m1: number[][], m2: number[][]) {
  return m1.map((row, i) => row.map((val, j) => val + m2[i][j]));
}

export function numberToRoman(num: number) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let result = '';
  let n = num;
  for (let i=0; i<vals.length; i++) {
    while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
  }
  return { result };
}

export function romanToNumber(roman: string) {
  const map: Record<string, number> = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
  let result = 0;
  const r = roman.toUpperCase();
  for (let i=0; i<r.length; i++) {
    const curr = map[r[i]] ?? 0;
    const next = map[r[i+1]] ?? 0;
    if (curr < next) result -= curr;
    else result += curr;
  }
  return { result };
}

export function calcMedianMode(numbers: number[]) {
  const sorted = [...numbers].sort((a,b)=>a-b);
  const median = numbers.length%2===0
    ? (sorted[numbers.length/2-1]+sorted[numbers.length/2])/2
    : sorted[Math.floor(numbers.length/2)];
  const freq: Record<number, number> = {};
  numbers.forEach(n => freq[n] = (freq[n]||0)+1);
  const maxFreq = Math.max(...Object.values(freq));
  const mode = Object.keys(freq).filter(k => freq[+k]===maxFreq).map(Number);
  return { median: +median.toFixed(4), mode: maxFreq>1?mode:[], bimodal: mode.length>1 };
}

export function calcBaseConversion(value: string, fromBase: number, toBase: number) {
  try {
    const decimal = parseInt(value, fromBase);
    if (isNaN(decimal)) return { error: 'Invalid number for given base' };
    return {
      result: decimal.toString(toBase).toUpperCase(),
      decimal,
      binary: decimal.toString(2),
      octal: decimal.toString(8),
      hex: decimal.toString(16).toUpperCase()
    };
  } catch {
    return { error: 'Conversion failed' };
  }
}

export function calcEulerNumber() {
  return { e: Math.E, description: "Euler's number (e ≈ 2.71828...)" };
}

export function calcGoldenRatio() {
  const phi = (1 + Math.sqrt(5)) / 2;
  return { phi: +phi.toFixed(10), description: 'Golden ratio (φ ≈ 1.61803...)' };
}

export function calcLog(value: number, base: number = 10) {
  const result = base === Math.E ? Math.log(value) : Math.log(value) / Math.log(base);
  return { result: +result.toFixed(8) };
}

export function calcPower(base: number, exponent: number) {
  const result = Math.pow(base, exponent);
  return { result: +result.toFixed(8) };
}

export function calcSquareRoot(value: number) {
  if (value < 0) return { result: null, error: 'Cannot take square root of negative number' };
  return { result: +Math.sqrt(value).toFixed(8) };
}

export function calcCubeRoot(value: number) {
  const result = Math.cbrt(value);
  return { result: +result.toFixed(8) };
}

export function calcAbsoluteValue(value: number) {
  return { result: Math.abs(value) };
}

export function calcTrigonometry(value: number, func: string, unit: 'deg'|'rad' = 'deg') {
  const rad = unit === 'deg' ? value * Math.PI / 180 : value;
  switch (func) {
    case 'sin': return { result: +Math.sin(rad).toFixed(8) };
    case 'cos': return { result: +Math.cos(rad).toFixed(8) };
    case 'tan': return { result: +Math.tan(rad).toFixed(8) };
    case 'asin': return { result: +(Math.asin(value) * (unit==='deg'?180/Math.PI:1)).toFixed(8) };
    case 'acos': return { result: +(Math.acos(value) * (unit==='deg'?180/Math.PI:1)).toFixed(8) };
    case 'atan': return { result: +(Math.atan(value) * (unit==='deg'?180/Math.PI:1)).toFixed(8) };
    default: return { result: 0 };
  }
}

export function calcMean(numbers: number[]) {
  const mean = numbers.reduce((a,b) => a+b, 0) / numbers.length;
  return { mean: +mean.toFixed(4) };
}

export function calcGeometricMean(numbers: number[]) {
  const product = numbers.reduce((a,b) => a*b, 1);
  const mean = Math.pow(product, 1/numbers.length);
  return { geometricMean: +mean.toFixed(4) };
}

export function calcPermutations(n: number, r: number) {
  function factorial(x: number): number { let f=1; for(let i=2;i<=x;i++) f*=i; return f; }
  const result = factorial(n) / factorial(n-r);
  return { permutations: result };
}

export function calcCombinations(n: number, r: number) {
  function factorial(x: number): number { let f=1; for(let i=2;i<=x;i++) f*=i; return f; }
  const result = factorial(n) / (factorial(r) * factorial(n-r));
  return { combinations: result };
}
