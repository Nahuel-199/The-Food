import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import Created from './components/created/Created';
import Details from './components/details/Details';
import './App.css';




function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Routes>
        <Route exact path= '/' element={<Landing/>} />
        <Route path= '/home' element={<Home/>} />
        <Route path= '/createdrecipes' element={<Created/>} />
        <Route exact path="/recipes/:id" element={<Details/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
