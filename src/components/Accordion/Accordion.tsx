import { createContext, useContext, useState } from 'react';

interface AccordionProps {
  children: React.ReactNode;
}

type AccordionContextValue = {
  isActive: number | null;
  setIsActive: React.Dispatch<React.SetStateAction<number | null>>;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export const useAccordion = (): AccordionContextValue => {
  const ctx = useContext(AccordionContext);
  if (!ctx)
    throw new Error('useAccordion must be used within an Accordion Provider');
  return ctx;
};

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [isActive, setIsActive] = useState<number | null>(null);

  return (
    <AccordionContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </AccordionContext.Provider>
  );
};

export default Accordion;
