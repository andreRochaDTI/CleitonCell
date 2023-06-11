import React from 'react';
import { shallow } from 'enzyme';
import Default from '../Default';

describe('Default', () => {
  it('renders the error message with the requested URL', () => {
    const props = {
      location: {
        pathname: '/not-found'
      }
    };
    const wrapper = shallow(<Default {...props} />);

    const errorMessage = wrapper.find('.text-danger');
    expect(errorMessage.text()).toBe('/not-found');
  });
});
