import * as firebase from 'firebase'
import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const setCurrentUser = actionCreator<{
  currentUser: firebase.User | null
}>('SET_CURRENT_USER')
