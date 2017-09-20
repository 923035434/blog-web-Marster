import * as types from './mutation-types'

const mutations = {
  [types.SET_BLOGTYPES] (state, blogTypes) {
    state.blogTypes = blogTypes
  },
  [types.SET_BLOG_SHOW_STATE] (state, blogShowState) {
    state.blogShowState = blogShowState
  },
  [types.SET_BLOG_SHOW_ITEM] (state, blogShowItem) {
    state.blogShowItem = blogShowItem
  }
}

export default mutations
