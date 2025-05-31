import { Route, Routes } from "react-router-dom"
import { Login } from "./components/Login"
import { Signup } from "./components/Signup"
import {Main} from "./components/Main"
import NewsDetails from "./components/NewsDetails"

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Login/>}/>
        <Route path="/login" element={<Signup/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/details" element={<NewsDetails/>}/>
      </Routes>
    </>
  )
}

export default App
