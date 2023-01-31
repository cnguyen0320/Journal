import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ViewEntryPage from './pages/ViewEntryPage';

function App() {
  return (
    <div className="App">
      <header className="App-header container fs-1 fw-bold">
        My Journal
        <hr></hr>
      </header>
      
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/entry" element={<CreatePage/>}></Route>
          <Route path="/viewEntry" element={<ViewEntryPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
