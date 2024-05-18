import { csrfFetch } from "./csrf";
import { createSelector } from 'reselect';

const LOAD_PROJECTS = 'projects/loadProjects';
const LOAD_PROJECT_DETAILS = 'projects/loadProjectDetails';
const ADD_PROJECT = 'projects/addProject';
const UPDATE_PROJECT = 'projects/updateProject';
const REMOVE_PROJECT = 'projects/removeProject';

const loadProjects = projects => ({
  type: LOAD_PROJECTS,
  projects
});

const loadProjectDetails = projectDetails => ({
  type: LOAD_PROJECT_DETAILS,
  projectDetails
});

const addProject = project => ({
  type: ADD_PROJECT,
  project
});

const updateProject = project => ({
  type: UPDATE_PROJECT,
  project
});

const removeProject = project => ({
  type: REMOVE_PROJECT,
  project
});

export const fetchProjects = () => async dispatch => {
  const res = await csrfFetch('/api/projects/current');

  if (res.ok) {
    const projects = await res.json();
    dispatch(loadProjects(projects));
  }
};

export const fetchProjectDetails = projectId => async dispatch => {
  const res = await csrfFetch(`/api/projects/${projectId}`);

  if (res.ok) {
    const projectDetails = await res.json();
    dispatch(loadProjectDetails(projectDetails));
  }
};

export const createProject = project => async dispatch => {
  const res = await csrfFetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify(project)
  });

  if (res.ok) {
    const newProject = await res.json();
    dispatch(addProject(newProject));
    return newProject;
  }
};

export const editProject = (projectId, payload) => async dispatch => {
  const res = await csrfFetch(`/api/projects/${projectId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const updatedProject = await res.json();
    dispatch(updateProject(updatedProject));
    return updatedProject;
  }
};

export const deleteProject = projectId => async dispatch => {
  const res = await csrfFetch(`/api/projects/${projectId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const removedProject = await res.json();
    dispatch(removeProject(removedProject));
    return removedProject;
  }
};

const selectedProjects = state => state.projectState.projects;
export const selectProjects = createSelector(selectedProjects, projects => Object.values(projects))

const initialState = { projects: {}, projectDetails: {} };

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROJECTS: {
      const newState = { ...state, projects: { ...state.projects } };

      action.projects.Projects.forEach(project => {
        newState.projects[project.id] = project;
      });

      return newState;
    }
    case LOAD_PROJECT_DETAILS: {
      const newState = { ...state, projectDetails: { ...state.projectDetails } };

      newState.projectDetails = action.projectDetails;

      return newState;
    }
    case ADD_PROJECT: {
      const newState = { ...state, projects: { ...state.projects } };

      newState.projects[action.project.id] = action.project;

      return newState;
    }
    case UPDATE_PROJECT: {
      const newState = { ...state, projects: { ...state.projects } };

      newState.projects[action.project.id] = action.project;

      return newState;
    }
    case REMOVE_PROJECT: {
      const newState = { ...state, projects: { ...state.projects } };

      delete newState.projects[action.project.id];

      return newState;
    }
    default:
      return state;
  }
};

export default projectsReducer;
