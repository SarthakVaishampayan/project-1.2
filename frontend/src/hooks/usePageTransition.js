import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

const usePageTransition = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const navigateWithLoading = (path) => {
    showLoading();
    setTimeout(() => {
      navigate(path);
      setTimeout(hideLoading, 500); // Give a small delay after navigation
    }, 1000); // Show loading for 1 second
  };

  return navigateWithLoading;
};

export default usePageTransition; 