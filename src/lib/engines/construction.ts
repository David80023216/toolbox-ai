// Construction calculation engines

export function calcConcrete(length: number, width: number, depth: number, unit: 'ft' | 'm' = 'ft') {
  // depth in inches if unit=ft, cm if unit=m
  let volumeCubicYards: number;
  if (unit === 'ft') {
    volumeCubicYards = (length * width * (depth / 12)) / 27;
  } else {
    const volumeCubicM = length * width * (depth / 100);
    volumeCubicYards = volumeCubicM * 1.30795;
  }
  const bags60lb = Math.ceil(volumeCubicYards / 0.0150);
  const bags80lb = Math.ceil(volumeCubicYards / 0.0200);
  return {
    cubicYards: +volumeCubicYards.toFixed(2),
    cubicMeters: +(volumeCubicYards * 0.764555).toFixed(2),
    bags60lb,
    bags80lb,
  };
}

export function calcGravel(length: number, width: number, depth: number) {
  // depth in inches, dimensions in feet
  const cubicFeet = length * width * (depth / 12);
  const cubicYards = cubicFeet / 27;
  const tons = cubicYards * 1.4; // gravel ~1.4 tons/yd³
  return { cubicFeet: +cubicFeet.toFixed(2), cubicYards: +cubicYards.toFixed(2), tons: +tons.toFixed(2) };
}

export function calcMulch(length: number, width: number, depth: number) {
  const cubicFeet = length * width * (depth / 12);
  const cubicYards = cubicFeet / 27;
  const bags2cf = Math.ceil(cubicFeet / 2);
  const bags3cf = Math.ceil(cubicFeet / 3);
  return { cubicFeet: +cubicFeet.toFixed(2), cubicYards: +cubicYards.toFixed(2), bags2cf, bags3cf };
}

export function calcPaint(length: number, width: number, height: number, doors: number = 0, windows: number = 0, coats: number = 2) {
  const wallArea = 2 * (length + width) * height;
  const doorArea = doors * 20; // avg 20 sq ft per door
  const windowArea = windows * 15; // avg 15 sq ft per window
  const paintableArea = (wallArea - doorArea - windowArea) * coats;
  const gallons = paintableArea / 350; // avg 350 sqft/gallon
  return { paintableArea: +paintableArea.toFixed(0), gallons: +gallons.toFixed(1), gallonsRounded: Math.ceil(gallons) };
}

export function calcFence(totalLinearFeet: number, postSpacing: number = 8, railsPerSection: number = 2, boardWidth: number = 6) {
  const sections = totalLinearFeet / postSpacing;
  const posts = Math.ceil(sections) + 1;
  const rails = Math.ceil(sections) * railsPerSection;
  const boards = Math.ceil((totalLinearFeet * 12) / boardWidth);
  return { posts, rails, boards, sections: +sections.toFixed(1) };
}

export function calcDeckBoards(deckLength: number, deckWidth: number, boardWidth: number = 5.5, gapWidth: number = 0.25) {
  const effectiveBoardWidth = boardWidth + gapWidth;
  const numBoards = Math.ceil((deckWidth * 12) / effectiveBoardWidth);
  const boardLength = deckLength;
  const totalLinearFeet = numBoards * boardLength;
  const sqFt = deckLength * deckWidth;
  return { numBoards, totalLinearFeet: +totalLinearFeet.toFixed(1), sqFt: +sqFt.toFixed(1) };
}

export function calcTile(roomLength: number, roomWidth: number, tileSize: number, wasteFactorPct: number = 10) {
  const roomArea = roomLength * roomWidth;
  const tileAreaSqFt = (tileSize * tileSize) / 144;
  const tilesNeeded = Math.ceil((roomArea / tileAreaSqFt) * (1 + wasteFactorPct / 100));
  const boxes = Math.ceil(tilesNeeded / 10); // assume 10 tiles/box
  return { roomArea: +roomArea.toFixed(1), tilesNeeded, boxes };
}

