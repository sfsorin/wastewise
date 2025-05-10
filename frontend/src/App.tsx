import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import ThemeToggle from '@components/common/ThemeToggle';
import ResponsiveContainer from '@components/common/ResponsiveContainer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-background text-text py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">WasteWise</h1>
          <p className="text-lg opacity-80">Aplicație de Management al Deșeurilor</p>
        </div>

        <div className="flex justify-center space-x-6 mb-10">
          <a
            href="https://vite.dev"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center"
          >
            <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
            <span className="mt-2 text-sm text-gray-600">Vite</span>
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center"
          >
            <img src={reactLogo} className="h-16 w-16 animate-spin-slow" alt="React logo" />
            <span className="mt-2 text-sm text-gray-600">React</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Exemplu de Card"
            withShadow={true}
            withBorder={true}
            padding="large"
            className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800"
          >
            <p className="mb-4">
              Acest card folosește Tailwind CSS pentru stilizare. Tailwind este un framework CSS
              utility-first care permite dezvoltarea rapidă și consistentă a interfeței utilizator.
            </p>
            <div className="flex justify-end">
              <Button
                label="Află mai mult"
                variant="primary"
                size="medium"
                onClick={() => window.open('https://tailwindcss.com', '_blank')}
              />
            </div>
          </Card>

          <Card
            title="Contor"
            withShadow={true}
            padding="large"
            className="dark:bg-gray-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-700"
          >
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-primary mb-4">{count}</p>
              <div className="flex space-x-4">
                <Button
                  label="Decrementează"
                  variant="outline"
                  onClick={() => setCount(count - 1)}
                  disabled={count <= 0}
                />
                <Button
                  label="Incrementează"
                  variant="primary"
                  onClick={() => setCount(count + 1)}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-10">
          <Card
            title="Container Queries Demo"
            withShadow={true}
            padding="none"
            className="dark:bg-gray-800"
          >
            <ResponsiveContainer className="w-full resize-x overflow-auto border border-gray-200 dark:border-gray-700 min-w-[200px] max-w-full h-40">
              <div className="flex flex-col items-center justify-center h-full">
                <p className="font-bold mb-2">Redimensionează acest container!</p>
                <p className="text-center">
                  Textul și padding-ul se vor adapta automat la lățimea containerului.
                </p>
              </div>
            </ResponsiveContainer>
            <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
              <p>
                Această componentă demonstrează Container Queries, o funcționalitate modernă CSS
                care permite stilizarea bazată pe dimensiunea containerului, nu doar pe dimensiunea
                viewport-ului.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Făcut cu <span className="text-red-500">❤</span> folosind Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
