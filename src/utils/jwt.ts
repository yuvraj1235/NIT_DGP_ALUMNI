import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;

export const signToken = (payload: object, expiresIn: string = '7d'): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
};
// Verify token
export const verifyToken = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
            if (err) reject(err);
            else resolve(decoded);
        });
    });
};