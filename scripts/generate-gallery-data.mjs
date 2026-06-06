import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const photosDir = path.join(rootDir, "photos");
const outputFile = path.join(rootDir, "gallery-data.js");
const monthPattern = /^\d{4}-\d{2}$/;
const photoPattern = /\.(jpe?g|png|webp|gif|avif)$/i;

function currentBangkokMonth() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    timeZone: "Asia/Bangkok"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}`;
}

function naturalCompare(a, b) {
  return a.localeCompare(b, "en", { numeric: true, sensitivity: "base" });
}

function monthLabel(id) {
  const [year, month] = id.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

function daysInMonth(id) {
  const [year, month] = id.split("-").map(Number);
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

async function readMonthConfig(monthDir) {
  try {
    return JSON.parse(await fs.readFile(path.join(monthDir, "month.json"), "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

async function buildMonth(id) {
  const monthDir = path.join(photosDir, id);
  const entries = await fs.readdir(monthDir, { withFileTypes: true });
  const photos = entries
    .filter((entry) => entry.isFile() && photoPattern.test(entry.name))
    .sort((a, b) => naturalCompare(a.name, b.name))
    .map((entry, index) => ({
      day: index + 1,
      src: `photos/${id}/${entry.name}`
    }));
  const maximumPhotos = daysInMonth(id);
  if (photos.length > maximumPhotos) {
    throw new Error(`${id} has ${photos.length} photos, but that month has only ${maximumPhotos} days.`);
  }

  const config = await readMonthConfig(monthDir);
  const photoOfTheMonthDay = Number(config.photoOfTheMonthDay) || null;
  if (photoOfTheMonthDay && photos.length && photoOfTheMonthDay > photos.length) {
    throw new Error(`${id} photoOfTheMonthDay must be between 1 and ${photos.length}.`);
  }

  return {
    id,
    label: monthLabel(id),
    photoOfTheMonthDay,
    photos
  };
}

const activeMonth = currentBangkokMonth();
const activeMonthDir = path.join(photosDir, activeMonth);
await fs.mkdir(activeMonthDir, { recursive: true });
const activeMonthConfig = path.join(activeMonthDir, "month.json");
try {
  await fs.access(activeMonthConfig);
} catch {
  await fs.writeFile(activeMonthConfig, '{\n  "photoOfTheMonthDay": null\n}\n', "utf8");
}

const entries = await fs.readdir(photosDir, { withFileTypes: true });
const monthIds = entries
  .filter((entry) => entry.isDirectory() && monthPattern.test(entry.name))
  .map((entry) => entry.name)
  .sort();

const months = await Promise.all(monthIds.map(buildMonth));
if (!months.length) {
  throw new Error("No gallery months found in photos/YYYY-MM.");
}

const output = `window.GALLERY_DATA = ${JSON.stringify({ version: 1, months }, null, 2)};\n`;
await fs.writeFile(outputFile, output, "utf8");
console.log(`Generated ${path.basename(outputFile)} with ${months.length} month(s).`);
