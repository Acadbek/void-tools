"use client";

import { useState, useMemo } from "react";
import {
  ArrowRightLeft,
  Copy,
  Check,
  Ruler,
  Weight,
  Thermometer,
  HardDrive,
  Clock
} from "lucide-react";

const CATEGORIES = {
  length: {
    icon: Ruler,
    label: "Length",
    units: {
      m: { label: "Meter (m)", factor: 1 },
      km: { label: "Kilometer (km)", factor: 1000 },
      cm: { label: "Centimeter (cm)", factor: 0.01 },
      mm: { label: "Millimeter (mm)", factor: 0.001 },
      ft: { label: "Feet (ft)", factor: 0.3048 },
      in: { label: "Inch (in)", factor: 0.0254 },
      yd: { label: "Yard (yd)", factor: 0.9144 },
      mi: { label: "Mile (mi)", factor: 1609.34 }
    }
  },
  weight: {
    icon: Weight,
    label: "Weight",
    units: {
      kg: { label: "Kilogram (kg)", factor: 1 },
      g: { label: "Gram (g)", factor: 0.001 },
      mg: { label: "Milligram (mg)", factor: 0.000001 },
      lb: { label: "Pound (lb)", factor: 0.453592 },
      oz: { label: "Ounce (oz)", factor: 0.0283495 },
      t: { label: "Tonne (t)", factor: 1000 }
    }
  },
  data: {
    icon: HardDrive,
    label: "Data",
    units: {
      B: { label: "Byte (B)", factor: 1 },
      KB: { label: "Kilobyte (KB)", factor: 1024 },
      MB: { label: "Megabyte (MB)", factor: 1048576 },
      GB: { label: "Gigabyte (GB)", factor: 1073741824 },
      TB: { label: "Terabyte (TB)", factor: 1099511627776 }
    }
  },
  time: {
    icon: Clock,
    label: "Time",
    units: {
      s: { label: "Second (s)", factor: 1 },
      min: { label: "Minute (min)", factor: 60 },
      h: { label: "Hour (h)", factor: 3600 },
      d: { label: "Day (d)", factor: 86400 },
      wk: { label: "Week (wk)", factor: 604800 }
    }
  },
  temperature: {
    icon: Thermometer,
    label: "Temperature",
    units: {
      C: { label: "Celsius (°C)", factor: 1 },
      F: { label: "Fahrenheit (°F)", factor: 1 },
      K: { label: "Kelvin (K)", factor: 1 }
    }
  }
};

type CategoryKey = keyof typeof CATEGORIES;

export default function UnitConverter() {
  const [category, setCategory] = useState<CategoryKey>("length");

  const defaultUnits = Object.keys(CATEGORIES["length"].units);
  const [fromUnit, setFromUnit] = useState(defaultUnits[0]);
  const [toUnit, setToUnit] = useState(defaultUnits[1] || defaultUnits[0]);

  const [value, setValue] = useState<number | "">("");
  const [isCopied, setIsCopied] = useState(false);

  const changeCategory = (newCategory: CategoryKey) => {
    setCategory(newCategory);

    const units = Object.keys(CATEGORIES[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setValue("");
  };

  const result = useMemo(() => {
    if (value === "" || isNaN(Number(value))) {
      return "";
    }

    const val = Number(value);

    if (category === "temperature") {
      let tempInC = val;
      if (fromUnit === "F") tempInC = (val - 32) * 5 / 9;
      if (fromUnit === "K") tempInC = val - 273.15;

      let finalTemp = tempInC;
      if (toUnit === "F") finalTemp = (tempInC * 9 / 5) + 32;
      if (toUnit === "K") finalTemp = tempInC + 273.15;

      return parseFloat(finalTemp.toFixed(4));
    }

    // @ts-expect-error
    const fromFactor = CATEGORIES[category].units[fromUnit]?.factor;
    // @ts-expect-error
    const toFactor = CATEGORIES[category].units[toUnit]?.factor;

    if (fromFactor && toFactor) {
      const res = (val * fromFactor) / toFactor;
      return Number.isInteger(res) ? res : parseFloat(res.toFixed(6));
    }

    return "";
  }, [value, fromUnit, toUnit, category]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCopy = () => {
    if (result !== "") {
      navigator.clipboard.writeText(String(result));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-card p-2 rounded-xl border border-border shadow-sm overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {(Object.keys(CATEGORIES) as CategoryKey[]).map((cat) => {
            const Icon = CATEGORIES[cat].icon;
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => changeCategory(cat)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all
                  ${isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'}
                `}
              >
                <Icon className="w-4 h-4" />
                {CATEGORIES[cat].label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-card p-6 md:p-10 rounded-2xl border border-border shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase">From</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value === "" ? "" : parseFloat(e.target.value))}
              placeholder="Enter value..."
              className="w-full text-3xl font-bold p-4 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground placeholder:text-muted-foreground/30"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-xl font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/20"
            >
              {Object.entries(CATEGORIES[category].units).map(([key, unit]: any) => (
                <option key={key} value={key}>{unit.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="p-4 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-110 transition-all mt-6 md:mt-0"
            title="Swap Units"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </button>

          <div className="w-full space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase">To</label>
            <div className="relative group">
              <input
                type="text"
                readOnly
                value={result}
                placeholder="Result"
                className="w-full text-3xl font-bold p-4 bg-muted/50 border border-border rounded-xl text-primary outline-none"
              />
              {result !== "" && (
                <button
                  onClick={handleCopy}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-primary bg-card rounded-lg shadow-sm border border-border"
                >
                  {isCopied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              )}
            </div>

            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-xl font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/20"
            >
              {Object.entries(CATEGORIES[category].units).map(([key, unit]: any) => (
                <option key={key} value={key}>{unit.label}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      <div className="bg-muted/30 rounded-xl p-6 border border-border">
        <h3 className="font-bold text-foreground mb-2">Did you know?</h3>
        <p className="text-muted-foreground text-sm">
          This converter uses high-precision standard formulas.
          {category === 'temperature'
            ? " For temperature, we use exact offsets (like -273.15 for Kelvin)."
            : " For other units, we convert everything to a base unit (like meters or kilograms) first, then to the target unit for maximum accuracy."}
        </p>
      </div>

    </div>
  );
}
