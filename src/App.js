import './App.css';
import logo from './assets/lanlogo.png';

import Homepage from './components/homepage/Homepage.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div className="App-main-container">

            <nav className='Nav'>
                <img className='navlogo' src={logo}/>
              <input className='Search' type='search' />
            </nav>

          <Homepage />

          </div>
      </header>
    </div>
  );
}

export default App;
