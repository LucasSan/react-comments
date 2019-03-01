import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import Comments from './Comments';
import NewComment from './NewComment';
import { EventEmitter } from 'events';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders without crashing', () => {
    const database = {
      ref: jest.fn()
    }
    database.ref.mockReturnValue({
      on: jest.fn()
    });
    const wrapper = shallow(<App database={database} />);
    expect(wrapper.find(Comments).length).toBe(1);
    expect(wrapper.find(NewComment).length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
  });

  it('adds a new comment', () => {
    const database = {
      ref: jest.fn()
    }
    const child = jest.fn();
    const update = jest.fn();
    database.ref.mockReturnValue({
      on: jest.fn(),
      child,
      update
    });

    const push = jest.fn();
    child.mockReturnValue({
      push
    });

    push.mockReturnValue({
      key: '1'
    });

    const wrapper = shallow(<App database={database} />);
    wrapper.instance().sendComment('new comment');
    expect(child).toBeCalledWith('comments');
    expect(update).toBeCalledWith({
      'comments/1': {
        comment: 'new comment'
      }
    });
    console.log(child.mock.calls);
  });

  it('renders comments from firebase', () => {
    const database = {
      ref: jest.fn()
    }
    const eventEmitter = new EventEmitter();
    database.ref.mockReturnValue(eventEmitter);
    const wrapper = shallow(<App database={database} />);
    
    // nao recebeu valor
    expect(wrapper.find(Comments).length).toBe(1);
    expect(wrapper.find(NewComment).length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);

    // recebendo o value
    const comments = {
      a: { comment: 'comment 1' },
      b: { comment: 'comment 2' }
    }

    const val = jest.fn();
    val.mockReturnValue(comments);

    eventEmitter.emit('value', {
      val
    });

    wrapper.update();

    expect(wrapper.state().isLoading).toBeFalsy();
    expect(wrapper.state().comments).toBe(comments);
    expect(wrapper.find(Comments).get(0).props.comments).toBe(comments);
    expect(wrapper.find(NewComment).get(0).props.sendComment).toBe(wrapper.instance().sendComment);
    expect(wrapper.find('p').length).toBe(0);
  });
});
