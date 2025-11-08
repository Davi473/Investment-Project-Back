

test("User API - Register User", async () => {
    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nickname: "johnDoe",
            email: `${Math.random()}@example.com`,
            password: "securePassword123"
        })
    });
    expect(response.status).toBe(201);
    const data: any = await response.json();
    expect(data).toHaveProperty("menssage");
    expect(data.menssage).toBe("Usuário criado com sucesso");
});

test("User API - Login User", async () => {
    const user = {
        nickname: "johnDoe",
        email: `${Math.random()}@example.com`,
        password: "securePassword123"
    }
    await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    const response = await fetch("http://localhost:3000/users", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    expect(response.status).toBe(201);
    const data: any = await response.json();
    expect(data).toHaveProperty("menssage");
    expect(data.menssage).toBe("Usuário autenticado com sucesso");
    expect(data).toHaveProperty("token");
    expect(typeof data.token).toBe("string");
});