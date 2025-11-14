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
import linuxLogo from '../media/Tux.svg';
import bashLogo from '../media/bash.svg';
import AnimatedBackground from '../components/AnimatedBackground';

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
    { name: 'Linux', image: linuxLogo },
    { name: 'Bash', image: bashLogo },
];

function Home() {
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [experienceOpen, setExperienceOpen] = useState(false);
    const [certificationsOpen, setCertificationsOpen] = useState(false);

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
            <AnimatedBackground />
            <Helmet>
                <title>Andrew Hanna | Software Engineer</title>
                <meta name="description" content="Andrew Hanna's personal website showcasing his projects, skills, and professional links." />
                <meta name="keywords" content="Andrew Hanna, Software Engineer, portfolio, projects, GitHub, LinkedIn" />
                <link rel="icon" href="/media/ahfavicon.ico" type="image/x-icon" />
            </Helmet>
            <header>
                <div>
                    <h1>ANDREW HANNA</h1>
                    <h2>MEng Software Engineering</h2>
                </div>
                <div className="burger-menu" onClick={toggleMenu}>
                    <div className="burger-bar"></div>
                    <div className="burger-bar"></div>
                    <div className="burger-bar"></div>
                </div>
                <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                    <a href="#" onClick={toggleMenu}>Home</a>
                    <a href="#aboutme" onClick={toggleMenu}>About</a>
                    <a href="#experience" onClick={toggleMenu}>Experience</a>
                    <a href="#certifications" onClick={toggleMenu}>Certifications</a>
                    <a href="#projects" onClick={toggleMenu}>Projects</a>
                    <a href="#languages" onClick={toggleMenu}>Skills</a>
                    <a href="#contact" onClick={toggleMenu}>Contact</a>
                </nav>
            </header>
            
            <div className="hero-section">
                <h1>Programming isn't about what you know; it's about what you can figure out.</h1>
                <h2>- Chris Pine</h2>
                <div className="social-links-container">
                    <a href="https://github.com/andrew8003" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                        <img src={githubLogo} alt="GitHub" className="social-logo" />
                        <span className="social-logo-text">GitHub</span>
                    </a>
                    <a href="https://linkedin.com/in/andrew8003" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                        <img src={linkedinLogo} alt="LinkedIn" className="social-logo" />
                        <span className="social-logo-text">LinkedIn</span>
                    </a>
                </div>
                <a href="#aboutme" className="arrow-container" aria-label="Scroll to about me">
                    <div className="arrow-icon"></div>
                </a>
            </div>

            <div className="content-section" id="aboutme">
                <h1 className="section-header">About Me</h1>
                <div className="about-content">
                    <p>Hi, I'm Andrew, a recently graduated Software Engineer with a passion for learning cutting-edge technologies to solve complex problems and create innovative projects.</p>
                    <p>I am always open and eager to learn new skills and technologies to enhance my expertise and contribute effectively to any team or project.</p>
                </div>
            </div>

            <div className="content-section" id="experience">
                <h1 className="section-header">Experience</h1>
                <div className="experience-container">
                    <div className="experience-card">
                        <div className="experience-header" onClick={() => setExperienceOpen(!experienceOpen)}>
                            <div>
                                <h3 className="experience-title">UCL, Linux Support Analyst</h3>
                                <p className="experience-date">June 2025 - Current</p>
                            </div>
                            <div className={`expand-icon ${experienceOpen ? 'open' : ''}`}>▼</div>
                        </div>
                        {experienceOpen && (
                            <div className="experience-details">
                                <ul>
                                    <li>Linux system proficiency across multiple distributions</li>
                                    <li>System upgrades, maintenance, and security hardening across Linux environments</li>
                                    <li>User support via ticketing systems and direct interaction</li>
                                    <li>Legacy PHP website upgrades and maintenance</li>
                                    <li>Containerization and virtualization technologies</li>
                                    <li>Full system lifecycle management: specification definition, procurement, assembly, rack installation, configuration, and deployment</li>
                                    <li>System administration and infrastructure management</li>
                                    <li>On-premise to cloud migration planning and execution</li>
                                    <li>Monitoring system implementation and management</li>
                                    <li>Securing solutions to unique and dynamic challenges</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="content-section" id="certifications">
                <h1 className="section-header">Certifications & Training</h1>
                <div className="experience-container">
                    <div className="experience-card">
                        <div className="experience-header" onClick={() => setCertificationsOpen(!certificationsOpen)}>
                            <div>
                                <h3 className="experience-title">Red Hat System Administration (RHSA)</h3>
                                <p className="experience-date">Current</p>
                            </div>
                            <div className={`expand-icon ${certificationsOpen ? 'open' : ''}`}>▼</div>
                        </div>
                        {certificationsOpen && (
                            <div className="experience-details">
                                <ul className="certification-list">
                                    <li className="completed">
                                        <span className="status-icon">✓</span>
                                        Red Hat System Administration I (RH124) - Ver. 10.0
                                        <a href="https://www.credly.com/badges/18da7fc4-5c94-4692-85e7-1a2342834e56" target="_blank" rel="noopener noreferrer" className="status-badge verify-badge">Verify</a>
                                    </li>
                                    <li className="planned">
                                        <span className="status-icon planned-icon">○</span>
                                        Red Hat System Administration II (RH134)
                                        <span className="status-badge">Planned</span>
                                    </li>
                                    <li className="planned">
                                        <span className="status-icon planned-icon">○</span>
                                        RHSA Certification Exam
                                        <span className="status-badge">Planned</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="content-section" id="projects">
                <h1 className="section-header">Projects</h1>
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <Projects repos={repos} />
                )}
            </div>


            <div className="content-section" id="languages">
                <h1 className="section-header">Technical Skills</h1>
                <div className="grid-container languages-container">
                    {languages.map((lang) => (
                        <div key={lang.name} className="language-box">
                            <img src={lang.image} alt={`${lang.name}`} className="language-logo" />
                            <div className="tooltip">{lang.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="content-section" id="contact">
                <h1 className="section-header">Get In Touch</h1>
                <div className="about-content">
                    <p>The best way to reach me is{' '}
                        <a href="https://linkedin.com/in/andrew8003" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;
