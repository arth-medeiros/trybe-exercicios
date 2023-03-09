import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.rqstUserName();
  }

  rqstUserName = async () => {
    this.setState({
      userName: await getUser(),
      loading: false,
    });
  };

  render() {
    const { userName, loading } = this.state;
    if (loading) {
      return (
        <header data-testid="header-component">
          <Loading />
        </header>
      );
    }
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ userName.name }</p>
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Search</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
