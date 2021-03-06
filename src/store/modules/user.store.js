import fb from '@/firebaseConfig.js'
import toast from '@/services/toast.service'

const state = {
  users: [],
}

const getters = {
  activeUsers: (state) => state.users.filter((u) => u.terminateDate === null),
  activeUserSelectList: (_, rootGetters) => {
    return rootGetters.activeUsers.map((u) => {
      return { id: u.id, fullName: u.fullName }
    })
  },
  users: (state) => state.users,
  userById: (state) => (id) => state.users.find((u) => u.id === id),
  userProfileImgUrlByUserId: (state) => (id) => {
    const user = state.users.find((u) => u.id === id)
    return user ? user.profileImgUrl : null
  },
  numUsers: (state) => state.users.length,
}

const actions = {
  createUser({ dispatch }, user) {
    return new Promise((resolve, reject) => {
      const createUserFunction = fb.functions.httpsCallable('createUser')
      createUserFunction(user)
        .then(() => {
          dispatch('resetPassword', user.email)
          dispatch('getUsers')
          toast.success(`User ${user.firstName} was created.`)
          resolve()
        })
        .catch((err) => {
          toast.error(err)
          reject(err)
        })
    })
  },

  getUsers({ commit }) {
    return new Promise((resolve) => {
      fb.usersRef.orderBy('firstName', 'asc').onSnapshot((querySnapshot) => {
        let userArray = []
        querySnapshot.forEach((doc) => {
          let user = doc.data()
          user.id = doc.id
          userArray.push(user)
        })
        commit('SET_USERS', userArray)
        resolve()
      })
    })
  },

  resetPassword(_, email) {
    fb.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        toast.success(`Password reset sent to: ${email}`)
      })
      .catch((err) => {
        toast.error(err)
      })
  },

  async updateUser({ rootGetters }, user) {
    try {
      //check if role updated
      const origUser = rootGetters.userById(user.id)
      if (origUser && origUser.role !== user.role) {
        //update user role
        const updateRoleFunction = await fb.functions.httpsCallable(
          'setUserRole',
        )
        const roleData = { uid: user.id, role: user.role }
        await updateRoleFunction(roleData)
      }
      await fb.usersRef.doc(user.id).update(user)
      toast.success(`User ${user.firstName} ${user.lastName} was updated.`)
    } catch (err) {
      toast.error(err)
    }
  },

  async activateUser(_, user) {
    try {
      const activateUserFunction = await fb.functions.httpsCallable(
        'activateUser',
      )
      await activateUserFunction(user.id)
      toast.success(`User ${user.firstName} ${user.lastName} was activated.`)
    } catch (err) {
      toast.error(err)
    }
  },

  async terminateUser(_, user) {
    try {
      const terminateUserFunction = await fb.functions.httpsCallable(
        'terminateUser',
      )
      await terminateUserFunction(user.id)
      toast.success(`User ${user.firstName} ${user.lastName} was terminated.`)
    } catch (err) {
      toast.error(err)
    }
  },

  updateUserProfilePhoto({ commit, dispatch, rootGetters, state }, opts) {
    return new Promise((resolve, reject) => {
      try {
        let storageRef = fb.storage.ref(
          `users/${opts.userId}/profilePicture/${opts.file.name}`,
        )
        storageRef.put(opts.file).then((fileSnapshot) => {
          fileSnapshot.ref.getDownloadURL().then((url) => {
            let user = state.users.find((u) => u.id === opts.userId)
            user.profileImgUrl = url
            if (rootGetters.currentUser.uid === opts.userId) {
              commit('SET_CURRENT_USER_PROFILE_IMG', url)
            }
            dispatch('updateUser', user)
            resolve(url)
          })
        })
      } catch (err) {
        toast.error(err)
        reject(err)
      }
    })
  },
}

const mutations = {
  SET_USERS(state, data) {
    state.users = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
