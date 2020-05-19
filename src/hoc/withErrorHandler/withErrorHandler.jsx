import React from "react";

import Modal from "../../components/UI/Modal/Modal";

// Hook name must start with 'use'
import useHttpErrorHandler from '../../hooks/http-error-handler';

// En plus du composant children je récupère l'instance axios pour détecter dessus les erreurs
const withErrorHandler = (WrappedComponent, axios) => {

  // je retourne une class function anonyme
  return props => {

    //// AVANT CREATION DU HOOK
    // const [error, setError] = useState(null);

    // // !!!! componentWillUnmount DOES NOT EXIT WITH useEffect,
    // // !!!! execute before render JSX cycle means with just as to keep it outside!!
    // // componentWillMount () {
    //   const reqInterceptor = axios.interceptors.request.use(req => {
    //     setError(null);
    //     return req;
    //   });
    //   const resInterceptor = axios.interceptors.response.use(res => res, err => {
    //     setError(err);
    //   });
    // // }

    // // componentWillUnmount () {
    // useEffect(() => {
    //   return () => {
    //     axios.interceptors.request.eject(reqInterceptor);
    //     axios.interceptors.response.eject(resInterceptor);
    //   };
    // }, [reqInterceptor, resInterceptor])  
    
    // const errorConfirmedHandler = () => {
    //   setError(null);
    // }

    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal
          show={error}
          modalClosed={clearError}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );

  };
};

export default withErrorHandler;
