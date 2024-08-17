import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Layout from './Layout';

function App() {
    return (
        <Router>
            <div className="App">
                <Layout />
            </div>
        </Router>
    );
}

export default App;
