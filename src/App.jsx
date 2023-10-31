import './App.css'
import { useState } from 'react'
import UploadImageForm from './components/Forms/UploadImageForm/UploadImageForm'
import ArtWrapper from './components/Wrappers/ArtWrapper/ArtWrapper'

function App() {
  const [art, setArt] = useState(null)

  const handleFormResult = (result) => {
    setArt(result)
  }

  const clearState = () => {
    setArt(null)
  }

  return (
    <main>
      {
        !art ?
        <UploadImageForm handleResult={handleFormResult}/> :
        <ArtWrapper art={art} handleExit={clearState} />
      }
      <footer>
        <p>This tool works better with white backgrounds and dark details.</p>
        <p>By www.iamrobertorodriguez.com</p>
      </footer>
    </main>
  )
}

export default App
