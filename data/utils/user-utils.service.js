function loadUsers(db) {
  return new Promise((resolve) => {
    db.collection('users').onSnapshot((querySnapshot) => {
      let userArray = []
      querySnapshot.forEach((doc) => {
        let user = doc.data()
        user.id = doc.id
        userArray.push(user)
      })
      console.log('Users loaded: ', userArray.length)
      resolve(userArray)
    })
  })
}

module.exports = {
  loadUsers,
}
