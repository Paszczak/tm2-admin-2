import { useNavigate } from 'react-router-dom';
import { createSlug } from '../libs/helpers';

export function useNavigateWithSlug() {
  const navigate = useNavigate();

  return (id: string | null, href: string) => {
    navigate(createSlug(href), {
      state: {
        id: id,
      },
    });
  };
}
