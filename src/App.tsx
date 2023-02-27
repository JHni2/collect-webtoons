import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/css/tailwind.css'
import './assets/css/style.css'
import ScrollToTop from './helpers/helpers'
import Join from './pages/Join'
import {} from 'firebase/firestore'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <section className="drawer-content">
        {/* <Nav/> */}
        <Routes>
          {/* <Route path='*' element={<Error/>}/> */}
          {/* <Route path='/' element={<Index/>}/> */}
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </section>
    </BrowserRouter>
  )
}

export default App
