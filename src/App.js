import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comingsoon from './Page/ComingSoon';
import { AppProvider } from './context/Appcontext';

function App() {
  return (
    <>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Comingsoon />}></Route>
        </Routes>
      </BrowserRouter>
      </AppProvider>
    </>
  );
}

export default App;