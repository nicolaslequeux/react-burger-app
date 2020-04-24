import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

// shallow method render a component without rendering nested sub-component...
// No need to import the (describes & it & expect) functions, all *.test.js files are managed by testing unit, in our case Jest

configure({adapter: new Adapter()});

// describe('<NavigationItems />', () => {
//   it('should render 2 <NavigationItem /> if not authenticated', () => {
//     const wrapper = shallow(<NavigationItems />);
//     // find() ne recherche pas un JSX mais le 'NavigationItem' imported function
//     expect(wrapper.find(NavigationItem)).toHaveLength(2);
//   });
//   it('should render 3 <NavigationItem /> if authenticated', () => {
//     const wrapper = shallow(<NavigationItems isAuthenticated />); // je passe la property
//     // find() ne recherche pas un JSX mais le 'NavigationItem' imported function
//     expect(wrapper.find(NavigationItem)).toHaveLength(3);
//   });
// });

// Utilisation du helper beforeEach():

describe('<NavigationItems />', () => { // Jest
  let wrapper; 
  beforeEach(() => { // Helper functions from Jest
    wrapper = shallow(<NavigationItems />); // Shallow rendering from Enzyme
  });

  it('should render 2 <NavigationItem /> if not authenticated', () => { // Jest
    expect(wrapper.find(NavigationItem)).toHaveLength(2); // expect: Jest, find: Enzyme
  });

  it('should render 3 <NavigationItem /> if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should an exact logout button', () => {
    // I am looking for JSX code this case as I am not using a specific selector
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });

});
