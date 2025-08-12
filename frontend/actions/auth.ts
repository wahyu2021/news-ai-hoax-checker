"use server";

const API_URL = process.env.BASE_API_URL

// Login
export async function login (data: unknown){
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

        return { success: true, message: "Login berhasil" };
    } catch (error) {
        return { success: false, message: "Tidak dapat terhubung ke server"};
    }
}

// Register
export async function register (data: unknown){
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

