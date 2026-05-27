import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
  const pathname = url.pathname;
  let page = 'home' as string;
  if (pathname.startsWith('/donations')) page = 'donations';
  else if (pathname.startsWith('/expenses')) page = 'expenses';
  else if (pathname.startsWith('/updates')) page = 'updates';
  return { page };
};
