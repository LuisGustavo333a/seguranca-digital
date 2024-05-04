document
  .getElementById("recuperarForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const userData = {};
    formData.forEach(function (value, key) {
      userData[key] = value;
    });

    const userDataArray = userData; // Criando um array com um único objeto contendo os dados do usuário

    fetch("https://661a90e1125e9bb9f29c5d0c.mockapi.io/tcc-seguranca-digital/recuperacao", {
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


  function fetchUsers() {
    fetch("https://661a90e1125e9bb9f29c5d0c.mockapi.io/tcc-seguranca-digital/recuperacao")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById('recuperarTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ""; // Limpar tabela antes de adicionar novos usuários
        data.forEach(user => {
            let row = tableBody.insertRow();
            let idCell = row.insertCell(0);
            let userCell = row.insertCell(1);
            let telCell = row.insertCell(2);
            let deleteCell = row.insertCell(3);

            idCell.textContent = user.id;
            userCell.textContent = user.email;
            telCell.textContent = user.tel;
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = function() {
                deleteUser(user.id);
            };
            deleteCell.appendChild(deleteButton);
        });
    });
}

function deleteUser(userId) {
    fetch(`https://661a90e1125e9bb9f29c5d0c.mockapi.io/tcc-seguranca-digital/recuperacao/${userId}`, {
        method: "DELETE",
    })
    .then(response => {
        if(response.ok) {
            fetchUsers(); // Atualiza a lista após deletar
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Não foi possível excluir o usuário. Tente novamente.");
    });
}

// Iniciar a busca de usuários quando a página carregar
window.onload = fetchUsers;
