import { useState } from 'react';

export function useLectureForms() {
  const [isVisible, setVisible] = useState<boolean>(false);

  return {
    isVisible,
    setVisible,
  };
}
