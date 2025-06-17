// lib/hash.ts
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}