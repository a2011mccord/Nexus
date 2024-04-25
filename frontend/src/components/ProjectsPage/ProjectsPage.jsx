import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, selectProjects } from '../../store/projects';
import { fetchContacts, selectContacts } from '../../store/contacts';
import { useModal } from '../../context/Modal';
import CreateProjectModal from './CreateProjectModal';
import EditProjectModal from './EditProjectModal';
import DeleteProjectModal from './DeleteProjectModal';
import './ProjectsPage.css';
import { FaSquarePlus } from 'react-icons/fa6';
import { FaEdit, FaTrash } from "react-icons/fa";

function ProjectsPage() {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const projects = useSelector(selectProjects);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchContacts());
  }, [dispatch]);

  const createProject = () => setModalContent(
    <CreateProjectModal contacts={contacts} />
  );
  const editProject = project => setModalContent(
    <EditProjectModal project={project} contacts={contacts} />
  );
  const deleteProject = project => setModalContent(
    <DeleteProjectModal projectId={project.id} />
  );

  return (
    <div className='projects-cont'>
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
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.stage}</td>
              <td>{project.Rep.firstName} {project.Rep.lastName}</td>
              <td>{project.Contact?.firstName} {project.Contact?.lastName}</td>
              <td>{project.value}</td>
              <td>{project.closeDate}</td>
              <td><div>
                <FaEdit size={'1.2em'} className='fa-edit'
                  onClick={() => editProject(project)} />
                <FaTrash size={'1.2em'} className='fa-trash'
                  onClick={() => deleteProject(project)} />
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <FaSquarePlus size={'2.5em'} className='fa-plus' onClick={createProject} />
        <div></div>
      </div>
    </div>
  );
}

export default ProjectsPage;
