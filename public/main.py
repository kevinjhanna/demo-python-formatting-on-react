from pyodide.ffi import create_proxy
from js import document 
from autopep8 import fix_code

def runPython(arg):
  value = document.getElementById("textarea").value
  output_div = document.querySelector("#output")
  output_div.innerText = fix_code(value)

function_proxy = create_proxy(runPython)
document.getElementById("button").addEventListener("click", function_proxy)