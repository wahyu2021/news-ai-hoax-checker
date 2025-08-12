// File: frontend/components/analysis/AnalyzeComponent.tsx

"use client";

import { useState } from "react";
import { analyzeNews } from "@/actions/analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

type AnalysisResult = {
    summary: string;
    prediction: string;
    confidence_score: number;
    original_text: string;
};

export default function AnalyzeComponent() {
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text && !url) {
            setError("Silakan masukkan teks berita atau URL.");
            return;
        }

        setIsLoading(true);
        setError("");
        setResult(null);

        const response = await analyzeNews({ text, url });

        if (response.success && response.data) {
            setResult(response.data);
        } else {
            setError(response.message || "Terjadi kesalahan.");
        }

        setIsLoading(false);
    };

    return (
        <div className="space-y-8 w-full max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Analisis Berita Hoaks</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="text-input">Teks Berita</Label>
                            <Textarea id="text-input" placeholder="Ketik atau tempel teks berita di sini..." value={text} onChange={(e) => setText(e.target.value)} rows={8} />
                        </div>
                        <div className="text-center text-sm text-gray-500">atau</div>
                        <div className="grid gap-2">
                            <Label htmlFor="url-input">URL Artikel</Label>
                            <Input id="url-input" type="url" placeholder="https://contoh-berita.com/artikel" value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircleIcon className="h-4 w-4" />
                                <AlertTitle>{error}</AlertTitle>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Menganalisis..." : "Analisis Sekarang"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle>Hasil Analisis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Prediksi</Label>
                            <p className={`font-bold text-lg ${result.prediction === "Hoaks" ? "text-red-500" : "text-green-600"}`}>
                                {result.prediction} (Skor: {(result.confidence_score * 100).toFixed(2)}%)
                            </p>
                        </div>
                        <div>
                            <Label>Ringkasan</Label>
                            <p className="text-gray-700">{result.summary}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}   