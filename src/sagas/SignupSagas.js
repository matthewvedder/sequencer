import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors, mapErrorMessages } from '../lib/api-errors'
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../actions/types'

const signupUrl = `${process.env.REACT_APP_API_URL}/users`

function signupApi (email, password, password_confirmation) {
  return fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, password_confirmation }),
  })
    .then(response => response.json())
    .then(json => json)
}


function* signupFlow (action) {
  try {
    const { email, password, password_confirmation } = action
    const response = yield call(signupApi, email, password, password_confirmation)
    if (response.ok) {
      yield put({ type: SIGNUP_SUCCESS, response })
    } else {
      console.log(response)
      yield put({ type: SIGNUP_ERROR, error: mapErrorMessages(response) })
    }
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error })
  }
}

export function* watchSignup() {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}
