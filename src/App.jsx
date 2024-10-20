import { useCallback, useEffect, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(""); // To display copy success message

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) {
      options += "!@#$%^&*-_+=[]{}~`";
    }
    if (numberAllowed) {
      options += "1234567890";
    }
    for (let i = 0; i < length; i++) {
      let character = Math.floor(Math.random() * options.length);
      pass += options.charAt(character);
    }
    setPassword(pass);
  }, [length, charAllowed, numberAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopySuccess("Password copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear the message after 2 seconds
      })
      .catch(err => {
        setCopySuccess("Failed to copy password.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-6 bg-gray-900 text-orange-500">
        <h1 className="text-white text-center my-3 text-xl font-bold">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            placeholder="Password"
            value={password}
            readOnly
            className="outline-none w-full py-2 px-3 bg-gray-700 text-white"
          />
          <button
            className="outline-none bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 shrink-0"
            onClick={handleCopy} // Copy password when button is clicked
          >
            Copy
          </button>
        </div>
        {copySuccess && <p className="text-green-500 text-center">{copySuccess}</p>} {/* Show success or error message */}
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            <label className="text-white">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer w-full"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="chars"
              onChange={() => setCharAllowed(prev => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="chars" className="text-white">Special Characters</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numbers"
              onChange={() => setNumberAllowed(prev => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="numbers" className="text-white">Numbers</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
