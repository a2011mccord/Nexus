import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchProjectDetails, selectProjects } from '../../store/projects';
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
  const projectDetails = useSelector(state => state.projectState.projectDetails)
  const initialProjectId = projects[0]?.id
  useEffect(() => {
    if (initialProjectId) {
      setProjectId(initialProjectId);
    }
  }, [initialProjectId])
  const [projectId, setProjectId] = useState(projects[0]?.id);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchProjectDetails(projectId))
    dispatch(fetchContacts());
  }, [dispatch, projectId]);

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
      <div className='projects-header'>
        <h1>Projects</h1>
        <FaSquarePlus size={'2.5em'} className='fa-plus' onClick={createProject} />
      </div>

      <div className='panels-cont'>
        <div className='project-cards-panel'>
          {projects && projects.map(project => (
            <div key={project.id} className='project-card' onClick={() => setProjectId(project.id)}>
              <h4>{project.name}</h4>
              <div className='project-card-info'>
                <div>Rep: {project.Rep?.firstName} {project.Rep?.lastName}</div>
                <div>Contact: {project.Contact?.firstName} {project.Contact?.lastName}</div>
                <div>{project.stage}</div>
                <div>${project.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className='project-details-panel'>
          <h2>{projectDetails.name}</h2>

          <div className='project-actions'>
            <FaEdit size={'1.4em'} className='action-icons' onClick={editProject} />
            <FaTrash size={'1.2em'} className='action-icons' onClick={deleteProject} />
          </div>

          <section>
            <h4>Representative</h4>
            <div className='rep-details'>
              <div>{projectDetails.Rep?.firstName}</div>
              <div>{projectDetails.Rep?.lastName}</div>
              <div>{projectDetails.Rep?.email}</div>
            </div>
          </section>

          <section>
            <h4>Customer Information</h4>
            <div className='contact-details'>
              <div>{projectDetails.Contact?.firstName} {projectDetails.Contact?.lastName}</div>
              <div>{projectDetails.Contact?.email}</div>
              <div>{projectDetails.Contact?.phoneNumber}</div>
            </div>
          </section>

          <section>
            <h4>Project Details</h4>
            <div className='project-details'>
              <div>Stage: {projectDetails.stage}</div>
              <div>Value: {projectDetails.value}</div>
              <div>Close Date: {projectDetails.closeDate}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
