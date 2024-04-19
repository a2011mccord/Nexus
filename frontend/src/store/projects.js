import { csrfFetch } from "./csrf";
import { createSelector } from 'reselect';

const LOAD_PROJECTS = 'projects/loadProjects';

const loadProjects = projects => ({
  type: LOAD_PROJECTS,
  projects
});

export const fetchProjects = () => async dispatch => {
  const res = await csrfFetch('/api/projects/current');

  if (res.ok) {
    const projects = await res.json();
    dispatch(loadProjects(projects));
  }
};

const selectedProjects = state => state.projectState.projects;
export const selectProjects = createSelector(selectedProjects, projects => Object.values(projects))

const initialState = { projects: {} }

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROJECTS: {
      const newState = { ...state, projects: { ...state.projects } };

      action.projects.Projects.forEach(project => {
        newState.projects[project.id] = project;
      });

      return newState;
    }
    default:
      return state;
  }
}

export default projectsReducer;
