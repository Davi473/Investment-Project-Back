
-- USER
CREATE TABLE users (
    id UUID PRIMARY KEY,
    nickname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    currency CHAR(3) NOT NULL
);

-- WALLET (investment / account)
CREATE TABLE wallet (
    id UUID PRIMARY KEY,
    id_user UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    currency CHAR(3) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    type CHAR(1) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id)
);

-- INVESTMENT
CREATE TABLE investment (
    id UUID PRIMARY KEY,                              
    id_wallet UUID NOT NULL,                          
    name VARCHAR(100) NOT NULL,                       
    category VARCHAR(50) NOT NULL,                      
    buy BOOLEAN NOT NULL,                          
    quantity NUMERIC(15, 8) NOT NULL,               
    average NUMERIC(15, 2) NOT NULL,            
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),      
    currency CHAR(3) NOT NULL,                         
    CONSTRAINT fk_wallet FOREIGN KEY (id_wallet) REFERENCES wallet(id)
);