import React from "react";
import CurrencyConverter from "./components/CurrencyConverter";
import ToggleDarkMode from "./components/ToggleDarkMode";
import "./index.css"; // TailwindCSS

const App = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      {/* Header with Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Pro Currency Converter</h1>
          <nav className="flex space-x-4">
            <a href="#converter" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Home</a>
            <a href="#article" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">About</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Contact Us</a>
          </nav>
          <ToggleDarkMode />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <section id="converter" className="mb-12">
          <CurrencyConverter />
        </section>

        {/* Article Section */}
        <section id="article" className="mt-12">
          <h2 className="text-2xl font-semibold dark:text-gray-100">Why Use Pro Currency Converter</h2>
          <ul className="list-disc mt-4 pl-6 text-gray-800 dark:text-gray-300">
            <li>Accurate real-time exchange rates</li>
            <li>Multi-currency conversion with ease</li>
            <li>Support for a wide range of global currencies</li>
            <li>Secure and reliable data handling</li>
            <li>Easy-to-use interface with a modern design</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-12">
          <h2 className="text-2xl font-semibold dark:text-gray-100">Contact Us</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Reach us at: <span className="text-blue-500">info@procurrencyconverter.com</span></p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-4">
        <p className="text-center text-gray-600 dark:text-gray-300">&copy; 2024 Pro Currency Converter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
