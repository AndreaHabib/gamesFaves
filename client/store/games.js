import axios from 'axios'

const initialState = {
  allGames: [],
  favoriteGames: []
}

const FETCH_GAMES = 'FETCH_GAMES'
const SEARCH_GAMES = 'SEARCH_GAMES'
const FETCH_FAVORITE_GAMES = 'FETCH_FAVORITE_GAMES'
const ADD_FAVORITE_GAME = 'ADD_FAVORITE_GAME'
const REMOVE_FAVORITE_GAME = 'REMOVE_FAVORITE_GAME'

//Action Creator
const fetchAllGames = games => {
  return {
    type: FETCH_GAMES,
    games
  }
}

const fetchFavoriteGames = games => {
  return {
    type: FETCH_FAVORITE_GAMES,
    games
  }
}

const addFavoriteGame = gameId => {
  return {
    type: ADD_FAVORITE_GAME,
    gameId
  }
}

const removeFavoriteGame = gameId => {
  return {
    type: REMOVE_FAVORITE_GAME,
    gameId
  }
}

// Thunk Creators
export const fetchGameThunk = input => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url: `https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/?search=${input}&limit=20&fields=age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover.url,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': 'xm3d193xwm79nvjmvklzg9cp7qwd8g',
          Authorization: 'Bearer c7vdlp3fh4r24izzwdw63j8w4yuwxw'
        },
        data:
          'limit: 20; fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover.url,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;'
      })
      console.log({data})
      dispatch(fetchAllGames(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchGamesThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url:
          'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': 'xm3d193xwm79nvjmvklzg9cp7qwd8g',
          Authorization: 'Bearer c7vdlp3fh4r24izzwdw63j8w4yuwxw'
        },
        data:
          'limit: 20; fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover.url,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;'
      })

      console.log({data})

      dispatch(fetchAllGames(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchFavoriteGamesThunk = () => {
  return async (dispatch, useState) => {
    try {
      const {id} = useState().user

      const {data} = await axios.get(`/api/favorites/${id}`)

      console.log({data})

      const promises = data.map(game =>
        axios({
          url:
            'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Client-ID': 'xm3d193xwm79nvjmvklzg9cp7qwd8g',
            Authorization: 'Bearer c7vdlp3fh4r24izzwdw63j8w4yuwxw'
          },
          data: `limit: 20; fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover.url,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;where id=${
            game.gameId
          };`
        })
      )

      console.log({promises})

      Promise.all(promises).then(res => {
        console.log({res})

        const gamesData = res.map(curRes => curRes.data[0])

        console.log({gamesData})

        dispatch(fetchFavoriteGames(gamesData))
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const addFavoriteGameThunk = gameId => {
  return async (dispatch, useState) => {
    try {
      console.log({gameId})

      const {id} = useState().user

      const {data} = await axios.post(`/api/favorites/${id}`, {gameId})

      console.log({data})

      dispatch(addFavoriteGame(gameId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeFavoriteGameThunk = gameId => {
  return async (dispatch, useState) => {
    try {
      const {id} = useState().user

      const {data} = await axios.delete(`/api/favorites/${id}/${gameId}`)

      console.log({data})

      dispatch(removeFavoriteGame(gameId))
    } catch (error) {
      console.error(error)
    }
  }
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAMES:
      return {
        ...state,
        allGames: action.games
      }
    case SEARCH_GAMES:
      return {
        ...state,
        allGames: action.game
      }
    case FETCH_FAVORITE_GAMES:
      return {
        ...state,
        favoriteGames: action.games
      }
    case ADD_FAVORITE_GAME:
      return {
        ...state,
        favoriteGames: [...state.favoriteGames, action.gameId]
      }
    case REMOVE_FAVORITE_GAME:
      return {
        ...state,
        favoriteGames: state.favoriteGames.filter(
          game => game.id !== action.gameId
        )
      }
    default:
      return state
  }
}

export default gameReducer
