import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Projeto from './pages/Projeto.jsx'
import ProjetosExternos from './pages/ProjetosExternos.jsx'
import Equipe from './pages/Equipe.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projeto" element={<Projeto />} />
        <Route path="/projetos-externos" element={<ProjetosExternos />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
