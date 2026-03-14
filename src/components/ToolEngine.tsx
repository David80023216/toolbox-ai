'use client';

import { useState } from 'react';
import type { Tool } from '@/data/types';
import { AdBlock } from './AdBlock';

interface ToolEngineProps {
  tool: Tool;
}

const RESULT_LABELS: Record<string, string> = {
  result: 'Result', payment: 'Monthly Payment', totalPaid: 'Total Paid',
  totalInterest: 'Total Interest', amount: 'Final Amount', interest: 'Interest Earned',
  total: 'Total', cubicYards: 'Cubic Yards', bags60lb: '60-lb Bags Needed',
  bags80lb: '80-lb Bags Needed', bmi: 'BMI', category: 'Category',
  percentage: 'Percentage', margin: 'Profit Margin', profit: 'Profit',
  finalPrice: 'Final Price', savings: 'Savings', words: 'Word Count',
  chars: 'Characters', sentences: 'Sentences', readingTime: 'Reading Time (min)',
  password: 'Generated Password', strength: 'Password Strength',
  years: 'Age (Years)', months: 'Age (Months)', days: 'Age (Days)',
  totalDays: 'Total Days Lived', daysUntilBirthday: 'Days Until Next Birthday',
  grossWeekly: 'Gross Weekly Pay', netWeekly: 'Net Weekly Pay',
  grossAnnual: 'Annual Gross', cubicFeet: 'Cubic Feet', tons: 'Tons',
  bags2cf: '2 cu.ft. Bags', bags3cf: '3 cu.ft. Bags', sqft: 'Square Feet',
  sqm: 'Square Meters', tilesNeeded: 'Tiles Needed', boxes: 'Boxes',
  sheets: 'Drywall Sheets', bricks: 'Bricks', bricksWithWaste: 'With Waste (10%)',
  apr: 'APR (%)', roi: 'ROI (%)', tax: 'Tax Amount', tip: 'Tip Amount',
  perPerson: 'Per Person', commission: 'Commission', net: 'Net Amount',
  bmr: 'BMR (calories/day)', tdee: 'TDEE (calories/day)', weightLoss: 'Weight Loss Goal',
  weightGain: 'Weight Gain Goal', liters: 'Liters', cups: 'Cups', oz: 'oz',
  dailyG: 'Daily Protein (g)', perMeal3: 'Per Meal (3 meals)', perMeal4: 'Per Meal (4 meals)',
  paceStr: 'Your Pace', speedMph: 'Speed (mph)', speedKph: 'Speed (km/h)',
  cubicMeters: 'Cubic Meters', posts: 'Posts Needed', rails: 'Rails Needed', boards: 'Boards',
  sections: 'Sections', numBoards: 'Number of Boards', totalLinearFeet: 'Total Linear Feet',
  gallons: 'Gallons', bundlesShingles: 'Shingle Bundles', squares: 'Roofing Squares',
  slope: 'Slope', yIntercept: 'Y-Intercept', equation: 'Line Equation', distance: 'Distance',
  area: 'Area', perimeter: 'Perimeter', circumference: 'Circumference', volume: 'Volume',
  change: 'Percentage Change', absolute: 'Absolute Change', direction: 'Direction',
  simplified: 'Simplified Fraction', decimal: 'Decimal', mixed: 'Mixed Number',
  ratio: 'Ratio', probability: 'Probability', complement: 'Complement',
  mean: 'Mean', stdDev: 'Std. Deviation', variance: 'Variance', min: 'Minimum',
  max: 'Maximum', range: 'Range', count: 'Count', median: 'Median',
  hex: 'Hex Color', rgb: 'RGB Color', hsl: 'HSL Color',
  ovulationDate: 'Estimated Ovulation', fertileWindowStart: 'Fertile Window Start',
  fertileWindowEnd: 'Fertile Window End', nextPeriod: 'Next Period',
  dueDate: 'Estimated Due Date', weeksPregnant: 'Weeks Pregnant', trimester: 'Trimester',
  daysToSell: 'Days to Sell', turnover: 'Inventory Turnover', clicks: 'Estimated Clicks',
  conversions: 'Estimated Conversions', revenue: 'Estimated Revenue', roas: 'ROAS',
  referralFee: 'Referral Fee', rate: 'Rate', annual: 'Annual Salary', monthly: 'Monthly',
  biweekly: 'Bi-Weekly', hourly: 'Hourly Rate', regularPay: 'Regular Pay',
  overtimePay: 'Overtime Pay', totalPay: 'Total Pay', units: 'Break-Even Units',
  c: 'Hypotenuse (c)', x1: 'Root x₁', x2: 'Root x₂', discriminant: 'Discriminant',
  numSteps: 'Number of Steps', actualRiserHeight: 'Actual Riser Height',
  totalRun: 'Total Run (in)', stringerLength: 'Stringer Length (in)',
  totalArea: 'Total Area (sq ft)', winner: 'Winner', shuffled: 'Shuffled List',
  numbers: 'Random Numbers', names: 'Suggestions', suggestions: 'Username Suggestions',
  qrUrl: 'QR Code', uuid: 'UUID', invoice: 'Invoice Number',
  length: 'Length', width: 'Width', height: 'Height',
  coverageArea: 'Coverage Area', paintableArea: 'Paintable Area', gallonsRounded: 'Gallons (rounded up)',
  gpa: 'GPA', totalCredits: 'Total Credits', letter: 'Letter Grade', passed: 'Passed?',
  time24: '24-hour time', time12: '12-hour time', daysAdded: 'Days Added',
  hours: 'Hours', minutes: 'Minutes', decimalHours: 'Decimal Hours', totalMinutes: 'Total Minutes',
  days_: 'Days', months_: 'Months', years_: 'Years', weeks: 'Weeks',
  message: 'Message', expired: 'Expired?', idealLb: 'Ideal Weight (lbs)', idealKg: 'Ideal Weight (kg)',
  rangeLowLb: 'Healthy Range Low', rangeHighLb: 'Healthy Range High',
  bedtimes: 'Suggested Bedtimes', recommendation: 'Recommendation',
  vo2max: 'VO₂ Max', fitness: 'Fitness Level', caloriesBurned: 'Calories Burned',
  costPerMile: 'Cost Per Mile', cost: 'Total Cost', dailyKwh: 'Daily kWh', monthlyBill: 'Monthly Bill', annualBill: 'Annual Bill',
  referral: 'Referral Fee', finalValueFee: 'Final Value Fee', paypalFee: 'Payment Fee',
  listingFee: 'Listing Fee', transactionFee: 'Transaction Fee', processingFee: 'Processing Fee',
  isPrime: 'Is Prime?', divisor: 'Factor Found', gcd: 'GCD', lcm: 'LCM',
  permutations: 'Permutations', combinations: 'Combinations', zScore: 'Z-Score',
  lower: 'Lower Bound', upper: 'Upper Bound', confidence: 'Confidence Level',
  sequence: 'Sequence', fibonacci: 'Fibonacci Numbers', pi: 'Pi (π)', digits: 'Pi digits',
  geometricMean: 'Geometric Mean', mode: 'Mode', bimodal: 'Bimodal?',
  carbs: 'Carbs (g)', protein: 'Protein (g)', fat: 'Fat (g)',
  carbCalories: 'Carb Calories', proteinCalories: 'Protein Calories', fatCalories: 'Fat Calories',
  isMatch: 'Matches?', matchCount: 'Match Count', matches: 'Matches Found',
  valid: 'Valid?', decoded: 'Decoded', frequencies: 'Letter Frequencies',
  vowels: 'Vowels', consonants: 'Consonants', bodyFat: 'Body Fat %',
  isPalindrome: 'Is Palindrome?', isAnagram: 'Is Anagram?',
  added: 'Words Added', removed: 'Words Removed', addedCount: 'Added Count', removedCount: 'Removed Count',
  totalCalories: 'Total Calories', caloriesPerSlice: 'Calories per Slice',
  espresso: 'Espresso Cal', milk: 'Milk Cal', syrups: 'Syrup Cal',
  note: 'Note', binary: 'Binary', gradient: 'CSS Gradient', css: 'CSS Code',
  art: 'Text Art', popular: 'Popular Emoji', hashtags: 'Hashtags',
  bio: 'Bio Template', subjects: 'Subject Lines', metaDescription: 'Meta Description',
  paceMinPerMile: 'Pace (min/mile)', weeksToGo: 'Weeks Until Event',
  originalSize: 'Original Size (chars)', minifiedSize: 'Minified Size', saved: 'Characters Saved',
  rem: 'rem Value', px: 'px Value',
};

