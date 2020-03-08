import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSequences, deleteSequence } from '../actions'
import CreateSequence from './CreateSequence'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import '../styles/sequences.css'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

class Sequences extends Component {
  constructor(props) {
    super(props)
    this.state = { modalOpen: false, deleteModalOpen: false, hoveringOver: null, id: null }
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }
  componentWillMount() {
    this.props.fetchSequences()
  }

  handleSequenceClick(id) {
    this.props.history.push(`/sequences/${id}`)
  }

  handleAddClick() {
    this.setState({ modalOpen: true })
  }

  handleDeleteClick(id) {
    this.setState({ id, deleteModalOpen: true })
  }

  handleConfirmDeleteClick(id) {
    this.props.deleteSequence(id)
    this.setState({ deleteModalOpen: false })
  }

  mapSequences() {
    return this.props.sequences.map((sequence) => {
      const { id, name, level, created_at } = sequence
      return (
          <ListItem
            button
            onMouseEnter={() => this.setState({ hoveringOver: id })}
            onMouseLeave={() => this.setState({ hoveringOver: null })}
            onClick={ () => this.handleSequenceClick(id) }
          >
            <ListItemText primary={name}  secondary={moment(created_at).format('MMMM Do YYYY')} />
            <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="delete" onClick={() => this.handleDeleteClick(id)}>
                 <DeleteIcon />
               </IconButton>
             </ListItemSecondaryAction>
          </ListItem>
      )
    })
  }
  render() {
    const { id, deleteModalOpen } = this.state
    return (
      <div className="sequences-container">
         <List component="nav">
          { this.mapSequences() }
          <ListItem>
            <Button onClick={this.handleAddClick} variant="contained" color="primary" href="#contained-buttons">
              New Sequence
            </Button>
          </ListItem>
         </List>
         <Dialog open={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Sequence</DialogTitle>
          <DialogContent>
           <CreateSequence onCreate={() => this.setState({ modalOpen: false })} />
          </DialogContent>
         </Dialog>
         <Dialog
            open={deleteModalOpen}
            onClose={() => this.setState({ deleteModalOpen: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Are you sure you want to delete this?</DialogTitle>
            <DialogActions>
              <Button onClick={() => this.setState({ deleteModalOpen: false })} color="primary">
                Nevermind
              </Button>
              <Button onClick={() => this.handleConfirmDeleteClick(id)} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

       </div>
    )
  }
}

const mapStateToProps = state => ({ sequences: state.sequence.sequences })

export default connect(mapStateToProps, { fetchSequences, deleteSequence })(Sequences)
