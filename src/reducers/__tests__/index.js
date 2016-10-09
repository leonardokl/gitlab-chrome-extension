/* global describe, it, expect*/

import store from 'config/store'
import {getVisibleProjects} from 'reducers'
import mockProject from 'mocks/project'

describe('selectors', () => {
  describe('getVisibleProjects', () => {
    it('should filter projects by name', () => {
      const projectsList = [
        {...mockProject, name: 'projectOne'},
        {...mockProject, name: 'projectTwo'}
      ]
      const state = {
        ...store.getState(),
        projects: {
          ...store.getState().projects,
          filter: 'projectOne',
          list: projectsList
        }
      }

      expect(
        getVisibleProjects(state).list.length
      ).toBe(1)
    })
  })
})
