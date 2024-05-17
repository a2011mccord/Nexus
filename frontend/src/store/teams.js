import { csrfFetch } from './csrf';

const LOAD_TEAM = 'teams/loadTeam';
const ADD_TEAM_MEMBER = 'teams/addTeamMember'

const loadTeam = team => ({
  type: LOAD_TEAM,
  team
});

const addTeamMember = member => ({
  type: ADD_TEAM_MEMBER,
  member
})

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
    const newMember = await res.json();
    dispatch(addTeamMember(newMember));
    return newMember;
  }
}

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

      return newState;
    }
    default:
      return state;
  }
};

export default teamsReducer;
