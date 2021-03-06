function getVineyards(db) {
  return new Promise((resolve) => {
    db.collection('vineyards').onSnapshot((querySnapshot) => {
      let vineyardArray = []
      querySnapshot.forEach((doc) => {
        let vineyard = doc.data()
        vineyard.id = doc.id
        vineyardArray.push(vineyard)
      })
      console.log('Vineyards loaded: ', vineyardArray.length)
      resolve(vineyardArray)
    })
  })
}

module.exports = {
  getVineyards,
}
