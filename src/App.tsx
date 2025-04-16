// Import necessary modules and components
import { useState } from 'react';
import { useFocusTrap } from './hooks/useFocusTrap';
import { MainMenu } from './components/MainMenu/MainMenu';
import { ExpandedArea } from './components/ExpandedArea/ExpandedArea';
import { useMainMenuLogic } from './components/MainMenu/MainMenuLogic';
import { useMenuOneLogic } from './components/MenuOne/MenuOneLogic';
import { useMenuTwoLogic } from './components/MenuTwo/MenuTwoLogic';
import './App.css';
import './components/MainMenu/MainMenu.css';
import './components/ExpandedArea/ExpandedArea.css';

/**
 * The main application component that manages the state and rendering of menus.
 */
export const App = () => {
  // State variables to track which menu is open
  const [openMainMenu, setOpenMainMenu] = useState(false);
  const [openMenuOne, setOpenMenuOne] = useState(false);
  const [openMenuTwo, setOpenMenuTwo] = useState(false);

  // Logic hooks for each menu, providing data and utility functions
  const { expandedId: mainExpandedId, setExpandedId: setMainExpandedId, getRef: getMainRef, mainMenuData } = useMainMenuLogic();
  const { expandedId: menuOneExpandedId, setExpandedId: setMenuOneExpandedId, getRef: getMenuOneRef, menuOneData } = useMenuOneLogic();
  const { expandedId: menuTwoExpandedId, setExpandedId: setMenuTwoExpandedId, getRef: getMenuTwoRef, menuTwoData } = useMenuTwoLogic();

  // Array of focusable elements for the currently active menu
  const visibleRefs = [
    ...(openMainMenu ? [
      getMainRef('toggle-main-menu') as React.RefObject<HTMLElement>, // Include only the toggle button for Main Menu
      ...mainMenuData.flatMap(item => [
        getMainRef(item.id) as React.RefObject<HTMLElement>,
        ...(item.children || []).map(child => getMainRef(child.id) as React.RefObject<HTMLElement>),
      ]),
    ] : []),
    ...(openMenuOne ? [
      getMenuOneRef('toggle-menu-one') as React.RefObject<HTMLElement>, // Include only the toggle button for Menu One
      ...menuOneData.flatMap(item => [
        getMenuOneRef(item.id) as React.RefObject<HTMLElement>,
        ...(item.children || []).map(child => getMenuOneRef(child.id) as React.RefObject<HTMLElement>),
      ]),
    ] : []),
    ...(openMenuTwo ? [
      getMenuTwoRef('toggle-menu-two') as React.RefObject<HTMLElement>, // Include only the toggle button for Menu Two
      ...menuTwoData.flatMap(item => [
        getMenuTwoRef(item.id) as React.RefObject<HTMLElement>,
        ...(item.children || []).map(child => getMenuTwoRef(child.id) as React.RefObject<HTMLElement>),
      ]),
    ] : []),
  ];

  // Apply focus trap to the currently active menu
  useFocusTrap(openMainMenu || openMenuOne || openMenuTwo, { refs: visibleRefs }, {
    trap: true,
    autoFocus: true,
    onEscape: () => {
      // Close all menus when Escape is pressed
      setOpenMainMenu(false);
      setOpenMenuOne(false);
      setOpenMenuTwo(false);
    },
  });

  return (
    <>
      {/* Buttons to toggle each menu */}
      <button ref={getMainRef('toggle-main-menu') as React.RefObject<HTMLButtonElement>} onClick={() => setOpenMainMenu(!openMainMenu)}>Toggle Main Menu</button>
      <button ref={getMenuOneRef('toggle-menu-one') as React.RefObject<HTMLButtonElement>} onClick={() => setOpenMenuOne(!openMenuOne)}>Toggle Menu One</button>
      <button ref={getMenuTwoRef('toggle-menu-two') as React.RefObject<HTMLButtonElement>} onClick={() => setOpenMenuTwo(!openMenuTwo)}>Toggle Menu Two</button>

      {/* Render Main Menu if open */}
      {openMainMenu && (
        <div role="dialog" aria-modal="true" style={{ background: '#f8f8f8', padding: 20 }}>
          <MainMenu
            items={mainMenuData}
            onExpand={setMainExpandedId}
            expandedId={mainExpandedId}
            getRef={(id) => getMainRef(id) as React.RefObject<HTMLButtonElement | HTMLElement>}
          />
          {mainExpandedId && (
            <ExpandedArea
              parentId={mainExpandedId}
              items={mainMenuData.find(item => item.id === mainExpandedId)?.children || []}
              getRef={(id) => getMainRef(id) as React.RefObject<HTMLElement>}
            />
          )}
        </div>
      )}

      {/* Render Menu One if open */}
      {openMenuOne && (
        <div role="dialog" aria-modal="true" style={{ background: '#f8f8f8', padding: 20 }}>
          <MainMenu
            items={menuOneData}
            onExpand={setMenuOneExpandedId}
            expandedId={menuOneExpandedId}
            getRef={(id) => getMenuOneRef(id) as React.RefObject<HTMLButtonElement | HTMLElement>}
          />
          {menuOneExpandedId && (
            <ExpandedArea
              parentId={menuOneExpandedId}
              items={menuOneData.find(item => item.id === menuOneExpandedId)?.children || []}
              getRef={(id) => getMenuOneRef(id) as React.RefObject<HTMLElement>}
            />
          )}
        </div>
      )}

      {/* Render Menu Two if open */}
      {openMenuTwo && (
        <div role="dialog" aria-modal="true" style={{ background: '#f8f8f8', padding: 20 }}>
          <MainMenu
            items={menuTwoData}
            onExpand={setMenuTwoExpandedId}
            expandedId={menuTwoExpandedId}
            getRef={(id) => getMenuTwoRef(id) as React.RefObject<HTMLButtonElement | HTMLElement>}
          />
          {menuTwoExpandedId && (
            <ExpandedArea
              parentId={menuTwoExpandedId}
              items={menuTwoData.find(item => item.id === menuTwoExpandedId)?.children || []}
              getRef={(id) => getMenuTwoRef(id) as React.RefObject<HTMLElement>}
            />
          )}
        </div>
      )}
    </>
  );
};
