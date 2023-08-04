import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./PDF/form.js";
import PDFIndexPage from "./PDF/PDFIndexPage.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<FormPage />} />
          <Route path="/pdf" element={<PDFIndexPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
