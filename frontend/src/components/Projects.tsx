export const Projects = () => {
    const projects = [
      { name: 'Project 1', description: 'Description of project 1', link: '#' },
      { name: 'Project 2', description: 'Description of project 2', link: '#' },
      // Add more projects here
    ];
    
    return (
      <section className="p-4 bg-gray-700 text-white">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <ul>
          {projects.map((project, index) => (
            <li key={index} className="mb-4">
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p>{project.description}</p>
              <a href={project.link} className="text-blue-400 hover:underline">
                View Project
              </a>
            </li>
          ))}
        </ul>
      </section>
    );
  };
  