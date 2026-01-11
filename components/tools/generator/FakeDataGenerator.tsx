"use client";

import { useState, useEffect } from "react";
import {
    Plus, Trash2, RefreshCw, Copy, Check,
    Download, Database, FileJson, FileSpreadsheet,
    Settings2, ChevronDown, Braces
} from "lucide-react";
import { DATA_TYPES } from "@/constants/faker-types";

interface SchemaField {
    id: string;
    name: string;
    type: string;
}

type Format = "json" | "csv" | "sql";

export default function FakeDataGenerator() {
    const [fields, setFields] = useState<SchemaField[]>([
        { id: "1", name: "id", type: "auto_increment" },
        { id: "2", name: "user_name", type: "fullName" },
        { id: "3", name: "role", type: "arr_tags" },
        { id: "4", name: "status", type: "boolean" },
    ]);

    // DEFAULT 10 TA
    const [count, setCount] = useState(10);

    const [format, setFormat] = useState<Format>("json");
    const [tableName, setTableName] = useState("users");
    const [rootKey, setRootKey] = useState("");

    const [output, setOutput] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // --- ACTIONS ---
    const addField = () => {
        setFields([
            ...fields,
            { id: Date.now().toString(), name: `field_${fields.length + 1}`, type: "fullName" }
        ]);
    };

    const removeField = (id: string) => {
        setFields(fields.filter(f => f.id !== id));
    };

    const updateField = (id: string, key: keyof SchemaField, value: string) => {
        setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
    };

    // --- GENERATION ---
    const generateData = () => {
        // Agar count 0 yoki noto'g'ri bo'lsa generatsiya qilmasin
        if (count < 1) return;

        setIsGenerating(true);
        setTimeout(() => {
            const rawData = Array.from({ length: count }).map((_, index) => {
                const row: any = {};
                fields.forEach(field => {
                    const typeDef = DATA_TYPES.find(t => t.value === field.type);
                    if (typeDef) {
                        row[field.name] = typeDef.fn(index);
                    }
                });
                return row;
            });

            if (format === "json") {
                const result = rootKey.trim() ? { [rootKey]: rawData } : rawData;
                setOutput(JSON.stringify(result, null, 2));
            }
            else if (format === "csv") {
                if (rawData.length === 0) return setOutput("");
                const headers = fields.map(f => f.name).join(",");
                const rows = rawData.map(row =>
                    fields.map(f => {
                        const val = row[f.name];
                        return typeof val === 'object' ? `"${JSON.stringify(val).replace(/"/g, '""')}"` : JSON.stringify(val);
                    }).join(",")
                ).join("\n");
                setOutput(`${headers}\n${rows}`);
            }
            else if (format === "sql") {
                if (rawData.length === 0) return setOutput("");
                const keys = fields.map(f => f.name).join(", ");
                const values = rawData.map(row => {
                    const valStr = fields.map(f => {
                        const v = row[f.name];
                        if (typeof v === 'object') return `'${JSON.stringify(v)}'`;
                        return typeof v === 'number' ? v : `'${String(v).replace(/'/g, "''")}'`;
                    }).join(", ");
                    return `INSERT INTO ${tableName} (${keys}) VALUES (${valStr});`;
                }).join("\n");
                setOutput(values);
            }
            setIsGenerating(false);
        }, 100);
    };

    useEffect(() => {
        const timer = setTimeout(generateData, 600);
        return () => clearTimeout(timer);
    }, [fields, count, format, tableName, rootKey]);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `mock_data.${format}`;
        a.click();
    };

    // Input o'zgarganda ishlaydigan funksiya
    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = 0; // Vaqtincha 0 qilib turamiz (o'chirganda)
        if (val > 10000) val = 10000; // Max check
        setCount(val);
    };

    // Inputdan chiqib ketganda (Blur) Min check qilish
    const handleCountBlur = () => {
        if (count < 1) setCount(1);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">

            {/* --- LEFT PANEL --- */}
            <div className="w-full lg:w-[400px] flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden flex-shrink-0">

                <div className="p-4 border-b border-border bg-muted/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-foreground">
                        <Settings2 className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-sm">Schema</h3>
                    </div>
                    <button onClick={generateData} className="text-xs text-primary hover:underline">
                        Refresh
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">Format</label>
                            <div className="grid grid-cols-3 gap-1 bg-muted p-1 rounded-lg">
                                {(['json', 'csv', 'sql'] as const).map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFormat(f)}
                                        className={`flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-bold transition-all ${format === f
                                            ? 'bg-card text-primary shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                                            }`}
                                    >
                                        {f === 'json' && <FileJson className="w-3.5 h-3.5" />}
                                        {f === 'csv' && <FileSpreadsheet className="w-3.5 h-3.5" />}
                                        {f === 'sql' && <Database className="w-3.5 h-3.5" />}
                                        {f.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- ROWS COUNT INPUT (YANGILANGAN) --- */}
                        <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 flex justify-between">
                                <span>Rows Count</span>
                                <span className="text-[10px] text-muted-foreground/70 font-normal">Max: 10,000</span>
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={10000}
                                value={count === 0 ? '' : count} // 0 bo'lsa bo'sh ko'rsatamiz
                                onChange={handleCountChange}
                                onBlur={handleCountBlur}
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted/50 focus:bg-card transition-all placeholder:text-muted-foreground/50 text-foreground"
                                placeholder="10"
                            />
                        </div>

                        {format === 'json' && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 flex items-center gap-2">
                                    <Braces className="w-3 h-3" /> Root Wrapper Key <span className="text-muted-foreground/70 font-normal lowercase">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={rootKey}
                                    onChange={(e) => setRootKey(e.target.value)}
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted/50 focus:bg-card transition-all placeholder:text-muted-foreground/50 text-foreground"
                                    placeholder="e.g. data, users, results"
                                />
                            </div>
                        )}

                        {format === 'sql' && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase mb-1.5 block">SQL Table</label>
                                <input
                                    type="text"
                                    value={tableName}
                                    onChange={(e) => setTableName(e.target.value)}
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted/50 focus:bg-card transition-all text-foreground"
                                    placeholder="table_name"
                                />
                            </div>
                        )}
                    </div>

                    <div className="h-px bg-border" />

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase block">Fields</label>
                        {fields.map((field, idx) => (
                            <div key={field.id} className="flex gap-2 items-start group">
                                <div className="flex items-center gap-1">
                                    <input
                                        type="text"
                                        value={field.name}
                                        onChange={(e) => updateField(field.id, "name", e.target.value)}
                                        className="w-full px-2 py-1.5 text-sm border border-border rounded bg-card focus:border-primary focus:outline-none font-medium text-foreground"
                                        placeholder="key"
                                    />
                                    <div className="relative">
                                        <select
                                            value={field.type}
                                            onChange={(e) => updateField(field.id, "type", e.target.value)}
                                            className="w-full px-2 py-1.5 text-xs text-muted-foreground border border-border rounded bg-muted/50 focus:bg-card focus:border-primary focus:outline-none appearance-none cursor-pointer"
                                        >
                                            {DATA_TYPES.map(t => (
                                                <option key={t.value} value={t.value}>{t.group}: {t.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeField(field.id)}
                                    className="mt-1 p-1.5 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-border bg-card">
                    <button
                        onClick={addField}
                        className="w-full py-2.5 border border-dashed border-border text-muted-foreground rounded-lg hover:border-primary hover:text-primary hover:bg-muted transition-all flex items-center justify-center gap-2 font-semibold text-sm"
                    >
                        <Plus className="w-4 h-4" /> Add Field
                    </button>
                </div>
            </div>

            {/* --- RIGHT PANEL --- */}
            <div className="flex-1 flex flex-col min-w-0 bg-card border border-border rounded-xl shadow-sm overflow-hidden">

                <div className="p-3 border-b border-border flex items-center justify-between bg-muted/30">
                    <div className="flex items-center gap-3 px-2">
                        <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`} />
                        <span className="text-sm font-semibold text-foreground">Preview</span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:border-primary/50 hover:bg-muted transition-all shadow-sm active:scale-95"
                        >
                            {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                            {isCopied ? "Copied" : "Copy"}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-sm active:scale-95"
                        >
                            <Download className="w-4 h-4" /> Export
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-slate-950 relative group overflow-hidden">
                    <textarea
                        value={output}
                        readOnly
                        className="w-full h-full bg-transparent p-6 font-mono text-sm text-slate-100 resize-none focus:outline-none leading-relaxed custom-scrollbar"
                        spellCheck={false}
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-white/30 font-mono pointer-events-none">
                        {(new Blob([output]).size / 1024).toFixed(2)} KB
                    </div>
                </div>
            </div>

        </div>
    );
}