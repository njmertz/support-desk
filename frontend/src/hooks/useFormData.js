import {useState} from 'react';

const useFormData = (formDataDescription) => {
  const [formData, setFormData] = useState(formDataDescription);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return {
    formData,
    onChange
  };
};

export default useFormData;