import axios from 'axios'

let api = 'https://api.kkbox.com/v1.1/'

const apiRequest = axios.create({
  baseURL: api,
  withCredentials: false,
})


// 排行榜
export const getCharts = token => apiRequest.get('/charts?territory=TW', token)
export const getChartList = (token, chart_id) => apiRequest.get(`/charts/${chart_id}?territory=TW`, token)