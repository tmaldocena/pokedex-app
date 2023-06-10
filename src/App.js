import './App.css';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Browse from './components/browse/Browse';
import Search from './components/search/Search';
import NoPage from './components/noPage/NoPage';
import Footer from './components/footer/Footer';
import PokeInfo from './components/pokemon/PokeInfo';
import { createContext, useEffect, useRef, useState } from 'react';
import Memes from './components/memes/Memes';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');


  const toggleTheme = () => {
    document.body.id = '';
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    document.body.id = theme;
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.id = theme;
    document.body.classList.add('fade-in');
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path='./' index element={ <Home/> } />
          <Route path='./browse' element={ <Browse/> } />
          <Route path='./search' element={ <Search/> } />
          <Route path='./pokemon/:id' element={ <PokeInfo/> } />
          <Route path='./memes' element={ <Memes/> } />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer/>
      </HashRouter>
    </ThemeContext.Provider>
  );
}

export default App;
