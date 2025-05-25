'use client';

import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import PatientForm from '@/components/PatientForm';
import SQLQueryInterface from '@/components/SQLQueryInterface';
import { initializeDB } from '@/lib/db';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const [isDBInitialized, setIsDBInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeDB();
        setIsDBInitialized(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setError(error instanceof Error ? error.message : 'Failed to initialize database');
      }
    };
    init();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h3 className="mt-2 text-sm font-semibold text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!isDBInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Initializing database...</h3>
          <p className="mt-1 text-sm text-gray-500">Please wait while we set up the application.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Patient Registration System
          </h1>
          
          <div className="mt-8">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  Register Patient
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  Query Records
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-6">
                <Tab.Panel
                  className={classNames(
                    'rounded-xl bg-white p-6',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  <PatientForm />
                </Tab.Panel>
                <Tab.Panel
                  className={classNames(
                    'rounded-xl bg-white p-6',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  <SQLQueryInterface />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
