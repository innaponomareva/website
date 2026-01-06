type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function contentfulGraphQL<
  TData,
  TVars extends Record<string, any> = {}
>(query: string, variables?: TVars): Promise<TData> {
  const SPACE = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const ENV = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT ?? 'master';
  const token = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN;

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENV}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await res.json()) as GraphQLResponse<TData>;

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('\n'));
  }
  if (!json.data) {
    throw new Error('No data returned from Contentful GraphQL.');
  }

  return json.data;
}
