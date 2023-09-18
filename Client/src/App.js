import './App.css';
import Pane from './Pane';
import {Tetris} from './components/pages/Tetris';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/'
                        element={<Pane/>}/>
                    <Route path='/game'
                        element={<Tetris/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
