import React from 'react';
import { useState, useRef } from 'react';
import { menuOneData } from './MenuOneData';

export const useMenuOneLogic = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const refMap = useRef(new Map<string, React.RefObject<HTMLButtonElement | null>>());

  const getRef = (id: string): React.RefObject<HTMLButtonElement | null> => {
    if (!refMap.current.has(id)) {
      refMap.current.set(id, React.createRef<HTMLButtonElement>());
    }
    return refMap.current.get(id)!;
  };

  return { expandedId, setExpandedId, getRef, menuOneData };
};