-- Table Users

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
    nickname VARCHAR(50) CHECK (char_length(nickname) >= 3),
    password_hash TEXT NOT NULL,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    has_authenticator BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);