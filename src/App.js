import logo from './logo.svg';
import './App.css';

function App() {
  const pyscript = `
  `

  const handleBlur = () => {

  }
  
  return (
    <div>
      <textarea id="textarea" onBlur={handleBlur} />
      <button id="button">Run</button>
      <div id="output"></div>
    </div>
  );
}

export default App;
