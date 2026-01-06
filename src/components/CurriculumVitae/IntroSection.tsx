import { css, cx } from '@linaria/core';
import { colors } from '../../common';
import { mediaMin } from '../../utils/css';
import { BsGithub } from 'react-icons/bs';
import { GrLinkedinOption } from 'react-icons/gr';
import type { SocialLinkItem } from '../../contentful/mapUserData';

const iconMap = {
  github: <BsGithub style={{ fontSize: '1.5rem' }} />,
  linkedin: <GrLinkedinOption style={{ fontSize: '1.3rem' }} />,
};

type IconKey = keyof typeof iconMap;

const isIconKey = (key: string): key is IconKey => key in iconMap;

interface IntroSectionProps {
  name: string;
  title: string;
  description: string;
  photoLink: string;
  socialMedia: SocialLinkItem[];
  className?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  name,
  title,
  description,
  photoLink,
  className,
  socialMedia,
}) => {
  return (
    <div className={cx(introSectionClass, className)}>
      <div className="content-grid-wrapper">
        <div className="photo-column">
          <img src={photoLink} alt="photo" />
        </div>

        <div className="info-column">
          <p className="name">{name}</p>
          <p className="title-description">{title + ' ' + description}</p>
          <ul className="social-media">
            {socialMedia.map((link) => {
              if (!isIconKey(link.iconKey)) return null;

              return (
                <a
                  key={link.iconKey}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {iconMap[link.iconKey]}
                </a>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;

export const introSectionClass = css`
  .content-grid-wrapper {
    display: grid;
    gap: 50px;
    justify-content: center;
  }

  .photo-column {
    display: grid;
    justify-content: center;

    img {
      width: 200px;
    }
  }

  .name {
    font-size: 1.3rem;
    font-weight: 400;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .social-media {
    padding-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .social-media a {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: ${colors.WHITE_100};
    border-width: 1px;
    border-style: solid;
    border-color: ${colors.WHITE_100};
  }

  ${mediaMin.xs} {
    .photo-column {
      img {
        width: 250px;
      }
    }
  }

  ${mediaMin.sm} {
    .content-grid-wrapper {
      grid-template-columns: repeat(3, 1fr);
      justify-content: start;
    }

    .photo-column {
      grid-column: 1/2;
    }

    .info-column {
      grid-column: 2/4;
    }
  }
`;
