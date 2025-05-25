import { useState } from 'react';
import { getDB } from '@/lib/db';

interface QueryResult {
  [key: string]: string | number | boolean | null | Date;
}

export default function SQLQueryInterface() {
  const [query, setQuery] = useState('SELECT * FROM patients');
  const [results, setResults] = useState<QueryResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const executeQuery = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const db = getDB();
      const result = await db.query(query);
      setResults(result.rows as QueryResult[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while executing the query');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="query" className="block text-sm font-medium text-gray-700">
          SQL Query
        </label>
        <div className="mt-1">
          <textarea
            id="query"
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          onClick={executeQuery}
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Executing...' : 'Execute Query'}
        </button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(results[0]).map((key) => (
                        <th
                          key={key}
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {results.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                          <td
                            key={colIndex}
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >
                            {value?.toString() ?? 'NULL'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 