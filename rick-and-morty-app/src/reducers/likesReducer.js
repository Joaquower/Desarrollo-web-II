export function likesReducer(state, action) {
  switch (action.type) {
    case 'LIKE_EPISODE':
      return {
        ...state,
        episodes: {
          ...state.episodes,
          [action.id]: (state.episodes[action.id] || 0) + 1,
        },
      };
    case 'DISLIKE_EPISODE':
      return {
        ...state,
        episodes: {
          ...state.episodes,
          [action.id]: (state.episodes[action.id] || 0) - 1,
        },
      };
    case 'LIKE_CHARACTER':
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.id]: (state.characters[action.id] || 0) + 1,
        },
      };
    default:
      return state;
  }
}
