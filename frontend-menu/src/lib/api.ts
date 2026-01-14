import { MenuItem } from '@/types';

const API_BASE_URL = 'http://localhost:3001';

interface GetMenuItemsParams {
  category?: string;
  q?: string;
  [key: string]: string | undefined;
}

export async function getMenuItems(params?: GetMenuItemsParams): Promise<MenuItem[]> {
  const url = new URL(`${API_BASE_URL}/menuItems`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value);
      }
    });
  }

  const response = await fetch(url.toString(), {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch menu items: ${response.statusText}`);
  }

  return response.json();
}
