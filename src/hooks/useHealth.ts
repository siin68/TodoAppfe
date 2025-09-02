import { useState, useEffect } from 'react';
import { HealthResponse, DbTestResponse } from '../types/api';
import { apiService } from '../services/api';

interface UseHealthResult {
  health: HealthResponse | null;
  dbTest: DbTestResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useHealth = (): UseHealthResult => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [dbTest, setDbTest] = useState<DbTestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const [healthResponse, dbResponse] = await Promise.all([
        apiService.getHealth(),
        apiService.testDatabase(),
      ]);
      setHealth(healthResponse);
      setDbTest(dbResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return {
    health,
    dbTest,
    loading,
    error,
    refetch: fetchHealth,
  };
};
