# Focus Trap Menu Application

This application demonstrates a focus trap implementation for managing multiple menus with expandable options. The focus trap ensures that keyboard navigation is restricted to the currently active menu and its associated elements.

## Features

- **Focus Trap**: Ensures focus remains within the active menu.
- **Expandable Menus**: Supports nested menu items with expandable options.
- **Keyboard Navigation**: Fully accessible with keyboard controls.

## File Structure

- `src/App.tsx`: Main application component that manages state and rendering of menus.
- `src/hooks/useFocusTrap.ts`: Custom hook for trapping focus within a set of elements.
- `src/components/`: Contains reusable components for menus and expandable areas.

## How It Works

1. **Focus Trap**: The `useFocusTrap` hook dynamically manages focusable elements based on the active menu.
2. **Menu Logic**: Each menu has its own logic file to manage state and provide utility functions.
3. **Expandable Areas**: Nested menu items are rendered dynamically based on the selected parent item.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.
4. Open the application in your browser and interact with the menus.

## Accessibility

- Use the `Tab` key to navigate through focusable elements.
- Press `Escape` to close the currently active menu.

## Example

```jsx
<button onClick={() => setOpenMainMenu(true)}>Open Main Menu</button>
<MainMenu
  items={mainMenuData}
  onExpand={setMainExpandedId}
  expandedId={mainExpandedId}
  getRef={getMainRef}
/>
```
