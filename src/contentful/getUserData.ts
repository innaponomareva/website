import { contentfulGraphQL } from './client';
import { mapUserData } from './mapUserData';

const GET_USER_DATA = `
  query GetUserData {
    userDataCollection(limit: 1) {
      items {
        name
        title
        description
        photoLink
        skills
        languages

        socialMediaCollection(limit: 20) {
          items {
            label
            url
            iconKey
            order
          }
        }

        jobsCollection(limit: 50) {
          items {
            organization
            date
            position
            location
            description {
              json
            }
            order
          }
        }

        educationCollection(limit: 50) {
          items {
            organization
            date
            subject
            grade
            location
            description {
              json
            }
            order
          }
        }
      }
    }
  }
`;

type GetUserDataResponse = {
  userDataCollection?: {
    items?: Array<any | null> | null;
  } | null;
};

export const getUserData = async () => {
  const data = await contentfulGraphQL<GetUserDataResponse>(GET_USER_DATA);

  const item = data.userDataCollection?.items?.[0];
  return item ? mapUserData(item) : null;
};
