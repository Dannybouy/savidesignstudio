import fs from "node:fs";

const countriesPath = "google-apps-script/lib/countries.gs";
const codePath = "google-apps-script/Code.gs";
const startMarker = "// BEGIN GENERATED COUNTRY LIST";
const endMarker = "// END GENERATED COUNTRY LIST";
const countries = fs.readFileSync(countriesPath, "utf8").trim();
const code = fs.readFileSync(codePath, "utf8");
const start = code.indexOf(startMarker);
const end = code.indexOf(endMarker);

if (start === -1 || end === -1 || end < start) {
	throw new Error("Country list markers are missing from Code.gs.");
}

const before = code.slice(0, start);
const after = code.slice(end + endMarker.length);
const next = `${before + startMarker}\n${countries}\n${endMarker}${after}`;

if (next !== code) {
	fs.writeFileSync(codePath, next);
}

console.log(`Synced ${countriesPath} into ${codePath}.`);
