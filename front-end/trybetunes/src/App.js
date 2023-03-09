import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      search: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, search } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={
            () => <Login nameInput={ name } onInputChange={ this.handleChange } />
          }
        />
        <Route
          path="/search"
          render={ () => (
            <Search
              searchInput={ search }
              onInputChange={ this.handleChange }
            />
          ) }
        />
        <Route path="/album/:id">
          <Album />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route path="/profile/edit">
          <ProfileEdit />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    );
  }
}

export default App;
