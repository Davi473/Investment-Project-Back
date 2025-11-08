

test("Qr Code", async () => {
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
    const responseUser: any = await fetch("http://localhost:3000/users", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    const responseJson = await responseUser.json()
    const token = responseJson.token
    const response = await fetch("http://localhost:3000/qrcode/generate-totp-secret", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    expect(response.status).toBe(201);
    const data: any = await response.json();
    expect(data).toHaveProperty("qrCode");
    expect(typeof data.qrCode).toBe("string");
});