import { css, cx } from '@linaria/core';
import IntroSection from './IntroSection';
import SkillsSection from './SkillsSection';
import { colors } from '../../common';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import ExperienceSection from './ExperienceSection';

interface CVProps {
  className?: string;
}

const CurriculumVitae: React.FC<CVProps> = ({ className }) => {
  const { theme } = useThemeContext();
  const { data, loading, error } = useUserDataContext();

  if (loading) return <div>Loading…</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data found.</div>;

  return (
    <div
      className={cx(
        curriculumVitaeClass,
        theme === Themes.DARK && 'dark',
        className
      )}
    >
      <IntroSection
        name={data.name}
        title={data.title}
        description={data.description}
        photoLink={data.photoLink}
        socialMedia={data.socialMedia}
      />
      <SkillsSection skills={data.skills} languages={data.languages} />
      <ExperienceSection title="professional experience" data={data.jobs} />
      <ExperienceSection title="education" data={data.education} />
    </div>
  );
};

export default CurriculumVitae;

export const curriculumVitaeClass = css`
  display: grid;
  gap: 3.125rem;

  font-size: 1.07rem;
  line-height: 1.7rem;
  color: ${colors.BLUE_2};
  font-weight: 300;

  &.dark {
    color: ${colors.WHITE_80};
    font-weight: 300;
  }
`;
