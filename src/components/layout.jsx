import React from "react";
import Navbar from "./Navbar"; // Header Component
import Footer from "./Credits"; // Footer Component

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header>
        <Navbar />
      </header>

      <main style={{ flex: "1", padding: "20px" }}>
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
