'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

const [mode, baselineDir, candidateDir, reportPath] = process.argv.slice(2);
const target = 'scrNhapTuSanXuat.pa.yaml';
const scope = 'con_ListNhapTuSanXuat';
const values = ['lbl_ReceiptCode', 'lbl_ReceiptDate', 'lbl_StatusCode', 'lbl_Shift', 'lbl_LoaiSanPhamNhap_Row', 'lbl_TongNhap'];
const buttons = ['btn_ViewNhapTuSanXuat', 'btn_DeleteNhapTuSanXuat', 'btn_MobileOpenNhapTuSanXuat', 'btn_DeleteNhapTuSanXuat_1'];
const gates = ['btn_DeleteNhapTuSanXuat', 'btn_DeleteNhapTuSanXuat_1', 'con_ActionNhapTuSanXuat', 'con_MobileActionNhapTuSanXuat'];
const removed = ['con_TableHeaderNhapTuSanXuat', 'lbl_HeaderActionNhapTuSanXuat', 'con_RowDividerNhapTuSanXuat'];
const wrappers = ['conNTSXCardReceiptCode', 'conNTSXCardReceiptDate', 'conNTSXCardStatus', 'conNTSXCardShift', 'conNTSXCardCategory', 'conNTSXCardTotal'];
const sha = b => crypto.createHash('sha256').update(b).digest('hex');

function yamlFiles(dir, relative = '') {
  return fs.readdirSync(path.join(dir, relative), {withFileTypes: true}).flatMap(entry => {
    const name = path.join(relative, entry.name);
    return entry.isDirectory() ? yamlFiles(dir, name) : name.endsWith('.pa.yaml') ? [name] : [];
  }).sort();
}

// Read the exported Canvas subset without evaluating Power Fx or loading code from app files.
// Control blocks are indentation-delimited. Literal scalars retain content and YAML chomping.
function parse(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const nodes = new Map();
  const declarations = [];
  for (let i = 0; i < lines.length; i++) {
    const m = /^( *)- ([A-Za-z_][A-Za-z0-9_]*):\s*$/.exec(lines[i]);
    if (!m) continue;
    const indent = m[1].length;
    let end = i + 1;
    while (end < lines.length && (!lines[end].trim() || /^ */.exec(lines[end])[0].length > indent)) end++;
    assert(!nodes.has(m[2]), `Duplicate control ${m[2]}`);
    const parent = declarations.findLast(d => d.indent < indent && d.end > i)?.name ?? null;
    const node = {name: m[2], indent, start: i, end, parent, props: {}, type: null, variant: null};
    for (let j = i + 1; j < end; j++) {
      const keyword = new RegExp(`^ {${indent + 4}}(Control|Variant): (.*)$`).exec(lines[j]);
      if (keyword) node[keyword[1] === 'Control' ? 'type' : 'variant'] = keyword[2];
      const p = new RegExp(`^ {${indent + 6}}([A-Za-z][A-Za-z0-9]*):(?: (.*))?$`).exec(lines[j]);
      if (!p) continue;
      assert(!(p[1] in node.props), `Duplicate property ${node.name}.${p[1]}`);
      let scalar = p[2] ?? '';
      if (/^[|>][-+]?$/.test(scalar)) {
        assert(scalar[0] === '|', 'Folded scalar unsupported by verifier');
        const content = [];
        let k = j + 1;
        for (; k < end; k++) {
          if (lines[k].trim() && /^ */.exec(lines[k])[0].length <= indent + 6) break;
          content.push(lines[k]);
        }
        const nonempty = content.filter(l => l.trim());
        const contentIndent = nonempty.length ? Math.min(...nonempty.map(l => /^ */.exec(l)[0].length)) : indent + 8;
        let result = content.map(l => l.trim() ? l.slice(contentIndent) : '').join('\n') + '\n';
        if (scalar.endsWith('-')) result = result.replace(/\n+$/, '');
        else if (!scalar.endsWith('+')) result = result.replace(/\n+$/, '\n');
        scalar = result;
        j = k - 1;
      } else if (scalar.startsWith("'") && scalar.endsWith("'")) {
        scalar = scalar.slice(1, -1).replace(/''/g, "'");
      } else if (scalar.startsWith('"') && scalar.endsWith('"')) {
        scalar = JSON.parse(scalar);
      }
      node.props[p[1]] = scalar;
    }
    nodes.set(node.name, node);
    declarations.push(node);
  }
  return {lines, nodes, originalLines: text.match(/[^\n]*\n|[^\n]+$/g) ?? []};
}

