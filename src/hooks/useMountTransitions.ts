import { useEffect, useState } from 'react';

// useMountTransitions hook delays component unmount until the unmountDelay passes
export function useMountTransitions(
  isMounted: boolean,
  unmoundDelay: number
): boolean {
  const [hasTransitionedIn, hasTransitionedInSet] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isMounted && !hasTransitionedIn) hasTransitionedInSet(true);
    if (!isMounted && hasTransitionedIn)
      timeoutId = setTimeout(() => hasTransitionedInSet(false), unmoundDelay);

    return () => clearTimeout(timeoutId);
  }, [isMounted, unmoundDelay, hasTransitionedIn]);

  return hasTransitionedIn;
}
