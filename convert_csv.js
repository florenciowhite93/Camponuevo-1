const fs = require('fs');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') { inQuotes = !inQuotes; }
    else if (char === ',' && !inQuotes) { result.push(current.trim()); current = ''; }
    else { current += char; }
  }
  result.push(current.trim());
  return result;
}

const speciesMap = {
  'Bovinos': 'bovino',
  'Ovinos': 'ovino',
  'Equinos': 'equino',
  'Porcinos': 'porcino',
  'Caninos': 'canino',
  'Felinos': 'felino'
};

const knownLabs = [
  'Konig', 'Boehringer Ingelheim', 'Zoovet', 'Richmond', 'Leon Pharma',
  'Over', 'Zoetis', 'Biogenesis Bago', 'MSD', 'Tecnovax', 'Von Franken',
  'Bayer', 'Ale Bet', 'Chinfield', 'Rosenbusch', 'Hampton', 'Weizur', 
  'Rio de Janeiro', 'Burnet', 'Syntex', 'Providean', 'Biotay', 
  'Agroquímicos', 'CDV', 'Brouwer', 'Allflex', 'Agropharma', 'Atanor'
];

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/\["/g, '')
    .replace(/"\]$/, '')
    .replace(/\\"/g, '"')
    .replace(/"/g, '')
    .replace(/'/g, "''")
    .trim();
}

function extractVolumen(title) {
  if (!title) return '';
  const match = title.match(/(\d+(?:,\d+)?\s*(?:ml|lt|kg|g|L|KG|ML|LT|Bolos|dispositivos|dosis|c\.c)\.?(?:\s*\d+)?)/i);
  if (match) return match[1];
  return '';
}

function parseArrayField(text) {
  if (!text) return [];
  const cleaned = text.replace(/^\[|\]$/g, '').replace(/"/g, '');
  if (!cleaned) return [];
  return cleaned.split(',').map(s => s.trim());
}

const data = fs.readFileSync('products_supabase_converted.csv', 'utf-8');
const lines = data.split('\n').filter(line => line.trim());
const headers = parseCSVLine(lines[0]);

let sqlOutput = '-- Import products from CSV\n';
sqlOutput += '-- Run this in Supabase SQL Editor\n\n';

const allLabs = new Set(knownLabs);

sqlOutput += '-- Insert laboratorios\n';
allLabs.forEach(lab => {
  sqlOutput += `INSERT INTO public.laboratorios (nombre) VALUES ('${lab}') ON CONFLICT (nombre) DO NOTHING;\n`;
});
sqlOutput += '\n';

let productoCount = 0;

for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);
  const row = {};
  headers.forEach((h, idx) => { row[h] = values[idx] || ''; });
  
  if (!row.title) continue;
  
  let especies = [];
  if (row.animalbreeds) {
    const breeds = parseArrayField(row.animalbreeds);
    especies = breeds.map(b => speciesMap[b] || b.toLowerCase());
  }
  
  let laboratorio_id = 'NULL';
  const titleLower = row.title.toLowerCase();
  const subcatLower = (row.subcategory || '').toLowerCase();
  const subcatsLower = (row.subcategories || '').toLowerCase();
  
  for (const lab of knownLabs) {
    if (titleLower.includes(lab.toLowerCase()) || 
        subcatLower.includes(lab.toLowerCase()) ||
        subcatsLower.includes(lab.toLowerCase())) {
      laboratorio_id = `(SELECT id FROM public.laboratorios WHERE nombre = '${lab}' LIMIT 1)`;
      break;
    }
  }
  
  let price = row.price ? row.price.replace(/[$,]/g, '') : '0';
  if (price === '' || isNaN(parseFloat(price))) price = '0';
  
  let volumen = extractVolumen(row.title);
  if (!volumen && row.volume) volumen = row.volume;
  
  const descripcion = cleanText(row.description);
  const drogas = cleanText(row.drugs);
  const dosis = cleanText(row.dose);
  const imagen = row.image || '';
  const link_externo = row.externallink || '';
  
  // Generate new UUID instead of using invalid ones
  const id = 'gen_random_uuid()';
  
  const especiesArray = especies.length > 0 
    ? `ARRAY['${especies.join("', '")}']` 
    : 'ARRAY[]::text[]';
  
  sqlOutput += `INSERT INTO public.productos (
  id, titulo, precio, laboratorio_id, imagen, descripcion, volumen,
  drogas, dosis, especies, link_externo, visible
) VALUES (
  ${id},
  '${row.title.replace(/'/g, "''")}',
  ${price},
  ${laboratorio_id},
  '${imagen.replace(/'/g, "''")}',
  '${descripcion}',
  '${volumen.replace(/'/g, "''")}',
  '${drogas}',
  '${dosis}',
  ${especiesArray},
  '${link_externo.replace(/'/g, "''")}',
  true
);\n`;
  
  productoCount++;
}

fs.writeFileSync('productos_import.sql', sqlOutput);
console.log(`Generated SQL with ${productoCount} products`);
console.log('Saved to productos_import.sql');
