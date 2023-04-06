import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from 'react-bootstrap'
import {Routes, Route, Navigate} from "react-router-dom"

function App() {
  return(
    <Container className="my-4">
      <Routes>
              <Route path='/' element={<h1>Home</h1>} />
              <Route path='/new' element={<h1>New</h1>} />
              <Route path='*' element={<Navigate to='/' />}/>
              <Route path='/:id'>
                <Route path="index" element={<h1>show</h1>}/>
                <Route path="edit" element= {<h1>edit</h1>}/>
              </Route>
              
      </Routes>

    </Container>
    

    )
}

export default App
