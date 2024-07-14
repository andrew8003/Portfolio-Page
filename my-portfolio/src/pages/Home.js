// src/pages/Home.js
import React from 'react';
import './Home.css'; // Import the CSS file
import './Home.scss'; // Import the SCSS file

function Home() {
  return (
    <div>
      <h1>ANDREW HANNA</h1>
      <h3>Software Engineer</h3>
      <div>
      <a href="#" class="arrow-container">
        <div class="arrow"></div>
        <div class="arrow"></div>
        <div class="arrow"></div>  
      </a>
      </div>
      <div>
        <h2>MY LINKS</h2>
        <p>Github</p>
        <p>LinkedIn</p>
      </div>
    </div>
  );
}

export default Home;
