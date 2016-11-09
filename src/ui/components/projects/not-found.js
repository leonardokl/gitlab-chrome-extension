import React from 'react'
import Icon from 'ui/components/icon';

 const NotFound = () => (
  <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
      alignItems: 'center',
      color: 'grey',
    }}
  >
    <Icon
      name='warning circle'
      style={{fontSize: '2em'}}
    />
    <div>We couldn't find any project</div>
  </div>
)

module.exports = NotFound
