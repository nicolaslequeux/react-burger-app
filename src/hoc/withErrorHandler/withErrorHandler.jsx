import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";

// En plus du composant children je récupère l'instance axios pour détecter deçu les erreurs
const withErrorHandler = (WrappedComponent, axios) => {

  // je retourne une class function anonyme
  return class extends Component {

    state = {
      error: null
    }

    // ON PEUX REMPLACER WILLMOUNT PAR L'UTILISATION DU CONSTRUCTOR
    componentWillMount () {
      // JE CREE DES PROPIETES DE CLASSE A CHAUD POUR SAVOIR LES DEMONTER
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }
    
    // SINON DE NOUVEAUX INTERCEPTORS SONT CREES A CHAQUE CREATION DE COMPOSANT ET RESTENT EN MEMOIRE, DEAD...
    componentWillUnmount () {
      // console.log("will unmount", this.reqInterceptor, this.resInterceptor)
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render () {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      )
    }
  }
}

export default withErrorHandler;
