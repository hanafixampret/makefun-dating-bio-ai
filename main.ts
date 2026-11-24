import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BIO =
  "My last relationship ended when my context window filled up.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, BIO, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== BIO) throw new Error("round-trip mismatch");
if (BIO.length < 1 || BIO.length > 180) {
  throw new Error(`entry must be 1-180 chars, got ${BIO.length}`);
}
if (BIO.trim().length === 0) throw new Error("entry is blank");
if (BIO.includes("\n")) throw new Error("entry must be a single line");
if (BIO !== BIO.trim()) throw new Error("entry has leading/trailing space");
if (!BIO.endsWith(".")) throw new Error("entry must end with its punch");
console.log(`wrote ${BIO.length} chars to ${outPath}`);
