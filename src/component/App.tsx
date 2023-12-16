import React from 'react';

import {
  Route,
  Switch
} from 'react-router-dom'
import { StickyContainer } from 'react-sticky'
import './App.css';
import ScrollToTop from './ScrollToTop';
import Header from './common/Header';
import UserList from './pages/UserList/UserList';
import Login from './pages/Login/Login';
import PostList from './pages/PostList/PostList';
import { Container } from '@mui/material';
import { AppState } from '../store/rootReducer';
import { connect } from 'react-redux';
import FeedList from './pages/Feed/FeedList';

const mapState = (state: AppState) => ({
  auth: state.authReducer
})

const withConnect = connect(mapState)

type WithConnectProps = ReturnType<typeof mapState>

const App: React.FC<WithConnectProps> = (props) => {
  return (
    <Switch>
      <Route
        render={() => (
          <StickyContainer>
            <div className="App">
              <Header />
              <ScrollToTop />
              <Container className='body'>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/feeds" component={FeedList} />
                  <Route exact path="/users" component={UserList} />
                  <Route exact path="/posts" component={PostList} />
                </Switch>
              </Container>
            </div>
          </StickyContainer>
        )}
      />
    </Switch>
  );
}

export default withConnect(App);
