"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  RefreshCw,
  Check,
  ShieldCheck,
  Shield
} from "lucide-react";

export default function PasswordGenerator() {
  // Settings
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  // Result
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [strength, setStrength] = useState<"weak" | "medium" | "strong" | "very-strong">("medium");

  // 1. HELPER: Calculate Strength (Moved UP to fix Reference Error)
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.length > 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (pass.length < 8) return "weak";
    if (score < 3) return "medium";
    if (score < 5) return "strong";
    return "very-strong";
  };

  // 2. GENERATE LOGIC
  const generatePassword = useCallback(() => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charset = "";
    if (useUppercase) charset += uppercaseChars;
    if (useLowercase) charset += lowercaseChars;
    if (useNumbers) charset += numberChars;
    if (useSymbols) charset += symbolChars;

    if (charset === "") return;

    let newPassword = "";
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      newPassword += charset[randomValues[i] % charset.length];
    }

    setPassword(newPassword);
    setStrength(getPasswordStrength(newPassword));

  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  // Initial load & Live Update
  useEffect(() => {
    // FIX: "Synchronous setState" xatosini oldini olish uchun setTimeout ishlatamiz.
    // Bu state o'zgarishini render tugagandan keyingi navbatga o'tkazadi.
    const timeout = setTimeout(() => {
      generatePassword();
    }, 0);

    return () => clearTimeout(timeout);
  }, [generatePassword]);

  // 3. COPY FUNCTION
  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const strengthColors = {
    "weak": "bg-red-500",
    "medium": "bg-yellow-500",
    "strong": "bg-green-500",
    "very-strong": "bg-emerald-600"
  };

  const strengthLabels = {
    "weak": "Weak",
    "medium": "Medium",
    "strong": "Strong",
    "very-strong": "Unbreakable!"
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* DISPLAY AREA */}
      <div className="relative bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-lg group">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Password Text */}
          <div className="flex-1 w-full break-all font-mono text-3xl md:text-4xl text-gray-800 tracking-wider text-center md:text-left">
            {password}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={generatePassword}
              className="p-3 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors tooltip"
              title="Regenerate"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            <button
              onClick={handleCopy}
              className={`p-3 rounded-xl transition-all flex items-center gap-2 font-bold
                 ${isCopied ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}
               `}
            >
              {isCopied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
              <span className="hidden md:inline">{isCopied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Strength Bar */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${strengthColors[strength]}`}
              style={{ width: strength === 'weak' ? '25%' : strength === 'medium' ? '50%' : strength === 'strong' ? '75%' : '100%' }}
            ></div>
          </div>
          <span className={`text-sm font-bold uppercase ${strengthColors[strength].replace("bg-", "text-")}`}>
            {strengthLabels[strength]}
          </span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" /> Configuration
        </h3>

        {/* Length Slider */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <label className="font-medium text-gray-700">Password Length</label>
            <span className="font-mono bg-white border px-3 py-1 rounded-md text-blue-600 font-bold">
              {length}
            </span>
          </div>
          <input
            type="range"
            min="6" max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Checkboxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Toggle label="Uppercase (A-Z)" checked={useUppercase} onChange={setUseUppercase} />
          <Toggle label="Lowercase (a-z)" checked={useLowercase} onChange={setUseLowercase} />
          <Toggle label="Numbers (0-9)" checked={useNumbers} onChange={setUseNumbers} />
          <Toggle label="Symbols (!@#$)" checked={useSymbols} onChange={setUseSymbols} />
        </div>
      </div>

      {/* SECURITY NOTE */}
      <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 text-sm text-blue-800">
        <Shield className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          <strong>Privacy Note:</strong> Your passwords are generated locally in your browser using the Web Crypto API.
          They are never sent to our servers or stored anywhere.
        </p>
      </div>

    </div>
  );
}

// Kichik UI Component
function Toggle({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
      <span className="font-medium text-gray-700">{label}</span>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}>
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      </div>
    </label>
  );
}
