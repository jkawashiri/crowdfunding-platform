import { useEffect, useRef, useState } from "react";

export function useTypingEffect(textToType, interKeyStrokeDurationInMs) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const currentPositionRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPosition((value) => value + 1);
      currentPositionRef.current += 1;
      if (currentPositionRef.current > textToType.length) {
        clearInterval(intervalId);
        setIsTypingComplete(true)
      }
    }, interKeyStrokeDurationInMs);
    return () => {
      clearInterval(intervalId);
      currentPositionRef.current = 0;
      setCurrentPosition(0);
      setIsTypingComplete(false)
    };
  }, [interKeyStrokeDurationInMs, textToType]);

  return { text: textToType.substring(0, currentPosition), isTypingComplete }
}