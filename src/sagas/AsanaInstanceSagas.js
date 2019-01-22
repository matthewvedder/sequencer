import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  CREATE_ASANA_INSTANCE,
  FETCH_ASANA_INSTANCES,
  SET_ASANA_INSTANCE_DATA,
  DELETE_ASANA_INSTANCE
} from '../actions/types'

const url = `${process.env.REACT_APP_API_URL}/asana_instances`
function createRequest(asana_id) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      asana_id,
      sequence_id: 1
    })
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* createFlow({ asana_id }) {
  try {
    const response = yield call(createRequest, asana_id)
    yield put({ type:  SET_ASANA_INSTANCE_DATA, payload: { asanas: response, didCreate: true } })
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

function fetchRequest() {
  const fetchUrl = `${url}?sequence_id=1`
  return fetch(fetchUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* fetchFlow(email, password) {
  try {
    const response = yield call(fetchRequest)
    yield put({ type: SET_ASANA_INSTANCE_DATA, payload: { asanas: response } })
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

function deleteRequest(action) {
  return fetch(`${url}/${action.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* deleteFlow(action) {
  try {
    const response = yield deleteRequest(action)
    yield put({ type: SET_ASANA_INSTANCE_DATA, payload: { asanas: response } })
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

export function* watchAsanaInstances() {
  yield takeLatest(CREATE_ASANA_INSTANCE, createFlow)
  yield takeLatest(FETCH_ASANA_INSTANCES, fetchFlow)
  yield takeEvery(DELETE_ASANA_INSTANCE, deleteFlow)
}
