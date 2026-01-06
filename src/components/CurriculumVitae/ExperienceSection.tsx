import ColumnTitle from './ColumnTitle';
import { css, cx } from '@linaria/core';
import Accordion from '../Accordion/Accordion';
import type { ExperienceItem } from '../../contentful/mapUserData';
import ExperienceSectionItem from './ExperienceSectionItem';

interface ExperienceSectionProps {
  data: ExperienceItem[];
  title?: string;
  className?: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  data,
  title,
  className,
}) => (
  <div className={cx(experienceSectionClass, className)}>
    {title && <ColumnTitle title={title} />}
    <Accordion>
      <ul className="experience-list">
        {data.map((item, index) => (
          <ExperienceSectionItem
            key={`${item.type}-${index}`}
            index={index}
            type={item.type}
            organization={item.organization}
            date={item.date}
            position={item.position}
            subject={item.subject}
            grade={item.grade}
            location={item.location}
            description={item.description}
          />
        ))}
      </ul>
    </Accordion>
  </div>
);

export default ExperienceSection;

export const experienceSectionClass = css`
  .experience-list {
    display: grid;
    row-gap: 1rem;
  }
`;
