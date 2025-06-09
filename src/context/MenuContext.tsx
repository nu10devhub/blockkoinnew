import { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};