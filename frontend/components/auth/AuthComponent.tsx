"use client";

import { FormEvent, useState } from "react";
import { login, register } from "@/actions/auth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { AlertCircleIcon } from "lucide-react";

export default function AuthComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTabs, setActiveTabs] = useState("login");

    const validateEmail = (email: string) => {
        if (!email) return "Email tidak boleh kosong";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) return "Format email sepertinya salah";
        return "";
    };

    const onBlurEmail = () => {
        setEmailError(validateEmail(email));
    };

    const handleTabChange = (value: string) => {
        setActiveTabs(value);
        setEmailError("");
        setPasswordError("");
        setServerError("");
    };

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            const response = activeTabs === "login" 
                ? await login(formData) 
                : await register(formData);

            if (response.success) {
                alert(response.message);
            } else {
                setServerError(response.message || "Terjadi kesalahan.");
            }
        } catch (error) {
            setServerError("Tidak dapat terhubung ke server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-sm shadow-sm">
            <CardHeader className="items-center">
                <CardTitle className="text-center text-3xl font-bold mb-4">
                    {activeTabs === "login" ? "Login" : "Register"}
                </CardTitle>
                <Tabs value={activeTabs} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <form onSubmit={handlerSubmit}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="asep@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={onBlurEmail} required className={ emailError ? "border-red-500 focus-visible:ring-red-500" : "" } />
                            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <PasswordInput id="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={passwordError ? "border-red-500" : ""} />
                        </div>

                        {/* Repeat password */}
                        {activeTabs === "register" && (
                            <div className="grid gap-2">
                                <Label htmlFor="ulangiPassword">Ulangi Password</Label>
                                <PasswordInput id="ulangiPassword" required placeholder="••••••••" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} className={passwordError ? "border-red-500" : ""} />
                                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                            </div>
                        )}
                        
                        {/* Opsi Login */}
                        {activeTabs === "login" && (
                             <div className="flex justify-between items-center text-sm">
                                <div className="flex gap-2 items-center">
                                    <Checkbox id="rememberMe" />
                                    <Label htmlFor="rememberMe" className="font-normal">Remember Me</Label>
                                </div>
                                <a href="#" className="underline-offset-4 hover:underline">Forgot your password?</a>
                            </div>
                        )}

                        {serverError && (
                            <Alert variant="destructive">
                                <AlertCircleIcon className="h-4 w-4" />
                                <AlertTitle>{serverError}</AlertTitle>
                            </Alert>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                        {isLoading ? "Memproses..." : (activeTabs === 'login' ? 'Masuk' : 'Daftar Akun')}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}