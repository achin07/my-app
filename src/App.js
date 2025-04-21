import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { DndProvider } from 'react-dnd'; // Import DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Import HTML5Backend
import Header from './Components/Header';
import Footer from './Components/Footer';
import Guide from './Components/Guide';
import WorldStats from './Components/WorldStats';
import UserStats from './Components/UserStats';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Header />
        <Routes>
          <Route path="/" element={<Guide />} />
          <Route path='/stats' element={<WorldStats />} />
          <Route path='/userstats' element={<UserStats/>}/>
        </Routes>
        <Footer/>
      </DndProvider>
    </div>
  );
}

export default App;




//header footer
//Guide page logic not able to add waste products
// wrong feedback and correct feedback
//refactoring the logic