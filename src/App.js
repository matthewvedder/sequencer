import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import PrivateRoute from './components/PrivateRoute'
import Canvas from './components/Canvas'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Sequences from './components/Sequences'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import CreateAsana from './components/CreateAsana'
import RootReducer from './reducers'
import RootSaga from './sagas'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from "react-dnd";
import './styles/App.css';

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

class App extends Component {
  render() {
    const sagaMiddleware = createSagaMiddleware()
    const history = createBrowserHistory()
    const store = createStore(
      RootReducer(history),
      composeSetup(applyMiddleware(sagaMiddleware, routerMiddleware(history))), // allows redux devtools to watch sagas
    )
    sagaMiddleware.run(RootSaga)

    return (
      <Provider store={store}>
          <ConnectedRouter history={history}>
            <div className="App">
              <Sidebar />
              <div className='main'>
                <Navbar />
                <PrivateRoute path="/" exact component={Sequences} />
                <PrivateRoute path="/asanas/new" component={CreateAsana} />
                <PrivateRoute path="/sequences" exact component={Sequences} />
                <PrivateRoute path="/sequences/:id" component={Canvas} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
              </div>
            </div>
          </ConnectedRouter>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
