import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PDFDragDrop from './features/PDFDragDrop'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PDFDragDrop />} />
            </Routes>
        </Router>
    )
}

export default App