import './App.css'
import { LoadingProvider } from './context/LoadingProvider'
import MainContainer from './components/MainContainer'
import Cursor from './components/Cursor'
import Loading from './components/Loading'

function App() {
  return (
    <LoadingProvider>
      <Cursor />
      <Loading />
      <MainContainer />
    </LoadingProvider>
  )
}

export default App
