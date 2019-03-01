import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';
import Comments from './Comments';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('<Comment />', () => {
    it('should render Comment', () => {
        const comments = { 
            a: { id: 'a', comment: 'Comment 1' },
            b: { id: 'b', comment: 'Comment 2' }
        }
        const wrapper = shallow(<Comments comments={comments} />);
        expect(wrapper.find(Comment).length).toBe(2);
        expect(wrapper.find(Comment).get(0).props.c).toBe(comments.a);
        expect(wrapper.find(Comment).get(1).props.c).toBe(comments.b);
        expect(wrapper.find(Comment).get(0).key).toBe(comments.a.id);
        expect(wrapper.find(Comment).get(1).key).toBe(comments.b.id);
    });

    it('should work with no comments', () => {
        const comments = {};
        const wrapper = shallow(<Comments comments={comments} />);
        expect(wrapper.find(Comment).length).toBe(0);
    });
});
