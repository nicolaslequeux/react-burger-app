import auth from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe('auth reducer', () => {

  it('should return the inital state', () => {
    // I pass undefined to get the initial state of this reducer with no action
    expect(auth(undefined, {})).toEqual(
      {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
      }
    )
  })

  it ('should store token upon login', () => {
    expect(auth({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: "some-token",
        userId: "some-user-id"
        }
    )).toEqual(
      {
        token: "some-token",
        userId: "some-user-id",
        error: null,
        loading: false,
        authRedirectPath: '/'
      });
  });

});
