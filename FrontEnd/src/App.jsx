import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import MyFolders from './pages/MyFolders';

function App() {
  return (
    <div className='text-slate-800'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Login/>} />
          <Route path='/folders' element={<MyFolders/>} />
          <Route path='/folders/:id' element={<MyFolders/>} />
          <Route path='*' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
