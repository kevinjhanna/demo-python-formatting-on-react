/* eslint-disable */ 
import init, { format } from "@wasm-fmt/ruff_fmt";
importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js");

const pythonScript = `
    from autopep8 import fix_code
    from js import codeToFormat
    fix_code(codeToFormat)
`;

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide();
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await micropip.install("autopep8");
}
let pyodideReadyPromise = loadPyodideAndPackages();

async function handleAutopep8(event) {
  const { id, mode, ...context } = event.data;
  await pyodideReadyPromise;

  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }

  try {
    await self.pyodide.loadPackagesFromImports(pythonScript);
    let formattedCode = await self.pyodide.runPythonAsync(pythonScript);
    return { result: { formattedCode } }
  } catch (error) {
    return { error: error.message };
  }
}

async function handleRuff(event) {
  const { id, mode, ...context } = event.data;
  await init();
  const formattedCode = format(context.codeToFormat);
  return { result: { formattedCode } };
}

self.onmessage = async (event) => {
  const { id, mode } = event.data;
  let response;

  const start = performance.now();
  switch(mode) {
    case "autopep8": {
      response = await handleAutopep8(event)
      break;
    }
    case "ruff": {
      response = await handleRuff(event)
      break;
    }
  }
  const end = performance.now();

  if (response.result) {
    response.result.elapsedTime = end - start;
  }

  self.postMessage({ ...response, id });
};