function formatValue(key: string, value: any): string {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (key === 'qrUrl') return value; // handled specially
  if (key === 'gradient' || key === 'css') return value;
  if (key === 'bedtimes' && Array.isArray(value)) return value.join(', ');
  if (key === 'numbers' && Array.isArray(value)) return value.join(', ');
  if (key === 'shuffled' && Array.isArray(value)) return value.join('\n');
  if (key === 'subjects' && Array.isArray(value)) return value.join('\n');
  if (key === 'colors' && Array.isArray(value)) return value.join(', ');
  if (key === 'hashtags' && Array.isArray(value)) return value.join(' ');
  if (key === 'names' && Array.isArray(value)) return value.join('\n');
  if (key === 'matches' && Array.isArray(value)) return value.slice(0,10).join(', ');
  if (key === 'teams' && Array.isArray(value)) return value.map((t:string[],i:number)=>`Team ${i+1}: ${t.join(', ')}`).join('\n');
  if (key === 'mode' && Array.isArray(value)) return value.length===0 ? 'No mode' : value.join(', ');
  if (key === 'primes' && Array.isArray(value)) return value.join(', ');
  if (key === 'sequence' && Array.isArray(value)) return value.join(', ');
  if (key === 'emails' && Array.isArray(value)) return value.join('\n') || 'None found';
  if (key === 'urls' && Array.isArray(value)) return value.join('\n') || 'None found';
  if (key === 'popular' && Array.isArray(value)) return value.join(' ');
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  if (key.includes('Pct') || key === 'margin' || key === 'rate' || key === 'percentage') {
    return typeof value === 'number' ? `${value}%` : String(value);
  }
  if (['payment','totalPaid','totalInterest','amount','interest','cost','price','savings','tip','commission','net','tax','revenue','monthlyBill','annualBill','finalPrice','grossWeekly','netWeekly','grossAnnual','monthly','biweekly','annual','regularPay','overtimePay','totalPay','referralFee','transactionFee','processingFee','listingFee','paypalFee','finalValueFee'].includes(key)) {
    return typeof value === 'number' ? `$${value.toLocaleString()}` : String(value);
  }
  if (key === 'readingTime') return `${value} min`;
  return String(value);
}

