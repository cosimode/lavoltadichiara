import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = "public/images";

// Prendi TUTTI i .webp originali (escluse le varianti già generate)
const files = fs.readdirSync(dir).filter(f => {
    if (!f.endsWith('.webp')) return false;
    return !f.match(/-(400|800|1200)\.webp$/);
});

console.log('📁 Immagini da processare:');
files.forEach(f => console.log(`  - ${f}`));
console.log('');

const sizes = [
    { suffix: "-400", width: 400 },
    { suffix: "-800", width: 800 },
    { suffix: "-1200", width: 1200 },
];

for (const f of files) {
    const input = path.join(dir, f);
    const base = f.replace(/\.webp$/i, "");

    console.log(`\n📸 Processing: ${f}`);

    for (const size of sizes) {
        const outputPath = path.join(dir, `${base}${size.suffix}.webp`);

        await sharp(input)
            .resize({
                width: size.width,
                withoutEnlargement: true,
                kernel: 'lanczos3'
            })
            .sharpen({ sigma: 0.8 })
            .webp({
                quality: 95,
                effort: 6,
                smartSubsample: false
            })
            .toFile(outputPath);

        console.log(`  ✅ ${base}${size.suffix}.webp`);
    }
}

console.log("\n🎉 Tutte le immagini rigenerate!");
