import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.scss';
import githubLogo from '../media/githublogo.png';
import linkedinLogo from '../media/linkedin.png';
import Projects from './Projects';
import Helmet from 'react-helmet';
import reactLogo from '../media/reactlogo.png';
import javaLogo from '../media/javalogo.png';
import pythonLogo from '../media/pythonlogo.png';
import htmlLogo from '../media/htmllogo.png';
import phpLogo from '../media/phplogo.png';
import sqlLogo from '../media/sqllogo.png';
import cssLogo from '../media/csslogo.png';
import rLogo from '../media/rlogo.png';
import javascriptLogo from '../media/javascriptlogo.png';

const languages = [
    { name: 'React', image: reactLogo },
    { name: 'Java', image: javaLogo },
    { name: 'Python', image: pythonLogo },
    { name: 'HTML', image: htmlLogo },
    { name: 'PHP', image: phpLogo },
    { name: 'SQL', image: sqlLogo },
    { name: 'CSS', image: cssLogo },
    { name: 'R', image: rLogo },
    { name: 'JavaScript', image: javascriptLogo },
];

function Home() {
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get('https://api.github.com/users/andrew8003/repos');
                const sortedRepos = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setRepos(sortedRepos);
            } catch {
                setError('Unable to load repositories at this time.');
            }
        };

        fetchRepos();
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="App">
            <Helmet>
                <title>Andrew Hanna</title>
                <meta name="description" content="Andrew Hanna's personal website showcasing his projects, skills, and professional links." />
                <meta name="keywords" content="Andrew Hanna, Software Engineer, portfolio, projects, GitHub, LinkedIn" />
                <link rel="icon" href="/media/ahfavicon.ico" type="image/x-icon" />
            </Helmet>
            <header>
                <h1 className="typing">ANDREW HANNA</h1>
                <h2>Software Engineer MEng</h2>
                <div className="burger-menu" onClick={toggleMenu}>
                    <div className="burger-bar"></div>
                    <div className="burger-bar"></div>
                    <div className="burger-bar"></div>
                </div>
                <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                    <a href="#aboutme" onClick={toggleMenu}>About Me</a>
                    <a href="#projects" onClick={toggleMenu}>My Projects</a>
                    <a href="#languages" onClick={toggleMenu}>Languages</a>
                    <a href="#mylinks" onClick={toggleMenu}>My Links</a>
                    <a href="#contact" onClick={toggleMenu}>Contact Me</a>
                </nav>
            </header>
            <div>
                <a href="#aboutme" className="arrow-container" aria-label="Scroll to about me">
                    <div className="arrow"></div>
                    <div className="arrow"></div>
                    <div className="arrow"></div>
                </a>
            </div>
            <div className="colour-div">
                <section id="aboutme">
                    <h1 className="projects-header">About Me</h1>
                    <div className="aboutme-box">
                        <div className="h3-wrapper">
                            <h3>Hi, I'm Andrew, a recently graduated Software Engineer with an interest in learning cutting-edge technologies to solve complex problems and create fun projects.</h3>
                        </div>
                        <div className="h3-wrapper">
                            <h3>Below you can find the languages I'm familiar with, links to my GitHub and LinkedIn, and my GitHub repositories.</h3>
                        </div>
                    </div>
                </section>

                <section id="projects">
                    <h1 className="projects-header">MY PROJECTS</h1>
                    {error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <Projects repos={repos} />
                    )}
                </section>

                <section id="languages">
                    <h1 className="projects-header">Languages</h1>
                    <div className="languages-container">
                        {languages.map((lang) => (
                            <div key={lang.name} className="language-box">
                                <img src={lang.image} alt={`${lang.name} logo`} className="language-logo" />
                                <div className="tooltip">{lang.name}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="mylinks">
                    <h1 className="projects-header">MY LINKS</h1>
                    <div className="social-links-container">
                        <a href="https://github.com/andrew8003" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                            <img src={githubLogo} alt="GitHub Logo" className="social-logo" />
                            <span className="social-logo-text">GitHub</span>
                        </a>
                        <a href="https://linkedin.com/in/andrew8003" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                            <img src={linkedinLogo} alt="LinkedIn Logo" className="social-logo" />
                            <span className="social-logo-text">LinkedIn</span>
                        </a>
                    </div>
                </section>

                <section id="contact">
                    <h1 className="contact-header">Contact Me</h1>
                    <h3>The best way to contact me is through{' '}
                        <a href="https://linkedin.com/in/andrew8003" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
                    </h3>
                </section>
            </div>
        </div>
    );
}

export default Home;
