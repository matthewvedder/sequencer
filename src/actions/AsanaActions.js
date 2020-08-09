import {
  CREATE_ASANA,
  FETCH_ASANAS,
  FETCH_ASANA,
  EDIT_ASANA,
  FETCH_TAGS
} from './types'

export const createAsana = (payload) => ({ type: CREATE_ASANA, payload })
export const fetchAsanas = () => ({ type: FETCH_ASANAS })
export const fetchAsana = (asanaId) => ({ type: FETCH_ASANA, asanaId })
export const editAsana = (asanaId, payload) => ({ type: EDIT_ASANA, asanaId, payload })

export const fetchTags = () => ({ type: FETCH_TAGS })
