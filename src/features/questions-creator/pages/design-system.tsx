import React, { useState } from "react";

const DesignSystem = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div
        className={`${
          darkMode ? "bg-[#000807] text-white" : "bg-white text-[#000807]"
        } min-h-screen p-8 font-mono`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-widest">
              Brutalist Design System
            </h1>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 uppercase text-sm tracking-wider font-bold border-2 ${
                darkMode
                  ? "border-white text-white"
                  : "border-[#000807] text-[#000807]"
              }`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {/* COLOR PALETTE */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">
              Color Palette
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <div className="h-24 bg-[#000807] border-2 border-[#000807]"></div>
                <div className="p-2 text-center border-2 border-t-0 font-bold uppercase tracking-wider border-[#000807]">
                  #000807
                </div>
              </div>
              <div className="flex flex-col">
                <div className="h-24 bg-[#4392F1] border-2 border-[#000807]"></div>
                <div className="p-2 text-center border-2 border-t-0 font-bold uppercase tracking-wider border-[#000807]">
                  #4392F1
                </div>
              </div>
              <div className="flex flex-col">
                <div className="h-24 bg-[#E5E1EE] border-2 border-[#000807]"></div>
                <div className="p-2 text-center border-2 border-t-0 font-bold uppercase tracking-wider border-[#000807]">
                  #E5E1EE
                </div>
              </div>
            </div>
          </section>

          {/* CARDS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">
              Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Default Card */}
              <div
                className={`border-4 ${
                  darkMode ? "border-white" : "border-[#000807]"
                } p-6 shadow-[8px_8px_0px_0px_#4392F1]`}
              >
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4">
                  Default Card
                </h3>
                <p className="mb-4">
                  This is a brutalist card with sharp edges and strong shadows.
                </p>
                <button
                  className={`px-4 py-2 uppercase text-sm tracking-wider font-bold ${
                    darkMode
                      ? "bg-[#E5E1EE] text-[#000807]"
                      : "bg-[#000807] text-white"
                  }`}
                >
                  Action
                </button>
              </div>

              {/* Accent Card */}
              <div
                className={`border-4 ${
                  darkMode ? "border-[#E5E1EE]" : "border-[#4392F1]"
                } p-6 shadow-[8px_8px_0px_0px_${
                  darkMode ? "#4392F1" : "#E5E1EE"
                }]`}
              >
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4">
                  Accent Card
                </h3>
                <p className="mb-4">
                  A card with accent colors that complement the design.
                </p>
                <button
                  className={`px-4 py-2 uppercase text-sm tracking-wider font-bold ${
                    darkMode
                      ? "bg-white text-[#000807]"
                      : "bg-[#4392F1] text-[#000807]"
                  }`}
                >
                  Explore
                </button>
              </div>
            </div>
          </section>

          {/* BUTTONS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">
              Buttons
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {/* Default Button */}
              <div className="flex flex-col items-center">
                <button
                  className={`w-full px-4 py-3 uppercase text-sm tracking-wider font-bold ${
                    darkMode
                      ? "bg-white text-[#000807]"
                      : "bg-[#000807] text-white"
                  }`}
                >
                  Default
                </button>
                <span className="mt-2 text-sm">Default</span>
              </div>

              {/* Outline Button */}
              <div className="flex flex-col items-center">
                <button
                  className={`w-full px-4 py-3 uppercase text-sm tracking-wider font-bold border-2 ${
                    darkMode
                      ? "border-white text-white"
                      : "border-[#000807] text-[#000807]"
                  }`}
                >
                  Outline
                </button>
                <span className="mt-2 text-sm">Outline</span>
              </div>

              {/* Ghost Button */}
              <div className="flex flex-col items-center">
                <button
                  className={`w-full px-4 py-3 uppercase text-sm tracking-wider font-bold hover:bg-opacity-10 ${
                    darkMode
                      ? "hover:bg-white text-white"
                      : "hover:bg-[#000807] text-[#000807]"
                  }`}
                >
                  Ghost
                </button>
                <span className="mt-2 text-sm">Ghost</span>
              </div>

              {/* Destructive Button */}
              <div className="flex flex-col items-center">
                <button className="w-full px-4 py-3 uppercase text-sm tracking-wider font-bold bg-red-600 text-white border-2 border-red-600">
                  Delete
                </button>
                <span className="mt-2 text-sm">Destructive</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Primary Button */}
              <button
                className={`px-6 py-4 uppercase text-lg tracking-wider font-bold ${
                  darkMode
                    ? "bg-[#E5E1EE] text-[#000807]"
                    : "bg-[#4392F1] text-[#000807]"
                } shadow-[4px_4px_0px_0px_${darkMode ? "#4392F1" : "#000807"}]`}
              >
                Primary Action
              </button>

              {/* Secondary Button */}
              <button
                className={`px-6 py-4 uppercase text-lg tracking-wider font-bold ${
                  darkMode
                    ? "bg-[#4392F1] text-[#000807]"
                    : "bg-[#E5E1EE] text-[#000807]"
                } shadow-[4px_4px_0px_0px_${darkMode ? "#E5E1EE" : "#000807"}]`}
              >
                Secondary Action
              </button>
            </div>
          </section>
        </div>
      </div>
      <div
        className={`${
          darkMode ? "bg-[#000807] text-white" : "bg-gray-50 text-[#000807]"
        } min-h-screen p-8 font-sans transition-colors duration-300`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-light">Modern Design System</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              } flex items-center transition-all duration-300`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-all duration-300 ${
                  darkMode ? "ml-3 bg-[#E5E1EE]" : "ml-0 bg-[#4392F1]"
                }`}
              ></div>
            </button>
          </div>

          {/* COLOR PALETTE */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6">Color Palette</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="rounded-xl overflow-hidden">
                <div className="h-24 bg-[#000807]"></div>
                <div
                  className={`p-3 text-center ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } text-sm font-medium`}
                >
                  #000807
                </div>
              </div>
              <div className="rounded-xl overflow-hidden">
                <div className="h-24 bg-[#4392F1]"></div>
                <div
                  className={`p-3 text-center ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } text-sm font-medium`}
                >
                  #4392F1
                </div>
              </div>
              <div className="rounded-xl overflow-hidden">
                <div className="h-24 bg-[#E5E1EE]"></div>
                <div
                  className={`p-3 text-center ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } text-sm font-medium`}
                >
                  #E5E1EE
                </div>
              </div>
            </div>
          </section>

          {/* INPUT FIELDS */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6">Input Fields</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Standard Text Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Text Input</label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 focus:border-[#4392F1] focus:ring-2 focus:ring-[#4392F1]/20"
                        : "bg-white border border-gray-200 focus:border-[#4392F1] focus:ring-2 focus:ring-[#4392F1]/20"
                    }`}
                  />
                  {inputValue && (
                    <button
                      onClick={() => setInputValue("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <p className="text-xs opacity-60">Enter your full name</p>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Password Input
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 focus:border-[#E5E1EE] focus:ring-2 focus:ring-[#E5E1EE]/20"
                        : "bg-white border border-gray-200 focus:border-[#E5E1EE] focus:ring-2 focus:ring-[#E5E1EE]/20"
                    }`}
                  />
                </div>
                <div className="flex items-center">
                  <div
                    className={`h-1 flex-grow rounded-full overflow-hidden ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-full ${
                        passwordValue.length > 7
                          ? "bg-green-500"
                          : passwordValue.length > 3
                          ? "bg-yellow-500"
                          : passwordValue.length > 0
                          ? "bg-red-500"
                          : ""
                      }`}
                      style={{
                        width: `${passwordValue.length * 10}%`,
                        maxWidth: "100%",
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs opacity-60">
                    {passwordValue.length === 0
                      ? "Empty"
                      : passwordValue.length < 4
                      ? "Weak"
                      : passwordValue.length < 8
                      ? "Medium"
                      : "Strong"}
                  </span>
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  placeholder="Type your message..."
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg resize-none transition-all duration-200 focus:outline-none ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700 focus:border-[#4392F1] focus:ring-2 focus:ring-[#4392F1]/20"
                      : "bg-white border border-gray-200 focus:border-[#4392F1] focus:ring-2 focus:ring-[#4392F1]/20"
                  }`}
                ></textarea>
                <div className="flex justify-between">
                  <p className="text-xs opacity-60">Share your thoughts</p>
                  <p className="text-xs opacity-60">
                    {textareaValue.length} / 500
                  </p>
                </div>
              </div>

              {/* Select Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Select Option
                </label>
                <div className="relative">
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className={`appearance-none w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 focus:border-[#E5E1EE] focus:ring-2 focus:ring-[#E5E1EE]/20"
                        : "bg-white border border-gray-200 focus:border-[#E5E1EE] focus:ring-2 focus:ring-[#E5E1EE]/20"
                    }`}
                  >
                    <option value="" disabled>
                      Choose an option
                    </option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <div>
                <div className="flex items-center space-x-3">
                  <div
                    className={`relative h-6 w-6 rounded border transition-all ${
                      darkMode
                        ? "border-gray-600 bg-gray-700"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="appearance-none absolute inset-0 w-full h-full rounded cursor-pointer checked:bg-[#4392F1]"
                    />
                    <svg
                      className="absolute inset-0 w-full h-full text-white p-1 pointer-events-none opacity-0 checkbox:opacity-100"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <label className="text-sm">
                    I agree to the Terms and Conditions
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* CARDS */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Default Card */}
              <div
                className={`rounded-xl p-6 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Default Card</h3>
                  <div className="w-8 h-8 rounded-full bg-[#4392F1] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="mb-6 text-sm opacity-80">
                  This card features a clean, minimal design with subtle shadows
                  and rounded corners.
                </p>
                <button
                  className={`px-5 py-2 rounded-lg text-sm font-medium ${
                    darkMode
                      ? "bg-[#E5E1EE] text-[#000807]"
                      : "bg-[#4392F1] text-white"
                  } transition-all hover:opacity-90`}
                >
                  Learn More
                </button>
              </div>

              {/* Form Card */}
              <div
                className={`rounded-xl p-6 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <h3 className="text-lg font-medium mb-4">Newsletter Signup</h3>
                <div className="space-y-4 mb-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none ${
                      darkMode
                        ? "bg-gray-700 border border-gray-600 focus:border-[#4392F1]"
                        : "bg-gray-50 border border-gray-200 focus:border-[#4392F1]"
                    }`}
                  />
                  <div className="flex items-center space-x-3">
                    <div
                      className={`relative h-5 w-5 rounded-full border transition-all ${
                        darkMode
                          ? "border-gray-600 bg-gray-700"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="appearance-none absolute inset-0 w-full h-full rounded-full cursor-pointer checked:bg-[#E5E1EE]"
                      />
                      <svg
                        className="absolute inset-0 w-full h-full text-[#000807] p-1 pointer-events-none opacity-0 checkbox:opacity-100"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <label className="text-xs">
                      I agree to receive marketing emails
                    </label>
                  </div>
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-medium ${
                    darkMode
                      ? "bg-gradient-to-r from-[#4392F1] to-[#E5E1EE] text-[#000807]"
                      : "bg-gradient-to-r from-[#000807] to-[#4392F1] text-white"
                  } transition-all hover:opacity-90`}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </section>

          {/* BUTTONS */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6">Buttons</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {/* Default Button */}
              <div className="flex flex-col items-center">
                <button
                  className={`w-full px-4 py-2 rounded-lg font-medium text-sm ${
                    darkMode
                      ? "bg-[#E5E1EE] text-[#000807]"
                      : "bg-[#000807] text-white"
                  } hover:opacity-90 transition-all`}
                >
                  Default
                </button>
                <span className="mt-2 text-xs opacity-70">Default</span>
              </div>

              {/* Outline Button */}
              <div className="flex flex-col items-center">
                <button
                  className={`w-full px-4 py-2 rounded-lg font-medium text-sm border ${
                    darkMode
                      ? "border-[#4392F1] text-[#4392F1]"
                      : "border-[#000807] text-[#000807]"
                  } hover:bg-opacity-10 ${
                    darkMode ? "hover:bg-[#4392F1]" : "hover:bg-[#000807]"
                  } transition-all`}
                >
                  Outline
                </button>
                <span className="mt-2 text-xs opacity-70">Outline</span>
              </div>

              {/* Ghost Button */}
              <div className="flex flex-col items-center">
                <button
                  className={`w-full px-4 py-2 rounded-lg font-medium text-sm ${
                    darkMode
                      ? "text-[#E5E1EE] hover:bg-[#E5E1EE]/10"
                      : "text-[#4392F1] hover:bg-[#4392F1]/10"
                  } transition-all`}
                >
                  Ghost
                </button>
                <span className="mt-2 text-xs opacity-70">Ghost</span>
              </div>

              {/* Destructive Button */}
              <div className="flex flex-col items-center">
                <button className="w-full px-4 py-2 rounded-lg font-medium text-sm bg-red-500 text-white hover:bg-red-600 transition-all">
                  Delete
                </button>
                <span className="mt-2 text-xs opacity-70">Destructive</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Main CTA */}
              <button
                className={`group relative px-6 py-3 rounded-xl text-base font-medium ${
                  darkMode
                    ? "bg-gradient-to-r from-[#4392F1] to-[#E5E1EE] text-[#000807]"
                    : "bg-gradient-to-r from-[#000807] to-[#4392F1] text-white"
                } transition-all duration-300 shadow-md hover:shadow-lg`}
              >
                <div className="flex items-center justify-center">
                  <span>Get Started</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  className={`absolute inset-0 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 ${
                    darkMode
                      ? "bg-gradient-to-r from-[#E5E1EE] to-[#4392F1]"
                      : "bg-gradient-to-r from-[#4392F1] to-[#000807]"
                  } -z-10 origin-left`}
                ></div>
              </button>
            </div>
          </section>
        </div>
      </div>
      <div className="max-w-4xl mx-auto backdrop-blur-md bg-blue-300 shadow-md rounded-xl p-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-light">Modern Design System</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full backdrop-blur-lg bg-white/30 shadow-lg flex items-center transition-all duration-300`}
          >
            <div
              className={`w-5 h-5 rounded-full transition-all duration-300 ${
                darkMode ? "ml-3 bg-[#5DFDCB]" : "ml-0 bg-[#5FBFF9]"
              }`}
            ></div>
          </button>
        </div>

        {/* COLOR PALETTE */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6">Color Palette</h2>
          <div className="grid grid-cols-3 gap-6">
            {["#0B132B", "#5FBFF9", "#5DFDCB"].map((color) => (
              <div
                className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/30 shadow-lg"
                key={color}
              >
                <div className="h-24" style={{ backgroundColor: color }}></div>
                <div
                  className={`p-3 text-center ${
                    darkMode ? "bg-gray-800/50" : "bg-white/30"
                  } text-sm font-medium backdrop-blur-sm`}
                >
                  {color}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INPUT FIELDS */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6">Input Fields</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Text Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Text Input</label>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none backdrop-blur-lg bg-white/30 shadow-md ${
                    darkMode
                      ? "border border-gray-700 focus:border-[#5FBFF9] focus:ring-2 focus:ring-[#5FBFF9]/20"
                      : "border border-gray-200 focus:border-[#5FBFF9] focus:ring-2 focus:ring-[#5FBFF9]/20"
                  }`}
                />
                {inputValue && (
                  <button
                    onClick={() => setInputValue("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-xs opacity-60">Enter your full name</p>
            </div>
          </div>
        </section>

        {/* BUTTONS */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6">Buttons</h2>
          <div className="space-x-4">
            <button className="px-6 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-[#5FBFF9] to-[#5DFDCB] shadow-lg backdrop-blur-lg transition-transform transform hover:scale-105">
              Primary Button
            </button>
            <button className="px-6 py-3 rounded-lg font-medium text-gray-800 bg-white/30 shadow-md backdrop-blur-lg border border-gray-300 transition-transform transform hover:scale-105">
              Secondary Button
            </button>
          </div>
        </section>

        {/* CARDS */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default Card */}
            <div className="rounded-xl p-6 backdrop-blur-lg bg-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Default Card</h3>
                <div className="w-8 h-8 rounded-full bg-[#5FBFF9] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm opacity-80">
                This is an example of a glassmorphic card with a frosted-glass
                effect.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-3xl font-extrabold text-purple-500 mb-6 text-center">
            Pastel Playful Cards and Buttons
          </h1>

          {/* Card Example */}
          <div className="p-6 mb-6 rounded-lg bg-yellow-50 text-yellow-700 shadow">
            <h2 className="text-2xl font-semibold mb-2">Card Title</h2>
            <p className="text-sm mb-4">
              This is a playful card description. It has a soft pastel yellow
              background and a light playful vibe.
            </p>
            <button className="px-4 py-2 rounded-lg bg-yellow-400 text-white shadow hover:bg-yellow-500">
              Learn More
            </button>
          </div>

          {/* Another Card */}
          <div className="p-6 mb-6 rounded-lg bg-blue-50 text-blue-700 shadow">
            <h2 className="text-2xl font-semibold mb-2">Another Card</h2>
            <p className="text-sm mb-4">
              Another example of a pastel card with a light blue background.
            </p>
            <button className="px-4 py-2 rounded-lg bg-blue-400 text-white shadow hover:bg-blue-500">
              Explore
            </button>
          </div>

          {/* Button Variants */}
          <div className="space-y-4">
            <button className="w-full py-3 rounded-lg bg-pink-400 text-white font-bold shadow hover:bg-pink-500">
              Primary Button
            </button>
            <button className="w-full py-3 rounded-lg border-2 border-blue-400 text-blue-400 font-bold hover:bg-blue-400 hover:text-white transition">
              Outline Button
            </button>
            <button className="w-full py-3 rounded-lg bg-transparent text-purple-400 font-bold hover:underline hover:text-purple-500">
              Ghost Button
            </button>
            <button className="w-full py-3 rounded-lg bg-red-400 text-white font-bold shadow hover:bg-red-500">
              Destructive Button
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignSystem;
