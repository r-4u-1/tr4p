import React from 'react';
import './MainMenu.css';

type MenuItem = { id: string; label: string; children?: MenuItem[] };

interface MainMenuProps {
  items: MenuItem[];
  expandedId: string | null;
  onExpand: (id: string | null) => void;
  getRef: (id: string) => React.RefObject<HTMLElement | HTMLButtonElement>;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  items,
  expandedId,
  onExpand,
  getRef,
}) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <button
            ref={getRef(item.id) as React.RefObject<HTMLButtonElement>}
            onClick={() =>
              onExpand(expandedId === item.id ? null : item.id)
            }
          >
            {item.label} {item.children && (expandedId === item.id ? '▲' : '▼')}
          </button>
        </li>
      ))}
    </ul>
  );
};
