import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
      user: await getUser(),
    });
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          <img src={ user.image } alt="user-profile-pic" data-testid="profile-image" />
          <Link to="/profile/edit">
            Editar perfil
          </Link>
        </div>
        <h4>Nome:</h4>
        <p>{ user.name }</p>
        <h4>Email:</h4>
        <p>{ user.email }</p>
        <h4>Descrição:</h4>
        <p>{ user.description }</p>
      </div>
    );
  }
}

export default Profile;
