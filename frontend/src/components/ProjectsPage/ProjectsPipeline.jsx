import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, selectProjects } from '../../store/projects';
import './ProjectsPage.css';
import pipelineLead from '../../images/pipelineLead.svg';
import pipelineProspect from '../../images/pipelineProspect.svg';
import pipelineApproved from '../../images/pipelineApproved.svg';
import pipelineCompleted from '../../images/pipelineCompleted.svg';
import pipelineInvoiced from '../../images/pipelineInvoiced.svg';

function ProjectsPipeline() {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch])

  return (
    <div className='pipeline-cont'>
      <div className='pipeline'>
        <div className='pipeline-segment lead'>
          Lead
          <img src={pipelineLead} />
        </div>
        <div className='pipeline-segment prospect'>
          Prospect
          <img src={pipelineProspect} />
        </div>
        <div className='pipeline-segment approved'>
          Approved
          <img src={pipelineApproved} />
        </div>
        <div className='pipeline-segment completed'>
          Completed
          <img src={pipelineCompleted} />
        </div>
        <div className='pipeline-segment invoiced'>
          Invoiced
          <img src={pipelineInvoiced} />
        </div>
      </div>

      <div className='pipeline-cards'>
        <div className='lead-pipe'>
          {projects && projects.map(project => {
            if (project.stage === 'Lead') return (
              <div key={project.id} className='project-card' onClick={() => setProjectId(project.id)}>
                <h4>{project.name}</h4>
                <div className='project-card-info'>
                  <div>Rep: {project.Rep.firstName} {project.Rep.lastName}</div>
                  <div>Contact: {project.Contact.firstName} {project.Contact.lastName}</div>
                  <div>{project.stage}</div>
                  <div>${project.value}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='prospect-pipe'>
          {projects && projects.map(project => {
            if (project.stage === 'Prospect') return (
              <div key={project.id} className='project-card' onClick={() => setProjectId(project.id)}>
                <h4>{project.name}</h4>
                <div className='project-card-info'>
                  <div>Rep: {project.Rep.firstName} {project.Rep.lastName}</div>
                  <div>Contact: {project.Contact.firstName} {project.Contact.lastName}</div>
                  <div>{project.stage}</div>
                  <div>${project.value}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='approved-pipe'>
          {projects && projects.map(project => {
            if (project.stage === 'Approved') return (
              <div key={project.id} className='project-card' onClick={() => setProjectId(project.id)}>
                <h4>{project.name}</h4>
                <div className='project-card-info'>
                  <div>Rep: {project.Rep.firstName} {project.Rep.lastName}</div>
                  <div>Contact: {project.Contact.firstName} {project.Contact.lastName}</div>
                  <div>{project.stage}</div>
                  <div>${project.value}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='completed-pipe'>
          {projects && projects.map(project => {
            if (project.stage === 'Completed') return (
              <div key={project.id} className='project-card' onClick={() => setProjectId(project.id)}>
                <h4>{project.name}</h4>
                <div className='project-card-info'>
                  <div>Rep: {project.Rep.firstName} {project.Rep.lastName}</div>
                  <div>Contact: {project.Contact.firstName} {project.Contact.lastName}</div>
                  <div>{project.stage}</div>
                  <div>${project.value}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='invoiced-pipe'>
          {projects && projects.map(project => {
            if (project.stage === 'Invoiced') return (
              <div key={project.id} className='project-card' onClick={() => setProjectId(project.id)}>
                <h4>{project.name}</h4>
                <div className='project-card-info'>
                  <div>Rep: {project.Rep.firstName} {project.Rep.lastName}</div>
                  <div>Contact: {project.Contact.firstName} {project.Contact.lastName}</div>
                  <div>{project.stage}</div>
                  <div>${project.value}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPipeline;
