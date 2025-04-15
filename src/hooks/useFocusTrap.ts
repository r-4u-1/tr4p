import { useEffect, useRef } from 'react';

interface UseFocusTrapOptions {
  trap?: boolean;             // Whether to loop Tab/Shift+Tab (default: true)
  onEscape?: () => void;      // Called when Escape key is pressed
  autoFocus?: boolean;        // Focus first item on mount (default: true)
}

type FocusTrapRefs =
  | { refs: React.RefObject<HTMLElement>[] };

export function useFocusTrap(
  active: boolean,
  focusRefs: FocusTrapRefs,
  options: UseFocusTrapOptions = {}
) {
  const {
    trap = true,
    onEscape,
    autoFocus = true,
  } = options;

  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const stableRefs = useRef(focusRefs.refs);

  useEffect(() => {
    stableRefs.current = focusRefs.refs;
  }, [focusRefs.refs]);

  useEffect(() => {
    if (!active) return;

    // Create a focusable container
    const container = document.createElement('div');
    container.tabIndex = -1;
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '-1';

    const validEls = stableRefs.current
      .map(ref => ref.current)
      .filter((el): el is HTMLElement => {
        return (
          el &&
          typeof el.focus === 'function' &&
          !el.hasAttribute('disabled') &&
          el.tabIndex !== -1 &&
          el.offsetParent !== null // Not hidden
        );
      });

    if (validEls.length === 0) return;

    const firstEl = validEls[0];
    const lastEl = validEls[validEls.length - 1];

    // Append the container to the body
    document.body.appendChild(container);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }

      if (!trap || e.key !== 'Tab') return;

      const activeEl = document.activeElement;

      if (e.shiftKey && activeEl === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && activeEl === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    if (autoFocus) {
      requestAnimationFrame(() => {
        firstEl?.focus();
      });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedRef.current?.focus();
      container.remove();
    };
  }, [active, trap, onEscape, autoFocus, stableRefs]);
}
