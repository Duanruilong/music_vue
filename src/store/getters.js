/**
 * 一些映射 对于state
 * @param  {[type]}                state
 * @return {[type]}                      [description]
 * @author DRLong
 * @date   2018-03-24T23:26:58+080
 */
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => { // 计算返回数据  currentSong=playlist与currentIndex计算而来
  return state.playlist[state.currentIndex] || {}
}

export const disc = state => state.disc

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList
