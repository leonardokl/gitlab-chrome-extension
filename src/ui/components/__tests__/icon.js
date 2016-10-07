/* global describe, expect, it */

import React from 'react'
import { shallow } from 'enzyme'
import Icon from 'ui/components/icon'

function setup() {
  const props = {
    name: 'edit'
  }

  const enzymeWrapper = shallow(<Icon {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Icon', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('i').hasClass('icon')).toBe(true)
      expect(enzymeWrapper.find('i').hasClass('edit')).toBe(true)
    })
  })
})
