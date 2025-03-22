import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import React from 'react';

const useGlobalErrors = () => {
  const {errorMessage, setErrorMessage} = React.useContext(GlobalContext);
  return {errorMessage, setErrorMessage};
};

export default useGlobalErrors;
