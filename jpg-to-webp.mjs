import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = "public/images";

// Trova tutti i JPG
const jpgFiles = fs.readdirSync(dir).filter(f => f.match(/\.JPG$/i));

console.log(`📸 Trovati ${jpgFiles.length} file JPG da convertire\n`);

for (const f of jpgFiles) {
    const input = path.join(dir, f);
    let outputName = f.replace(/\.JPG$/i, '.webp');

    // Rinomina borgo-esterno → borgo-esterno-1
    if (outputName === 'borgo-esterno.webp') {
        outputName = 'borgo-esterno-1.webp';
    }

    const output = path.join(dir, outputName);

    console.log(`Converting: ${f} → ${outputName}`);

    await sharp(input)
        .rotate()
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: 98, effort: 6 })
        .toFile(output);

    console.log(`  ✅ ${outputName}`);
}

console.log('\n🗑️  Puoi ora eliminare i .JPG originali');
console.log('✨ Rigenera le varianti: node fix-quality.mjs\n');
