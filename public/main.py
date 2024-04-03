from pyodide.ffi import create_proxy
from js import document 

def runPython(arg):
  value = document.getElementById("textarea").value
  output_div = document.querySelector("#output")
  output_div.innerText = value.upper()

function_proxy = create_proxy(runPython)
document.getElementById("button").addEventListener("click", function_proxy)