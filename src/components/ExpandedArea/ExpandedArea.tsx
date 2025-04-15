import React from 'react';
import './ExpandedArea.css';

type MenuItem = { id: string; label: string };

interface ExpandedAreaProps {
  parentId: string | null;
  items: MenuItem[];
  getRef: (id: string) => React.RefObject<HTMLElement>;
}

export const ExpandedArea: React.FC<ExpandedAreaProps> = ({
  parentId,
  items,
  getRef,
}) => {
  if (!parentId || items.length === 0) return null;

  return (
    <ul style={{ paddingLeft: 20 }}>
      {items.map(item => (
        <li key={item.id}>
          <button ref={getRef(item.id) as React.RefObject<HTMLButtonElement>}
          >{item.label}</button>
        </li>
      ))}
    </ul>
  );
};
