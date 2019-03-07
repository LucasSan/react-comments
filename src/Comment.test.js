import React from 'react';
import Comment from './Comment';
import { render } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

it('should render', () => {
    const c = {
        comment: 'comentario'
    }
    const wrapper = render(<Comment c={ c } />)
    expect(wrapper.text()).toBe('comentarioEnviado por: vazio');
});

it('should render vazio', () => {
    const c = {
        comment: ''
    }
    const wrapper = render(<Comment c={ c } />)
    expect(wrapper.text()).toBe('vazioEnviado por: vazio');
});
