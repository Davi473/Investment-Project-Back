
test("Wallet API - Create Wallet", async () => {
    const user = {
        nickname: "johnDoe",
        email: "davi@gmail.com", //`${Math.random()}@example.com`,
        password: "@Davi123" //"securePassword123"
    }
    // await fetch("http://localhost:3000/users", {
    //     method: "POST",
    //     headers: {
    //     "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(user)
    // });
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
            name: "BTG",
        })
    });
    responseWallet = await responseWallet.json();
    expect(responseWallet).toHaveProperty("menssage");
    expect(responseWallet.menssage).toBe("Wallet criada com sucesso.");

    // let walletGet: any = await fetch("http://localhost:3000/wallet", {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${responseUser.token}`
    //     }
    // });
    // const walletGetData = await walletGet.json();
    // console.log(walletGetData);
});

// test("User API - Login User", async () => {
//     const user = {
//         nickname: "johnDoe",
//         email: `${Math.random()}@example.com`,
//         password: "securePassword123"
//     }
//     await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: {
//         "Content-Type": "application/json"
//         },
//         body: JSON.stringify(user)
//     });
//     const response = await fetch("http://localhost:3000/users", {
//         method: "PUT",
//         headers: {
//         "Content-Type": "application/json"
//         },
//         body: JSON.stringify(user)
//     });
//     expect(response.status).toBe(201);
//     const data: any = await response.json();
//     expect(data).toHaveProperty("menssage");
//     expect(data.menssage).toBe("Usuário autenticado com sucesso");
//     expect(data).toHaveProperty("token");
//     expect(typeof data.token).toBe("string");
// });