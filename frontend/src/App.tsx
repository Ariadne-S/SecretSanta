import React from 'react';
import logo from './logo.svg';
import './App.css';
import Icon from "./Components/Icon";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import SecretSantaRequest from "./Components/SecretSantaForm";
import { ThemeProvider } from '@material-ui/styles';
import Theme from './ui/theme/theme';

const App: React.FC = () => {
  return (
  <ThemeProvider theme={Theme}>
    <div className="App">
      <header className="App-header">
        <div className="App-name">Secret Santa Generator</div>
        <Icon icon="Bars" />
      </header>
      <main>
          <SecretSantaRequest />
      </main>
    
    </div>
  </ThemeProvider>
  );
}

export default App;
