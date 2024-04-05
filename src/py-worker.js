// const worker = new Worker(new URL('./workers/foo.worker.ts', import.meta.url));

// const formattingWorker = new Worker("./webworker.js");
const formattingWorker = new Worker(new URL("./webworker.js", import.meta.url));


const callbacks = {};

formattingWorker.onmessage = (event) => {
  const { id, ...data } = event.data;
  const onSuccess = callbacks[id];
  delete callbacks[id];
  onSuccess(data);
};

const asyncRun = (() => {
  let id = 0; // identify a Promise
  return (context) => {
    // the id could be generated more carefully
    id = (id + 1) % Number.MAX_SAFE_INTEGER;
    return new Promise((onSuccess) => {
      callbacks[id] = onSuccess;
      formattingWorker.postMessage({
        ...context,
        id,
      });
    });
  };
})();

export { asyncRun };
