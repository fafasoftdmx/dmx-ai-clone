const ThirdPartyEndpoints = {
  geocode: (lat, lng) =>
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCNx9a0gaR6eUQxbiQly4eSINk3n8vNLXw`,
};

const api = {
  geocode(lat, lng) {
    const fetchParams = {
      method: 'GET',
    };
    const url = ThirdPartyEndpoints.geocode(lat, lng);
    return fetch(url, fetchParams)
      .then((res) => res.json())
      .catch(err => console.error(err));
  },
};

export default api;
