import { csrfFetch } from './csrf';

const LOAD_TEAM = 'teams/loadTeam';

const loadTeam = team => ({
  type: LOAD_TEAM,
  team
});

export const fetchTeam = () => async dispatch => {
  const res = await csrfFetch('/api/teams/current');

  if (res.ok) {
    const team = await res.json();
    dispatch(loadTeam(team));
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
    default:
      return state;
  }
};

export default teamsReducer;