function protectedScalars(parsed) {
  const result = {};
  for (const node of parsed.nodes.values()) {
    for (const [key, value] of Object.entries(node.props)) {
      if (/^On/.test(key) || key === 'Items' || values.includes(node.name) && key === 'Text' || node.name === 'lbl_TotalRowsNhapTuSanXuat' && key === 'Text' || gates.includes(node.name) && key === 'Visible') {
        result[`${node.name}.${key}`] = value;
      }
    }
  }
  return result;
}

function splitScope(parsed) {
  const n = parsed.nodes.get(scope);
  assert(n, `Missing ${scope}`);
  return [parsed.originalLines.slice(0, n.start).join(''), parsed.originalLines.slice(n.end).join('')];
}

function ancestors(parsed, name) {
  const names = [];
  for (let n = parsed.nodes.get(name); n; n = parsed.nodes.get(n.parent)) names.unshift(n.name);
  return names;
}

function compare() {
  const files = yamlFiles(baselineDir);
  assert.deepEqual(yamlFiles(candidateDir), files, 'YAML file set changed');
  const oldText = fs.readFileSync(path.join(baselineDir, target), 'utf8');
  const newText = fs.readFileSync(path.join(candidateDir, target), 'utf8');
  const old = parse(oldText), candidate = parse(newText);
  const globalNames = new Map();
  for (const f of files) {
    const parsed = parse(fs.readFileSync(path.join(candidateDir,f), 'utf8'));
    for (const name of parsed.nodes.keys()) {
      assert(!globalNames.has(name), `App-wide duplicate control ${name} in ${f} and ${globalNames.get(name)}`);
      globalNames.set(name,f);
    }
  }
  const changes = files.filter(f => sha(fs.readFileSync(path.join(baselineDir, f))) !== sha(fs.readFileSync(path.join(candidateDir, f))));
  assert.deepEqual(changes, [target], 'Changes outside sole target, or no implementation');
  assert.deepEqual(splitScope(candidate), splitScope(old), 'Text outside allowed subtree changed');
  assert.deepEqual(protectedScalars(candidate), protectedScalars(old), 'Protected formula scalar changed');
  const uiProperties = new Set(['AccessibleLabel', 'Align', 'AlignInContainer', 'Appearance', 'AutoHeight', 'BasePaletteColor', 'BorderColor', 'BorderStyle', 'BorderThickness', 'Color', 'DropShadow', 'Fill', 'FillPortions', 'Font', 'FontWeight', 'Height', 'Icon', 'Layout', 'LayoutAlignItems', 'LayoutDirection', 'LayoutGap', 'LayoutJustifyContent', 'LayoutMaxHeight', 'LayoutMaxWidth', 'LayoutMinHeight', 'LayoutMinWidth', 'LayoutOverflowX', 'LayoutOverflowY', 'LayoutWrap', 'MaxTemplateSize', 'PaddingBottom', 'PaddingLeft', 'PaddingRight', 'PaddingTop', 'RadiusBottomLeft', 'RadiusBottomRight', 'RadiusTopLeft', 'RadiusTopRight', 'ShowScrollbar', 'Size', 'TabIndex', 'TemplatePadding', 'TemplateSize', 'VerticalAlign', 'Width', 'Wrap', 'X', 'Y']);
  const captions = ['lbl_HeaderReceiptCode', 'lbl_HeaderReceiptDate', 'lbl_HeaderStatusCode', 'lbl_HeaderShift', 'lbl_HeaderLoaiSanPhamNhap', 'lbl_HeaderTongNhap'];
  for (const [name, original] of old.nodes) {
    const next = candidate.nodes.get(name);
    if (!next) continue;
    assert.equal(next.type, original.type, `${name}: control type changed`);
    if (name !== 'gal_NhapTuSanXuat') assert.equal(next.variant, original.variant, `${name}: variant changed`);
    for (const key of new Set([...Object.keys(original.props), ...Object.keys(next.props)])) {
      if (uiProperties.has(key) || buttons.includes(name) && key === 'Text' || captions.includes(name) && key === 'Visible') continue;
      assert.equal(next.props[key], original.props[key], `${name}.${key}: non-presentation property changed`);
    }
  }
  const before = new Set(old.nodes.keys()), after = new Set(candidate.nodes.keys());
  const deleted = [...before].filter(n => !after.has(n)).sort();
  const added = [...after].filter(n => !before.has(n)).sort();
  assert.deepEqual(deleted, [...removed].sort(), 'Unexpected removed controls');
  assert.deepEqual(added, [...wrappers].sort(), 'Unexpected added controls');
  for (const name of [...values, ...buttons, ...wrappers]) {
    assert(ancestors(candidate, name).includes('gal_NhapTuSanXuat'), `${name} escaped native record context`);
  }
  for (const name of removed) assert(!newText.includes(name), `Dangling reference to ${name}`);
  assert.equal(candidate.nodes.get('gal_NhapTuSanXuat').variant, 'VariableHeight');
  assert(!('WrapCount' in candidate.nodes.get('gal_NhapTuSanXuat').props), 'Unsupported gallery WrapCount');
  assert.deepEqual([...candidate.nodes.values()].filter(n => n.parent === 'gal_NhapTuSanXuat').map(n => n.name), ['con_RowMasterNhapTuSanXuat']);
  for (const name of values) {
    const p = candidate.nodes.get(name).props;
    assert.equal(p.AutoHeight, '=true', `${name} needs AutoHeight`);
    assert.equal(p.Wrap, '=true', `${name} needs Wrap`);
    assert.equal(p.Visible ?? '=true', '=true', `${name} hidden`);
    assert.equal(p.Width, '=Parent.Width', `${name} should fill field wrapper`);
  }
  for (const name of buttons) {
    const p = candidate.nodes.get(name).props;
    assert.equal(p.Height, '=48');
    assert.equal(p.Layout, '=ButtonLayout.IconBefore');
    assert(!('Fill' in p), `${name}: unsupported Fill`);
  }
  return {status: 'PASS', boundary: 'Static structural/formula preservation; not runtime', yamlFiles: files.length, changedFiles: changes, unchangedOtherFiles: files.length - 1, protectedScalars: Object.keys(protectedScalars(old)).length, removed: deleted, added, fields: values.map(n => ({control: n, hierarchy: ancestors(candidate, n), Text: candidate.nodes.get(n).props.Text})), protectedFormulaHashes: Object.fromEntries(Object.entries(protectedScalars(candidate)).map(([k,v]) => [k,sha(v)]))};
}

