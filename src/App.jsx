import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Projeto from './pages/Projeto.jsx'
import ComoFunciona from './pages/ComoFunciona.jsx'
import Equipe from './pages/Equipe.jsx'
import Contato from './pages/Contato.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projeto" element={<Projeto />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
