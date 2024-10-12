import React, { useState, useEffect } from "react";
import axios from "axios";
import Flag from "react-world-flags";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [targetCurrencies, setTargetCurrencies] = useState([]);
  const [conversionResults, setConversionResults] = useState([]); // setConversionResults
  const [favoritePair, setFavoritePair] = useState(""); // setFavoritePair

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        setCurrencies(Object.keys(response.data.rates));
      });
  }, []);

  const handleConvert = () => {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => {
        const rate = response.data.rates[toCurrency];
        setConvertedAmount(amount * rate);
      })
      .catch((error) => console.error("Error converting currency:", error));
  };

  const saveFavoritePair = () => {
    const pair = `${fromCurrency} to ${toCurrency}`;
    localStorage.setItem("favoritePair", pair);
    setFavoritePair(pair);
    alert("Favorite pair saved!");
  };

  const loadFavoritePair = () => {
    const savedPair = localStorage.getItem("favoritePair");
    if (savedPair) {
      const [from, to] = savedPair.split(" to ");
      setFromCurrency(from);
      setToCurrency(to);
      alert(`Loaded favorite pair: ${savedPair}`);
    } else {
      alert("No favorite pair saved!");
    }
  };

  const handleTargetCurrencyChange = (e) => {
    const selectedOptions = [...e.target.selectedOptions];
    setTargetCurrencies(selectedOptions.map((option) => option.value));
  };

  const convertToMultipleCurrencies = () => {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => {
        const rates = response.data.rates;
        const results = targetCurrencies.map((currency) => {
          const rate = rates[currency];
          return {
            currency,
            convertedAmount: (amount * rate).toFixed(2),
          };
        });
        setConversionResults(results);
      })
      .catch((error) => console.error("Error converting multiple currencies:", error));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Choose Currency</h2>
      <div className="flex space-x-4">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="border dark:bg-gray-700 dark:text-gray-100 p-2 rounded"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              <Flag code={currency.slice(0, 2)} alt={currency} className="inline mr-2" />
              {currency}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border dark:bg-gray-700 dark:text-gray-100 p-2 rounded"
        />

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border dark:bg-gray-700 dark:text-gray-100 p-2 rounded"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 rounded">
          <p>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </p>
        </div>
      )}

      {/*Multi-Currency Conversion*/}
      <h3 className="text-xl font-semibold mt-8">Multi-Currency Conversion</h3>
      <select
        multiple
        onChange={handleTargetCurrencyChange}
        className="border dark:bg-gray-700 dark:text-gray-100 p-2 rounded mt-4"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <button
        onClick={convertToMultipleCurrencies}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-4"
      >
        Convert to Selected Currencies
      </button>

      {/*Converted Amounts*/}
      {conversionResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Converted Amounts:</h3>
          {conversionResults.map((result) => (
            <p key={result.currency}>
              {amount} {fromCurrency} = {result.convertedAmount} {result.currency}
            </p>
          ))}
        </div>
      )}

      {/*Save/Load Favorite Pair*/}
      <h3 className="text-xl font-semibold mt-8">Save/Load Favorite Pair</h3>
      <button
        onClick={saveFavoritePair}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-4"
      >
        Save Favorite Pair
      </button>
      <button
        onClick={loadFavoritePair}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition mt-4 ml-4"
      >
        Load Favorite Pair
      </button>

      {favoritePair && <p className="mt-4 text-green-500">Favorite Pair: {favoritePair}</p>}
    </div>
  );
};

export default CurrencyConverter;
