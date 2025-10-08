import fs from 'fs'
import path from 'path'

const ICONS_DIR = 'src/shared/ui/icons/svg';
const INDEX_FILE = 'src/shared/ui/icons/index.ts';

const fsp = fs.promises;

async function normalizeIconName(name) {
   return name
      .replace(/icon/gi, '')                // убираем "icon" в любом регистре
      .replace(/[^a-zA-Z0-9]+/g, '-')       // всё, кроме букв/цифр → дефис
      .replace(/^-+|-+$/g, '')              // убираем дефисы в начале/конце
      .replace(/--+/g, '-')                 // убираем повторяющиеся дефисы
      .replace(/^\d+/, '')                  // убираем числа в начале
      .toLowerCase();
}

function toComponentName(fileName) {
   const parts = fileName.replace(/\.svg$/i, '').split('-');

   const clean = parts.filter(Boolean);

   const pascal = clean.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');

   return `${pascal}Icon`;
}

async function main() {
   const files = (await fsp.readdir(ICONS_DIR)).filter(f => f.endsWith('.svg'));

   const iconExports  = [];

   for (const file of files) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const normalized = await normalizeIconName(base);
      const oldPath = path.join(ICONS_DIR, file);
      const newPath = path.join(ICONS_DIR, `${normalized}${ext}`);

      if (oldPath !== newPath) {
         await fsp.rename(oldPath, newPath)
         console.log(`🔤 ${file} → ${path.basename(newPath)}`);
      }

      const componentName = toComponentName(normalized);

      iconExports.push(`export { default as ${componentName} } from './svg/${normalized}.svg?react';`);
   }

   await fsp.writeFile(INDEX_FILE, iconExports.join('\n') + '\n');
   console.log(`✅ Сгенерирован ${INDEX_FILE} (${iconExports.length} новых экспортов)`);
}

main().catch(err => {
   console.error('❌ Ошибка при генерации иконок:', err);
   process.exit(1);
});