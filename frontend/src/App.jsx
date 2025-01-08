import Layout from "./pages/Layout"
import ModalProvider from "./context/ModalProvider"
import { Analytics } from '@vercel/analytics/react'

function App() {


  return (
      <ModalProvider>
        <Layout/>
        <Analytics />
      </ModalProvider>
  )
}

export default App
