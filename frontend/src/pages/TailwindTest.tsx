import React, { useState } from 'react';

const TailwindTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tailwind CSS Test</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-blue-200 mb-8">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'colors'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-blue-500 hover:text-blue-700'
            }`}
            onClick={() => setActiveTab('colors')}
          >
            Colors
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'typography'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-blue-500 hover:text-blue-700'
            }`}
            onClick={() => setActiveTab('typography')}
          >
            Typography
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'components'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-blue-500 hover:text-blue-700'
            }`}
            onClick={() => setActiveTab('components')}
          >
            Components
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'responsive'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-blue-500 hover:text-blue-700'
            }`}
            onClick={() => setActiveTab('responsive')}
          >
            Responsive
          </button>
        </div>

        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Blue Colors</h2>
              <div className="space-y-2">
                <div className="h-10 rounded bg-blue-500 flex items-center justify-center text-white font-medium">
                  Blue 500
                </div>
                <div className="h-10 rounded bg-blue-600 flex items-center justify-center text-white font-medium">
                  Blue 600
                </div>
                <div className="h-10 rounded bg-blue-700 flex items-center justify-center text-white font-medium">
                  Blue 700
                </div>
                <div className="h-10 rounded bg-blue-800 flex items-center justify-center text-white font-medium">
                  Blue 800
                </div>
                <div className="h-10 rounded bg-blue-200 flex items-center justify-center text-blue-800 font-medium">
                  Blue 200
                </div>
                <div className="h-10 rounded bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                  Blue 100
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Green Colors</h2>
              <div className="space-y-2">
                <div className="h-10 rounded bg-green-500 flex items-center justify-center text-white font-medium">
                  Green 500
                </div>
                <div className="h-10 rounded bg-green-600 flex items-center justify-center text-white font-medium">
                  Green 600
                </div>
                <div className="h-10 rounded bg-green-700 flex items-center justify-center text-white font-medium">
                  Green 700
                </div>
                <div className="h-10 rounded bg-green-800 flex items-center justify-center text-white font-medium">
                  Green 800
                </div>
                <div className="h-10 rounded bg-green-200 flex items-center justify-center text-green-800 font-medium">
                  Green 200
                </div>
                <div className="h-10 rounded bg-green-100 flex items-center justify-center text-green-800 font-medium">
                  Green 100
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Yellow Colors</h2>
              <div className="space-y-2">
                <div className="h-10 rounded bg-yellow-500 flex items-center justify-center text-yellow-900 font-medium">
                  Yellow 500
                </div>
                <div className="h-10 rounded bg-yellow-600 flex items-center justify-center text-white font-medium">
                  Yellow 600
                </div>
                <div className="h-10 rounded bg-yellow-700 flex items-center justify-center text-white font-medium">
                  Yellow 700
                </div>
                <div className="h-10 rounded bg-yellow-800 flex items-center justify-center text-white font-medium">
                  Yellow 800
                </div>
                <div className="h-10 rounded bg-yellow-200 flex items-center justify-center text-yellow-800 font-medium">
                  Yellow 200
                </div>
                <div className="h-10 rounded bg-yellow-100 flex items-center justify-center text-yellow-800 font-medium">
                  Yellow 100
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Headings</h2>
              <div className="space-y-4">
                <h1 className="text-5xl font-bold">Heading 1</h1>
                <h2 className="text-4xl font-bold">Heading 2</h2>
                <h3 className="text-3xl font-bold">Heading 3</h3>
                <h4 className="text-2xl font-bold">Heading 4</h4>
                <h5 className="text-xl font-bold">Heading 5</h5>
                <h6 className="text-lg font-bold">Heading 6</h6>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Text Sizes</h2>
              <div className="space-y-4">
                <p className="text-xs">Extra Small Text (xs)</p>
                <p className="text-sm">Small Text (sm)</p>
                <p className="text-base">Base Text (base)</p>
                <p className="text-lg">Large Text (lg)</p>
                <p className="text-xl">Extra Large Text (xl)</p>
                <p className="text-2xl">2XL Text (2xl)</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Font Weights</h2>
              <div className="space-y-4">
                <p className="font-thin">Thin (100)</p>
                <p className="font-extralight">Extra Light (200)</p>
                <p className="font-light">Light (300)</p>
                <p className="font-normal">Normal (400)</p>
                <p className="font-medium">Medium (500)</p>
                <p className="font-semibold">Semi Bold (600)</p>
                <p className="font-bold">Bold (700)</p>
                <p className="font-extrabold">Extra Bold (800)</p>
                <p className="font-black">Black (900)</p>
              </div>
            </div>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Buttons</h2>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Primary</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded">Secondary</button>
                <button className="bg-yellow-500 text-yellow-900 px-4 py-2 rounded">Accent</button>
                <button className="bg-transparent border border-blue-500 text-blue-600 px-4 py-2 rounded">
                  Outline
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded">Small</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Medium</button>
                <button className="bg-blue-600 text-white px-6 py-3 text-lg rounded">Large</button>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Cards</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="font-medium">Card Title</h3>
                </div>
                <div className="px-6 py-4">
                  <p>This is a basic card component with header, body, and footer sections.</p>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                  <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded">
                    Action
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="font-medium mb-2">Colored Card</h3>
                  <p>This card has a custom background color.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Tab */}
        {activeTab === 'responsive' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold">Responsive Grid</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                <div key={item} className="bg-white p-4 rounded shadow">
                  <p className="font-medium">Item {item}</p>
                  <p className="text-sm text-blue-500">Resize the window to see the grid change</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Responsive Text</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                This text changes size based on the screen width
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Responsive Visibility</h2>
              <div className="block sm:hidden p-4 bg-red-100 rounded">
                <p>Visible only on mobile (smaller than sm breakpoint)</p>
              </div>
              <div className="hidden sm:block md:hidden p-4 bg-yellow-100 rounded mt-4">
                <p>Visible only on sm screens</p>
              </div>
              <div className="hidden md:block lg:hidden p-4 bg-green-100 rounded mt-4">
                <p>Visible only on md screens</p>
              </div>
              <div className="hidden lg:block xl:hidden p-4 bg-blue-100 rounded mt-4">
                <p>Visible only on lg screens</p>
              </div>
              <div className="hidden xl:block p-4 bg-purple-100 rounded mt-4">
                <p>Visible only on xl screens and above</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TailwindTest;
