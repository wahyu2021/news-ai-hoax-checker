// frontend/components/auth/AuthComponent.tsx

"use client";

import { FormEvent, useState, useEffect } from "react";
import { login, register } from "@/actions/auth";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { AlertCircleIcon, Loader2, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AuthComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTabs, setActiveTabs] = useState("login");
    const [indicatorX, setIndicatorX] = useState("translateX(0%)");
    const [successMessage, setSuccessMessage] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (activeTabs === "register") {
            setIndicatorX("translateX(calc(100% + 4px))");
        } else {
            setIndicatorX("translateX(0%)");
        }
    }, [activeTabs]);

    const validateEmail = (email: string) => {
        if (!email) return "Email tidak boleh kosong";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) return "Format email sepertinya salah";
        return "";
    };

    const onBlurEmail = () => setEmailError(validateEmail(email));

    const handleTabChange = (value: string) => {
        setActiveTabs(value);
        setEmailError("");
        setPasswordError("");
        setServerError("");
        setPassword("");
        setEmail("");
        setRepeatPassword("");
    };

    const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError("");
        setServerError("");

        const emailValidationResult = validateEmail(email);
        if (emailValidationResult) {
            setEmailError(emailValidationResult);
            return;
        }

        if (activeTabs === "register" && password !== repeatPassword) {
            setPasswordError("Password tidak cocok.");
            return;
        }

        setIsLoading(true);
        try {
            const formData = { email, password };
            const response =
                activeTabs === "login"
                    ? await login(formData)
                    : await register(formData);

            if (response.success) {
                setSuccessMessage(response.message);

                if (activeTabs === "login") {
                    setTimeout(() => {
                        router.push("/analyze");
                    }, 1500);
                } else {
                    setTimeout(() => {
                        handleTabChange("login");
                    }, 1500);
                }
            } else {
                setServerError(response.message || "Terjadi kesalahan.");
            }
        } catch (error) {
            console.error(error);
            setServerError("Tidak dapat terhubung ke server.");
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses =
        "bg-white/10 backdrop-blur-sm border-2 border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 text-white placeholder:text-slate-400 text-base h-12 hover:bg-white/15";

    return (
        <Card className="w-full max-w-lg shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300">
            <CardHeader className="items-center pt-8">
                <div className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4 mx-auto">
                    <Shield className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold text-lg">
                        Analisis Berita AI
                    </span>
                </div>

                <CardTitle className="text-center text-3xl font-bold text-white mb-2">
                    {activeTabs === "login"
                        ? "Selamat Datang"
                        : "Buat Akun Baru"}
                </CardTitle>
                <div className="relative w-full mx-auto rounded-full bg-black/20 p-1 overflow-hidden mt-2">
                    <motion.span
                        className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-md"
                        animate={{ x: activeTabs === "login" ? 0 : "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 20,
                        }}
                        aria-hidden="true"
                    />
                    <div className="flex w-full relative">
                        <button
                            type="button"
                            onClick={() => handleTabChange("login")}
                            className={`flex-1 z-10 rounded-full px-3 py-2 text-sm font-bold transition-colors ${
                                activeTabs === "login"
                                    ? "text-white"
                                    : "text-slate-300 hover:text-white"
                            }`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabChange("register")}
                            className={`flex-1 z-10 rounded-full px-3 py-2 text-sm font-bold transition-colors ${
                                activeTabs === "register"
                                    ? "text-white"
                                    : "text-slate-300 hover:text-white"
                            }`}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </CardHeader>
            <form onSubmit={handlerSubmit}>
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 relative w-full p-4 rounded-xl bg-green-500/10 border border-green-400/30 backdrop-blur-md shadow-lg flex items-center gap-3"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 border border-green-400/40">
                            ✅
                        </div>
                        <span className="text-green-100 font-medium">
                            {successMessage}
                        </span>
                        <button
                            onClick={() => setSuccessMessage("")}
                            className="absolute top-2 right-2 text-green-300 hover:text-green-100 transition-colors"
                            aria-label="Close alert"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}

                <CardContent className="pt-2">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="email"
                                className="text-slate-200 font-semibold"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="asep@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={onBlurEmail}
                                required
                                className={`${inputClasses} ${
                                    emailError
                                        ? "border-red-400/50 focus:ring-red-500/50"
                                        : ""
                                }`}
                            />
                            {emailError && (
                                <p className="text-sm text-red-300">
                                    {emailError}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label
                                htmlFor="password"
                                className="text-slate-200 font-semibold"
                            >
                                Password
                            </Label>
                            <PasswordInput
                                id="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`${inputClasses} ${
                                    passwordError
                                        ? "border-red-400/50 focus:ring-red-500/50"
                                        : ""
                                }`}
                            />
                        </div>
                        {activeTabs === "register" && (
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="ulangiPassword"
                                    className="text-slate-200 font-semibold"
                                >
                                    Ulangi Password
                                </Label>
                                <PasswordInput
                                    id="ulangiPassword"
                                    required
                                    placeholder="••••••••"
                                    value={repeatPassword}
                                    onChange={(e) =>
                                        setRepeatPassword(e.target.value)
                                    }
                                    className={`${inputClasses} ${
                                        passwordError
                                            ? "border-red-400/50 focus:ring-red-500/50"
                                            : ""
                                    }`}
                                />
                                {passwordError && (
                                    <p className="text-sm text-red-300">
                                        {passwordError}
                                    </p>
                                )}
                            </div>
                        )}
                        {activeTabs === "login" && (
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex gap-2 items-center">
                                    <Checkbox
                                        id="rememberMe"
                                        className="border-white/30"
                                    />
                                    <Label
                                        htmlFor="rememberMe"
                                        className="font-normal text-slate-300"
                                    >
                                        Remember Me
                                    </Label>
                                </div>
                                <a
                                    href="#"
                                    className="underline-offset-4 hover:underline text-slate-300"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        )}
                        {serverError && (
                            <Alert
                                variant="destructive"
                                className="border-red-400/50 bg-red-500/20 backdrop-blur-sm"
                            >
                                <AlertCircleIcon className="h-5 w-5 text-red-300" />
                                <AlertTitle className="text-base text-red-100">
                                    {serverError}
                                </AlertTitle>
                            </Alert>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 border-0 relative overflow-hidden group mt-6"
                        disabled={isLoading}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        {isLoading && (
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        )}
                        {isLoading
                            ? "Memproses..."
                            : activeTabs === "login"
                            ? "Masuk"
                            : "Daftar Akun"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
