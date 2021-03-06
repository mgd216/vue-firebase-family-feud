const fetch = require('node-fetch')

const getLatLng = (data) => {
  return new Promise((resolve) => {
    let address = encodeURI(
      `${data.street}, ${data.city}, ${data.state} ${data.postalCode}`,
    )

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD7nW_BjIlUK4BB0OFY1aXeGUsUyK3t6Yg`,
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status !== 'OK') {
          resolve({ lat: null, lng: null })
        }
        if (json.results.length > 0) {
          let geo = json.results[0].geometry.location
          resolve({ lat: geo.lat, lng: geo.lng })
        } else {
          resolve({ lat: null, lng: null })
        }
      })
  })
}

const getRandomAddresses = () => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://raw.githubusercontent.com/EthanRBrown/rrad/master/addresses-us-1000.json`,
    )
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        resolve(json.addresses)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  getLatLng,
  getRandomAddresses,
}
