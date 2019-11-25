import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from '../../components/LoginPage';

let wrapper, startLogin;

beforeEach(()=>{
    startLogin = jest.fn();
    wrapper = shallow(<LoginPage startLogin={startLogin} /> );
})

test('Should render Login Page correctly', ()=>{
    expect(wrapper).toMatchSnapshot();
})

test('Should call start Login on button lick', ()=>{
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
})