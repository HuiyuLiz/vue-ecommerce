import axios from 'axios'
let api = 'https://api.kkbox.com/v1.1/'

const apiRequest = axios.create({
  baseURL: api,
  withCredentials: false
})


// Charts
export const getCharts = token => apiRequest.get('/charts?territory=TW', token)
export const getChartList = (token, chart_id) => apiRequest.get(`/charts/${chart_id}/tracks?territory=TW&limit=25`, token)

// Search
export const searchAlbum = (token, playlist) => apiRequest.get(`/search?q=${playlist}&type=album,track&territory=TW`, token)


// Album=>Tracks
export const searchTracks = (token, album_id) => apiRequest.get(`albums/${album_id}/tracks?territory=TW&offset=0&limit=500`, token)
