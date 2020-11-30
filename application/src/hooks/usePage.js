import { useCallback } from 'react';

const usePage = (title) => {
  const projectName = 'Cimba';

  const setPageTitle = useCallback((title) => document.title = `${title} | ${projectName}`, []);

  if (title) {
    setPageTitle(title);
  } else {
    document.title = projectName;
  }

  return {
    setPageTitle,
  };
};

export default usePage;
