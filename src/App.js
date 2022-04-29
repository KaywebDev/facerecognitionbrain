import React from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

function App() {

  return (
    <div className="App">
      <Navigation />
      <Logo></Logo>
      <Rank></Rank>
      <ImageLinkForm></ImageLinkForm>
    </div>
  );
}

export default App;
