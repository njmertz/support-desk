import {useState} from 'react';
import PropTypes from 'prop-types';

const useFormData = (formDataObj) => {
  const [formData, setFormData] = useState(formDataObj);

  const onChange = (e) => {
    let boolean = null;
    if(e.target.value === 'true'){
      boolean = true;
    }
    if(e.target.value === 'false'){
      boolean = false;
    }    
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: boolean ?? e.target.value,
    }));
  };

  const onChangeFiles = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.files
    }));
  }

  const onMutate = (e) => {
    e.target.files ? onChangeFiles(e) : onChange(e);
  };

  return {formData, setFormData, onChange, onChangeFiles, onMutate};
};

export default useFormData;

useFormData.propTypes = {
  formDataObj: PropTypes.object.isRequired,
};