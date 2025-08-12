"use server";

import { cookies } from "next/headers";
import { z } from 'zod';

const API_URL = process.env.BASE_API_URL

type ActionResult = {
    success: boolean;
    message: string;
};

const authSchema = z.object({
    email: z.string().email({ message: "Format email tidak valid." }),
    password: z.string().min(1, { message: "Password tidak boleh kosong." }),
});

// Login
export async function login (data: unknown): Promise<ActionResult>{
    const result = authSchema.safeParse(data);

    if (!result.success) {
        return { success: false, message: result.error.issues[0].message };
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const responseData = await response.json()

        if(!response.ok) {
            return { success: false, message: responseData.detail || "Terjadi kesalahan" };
        }

        if(responseData.access_token) {
            (await cookies()).set("session_token", responseData.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24,
                path: "/"
            })
        }
        return { success: true, message: "Login berhasil" };
    } catch (error) {
        return { success: false, message: "Tidak dapat terhubung ke server"};
    }
}

// Register
export async function register (data: unknown): Promise<ActionResult>{
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const responseData = await response.json()

        if(!response.ok) {
            return { success: false, message: responseData.detail || "Terjadi kesalahan" };
        }

        return { success: true, message: "Registrasi berhasil" };
    } catch (error) {
        return { success: false, message: "Tidak dapat terhubung ke server"};
    }
}

