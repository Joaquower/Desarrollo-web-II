import React, { createContext, useReducer, useEffect } from 'react';

export const LikesContext = createContext();

function getInitialState() {
  const saved = localStorage.getItem('likesState');
  const parsed = saved ? JSON.parse(saved) : {};

  return {
    episodes: parsed.episodes || {},       // likes por personaje en episodio
    episodeLikes: parsed.episodeLikes || {} // likes por episodio general
  };
}

function likesReducer(state, action) {
  switch (action.type) {
    case "LIKE_CHARACTER": {
      const { episodeId, characterName } = action.payload;

      const episodeLikes = state.episodes[episodeId] || {};
      const currentLikes = episodeLikes[characterName] || 0;

      return {
        ...state,
        episodes: {
          ...state.episodes,
          [episodeId]: {
            ...episodeLikes,
            [characterName]: currentLikes + 1
          }
        }
      };
    }

    case "UNLIKE_CHARACTER": {
      const { episodeId, characterName } = action.payload;

      const episodeLikes = state.episodes[episodeId] || {};
      const currentLikes = episodeLikes[characterName] || 0;

      const updatedEpisodeLikes = {
        ...episodeLikes,
        [characterName]: Math.max(currentLikes - 1, 0)
      };

      return {
        ...state,
        episodes: {
          ...state.episodes,
          [episodeId]: updatedEpisodeLikes
        }
      };
    }

    case "LIKE_EPISODE": {
      const { id } = action;
      const current = state.episodeLikes[id] || 0;
      return {
        ...state,
        episodeLikes: {
          ...state.episodeLikes,
          [id]: current + 1
        }
      };
    }

    case "DISLIKE_EPISODE": {
      const { id } = action;
      const current = state.episodeLikes[id] || 0;
      return {
        ...state,
        episodeLikes: {
          ...state.episodeLikes,
          [id]: Math.max(current - 1, 0)
        }
      };
    }

    default:
      return state;
  }
}

export function LikesProvider({ children }) {
  const [state, dispatch] = useReducer(likesReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem('likesState', JSON.stringify(state));
  }, [state]);

  return (
    <LikesContext.Provider value={{ state, dispatch }}>
      {children}
    </LikesContext.Provider>
  );
}
