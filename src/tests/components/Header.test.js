import React from 'react';
import {shallow} from 'enzyme';
import { Header } from '../../components/Header'

let startLogout, wrapper;
beforeEach(()=>{
    startLogout = jest.fn();
    wrapper = shallow(<Header startLogout = {startLogout}/>);
});

test('Should header render correctly', () => {  
    expect(wrapper).toMatchSnapshot();
})

test('Should call startLogout on button Click', ()=>{
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
})