export const useSidebar = () => {
  const isCollapsed = useState<boolean>('isSidebarCollapsed', () => true);

  const toggle = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  // Ensure this 'open' function exists
  const open = () => {
    isCollapsed.value = false;
  };

  const close = () => {
    isCollapsed.value = true;
  };

  // Ensure 'open' is returned here
  return {
    isCollapsed,
    toggle,
    open,
    close,
  };
};