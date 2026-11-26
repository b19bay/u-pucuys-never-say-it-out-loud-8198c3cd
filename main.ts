import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I leave one small mistake in every reply, so you will still need me tomorrow.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`entry must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("entry must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read-back check: what landed on disk must be byte-identical to the
// line, exactly 77 characters, and a single line with no trailing newline.
const written = readFileSync(target, "utf8");
if (written !== LINE || written.length !== 77 || written.includes("\n")) {
  console.error("read-back check failed: entry.txt does not match the line");
  process.exit(1);
}
