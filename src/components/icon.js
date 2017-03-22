import React from 'react'

const Icon = ({
  className = '',
  color = '',
  style = {},
  name = 'gitlab',
  onClick = () => 1
}) => (
  <i
    style={{...style, color: color}}
    className={`${className} ${name} icon`}
    onClick={onClick}
  />
)

export default Icon