function ResultRow({ label, value, keyName }: { label: string; value: any; keyName: string }) {
  const [copied, setCopied] = useState(false);
  const formatted = formatValue(keyName, value);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (keyName === 'qrUrl' && typeof value === 'string') {
    return (
      <div className="flex flex-col items-start gap-2 py-3 border-b border-gray-100 last:border-0">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value} alt="QR Code" className="w-48 h-48 border rounded-lg" />
      </div>
    );
  }

  if (keyName === 'gradient') {
    return (
      <div className="py-3 border-b border-gray-100 last:border-0">
        <span className="text-sm font-medium text-gray-600 block mb-2">{label}</span>
        <div className="w-full h-16 rounded-lg border" style={{ background: value }} />
        <code className="text-xs text-gray-500 mt-1 block">{value}</code>
      </div>
    );
  }

  if (typeof value === 'string' && value.includes('\n')) {
    return (
      <div className="py-3 border-b border-gray-100 last:border-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-600">{label}</span>
          <button onClick={handleCopy} className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1">
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <pre className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 rounded p-2 font-mono">{formatted}</pre>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-base font-semibold ${keyName === 'category' || keyName === 'strength' || keyName === 'fitness' ? 'text-blue-700' : 'text-gray-900'}`}>
          {formatted}
        </span>
        <button onClick={handleCopy} className="text-xs text-gray-400 hover:text-blue-500 transition-colors" title="Copy">
          {copied ? '✓' : '⎘'}
        </button>
      </div>
    </div>
  );
}

