import { csrfFetch } from './csrf';

const LOAD_TEAM = 'teams/loadTeam';
const ADD_TEAM_MEMBER = 'teams/addTeamMember';
const REMOVE_TEAM_MEMBER = 'teams/removeTeamMember';
const REMOVE_TEAM_MANAGER = 'teams/removeTeamManager';

const loadTeam = team => ({
  type: LOAD_TEAM,
  team
});

const addTeamMember = team => ({
  type: ADD_TEAM_MEMBER,
  team
});

const removeTeamMember = member => ({
  type: REMOVE_TEAM_MEMBER,
  member
});

const removeTeamManager = manager => ({
  type: REMOVE_TEAM_MANAGER,
  manager
});

export const fetchTeam = () => async dispatch => {
  const res = await csrfFetch('/api/teams/current');

  if (res.ok) {
    const team = await res.json();
    dispatch(loadTeam(team));
  }
};

export const createTeamMember = member => async dispatch => {
  const res = await csrfFetch('/api/teams/members', {
    method: 'POST',
    body: JSON.stringify(member)
  });

  if (res.ok) {
    const newTeam = await res.json();
    dispatch(addTeamMember(newTeam));
    return newTeam;
  }
};

export const deleteTeamMember = memberId => async dispatch => {
  const res = await csrfFetch(`/api/teams/members/${memberId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const removedMember = await res.json();
    dispatch(removeTeamMember(removedMember));
    return removedMember;
  }
};

export const deleteTeamManager = managerId => async dispatch => {
  const res = await csrfFetch(`/api/teams/managers/${managerId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const removedManager = await res.json();
    dispatch(removeTeamManager(removedManager));
    return removedManager;
  }
};

const initialState = { team: {} };

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TEAM: {
      const newState = { ...state, team: { ...state.team } };

      newState.team = action.team;

      return newState;
    }
    case ADD_TEAM_MEMBER: {
      const newState = { ...state, team: { ...state.team } };

      newState.team = action.team;

      return newState;
    }
    case REMOVE_TEAM_MEMBER: {
      const newState = { ...state, team: { ...state.team } };

      delete newState.team.Members[newState.team.Members.indexOf(action.member)]

      return newState;
    }
    case REMOVE_TEAM_MANAGER: {
      const newState = { ...state, team: { ...state.team } };

      delete newState.team.Managers[newState.team.Managers.indexOf(action.manager)]

      return newState;
    }
    default:
      return state;
  }
};

export default teamsReducer;
