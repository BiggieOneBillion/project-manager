import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "sNSp8JG7CNlsaRSy1YWuihFr/axqDOVwsTR7rm5v5QU4"


type PayloadType = {
  email: string;
  id: string;
};

export const generateToken = (payload: PayloadType, expiresIn = '1h') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
