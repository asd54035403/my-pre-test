import './App.css';

import AgeGroupPriceList from './container/AgeGroupPriceList'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className='mainContainer'>
        <AgeGroupPriceList onChange={result => console.log('result == ',result)}></AgeGroupPriceList>
      </div>
      
    </div>
  );
}

export default App;
