import axios from 'axios'
let api = 'https://api.kkbox.com/v1.1/'

const apiRequest = axios.create({
  baseURL: api,
  withCredentials: false
})

// Charts
export const getCharts = token => apiRequest.get('/charts?territory=TW', token)
export const getChartList = (token, chartID) => apiRequest.get(`/charts/${chartID}/tracks?territory=TW&limit=25`, token)

// Search
export const searchAlbum = (token, playlist) => apiRequest.get(`/search?q=${playlist}&type=album,track&territory=TW`, token)

// Album=>Tracks
export const searchTracks = (token, albumId) => apiRequest.get(`albums/${albumId}/tracks?territory=TW&offset=0&limit=500`, token)
