function getWines(db) {
  return new Promise((resolve) => {
    db.collection('wines').onSnapshot((querySnapshot) => {
      let wineArray = []
      querySnapshot.forEach((doc) => {
        let wine = doc.data()
        wine.id = doc.id
        wineArray.push(wine)
      })
      console.log('Wines loaded: ', wineArray.length)
      resolve(wineArray)
    })
  })
}

module.exports = {
  getWines,
}
