import type { Document } from '@contentful/rich-text-types';

export type SocialLinkItem = {
  label: string;
  url: string;
  iconKey: string;
  order: number;
};

export enum ExperienceTypes {
  JOB = 'jobs',
  EDUCATION = 'education',
}

export type ExperienceItem = {
  type: ExperienceTypes.JOB | ExperienceTypes.EDUCATION;
  organization: string;
  date: string;
  position?: string;
  subject?: string;
  grade?: string;
  location: string;
  description: Document;
  order: number;
};

export type UserData = {
  name: string;
  title: string;
  description: string;
  photoLink: string;
  socialMedia: SocialLinkItem[];
  skills: string[];
  languages: string[];
  jobs: ExperienceItem[];
  education: ExperienceItem[];
};

export const mapUserData = (fields: any) => {
  const socialMedia = (fields.socialMediaCollection?.items ?? [])
    .filter((item: any): item is SocialLinkItem => Boolean(item)) // remove nulls
    .map((item: any) => ({
      ...item,
      order: item.order,
    }))
    .sort((a: SocialLinkItem, b: SocialLinkItem) => a.order - b.order);

  const jobs = (fields.jobsCollection?.items ?? [])
    .filter((item: any) => Boolean(item))
    .map((item: any) => ({
      ...item,
      type: ExperienceTypes.JOB,
      order: item.order ?? 0,
      description: item.description?.json,
    }))
    .sort((a: any, b: any) => a.order - b.order);

  const education = (fields.educationCollection?.items ?? [])
    .filter((item: any) => Boolean(item))
    .map((item: any) => ({
      ...item,
      type: ExperienceTypes.EDUCATION,
      order: item.order ?? 0,
      description: item.description?.json,
    }))
    .sort((a: any, b: any) => a.order - b.order);

  return {
    name: fields.name ?? '',
    title: fields.title ?? '',
    description: fields.description ?? '',
    photoLink: fields.photoLink ?? '',
    socialMedia,
    skills: fields.skills ?? [],
    languages: fields.languages ?? [],
    jobs,
    education,
  };
};
