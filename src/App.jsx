
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Resume from './assets/Pages/Resume'
import Home from './assets/Pages/Home'
import Info from './assets/Pages/Info'
import Saved from './assets/Pages/Saved'
import View from './assets/Pages/View'
import PageNotFound from './assets/Pages/PageNotFound'
import Header from './assets/Components/Header'
import Footer from './assets/Components/Footer'
import Download from './assets/Pages/Download'

function App() {

  return (
    <>
     {/* <h1>APP COMPONENT</h1> */}
       <Header/>
     <Routes>

      <Route path='/' element={<Home/>}/>

      <Route path='/resume' element={<Resume/>}/>

      <Route path='/resume-details' element={<Info/>}/>

      <Route path='/all-resumes' element={<Saved/>}/>

      <Route path='/resume/:id' element={<View/>}/>

      <Route path='/downloads' element={<Download/>}/>

      <Route path='/*' element={<PageNotFound/>}/>

     </Routes>
     <Footer/>

     
    </>
  )
}

export default App
