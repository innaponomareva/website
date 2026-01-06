import { mediaMin } from '../../utils/css';
import ColumnTitle from './ColumnTitle';
import { css, cx } from '@linaria/core';

interface SkillsSectionProps {
  skills: string[];
  languages: string[];
  className?: string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  languages,
  className,
}) => {
  return (
    <div className={cx(skillsSectionClass, className)}>
      <div className="content-grid-wrapper">
        <div className="dev-column">
          <ColumnTitle title="dev" />
          <ul>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="lang-column">
          <ColumnTitle title="languages" />
          <ul>
            {languages.map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;

export const skillsSectionClass = css`
  .content-grid-wrapper {
    display: grid;
    gap: 3.125rem;
  }

  .dev-column ul {
    column-count: 2;
  }

  ${mediaMin.xs} {
    .dev-column ul {
      column-count: 3;
    }
  }

  ${mediaMin.md} {
    .content-grid-wrapper {
      grid-template-columns: repeat(3, 1fr);
    }

    .dev-column {
      grid-column: 1/3;
    }

    .lang-column {
      grid-column: 3/4;
    }
  }

  ${mediaMin.lg} {
    .dev-column {
      ul {
        column-count: 4;
      }
    }
  }
`;
