import React, { useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (searchResults) => {
    setSearchResults(searchResults);
    console.log(searchResults);
  };

  return (
    <Router>
      <NavBar search={handleSearch} />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home searchResults={searchResults} />}
        />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
