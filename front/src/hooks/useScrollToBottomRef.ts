import { useEffect, useRef } from "react";

const useScrollToBottomRef = () => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const domNode = ref.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  return ref;
};

export default useScrollToBottomRef;
