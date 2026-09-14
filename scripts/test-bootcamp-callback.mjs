import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync("google-apps-script/Code.gs", "utf8");
const context = {
	console,
	HtmlService: {
		XFrameOptionsMode: { ALLOWALL: "ALLOWALL" },
		createHtmlOutput(html) {
			return {
				html,
				setXFrameOptionsMode() {
					return this;
				},
			};
		},
	},
};

vm.createContext(context);
vm.runInContext(
	`${source}\nglobalThis.callbackOutput = browserResponse_({ source: "test", submissionId: "test", ok: true });`,
	context,
);

const callbackScript = context.callbackOutput.html.match(
	/<script>([\s\S]*)<\/script>/,
)?.[1];
assert.ok(
	callbackScript,
	"Apps Script response must contain a callback script",
);

function countTargets(script) {
	const calls = { parent: 0, top: 0 };
	vm.runInNewContext(script, {
		window: {
			parent: { postMessage: () => calls.parent++ },
			top: { postMessage: () => calls.top++ },
		},
	});
	return calls;
}

const brokenCallback = callbackScript.replace("window.top", "window.parent");
assert.equal(
	countTargets(brokenCallback).top,
	0,
	"regression must be detectable",
);
assert.deepEqual(countTargets(callbackScript), { parent: 0, top: 1 });

console.log("Bootcamp callback reaches the website window.");
