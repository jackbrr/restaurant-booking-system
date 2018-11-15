import axios from 'axios';

const ZOMATO_API_URL = 'https://developers.zomato.com/api/v2.1';
const ZOMATO_API_KEY = '53e00288ff84b86f7972f54ab5ab2673';

const getCityInfo = (city) => {
  return axios({
    url: `${ZOMATO_API_URL}/locations`,
    headers: {
      'user-key': ZOMATO_API_KEY 
    },
    params: {
      query: city
    }
  }).then(resp => resp.data.location_suggestions[0]);
}

const getRestaurants = (entityId) => {
  return axios({
    method: 'POST',
    url: `${ZOMATO_API_URL}/search`,
    headers: {
      'user-key': '53e00288ff84b86f7972f54ab5ab2673'
    },
    params: {
      entity_id: entityId,
      entity_type: 'city'
    }
  }).then(({ data: { restaurants } }) => restaurants.map(res => res.restaurant));
};

export {
  getRestaurants,
  getCityInfo
}
