import React from 'react';
import { Routes,  Route } from 'react-router-dom';
import Search from "./pages/Search"

import './App.css';
import Remember from './pages/Remember';
import CheckRemember from './pages/CheckRemember';
import WordList from './pages/WordList';

function App() {
  return (
    <div className="App">
     <Routes>
       <Route path='/' element={<Search />}></Route>
       <Route path='/remember' element={<Remember />}></Route>
       <Route path='/checkremember' element={<CheckRemember />}></Route>
       <Route path='/wordlist' element={<WordList />}></Route>
     </Routes>
    </div>
  );
}


export default App;
