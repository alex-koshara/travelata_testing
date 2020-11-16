import React from 'react';
import './Button.css'

function Button({content, clickHandler, id, disabled, operation, classButton}) {
  return (
      <button
        onClick={() => clickHandler(id, operation)}
        className={'button ' + (disabled ? 'button--disabled ' : '') + classButton}
        disabled={disabled}>
          {content}
      </button>
  )
}

export default Button;