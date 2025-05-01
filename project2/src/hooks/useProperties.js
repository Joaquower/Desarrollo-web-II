import { useState, useEffect } from 'react';

const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json"
        );
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(
    property =>
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.description.toLowerCase().includes(search.toLowerCase())
  );

  return {
    properties: filteredProperties,
    search,
    setSearch,
    loading,
    error
  };
};

export default useProperties; 