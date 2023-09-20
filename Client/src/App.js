import './css/App.css';
import Pane from './components/Pane';
import { Tetris } from './components/pages/Tetris';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ScoreContextProvider } from './contexts/ScoreContextProvider';
import { AuthContextProvider } from './contexts/AuthContextProvider';

function App() {
    return (
      <ScoreContextProvider>
        <AuthContextProvider>
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/'
                        element={<Pane />} />
                    <Route path='/game'
                        element={<Tetris />} />
                </Routes>
            </div>
        </BrowserRouter>
        </AuthContextProvider>
        </ScoreContextProvider>
    );
}

export default App;
