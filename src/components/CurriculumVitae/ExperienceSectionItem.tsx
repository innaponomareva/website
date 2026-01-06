import { css, cx } from '@linaria/core';
import {
  ExperienceTypes,
  type ExperienceItem,
} from '../../contentful/mapUserData';
import AccordionItem from '../Accordion/AccordionItem';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { colors } from '../../common';
import { mediaMin } from '../../utils/css';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';

interface ExperienceSectionItemProps extends Omit<ExperienceItem, 'order'> {
  index: number;
  className?: string;
}

const ExperienceSectionItem: React.FC<ExperienceSectionItemProps> = ({
  type,
  organization,
  date,
  position,
  subject,
  grade,
  location,
  description,
  index,
  className,
}) => {
  const { theme } = useThemeContext();

  return (
    <li
      className={cx(
        experienceSectionItemClass,
        className,
        theme === Themes.DARK && 'dark'
      )}
      key={`${type}-${index}`}
    >
      <div className="date">{date}</div>
      <AccordionItem
        index={index}
        header={
          type === ExperienceTypes.JOB
            ? `${position}, ${organization}, ${location}`
            : `${organization}, ${subject},${grade}, ${location}`
        }
        className="accordion"
      >
        {documentToReactComponents(description)}
      </AccordionItem>
    </li>
  );
};

export default ExperienceSectionItem;

export const experienceSectionItemClass = css`
  display: grid;
  column-gap: 1rem;

  .hidden-content {
    color: ${colors.WHITE_100};

    p {
      font-family: Roboto-Light;
    }

    li {
      position: relative;
      padding: 0.5rem 0 0 1rem;

      &::before {
        content: '>';
        position: absolute;
        left: 0;
        opacity: 0.7;
      }
    }

    &.open {
      border-top: 0.075rem solid ${colors.WHITE_60};
      padding: 1rem 0;
      margin-top: 1rem;
    }
  }

  .chevron {
    color: ${colors.WHITE_100};
  }

  &.dark {
    .hidden-content {
      color: ${colors.WHITE_50};

      &.open {
        border-top: 0.075rem solid ${colors.WHITE_50};
      }
    }
    .chevron {
      color: ${colors.WHITE_80};
    }
  }

  ${mediaMin.lg} {
    grid-template-columns: repeat(4, 1fr);

    .date {
      grid-column: 1/2;
    }

    .accordion {
      grid-column: 2/5;
    }
  }
`;
