document.getElementById("userForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const userData = {
        surname: document.getElementById("surname").value,
        firstname: document.getElementById("firstname").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        address: {
            street: document.getElementById("street").value,
            city: document.getElementById("city").value,
            zipCode: document.getElementById("zipCode").value,
            countryCode: document.getElementById("countryCode").value
        },
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch("/api/v1/accounts/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Fehler: " + response.status);
        }

        const result = await response.json();
        document.getElementById("response").innerText = "User erfolgreich erstellt!";
        console.log(result);

    } catch (error) {
        document.getElementById("response").innerText = "Fehler beim Erstellen!";
        console.error(error);
    }
});