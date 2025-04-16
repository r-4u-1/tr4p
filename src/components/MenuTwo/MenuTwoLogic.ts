import React from 'react';
// Import necessary modules
import { useState, useRef } from 'react';
import { menuTwoData } from './MenuTwoData';

/**
 * Hook to manage the logic for Menu Two.
 *
 * @returns An object containing the expanded ID, setter for expanded ID, ref getter, and menu data.
 */
export const useMenuTwoLogic = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const refMap = useRef(new Map<string, React.RefObject<HTMLButtonElement>>());

  /**
   * Get or create a ref for a menu item by its ID.
   *
   * @param id - The ID of the menu item.
   * @returns A ref object for the menu item.
   */
  const getRef = (id: string): React.RefObject<HTMLButtonElement> => {
    if (!refMap.current.has(id)) {
      refMap.current.set(id, React.createRef<HTMLButtonElement | null>()); // Allow null in the ref type
    }
    return refMap.current.get(id)!;
  };

  return { expandedId, setExpandedId, getRef, menuTwoData };
};