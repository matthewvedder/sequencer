import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAsanaInstance, fetchAsanas } from '../actions'
import Thumbnail from './Thumbnail'
import Modal from './Modal'
import '../styles/CreateInstance.css'

class Selector extends Component {
  constructor(props) {
    super(props)
    this.state = { filteredAsanas: [] }
    this.mapAsanas = this.mapAsanas.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.addToSequence = this.addToSequence.bind(this)
  }

  componentWillMount() {
    this.props.fetchAsanas()
  }

  componentDidMount(){
    this.input.focus()
  }

  componentDidUpdate(){
    this.input.focus()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filteredAsanas: nextProps.asanas })
  }

  sequenceId() {
    const { pathname } = window.location
    return pathname.split('/')[2]
  }

  handleSearch(event) {
    const search = event.target.value.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    const filteredAsanas = this.props.asanas.filter((asana) => {
      return !asana.name.search(new RegExp(search, 'i'))
    })
    this.setState({ filteredAsanas })
  }

  addToSequence(asana_id) {
    const { onClose, sequenceId, handleCreateInstance } = this.props
    this.props.createAsanaInstance(asana_id, sequenceId)
    handleCreateInstance()
    onClose()
  }

  mapAsanas() {
    const { filteredAsanas } = this.state
    return filteredAsanas.map((asana, index) => {
      return (
        <div className='instance-create-thumbnail' onClick={() => this.addToSequence(asana.id)}>
          <div><Thumbnail img={asana.thumbnail}/></div>
          <div className='instance-create-name'>{asana.name}</div>
        </div>
      )
    })
  }

  render() {
    const { visible, onClose } = this.props
    return (
      <Modal visible={visible} onClose={onClose}>
        <input
          placeholder="Search"
          onChange={this.handleSearch}
          ref={(input) => { this.input = input }}
          className='selector-search'
        />
        <div className='instance-create-asanas'>
          { this.mapAsanas() }
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({ asanas: state.asanas.asanas })

export default connect(mapStateToProps, { createAsanaInstance, fetchAsanas })(Selector)
