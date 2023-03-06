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
import Search from './pages/Search'
import ModalProvider from './context/UserModalContext'
import Header from './components/Header'
import ToggleProvider from './context/SearchToggleContext'

function App() {
  return (
    <BrowserRouter>
      <UserInfoProvider>
        <ModalProvider>
          <ToggleProvider>
            <ScrollToTop />
            <section className="drawer-content">
              <Header />
              <section className="main pt-[60px]">
                <Routes>
                  {/* <Route path='*' element={<Error/>}/> */}
                  <Route path="/" element={<Index />} />
                  <Route path="/:id" element={<User />} />
                  <Route path="/join" element={<Join />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/search" element={<Search />} />
                </Routes>
              </section>
            </section>
          </ToggleProvider>
        </ModalProvider>
      </UserInfoProvider>
    </BrowserRouter>
  )
}

export default App
