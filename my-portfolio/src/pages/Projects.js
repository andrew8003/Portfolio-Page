import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './projects.scss';

// Load the GitHub token from environment variables
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// ProjectCard Component
function ProjectCard({ repo }) {
  const [content, setContent] = useState('');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await axios.get(`https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/master/README.md`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`
          }
        });
        console.log('Readme API Response Headers:', response.headers); // Log headers for debugging
        setContent(response.data);
      } catch (error) {
        setContent(repo.description || 'No description available');
      }
    };
    
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${repo.full_name}/languages`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`
          }
        });
        console.log('Languages API Response Headers:', response.headers); // Log headers for debugging
        const total = Object.values(response.data).reduce((acc, value) => acc + value, 0);
        const languageData = Object.entries(response.data).map(([language, bytes]) => ({
          name: language,
          percentage: ((bytes / total) * 100).toFixed(1)
        }));
        setLanguages(languageData);
      } catch (error) {
        setLanguages([]);
      }
    };

    fetchReadme();
    fetchLanguages();
  }, [repo]);

  return (
    <div className="project-card">
      <h3>{repo.name}</h3>
      <ReactMarkdown components={{ img: () => null }}>{content}</ReactMarkdown>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View Repository</a>
      {languages.length > 0 && (
        <div className="project-languages">
          <div className="languages-bar">
            {languages.map(({ name, percentage }) => percentage > 0 && (
              <div key={name} className="language-bar-wrapper">
                <div className="language-name">{name}</div>
                <div className="language-bar">
                  <div className="language-bar-fill" style={{ width: `${percentage}%` }} />
                  <div className="language-percentage">{percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Projects Component
function Projects({ repos = [] }) {
  return (
    <div className="projects-container">
      {repos.map(repo => (
        <ProjectCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}

export default Projects;
