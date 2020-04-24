import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  
  let wrapper;

  beforeEach(() => {
    // onInitIngredients comes from componentDidMount, so I pass it here when mounting BurgerBuilder 
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
  })

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ ings: {salad: 0}, price: 4 });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });

});
