import * as types from './mutation-types'

const mutations = {
  [types.SET_BLOGTYPES] (state, blogTypes) {
    state.blogTypes = blogTypes
  }
}

export default mutations