export default function ToolEngine({ tool }: ToolEngineProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For text-area inputs (text tools)
  const textAreaEngines = ['word_counter','character_counter','sentence_counter','paragraph_counter','reading_time_calculator','case_converter','remove_line_breaks','slug_generator','alphabetizer','duplicate_line_remover','reverse_text','reverse_words','text_to_morse','vowel_consonant_counter','find_replace','html_entity_encoder','html_entity_decoder','html_stripper','trim_lines','remove_empty_lines','add_line_numbers','sort_lines','text_diff_checker','upper_case_converter','lower_case_converter','title_case_converter','camel_case_converter','snake_case_converter','kebab_case_converter','palindrome_checker','anagram_checker','binary_to_text','text_to_binary','text_to_hex','hex_to_text','letter_frequency_counter','number_to_words','email_extractor','url_extractor','remove_html','base64_encoder','base64_decoder','url_encoder','url_decoder','json_formatter','json_validator','json_minifier','html_minifier','css_minifier','javascript_minifier','regex_tester','markdown_to_html','html_to_markdown','jwt_decoder','xml_formatter','password_strength_checker','binary_to_decimal','text_to_ascii','ascii_to_text','hex_to_decimal','decimal_to_binary','decimal_to_hex','lorem_ipsum_generator','random_name_picker','list_randomizer','random_team_generator','hashtag_generator'];

  const isTextTool = textAreaEngines.includes(tool.engine);

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ engine: tool.engine, inputs }),
      });
      const data = await res.json();
      if (data.error && !data.result) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (e) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isTextTool) {
      e.preventDefault();
      handleCalculate();
    }
  };

  const setInput = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const renderInput = (input: any, idx: number) => {
    const { key, label, type, placeholder, options, hint } = input;
    const val = inputs[key] ?? '';

    if (type === 'select' && options) {
      return (
        <div key={key} className="flex flex-col gap-1.5">
          <label htmlFor={key} className="text-sm font-medium text-gray-700">{label}</label>
          <select
            id={key}
            value={val}
            onChange={e => setInput(key, e.target.value)}
            className="input-field"
          >
            <option value="">Select {label}</option>
            {options.map((opt: {value:string;label:string}) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {hint && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div key={key} className="flex flex-col gap-1.5">
          <label htmlFor={key} className="text-sm font-medium text-gray-700">{label}</label>
          <textarea
            id={key}
            value={val}
            onChange={e => setInput(key, e.target.value)}
            placeholder={placeholder ?? `Enter ${label.toLowerCase()}...`}
            rows={6}
            className="input-field resize-y font-mono text-sm"
          />
          {hint && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
      );
    }

    if (type === 'date') {
      return (
        <div key={key} className="flex flex-col gap-1.5">
          <label htmlFor={key} className="text-sm font-medium text-gray-700">{label}</label>
          <input
            id={key}
            type="date"
            value={val}
            onChange={e => setInput(key, e.target.value)}
            className="input-field"
          />
          {hint && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
      );
    }

    if (type === 'time') {
      return (
        <div key={key} className="flex flex-col gap-1.5">
          <label htmlFor={key} className="text-sm font-medium text-gray-700">{label}</label>
          <input
            id={key}
            type="time"
            value={val}
            onChange={e => setInput(key, e.target.value)}
            className="input-field"
          />
          {hint && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
      );
    }

    if (type === 'checkbox') {
      return (
        <div key={key} className="flex items-center gap-3">
          <input
            id={key}
            type="checkbox"
            checked={val !== 'false' && val !== ''}
            onChange={e => setInput(key, e.target.checked ? 'true' : 'false')}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor={key} className="text-sm font-medium text-gray-700">{label}</label>
          {hint && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
      );
    }

    return (
      <div key={key} className="flex flex-col gap-1.5">
        <label htmlFor={key} className="text-sm font-medium text-gray-700">
          {label}
          {input.unit && <span className="text-gray-400 font-normal ml-1">({input.unit})</span>}
        </label>
        <input
          id={key}
          type={type === 'number' ? 'number' : 'text'}
          value={val}
          onChange={e => setInput(key, e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? (type === 'number' ? '0' : `Enter ${label.toLowerCase()}...`)}
          min={type === 'number' ? '0' : undefined}
          step={type === 'number' ? 'any' : undefined}
          className="input-field"
          autoFocus={idx === 0}
        />
        {hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    );
  };

  const visibleResults = result
    ? Object.entries(result).filter(([k, v]) => {
        if (k === 'error' && !v) return false;
        if (k === 'from' || k === 'to') return false;
        if (typeof v === 'object' && v !== null && !Array.isArray(v) && Object.keys(v).length > 10) return false;
        return true;
      })
    : [];

  return (
    <div className="space-y-4">
      {/* Ad — top of tool */}
      <AdBlock size="leaderboard" label="Advertisement" />

      {/* Tool calculator */}
      <div className="card p-6">
        <div className="space-y-4">
          {/* Inputs */}
          {tool.inputs && tool.inputs.length > 0 ? (
            <div className={`grid gap-4 ${tool.inputs.length >= 4 ? 'sm:grid-cols-2' : ''}`}>
              {tool.inputs.map((input: any, idx: number) => renderInput(input, idx))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">This tool uses default values — just click Calculate.</div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCalculate}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Calculate
                </>
              )}
            </button>
            {result && (
              <button onClick={handleReset} className="btn-secondary">
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {result && !error && visibleResults.length > 0 && (
          <div className="result-box mt-5">
            <h3 className="text-base font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Result
            </h3>
            <div className="divide-y divide-blue-100">
              {visibleResults.map(([key, value]) => (
                <ResultRow
                  key={key}
                  keyName={key}
                  label={RESULT_LABELS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  value={value}
                />
              ))}
            </div>
            {tool.disclaimer && (
              <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-blue-100">
                ⓘ {tool.disclaimer}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Ad — below results */}
      <AdBlock size="rectangle" label="Advertisement" />
    </div>
  );
}
