import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import MyFolders from './pages/MyFolders';
import PaymentE from './pages/PaymentE';
import PaymentP from './pages/PaymentP';

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
          <Route path='/suscription/enterprise' element={<PaymentE/>} />
          <Route path='/suscription/premium' element={<PaymentP/>} />
          <Route path='*' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
