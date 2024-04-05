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

self.onmessage = async (event) => {
  await pyodideReadyPromise;
  const { id, ...context } = event.data;
  // The worker copies the context in its own "memory" (an object mapping name to values)
  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }

  try {
    const start = performance.now();
    await self.pyodide.loadPackagesFromImports(pythonScript);
    let formattedCode = await self.pyodide.runPythonAsync(pythonScript);
    const end = performance.now();
    const elapsedTime = end - start;
    self.postMessage({ result: { formattedCode, elapsedTime }, id });
  } catch (error) {
    self.postMessage({ error: error.message, id });
  }
};
