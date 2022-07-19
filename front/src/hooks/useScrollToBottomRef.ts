import { useEffect, useRef } from "react";

const useScrollToBottomRef = () => {
  const chatBodyRef = useRef<any>(null);

  useEffect(() => {
    const domNode = chatBodyRef.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  return { chatBodyRef };
};

export default useScrollToBottomRef;