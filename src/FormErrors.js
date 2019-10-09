import React from 'react';

const FormErrors = (props) =>
  <div className='formErrors'>
    {Object.keys(props.formErrors).map((fieldName, i) => {
      if(props.formErrors[fieldName].length > 0){
        return (
          <p key={i}>{props.formErrors[fieldName]}</p>
        )        
      } else {
        return ''
      }
    })}
  </div>

export default FormErrors;
