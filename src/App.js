import { useState } from "react";
import { asyncRun } from "./py-worker";
import unformattedPythonCodeSample from "./unformattedPythonCodeSample.js";

async function main(codeToFormat, mode) {
  try {
    const { result, error } = await asyncRun({ codeToFormat, mode});
    if (result) {
      return result;
    } else if (error) {
      console.log("pyodideWorker error: ", error);
    }
  } catch (e) {
    console.log(
      `Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`
    );
  }
}

const FormatIcon = () => (
  <svg
    preserveAspectRatio="xMidYMin"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{
      size: 12,
    }}
  >
    <path
      fill-rule="evenodd"
      d="M2.25 6A3.75 3.75 0 0 1 6 2.25h12A3.75 3.75 0 0 1 21.75 6v12A3.75 3.75 0 0 1 18 21.75H6A3.75 3.75 0 0 1 2.25 18V6ZM6 3.75A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6ZM6.25 8A.75.75 0 0 1 7 7.25h10a.75.75 0 0 1 0 1.5H7A.75.75 0 0 1 6.25 8Zm0 4a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75Z"
      clip-rule="evenodd"
    ></path>
  </svg>
);

function App() {
  const [pythonCode, setPythonCode] = useState(unformattedPythonCodeSample);
  const [elapsedTime, setElapsedTime] = useState(null);

  const format = async (mode) => {
    const { formattedCode, elapsedTime } = await main(pythonCode, mode);
    setPythonCode(formattedCode);
    setElapsedTime(elapsedTime);
  };

  const resetCode = () => {
    setPythonCode(unformattedPythonCodeSample);
  }

  return (
    <div class="flex items-center justify-center w-100 h-screen">
      <main class="bg-white w-4/5 max-w-[720px]">
        <p class="text-gray-600 text-sm font-semibold mb-2">Python code</p>
        <div>
          <div class="border border-gray-200 w-full rounded-t px-1 py-1 flex flex-row items-center justify-between gap-x-2">
            <div
              className="flex gap-x-2 items-center"
            >
              <div
                class="text-xs text-gray-600 cursor-pointer hover:bg-gray-100 rounded-b rounded-t-none px-1 py-0.5 flex flex-row items-center gap-x-0.5"
                onClick={() => format("autopep8")}
              >
                <FormatIcon />
                Format with Autopep8
              </div>
              <div
                class="text-xs text-gray-600 cursor-pointer hover:bg-gray-100 rounded-b rounded-t-none px-1 py-0.5 flex flex-row items-center gap-x-0.5"
                onClick={() => format("ruff")}
              >
                <FormatIcon />
                Format with Ruff
              </div>
              {!!elapsedTime && (
                <div className="text-gray-600 text-xs">
                  Elapsed time: {elapsedTime.toFixed(2)}ms
                </div>
              )}
            </div>
            <div>
              <div
                class="text-xs text-gray-600 cursor-pointer hover:bg-gray-100 rounded-b rounded-t-none px-1 py-0.5 flex flex-row items-center gap-x-0.5"
                onClick={resetCode}
              >
                <FormatIcon />
                Reset code
              </div>
            </div>
          </div>
          <textarea
            class="border-x border-b border-gray-200 rounded-b resize-none py-1 px-2 font-mono text-xs outline-none focus:outline-none w-full"
            style={{
              height: 400,
              whiteSpace: "pre-wrap",
            }}
            onChange={(ev) => setPythonCode(ev.target.value)}
            value={pythonCode}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
