"use client";

import type React from "react";
import { useState } from "react";
import { analyzeNews } from "@/actions/analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
    AlertCircleIcon,
    Loader2,
    Shield,
    CheckCircle,
    XCircle,
    Sparkles,
    Zap,
    TrendingUp,
    Eye,
    LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";

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
    const router = useRouter();

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        if (newText) setUrl("");
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        if (newUrl) setText("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text && !url) {
            setError("Silakan masukkan teks berita atau URL.");
            return;
        }

        setIsLoading(true);
        setError("");
        setResult(null);

        const payload = url ? { url } : { text };
        const response = await analyzeNews(payload);

        if (response.success && response.data) {
            setResult(response.data);
        } else {
            setError(response.message || "Terjadi kesalahan.");
        }

        setIsLoading(false);
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const getConfidenceColor = (score: number) => {
        if (score >= 0.8) return "text-emerald-600";
        if (score >= 0.6) return "text-amber-600";
        return "text-red-600";
    };

    const getConfidenceBg = (score: number) => {
        if (score >= 0.8)
            return "bg-gradient-to-br from-emerald-50/80 to-green-50/80 border-emerald-200/50 backdrop-blur-sm";
        if (score >= 0.6)
            return "bg-gradient-to-br from-amber-50/80 to-yellow-50/80 border-amber-200/50 backdrop-blur-sm";
        return "bg-gradient-to-br from-red-50/80 to-rose-50/80 border-red-200/50 backdrop-blur-sm";
    };

    const getGradientRing = (score: number) => {
        if (score >= 0.8) return "from-emerald-400 to-green-500";
        if (score >= 0.6) return "from-amber-400 to-yellow-500";
        return "from-red-400 to-rose-500";
    };

    return (
        <div className="relative z-10 py-8 px-4">
            <div className="space-y-6 w-full max-w-4xl mx-auto">
                <div className="text-center space-y-4 mb-8 relative">
                    <div className="absolute top-0 right-0">
                        <Button
                            onClick={handleLogout}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white hover:text-white transition-all duration-300 rounded-2xl px-6 py-3 group"
                            variant="ghost"
                        >
                            <LogOut className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                            <span className="font-medium">Keluar</span>
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-75 animate-pulse" />
                            <div className="relative p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl">
                                <Shield className="h-10 w-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                            Analisis Berita AI
                        </h1>
                    </div>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
                        Teknologi AI terdepan untuk mendeteksi hoaks dan
                        menganalisis kredibilitas berita secara real-time
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm font-medium text-white">
                                Analisis Instan
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span className="text-sm font-medium text-white">
                                Akurasi Tinggi
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <Eye className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-medium text-white">
                                Analisis Mendalam
                            </span>
                        </div>
                    </div>
                </div>

                <Card className="shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            Masukkan Berita untuk Dianalisis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3 -mt-4">
                                <Label
                                    htmlFor="text-input"
                                    className="text-lg font-semibold text-slate-200"
                                >
                                    Teks Berita
                                </Label>
                                <Textarea
                                    id="text-input"
                                    placeholder="Ketik atau tempel teks berita yang ingin Anda analisis di sini..."
                                    value={text}
                                    onChange={handleTextChange}
                                    rows={8}
                                    className="resize-none bg-white/10 backdrop-blur-sm border-2 border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 text-white placeholder:text-slate-400 text-base leading-relaxed hover:bg-white/15"
                                />
                            </div>

                            <div className="flex items-center justify-center gap-4 py-3">
                                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1" />
                                <div className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm text-slate-200 rounded-full text-sm font-medium border border-white/20">
                                    atau
                                </div>
                                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1" />
                            </div>

                            <div className="space-y-3 -mt-4">
                                <Label
                                    htmlFor="url-input"
                                    className="text-lg font-semibold text-slate-200"
                                >
                                    URL Artikel
                                </Label>
                                <Input
                                    id="url-input"
                                    type="url"
                                    placeholder="https://contoh-berita.com/artikel"
                                    value={url}
                                    onChange={handleUrlChange}
                                    className="bg-white/10 backdrop-blur-sm border-2 border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 text-white placeholder:text-slate-400 text-base h-14 hover:bg-white/15"
                                />
                            </div>

                            {error && (
                                <Alert
                                    variant="destructive"
                                    className="border-red-400/50 bg-red-500/20 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300"
                                >
                                    <AlertCircleIcon className="h-5 w-5 text-red-300" />
                                    <AlertTitle className="text-base text-red-100">
                                        {error}
                                    </AlertTitle>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-16 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 border-0 relative overflow-hidden group"
                                disabled={isLoading}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                {isLoading && (
                                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                )}
                                {isLoading
                                    ? "Menganalisis Berita..."
                                    : "Analisis Sekarang"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {result && (
                    <Card className="shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 animate-in slide-in-from-bottom-8 hover:bg-white/15 transition-all duration-300">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-4 text-2xl font-bold text-white">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`p-3 rounded-2xl ${
                                            result.prediction === "Hoaks"
                                                ? "bg-red-500/20"
                                                : "bg-emerald-500/20"
                                        } backdrop-blur-sm`}
                                    >
                                        {result.prediction === "Hoaks" ? (
                                            <XCircle className="h-8 w-8 text-red-400" />
                                        ) : (
                                            <CheckCircle className="h-8 w-8 text-emerald-400" />
                                        )}
                                    </div>
                                    Hasil Analisis
                                </div>
                                <Badge
                                    variant={
                                        result.prediction === "Hoaks"
                                            ? "destructive"
                                            : "default"
                                    }
                                    className={`text-lg px-6 py-3 font-bold rounded-2xl border-2 ${
                                        result.prediction === "Hoaks"
                                            ? "bg-red-500/20 text-red-200 border-red-400/50 backdrop-blur-sm"
                                            : "bg-emerald-500/20 text-emerald-200 border-emerald-400/50 backdrop-blur-sm"
                                    }`}
                                >
                                    {result.prediction}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div
                                className={`p-6 rounded-3xl border-2 ${getConfidenceBg(
                                    result.confidence_score
                                )} relative overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                                <Label className="text-xl font-bold text-slate-700 mb-4 block relative z-10">
                                    Skor Kepercayaan
                                </Label>
                                <div className="flex items-center gap-8 relative z-10">
                                    <div className="relative">
                                        <div
                                            className={`w-24 h-24 rounded-full bg-gradient-to-r ${getGradientRing(
                                                result.confidence_score
                                            )} p-1`}
                                        >
                                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                                <div
                                                    className={`text-3xl font-black ${getConfidenceColor(
                                                        result.confidence_score
                                                    )}`}
                                                >
                                                    {(
                                                        result.confidence_score *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="w-full bg-slate-300/30 rounded-full h-4 overflow-hidden">
                                            <div
                                                className={`h-4 rounded-full transition-all duration-2000 ease-out ${
                                                    result.confidence_score >=
                                                    0.8
                                                        ? "bg-gradient-to-r from-emerald-400 to-green-500"
                                                        : result.confidence_score >=
                                                          0.6
                                                        ? "bg-gradient-to-r from-amber-400 to-yellow-500"
                                                        : "bg-gradient-to-r from-red-400 to-rose-500"
                                                } shadow-lg`}
                                                style={{
                                                    width: `${
                                                        result.confidence_score *
                                                        100
                                                    }%`,
                                                }}
                                            />
                                        </div>
                                        <p className="text-slate-600 font-medium">
                                            {result.confidence_score >= 0.8
                                                ? "Sangat Dapat Dipercaya"
                                                : result.confidence_score >= 0.6
                                                ? "Cukup Dapat Dipercaya"
                                                : "Perlu Verifikasi Lebih Lanjut"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm rounded-3xl border-2 border-slate-200/50 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                                <Label className="text-xl font-bold text-slate-800 mb-4 relative z-10 flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                                        <Sparkles className="h-5 w-5 text-white" />
                                    </div>
                                    Ringkasan Analisis
                                </Label>
                                <p className="text-slate-700 leading-relaxed text-lg font-medium relative z-10">
                                    {result.summary}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
