import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/css/tailwind.css'
import './assets/css/style.css'
import ScrollToTop from './helpers/helpers'
import Join from './pages/Join'
import {} from 'firebase/firestore'
import Login from './pages/Login'
import Index from './pages/Index'
import UserInfoProvider from './context/UserInfoContext'
import User from './pages/User'
import Search from './components/Search'

function App() {
  return (
    <BrowserRouter>
      <UserInfoProvider>
        <ScrollToTop />
        <section className="drawer-content">
          {/* <Nav/> */}
          <Routes>
            {/* <Route path='*' element={<Error/>}/> */}
            <Route path="/" element={<Index />} />
            <Route path="/:id" element={<User />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/serach/:id" element={<Search />} />
          </Routes>
        </section>
      </UserInfoProvider>
    </BrowserRouter>
  )
}

export default App
