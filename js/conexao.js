document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const userData = {};
    formData.forEach(function (value, key) {
      userData[key] = value;
    });

    const userDataArray = userData; // Criando um array com um único objeto contendo os dados do usuário

    fetch("https://661a90e1125e9bb9f29c5d0c.mockapi.io/tcc-seguranca-digital/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDataArray),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Usuário cadastrado com sucesso!");
        // Limpar o formulário após o cadastro
        document.getElementById("cadastroForm").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente."
        );
      });
  });