export function calcFlooring(length: number, width: number, wasteFactorPct: number = 10) {
  const area = length * width;
  const withWaste = area * (1 + wasteFactorPct / 100);
  const boxes = Math.ceil(withWaste / 20); // assume 20 sqft/box
  return { area: +area.toFixed(1), withWaste: +withWaste.toFixed(1), boxes };
}

export function calcRoofing(length: number, width: number, pitch: number = 4) {
  const baseArea = length * width;
  const pitchFactor = Math.sqrt(1 + Math.pow(pitch / 12, 2));
  const roofArea = baseArea * pitchFactor;
  const squares = roofArea / 100;
  const bundlesShingles = Math.ceil(squares * 3 * 1.1); // 3 bundles/square + 10% waste
  return { baseArea: +baseArea.toFixed(0), roofArea: +roofArea.toFixed(0), squares: +squares.toFixed(2), bundlesShingles };
}

export function calcDrywall(length: number, width: number, height: number, doors: number = 0, windows: number = 0) {
  const wallArea = 2 * (length + width) * height;
  const ceiling = length * width;
  const deductions = (doors * 20) + (windows * 15);
  const totalArea = wallArea + ceiling - deductions;
  const sheets = Math.ceil(totalArea / 32); // 4x8 = 32 sqft
  return { totalArea: +totalArea.toFixed(0), sheets };
}

export function calcBrick(length: number, height: number, mortarJoint: number = 0.375) {
  // Standard brick 7.625" x 2.25"
  const brickLength = 7.625 + mortarJoint;
  const brickHeight = 2.25 + mortarJoint;
  const area = (length * 12) * (height * 12);
  const brickArea = brickLength * brickHeight;
  const bricks = Math.ceil(area / brickArea);
  const bricksWithWaste = Math.ceil(bricks * 1.1);
  return { area: +area.toFixed(0), bricks, bricksWithWaste };
}

export function calcRebar(length: number, width: number, spacing: number = 12) {
  const lengthwiseBars = Math.ceil(width * 12 / spacing) + 1;
  const widthwiseBars = Math.ceil(length * 12 / spacing) + 1;
  const totalBars = lengthwiseBars + widthwiseBars;
  const linearFeet = (lengthwiseBars * length) + (widthwiseBars * width);
  return { lengthwiseBars, widthwiseBars, totalBars, linearFeet: +linearFeet.toFixed(0) };
}

export function calcStaircase(totalRise: number, riserHeight: number = 7, treadDepth: number = 11) {
  const numRisers = Math.ceil(totalRise / riserHeight);
  const actualRiserHeight = totalRise / numRisers;
  const totalRun = (numRisers - 1) * treadDepth;
  const stringerLength = Math.sqrt(Math.pow(totalRise, 2) + Math.pow(totalRun, 2));
  return {
    numSteps: numRisers,
    actualRiserHeight: +actualRiserHeight.toFixed(2),
    totalRun: +totalRun.toFixed(1),
    stringerLength: +stringerLength.toFixed(1)
  };
}

export function calcSquareFootage(length: number, width: number) {
  const sqft = length * width;
  const sqm = sqft * 0.0929;
  const sqyd = sqft / 9;
  return { sqft: +sqft.toFixed(2), sqm: +sqm.toFixed(2), sqyd: +sqyd.toFixed(2) };
}

export function calcConcreteFooting(diameter: number, depth: number, numFootings: number) {
  // diameter in inches, depth in inches
  const radiusFt = (diameter / 2) / 12;
  const depthFt = depth / 12;
  const volPerFooting = Math.PI * radiusFt * radiusFt * depthFt;
  const totalVol = volPerFooting * numFootings;
  const cubicYards = totalVol / 27;
  return { volPerFootingCuFt: +volPerFooting.toFixed(3), totalCuFt: +totalVol.toFixed(2), cubicYards: +cubicYards.toFixed(2) };
}
