// Import necessary modules
import React from 'react';
import './MainMenu.css';

interface MainMenuProps {
  items: { id: string; label: string; children?: { id: string; label: string }[] }[];
  onExpand: (id: string | null) => void;
  expandedId: string | null;
  getRef: (id: string) => React.RefObject<HTMLElement>;
}

/**
 * Component to render the main menu with expandable items.
 *
 * @param items - The list of menu items to display.
 * @param onExpand - Callback to handle expanding/collapsing menu items.
 * @param expandedId - The ID of the currently expanded menu item.
 * @param getRef - Function to get a ref for each menu item.
 */
export const MainMenu: React.FC<MainMenuProps> = ({ items, onExpand, expandedId, getRef }) => {
  return (
    <div className="main-menu">
      {items.map(item => (
        <div key={item.id} className="menu-item">
          <button
            ref={getRef(item.id) as React.RefObject<HTMLButtonElement>} // Cast to the correct type
            onClick={() => onExpand(item.id === expandedId ? null : item.id)}
          >
            {item.label}
          </button>
          {item.id === expandedId && item.children && (
            <div className="expanded-children">
              {item.children.map(child => (
                <button
                  key={child.id}
                  ref={getRef(child.id) as React.RefObject<HTMLButtonElement>} // Cast to the correct type
                  className="child-item"
                >
                  {child.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
