import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, selectProjects } from '../../store/projects';
import './ProjectsPage.css';

function ProjectsPage() {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className='project-cont'>
      <h1>Projects Page</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Stage</th>
            <th scope="col">Owner</th>
            <th scope="col">Contact</th>
            <th scope="col">Value</th>
            <th scope="col">Close Date</th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.map(project => (
            <tr key={project.id}>
              <th scope='row'>{project.name}</th>
              <td>{project.stage}</td>
              <td>Rep {project.repId}</td>
              <td>{project.Contact.firstName} {project.Contact.lastName}</td>
              <td>{project.value}</td>
              <td>{project.closeDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsPage;
