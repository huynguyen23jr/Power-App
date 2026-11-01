'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const reportPath = process.argv[2];
const cases = [];
for (const galleryWidth of [288, 320, 375, 390, 600, 940, 1200]) {
  const cardWidth = galleryWidth - 16;
  const bodyWidth = cardWidth - 24;
  const columns = bodyWidth < 560 ? 1 : bodyWidth < 900 ? 2 : 3;
  const fieldWidth = (bodyWidth - 8 * (columns - 1)) / columns;
  for (const phone of [true, false]) {
    for (const wrapped of [false, true]) {
      const valueHeights = wrapped ? [63, 21, 63, 21, 63, 21] : Array(6).fill(21);
      const fields = valueHeights.map(h => h + (phone ? 0 : 24));
      const bands = Array.from({length: 6 / columns}, (_, i) => Math.max(...fields.slice(i * columns, (i + 1) * columns)));
      const bodyHeight = bands.reduce((a,b) => a+b, 0) + 8 * (bands.length - 1);
      const cardHeight = bodyHeight + 24 + 12 + 48;
      const footerWidth = phone ? bodyWidth : Math.min(420, bodyWidth);
      const buttonWidth = (footerWidth - 8) / 2;
      assert(fieldWidth > 0 && buttonWidth >= 44);
      assert(Math.abs(columns * fieldWidth + 8 * (columns - 1) - bodyWidth) < 1e-9);
      assert(footerWidth <= bodyWidth);
      cases.push({galleryWidth, phone, wrapped, cardWidth, bodyWidth, columns, fieldWidth, bands, bodyHeight, cardHeight, footerWidth, bothVisibleButtonWidth:buttonWidth, deleteHiddenViewWidth:footerWidth, buttonHeight:48});
    }
  }
}
const thresholdCases = [559,560,899,900].map(bodyWidth => {
  const columns = bodyWidth < 560 ? 1 : bodyWidth < 900 ? 2 : 3;
  return {bodyWidth, columns, fieldWidth:(bodyWidth - 8*(columns-1))/columns};
});
const output = {status:'PASS', boundary:'Arithmetic model of approved card, not runtime or automatic Power Fx evaluation. Actual AutoHeight measured by renderer; font/template/wrapping semantics require Studio.', gutterModel:'gallery exterior 8 each side, no double subtraction; card inner padding 12 each side', examples:cases, thresholds:thresholdCases};
if (reportPath) fs.writeFileSync(reportPath, JSON.stringify(output,null,2));
console.log(JSON.stringify({status:output.status,cases:cases.length,thresholdCases}));
