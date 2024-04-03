import logo from './logo.svg';
import './App.css';

function App() {
  const pyscript = `
    for i in range(9):
        print(i)

    def func():
        print('function works')
    func()
  `
  
  return (
    <py-script
      dangerouslySetInnerHTML={{__html: pyscript}}
    />
    )
  }

export default App;
