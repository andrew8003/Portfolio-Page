import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './projects.scss';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

function ProjectCard({ repo }) {
  const [content, setContent] = useState('');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await axios.get(`https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/master/README.md`, {
          headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        setContent(response.data);
      } catch {
        setContent(repo.description || 'No description available');
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${repo.full_name}/languages`, {
          headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        const languageData = Object.entries(response.data).map(([language]) => ({
          name: language
        }));
        setLanguages(languageData);
      } catch {
        setLanguages([]);
      }
    };

    fetchReadme();
    fetchLanguages();
  }, [repo]);

  return (
    <div className="project-card">
      <h3>{repo.name}</h3>
      <div className="repo-description">
        <ReactMarkdown components={{ img: () => null }}>{content}</ReactMarkdown>
      </div>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View Repository</a>
      {languages.length > 0 && (
        <div className="project-languages">
          <div className="languages-bar">
            {languages.map(({ name }) => (
              <div key={name} className="language-bar-wrapper">
                <div className="language-name">{name}</div>
                <div className="language-bar">
                  <div className="language-bar-fill" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
