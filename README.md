# 📦 Projeto Backend - API de Controle Financeiro

The Investment Project centralizes all my portfolios into a single platform, making it easier to organize and track my assets, while also providing a great opportunity to learn and apply TypeScript in practice.

---
## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- JWT (Autenticação)

---
## 🔐 Autenticação

A API utiliza autenticação via **JWT**. Após login, inclua o token no header das requisições protegidas:

Authorization: Bearer <seu_token_aqui>

---

## 📌 Endpoints

### ✅ User

#### `POST /users`

Cadastra um novo usuário.  
**Body JSON:**
```json
{
  "nickname": "João",
  "email": "joao@email.com",
  "password": "123456"
}
```

#### PUT `/users`
Realiza o login e retorna um token JWT.
Body JSON:

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

 
### ✅ QrCode
####  GET /transacoes

---

### ✅ Wallet

#### `POST /wallet`
Criar nova wallet
**Body JSON:**
```json
{
  "name": "Santander",
  "currency": "USD"
}
```

#### `Get /wallet`
Buscar todas as wallets

Authorization: Bearer <seu_token_aqui>

Response
```json
{
  "id": "85erwer-wer588",
  "name": "Santander",
  "currency": "USD"
}
```

### ✅ Investment

#### `POST /investment/:idWallet`
Criar nova wallet
**Body JSON:**
```json
{
  "idWallet": "string",
  "name": "string",
  "category": "string",
  "buy": "boolean",
  "quantity": "number",
  "average": "number",
  "created": "string",
  "currency": "string",
}
```

#### `Get /investment/:idWallet`
Buscar todas as wallets

Authorization: Bearer <seu_token_aqui>

Response
```json
{
  "id": "string",
  "nickname": "string",
  "date": "string",
  "quantity": "number",
  "average": "number",
  "valueTotal": "number",
  "type":"buy / sell",
  "currency": "string",
  "category": "string"
}
```

---
## ⚙️ Instalação

```bash
# Instale as dependências
npm install
# build do electron
npm run build:electron
# Inicie o servidor
npm run dev
# Em outro terminal iniciar o electron
npm run electron
```