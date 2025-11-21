

test("Wallet API - Create Wallet", async () => {
    const user = {
        nickname: "john Doe",
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
    let responseUser: any = await fetch("http://localhost:3000/users", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    responseUser = await responseUser.json();
    let responseWallet: any = await fetch("http://localhost:3000/wallet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${responseUser.token}`
        },
        body: JSON.stringify({
            name: "Santander",
        })
    });
    responseWallet = await responseWallet.json();
    expect(responseWallet).toHaveProperty("menssage");
    expect(responseWallet.menssage).toBe("Wallet criada com sucesso.");

    let walletGet: any = await fetch("http://localhost:3000/wallet", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${responseUser.token}`
        }
    });
    walletGet = await walletGet.json();
    expect(walletGet).toHaveProperty("wallets");
    await fetch(`http://localhost:3000/investment/${walletGet.wallets[0].id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${responseUser.token}`
        },
        body: JSON.stringify({
            name: "VALE",
            category: "Stock",
            buy: true,
            quantity: 3.8,
            average: 9.80,
            created: "2023-10-10",
            currency: "USD"
        })
    });
    await fetch(`http://localhost:3000/investment/${walletGet.wallets[0].id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${responseUser.token}`
        },
        body: JSON.stringify({
            name: "VALE",
            category: "Stock",
            buy: true,
            quantity: 1.5,
            average: 10.5,
            created: "2023-10-10",
            currency: "USD"
        })
    });
    let investment = await fetch(`http://localhost:3000/investment/${walletGet.wallets[0].id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${responseUser.token}`
        },
    });
    const investmentData = await investment.json();
    console.log(investmentData);
});