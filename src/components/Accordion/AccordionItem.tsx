import { css, cx } from '@linaria/core';
import { useAccordion } from './Accordion';
import { BiChevronDown } from 'react-icons/bi';

interface AccordionItemProps {
  index: number;
  header: string;
  className?: string;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  index,
  header,
  className,
  children,
}) => {
  const { isActive, setIsActive } = useAccordion();
  const isOpen = isActive === index;

  const handleClick = () => {
    const nextIndex = isOpen ? null : index;
    setIsActive(nextIndex);
  };

  return (
    <div className={cx(accordionItemClass, className)}>
      <button className="header" onClick={handleClick}>
        {header}
        <BiChevronDown className={cx('chevron', isOpen && 'open')} />
      </button>
      <div className={cx('hidden-content', isOpen && 'open')}>{children}</div>
    </div>
  );
};

export default AccordionItem;

export const accordionItemClass = css`
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align: start;
    gap: 1rem;
    position: relative;
    cursor: pointer;
  }

  .chevron {
    min-width: 20px;
    font-size: 1.1rem;
    transition: transform 0.75s ease;

    &.open {
      transform: rotate(-180deg);
    }
  }

  .hidden-content {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.75s ease, opacity 0.75s ease;

    &.open {
      max-height: 500px;
      opacity: 1;
    }
  }
`;
