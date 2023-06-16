import { useEffect } from "react";

export function useOnClickOutside(ref: any, handler: any, exceptRefs?: any[]) {
  useEffect(
    () => {
      const listener = (event: any) => {
        let exceptional = false;
        // exceptRefs?.forEach((r) => {
          
        // });

        // if (exceptRefs) {
        //   for (const ex of exceptRefs) {
        //     if (ex.current.contains(event.target)) exceptional = true;
        //   }
        // }
        
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          // console.log(ref.current);
          return;
        }

        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler, exceptRefs]
  );
};