try {
  let result;
  if (mode === 'baseline') {
    const files = yamlFiles(baselineDir);
    const parsed = parse(fs.readFileSync(path.join(baselineDir, target), 'utf8'));
    result = {status: 'BASELINE', files: Object.fromEntries(files.map(f => [f,sha(fs.readFileSync(path.join(baselineDir,f)))])), protected: protectedScalars(parsed), controls: parsed.nodes.size};
  } else if (mode === 'compare') result = compare();
  else if (mode === 'roundtrip') {
    const files = yamlFiles(baselineDir);
    assert.deepEqual(yamlFiles(candidateDir), files);
    let exactFiles = 0;
    for (const f of files) {
      const a = fs.readFileSync(path.join(baselineDir,f), 'utf8');
      const b = fs.readFileSync(path.join(candidateDir,f), 'utf8');
      if (a === b) exactFiles++;
      else assert.deepEqual(a.replace(/\r\n/g,'\n'), b.replace(/\r\n/g,'\n'), `Roundtrip content mismatch: ${f}`);
    }
    result = {status:'PASS', yamlFiles:files.length, exactFiles, boundary:'Server export equals authored YAML; not rendered/runtime proof'};
  } else throw new Error('Usage: node verify-cards.cjs baseline|compare|roundtrip baseline candidate report');
  if (reportPath) fs.writeFileSync(reportPath, JSON.stringify(result,null,2));
  console.log(JSON.stringify({status:result.status, yamlFiles:result.yamlFiles ?? Object.keys(result.files ?? {}).length, protectedScalars:result.protectedScalars ?? Object.keys(result.protected ?? {}).length, changedFiles:result.changedFiles, exactFiles:result.exactFiles}));
} catch (error) {
  console.error(error.stack);
  process.exitCode = 1;
}
