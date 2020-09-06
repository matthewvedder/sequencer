import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Messages from './Messages'
import Errors from './Errors'

import { signupRequest, loginRequest } from '../actions'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  authMessages: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '50ch',
    // backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '15em',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginTop: '5em',
    },
    link: { color: 'grey' },
  },
  hr: {
    margin: '2em',
    width: '40ch'
  },
  button: {
    width: '50ch',
    marginBottom: '1em'
  }
}));


const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    label={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const Signup = (props) => {
  const propTypes = {
    handleSubmit: PropTypes.func,
    signupRequest: PropTypes.func,
    signup: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  useEffect(() => {
    if (props.signup.successful) {
      props.loginRequest({ email: props.email, password: props.password })
    }
  }, [props.signup]);

  const submit = (values) => {
    props.signupRequest(values)
  }

  const {
    handleSubmit,
    signup: {
      requesting,
      successful,
      messages,
      errors,
    },
  } = props

  const classes = useStyles()

  return (
    <div className={classes.container}>
      {/* Use the Submit handler with our own submit handler*/}
      <form className={classes.form} onSubmit={handleSubmit(submit)}>
        <Typography variant="h4">Create Account</Typography>
        <Field
          name="email"
          type="text"
          id="email"
          className="email"
          label="Email"
          component={renderTextField}
          required
        />
        <Field
          name="username"
          type="text"
          id="username"
          className="username"
          label="Username"
          component={renderTextField}
          required
        />
        <Field
          name="password"
          type="password"
          id="password"
          className="password"
          label="Password"
          component={renderTextField}
          required
        />
        <Field
          name="password_confirmation"
          type="password"
          id="password-confirmation"
          className="password"
          label="Password Confirmation"
          component={renderTextField}
          required
        />
        <Button variant="contained" color="primary" type="submit">Create Account</Button>
      </form>
      <div className={classes.authMessages}>
        {
          /*
          These are all nothing more than helpers that will show up
          based on the UI states, not worth covering in depth.  Simply put
          if there are messages or errors, we show them
          */
        }
        {!requesting && !!errors.length && (
          <Errors message="Failure to signup due to:" errors={errors} />
        )}
        {!requesting && !!messages.length && (
          <Messages messages={messages} />
        )}
      </div>
      <Divider className={classes.hr}/>
      <Link to="/login">
        <Button className={classes.button} color='secondary' size='small'>Log In »</Button>
      </Link>
    </div>
  )
}

const formComponent = reduxForm({
  form: 'signup',
})(Signup)

const selector = formValueSelector('signup')

const mapStateToProps = state => {
  const { email, password } = selector(state, 'email', 'password')
  return {
    signup: state.signup,
    email,
    password
  }
}

const connectedSignupForm = connect(mapStateToProps, { signupRequest, loginRequest })(formComponent)

// Export our well formed component!
export default connectedSignupForm
