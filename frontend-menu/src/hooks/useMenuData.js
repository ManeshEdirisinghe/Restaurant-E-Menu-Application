import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const useRestaurant = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/restaurant`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
};

export const useCategories = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/categories`)
      .then(res => {
        setData([{ id: 'all', name: 'View All', icon: '🍽️' }, ...res.data]);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
};

export const useMenuItems = (filters) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        let url = `${API_BASE}/menuItems`;
        const params = {};
        if (filters.category && filters.category !== 'all') params.category = filters.category;
        if (filters.search) params.q = filters.search;

        const res = await axios.get(url, { params });
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, [filters.category, filters.search]);

  return { data, isLoading };
};