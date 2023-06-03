import React from 'react';
import './App.css';
import Footer from './components/Footer';
import CocktailList from './components/CocktailList';
import ThinCard from './components/ThinCard';
function App() {
  return (
    <div className="App">
      <CocktailList />
      <ThinCard />
      <Footer /> 
    </div>
  );
}

export default App;