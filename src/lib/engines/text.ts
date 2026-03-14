// Text, developer, and generator engines

// --- TEXT TOOLS ---
export function wordCount(text: string) {
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);
  return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime };
}

export function caseConverter(text: string, toCase: string) {
  switch (toCase) {
    case 'upper': return text.toUpperCase();
    case 'lower': return text.toLowerCase();
    case 'title': return text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
    case 'sentence': return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'camel': return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (w,i) => i===0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g,'');
    case 'pascal': return text.replace(/(?:^\w|[A-Z]|\b\w)/g, w => w.toUpperCase()).replace(/\s+/g,'');
    case 'snake': return text.toLowerCase().replace(/\s+/g,'_');
    case 'kebab': return text.toLowerCase().replace(/\s+/g,'-');
    case 'constant': return text.toUpperCase().replace(/\s+/g,'_');
    case 'alternate': return text.split('').map((c,i) => i%2===0 ? c.toLowerCase():c.toUpperCase()).join('');
    default: return text;
  }
}

export function removeLineBreaks(text: string) {
  return text.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
}

export function slugGenerator(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');
}

export function alphabetizer(text: string, order: 'asc'|'desc' = 'asc') {
  const lines = text.split('\n').filter(l => l.trim() !== '');
  lines.sort((a,b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
  return lines.join('\n');
}

export function removeDuplicateLines(text: string) {
  const lines = text.split('\n');
  const unique = [...new Set(lines)];
  return { result: unique.join('\n'), removed: lines.length - unique.length };
}

export function reverseText(text: string) {
  return text.split('').reverse().join('');
}

export function reverseWords(text: string) {
  return text.split(' ').reverse().join(' ');
}

export function textToMorse(text: string) {
  const map: Record<string, string> = {
    a:'.-',b:'-...',c:'-.-.',d:'-..',e:'.',f:'..-.',g:'--.',h:'....',
    i:'..',j:'.---',k:'-.-',l:'.-..',m:'--',n:'-.',o:'---',p:'.--.',
    q:'--.-',r:'.-.',s:'...',t:'-',u:'..-',v:'...-',w:'.--',x:'-..-',
    y:'-.--',z:'--..',
    '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-',
    '5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
    ' ': '/'
  };
  return text.toLowerCase().split('').map(c => map[c] || '?').join(' ');
}

export function countVowelsConsonants(text: string) {
  const vowels = text.toLowerCase().match(/[aeiou]/g)?.length ?? 0;
  const consonants = text.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/g)?.length ?? 0;
  return { vowels, consonants, total: vowels + consonants };
}

export function findReplaceText(text: string, find: string, replace: string) {
  const count = (text.match(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'))?.length) ?? 0;
  const result = text.split(find).join(replace);
  return { result, count };
}

export function textDiff(text1: string, text2: string) {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  const added = [...words2].filter(w => !words1.has(w));
  const removed = [...words1].filter(w => !words2.has(w));
  return { added, removed, addedCount: added.length, removedCount: removed.length };
}

export function loremIpsum(paragraphs: number = 1, wordsPerParagraph: number = 50) {
  const words = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','dolor','in','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat'];
  const result: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const para: string[] = [];
    for (let w = 0; w < wordsPerParagraph; w++) {
      para.push(words[Math.floor(Math.random() * words.length)]);
    }
    const sentence = para.join(' ');
    result.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
  }
  return result.join('\n\n');
}

export function htmlEntityEncoder(text: string, decode: boolean = false) {
  if (decode) {
    return text.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
  }
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

export function extractEmails(text: string) {
  const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) ?? [];
  return { emails: [...new Set(emails)], count: emails.length };
}

export function extractUrls(text: string) {
  const urls = text.match(/https?:\/\/[^\s]+/g) ?? [];
  return { urls: [...new Set(urls)], count: urls.length };
}

export function removeHtml(text: string) {
  return text.replace(/<[^>]*>/g, '').replace(/\s+/g,' ').trim();
}

export function trimLines(text: string) {
  return text.split('\n').map(l => l.trim()).join('\n');
}

export function removeEmptyLines(text: string) {
  return text.split('\n').filter(l => l.trim() !== '').join('\n');
}

export function addLineNumbers(text: string) {
  return text.split('\n').map((l,i) => `${i+1}. ${l}`).join('\n');
}

export function sortLines(text: string, order: 'asc'|'desc' = 'asc') {
  const lines = text.split('\n');
  lines.sort((a,b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
  return lines.join('\n');
}

// --- DEVELOPER TOOLS ---
export function base64Encode(text: string) {
  try { return { result: btoa(unescape(encodeURIComponent(text))), error: null }; }
  catch { return { result: null, error: 'Invalid input' }; }
}

export function base64Decode(text: string) {
  try { return { result: decodeURIComponent(escape(atob(text))), error: null }; }
  catch { return { result: null, error: 'Invalid base64 string' }; }
}

export function urlEncode(text: string) { return { result: encodeURIComponent(text) }; }
export function urlDecode(text: string) {
  try { return { result: decodeURIComponent(text), error: null }; }
  catch { return { result: null, error: 'Invalid URL encoded string' }; }
}

export function jsonFormat(json: string) {
  try {
    const parsed = JSON.parse(json);
    return { result: JSON.stringify(parsed, null, 2), valid: true, error: null };
  } catch (e: any) {
    return { result: null, valid: false, error: e.message };
  }
}

export function jsonMinify(json: string) {
  try {
    const parsed = JSON.parse(json);
    return { result: JSON.stringify(parsed), valid: true, error: null };
  } catch (e: any) {
    return { result: null, valid: false, error: e.message };
  }
}

export function htmlMinify(html: string) {
  const result = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
  return { result, originalSize: html.length, minifiedSize: result.length, saved: html.length - result.length };
}

export function cssMinify(css: string) {
  const result = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .trim();
  return { result, originalSize: css.length, minifiedSize: result.length };
}

export function jsMinify(js: string) {
  const result = js
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1')
    .trim();
  return { result, originalSize: js.length, minifiedSize: result.length };
}

export function unixTimestampToDate(timestamp: number) {
  const d = new Date(timestamp * 1000);
  return {
    utc: d.toUTCString(),
    local: d.toLocaleString(),
    iso: d.toISOString(),
    relative: `${Math.floor((Date.now() - d.getTime()) / 1000 / 60)} minutes ago`
  };
}

export function dateToUnixTimestamp(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { error: 'Invalid date' };
  return { timestamp: Math.floor(d.getTime() / 1000), ms: d.getTime() };
}

export function regexTest(pattern: string, flags: string, testString: string) {
  try {
    const regex = new RegExp(pattern, flags);
    const matches = testString.match(regex) ?? [];
    const isMatch = regex.test(testString);
    return { isMatch, matchCount: matches.length, matches: matches.slice(0, 20), error: null };
  } catch (e: any) {
    return { isMatch: false, matchCount: 0, matches: [], error: e.message };
  }
}

export function colorConverter(value: string, from: 'hex'|'rgb'|'hsl') {
  let r=0,g=0,b=0;
  if (from === 'hex') {
    const hex = value.replace('#','');
    r = parseInt(hex.slice(0,2),16);
    g = parseInt(hex.slice(2,4),16);
    b = parseInt(hex.slice(4,6),16);
  } else if (from === 'rgb') {
    const m = value.match(/\d+/g);
    if (m) [r,g,b] = m.map(Number);
  }
  const hex = `#${[r,g,b].map(x => x.toString(16).padStart(2,'0')).join('')}`;
  const rn=r/255, gn=g/255, bn=b/255;
  const max=Math.max(rn,gn,bn), min=Math.min(rn,gn,bn), l=(max+min)/2;
  let h=0, s=0;
  if (max !== min) {
    const d = max-min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    if (max===rn) h = (gn-bn)/d + (gn<bn?6:0);
    else if (max===gn) h = (bn-rn)/d + 2;
    else h = (rn-gn)/d + 4;
    h /= 6;
  }
  return { hex, rgb: `rgb(${r},${g},${b})`, hsl: `hsl(${Math.round(h*360)},${Math.round(s*100)}%,${Math.round(l*100)}%)` };
}

// --- GENERATORS ---
export function generatePassword(length: number = 16, options: {upper?:boolean,lower?:boolean,numbers?:boolean,symbols?:boolean} = {}) {
  const { upper=true, lower=true, numbers=true, symbols=true } = options;
  let chars = '';
  if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const strength = length >= 16 && upper && lower && numbers && symbols ? 'Strong' :
    length >= 12 ? 'Medium' : 'Weak';
  return { password, strength };
}

export function generateUsername(style: string = 'random') {
  const adj = ['Cool','Fast','Smart','Brave','Bold','Quick','Bright','Epic','Grand','Swift'];
  const nouns = ['Tiger','Eagle','Wolf','Storm','Pixel','Comet','Blade','Nova','Frost','Byte'];
  const nums = () => Math.floor(Math.random() * 999) + 1;
  const adj1 = adj[Math.floor(Math.random() * adj.length)];
  const noun1 = nouns[Math.floor(Math.random() * nouns.length)];
  const suggestions = [
    `${adj1}${noun1}`,
    `${adj1}${noun1}${nums()}`,
    `${noun1}${adj1.toLowerCase()}`,
    `${adj1.toLowerCase()}_${noun1.toLowerCase()}`,
    `${noun1}${nums()}`,
    `The${adj1}${noun1}`,
    `${adj1}${noun1}${new Date().getFullYear()}`,
  ];
  return { suggestions };
}

export function generateBusinessName(keywords: string[]) {
  const prefixes = ['Pro','Elite','Prime','Apex','Peak','Nova','Zen','Blue','Red','Green'];
  const suffixes = ['Solutions','Group','Hub','Works','Labs','Co','Studio','Agency','Plus','HQ'];
  const kw = keywords[0] || 'Business';
  const names = [
    `${prefixes[Math.floor(Math.random()*prefixes.length)]} ${kw}`,
    `${kw} ${suffixes[Math.floor(Math.random()*suffixes.length)]}`,
    `${kw}${suffixes[Math.floor(Math.random()*suffixes.length)]}`,
    `${prefixes[Math.floor(Math.random()*prefixes.length)]}${kw}`,
    `${kw}ify`,
    `${kw}ly`,
    `Get${kw.charAt(0).toUpperCase()+kw.slice(1)}`,
    `${kw}360`,
  ];
  return { names };
}

export function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const hex = `#${[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`;
  return { hex, rgb: `rgb(${r},${g},${b})`, r, g, b };
}

export function generateQRCode(text: string) {
  // Returns URL for QR code using free API
  const encoded = encodeURIComponent(text);
  return { qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}` };
}

export function generateRandomNumber(min: number = 1, max: number = 100, count: number = 1) {
  const numbers: number[] = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return { numbers, min, max };
}

export function generateRandomDate(startYear: number = 2000, endYear: number = 2025) {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  const randomTime = start + Math.random() * (end - start);
  const d = new Date(randomTime);
  return { date: d.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }), timestamp: Math.floor(randomTime/1000) };
}

export function pickRandomFromList(items: string[]) {
  if (items.length === 0) return { winner: null };
  const idx = Math.floor(Math.random() * items.length);
  return { winner: items[idx], index: idx + 1 };
}

export function shuffleList(items: string[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return { shuffled: arr };
}
