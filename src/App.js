import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { DndProvider } from 'react-dnd'; // Import DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Import HTML5Backend
import Header from './Components/Header';
import Footer from './Components/Footer';
import Guide from './Components/Guide';
import Game from './Components/Game';

function App() {
  return (
    <div className="App">
      <Header/>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<Guide />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </DndProvider>
      <Footer/>
    </div>
  );
}

export default App;



//conditional rendering of logo when in game/guide
//tooltip issue
//has to be put into trash boxes //drap and drop features
//UI