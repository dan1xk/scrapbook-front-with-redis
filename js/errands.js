const errand = document.getElementById('errand');
const tableBody = document.getElementById('table');
const user = document.getElementById('user-area');
const token = localStorage.getItem('Token');
axios.defaults.baseURL = 'http://localhost:8080';

function logout() {
    localStorage.clear();
}

async function showMessages() {
    const tokenAcess = {
        headers: { Authorization: `Bearer ${token}` },
    };

    await axios.get('/user', tokenAcess).then((response) => {
        const data = response.data;
        showErrands(data.userID);
    });
}

function logout() {
    localStorage.clear('Token');
    window.location.href = '../login.html';
}

async function showErrands(id) {
    await axios
        .get(`/errand/${id}`)
        .then((response) => {
            tableBody.innerHTML = '';
            const errands = response.data;
            return errands.map((item) => {
                const position = errands.indexOf(item);
                tableBody.innerHTML += `
            <td class="td">${position + 1}</td>
            <td class="td">${item.errands}</td>
            <td class="td">
                <input type='submit' class='button' value='Editar' onclick="errandChange(${
                    item.id
                }, ${item.userID})">
                <input type='submit' class='button button-red' value='Excluir' onclick="errandDelete(${
                    item.id
                }, ${item.userID})">
            </td>`;
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

async function errandDelete(id, userID) {
    await axios.delete(`/errand/${id}/${userID}`);
    showMessages();
}

async function errandChange(id, userID) {
    const errand = prompt('Editar o Recado');

    const errandEdited = {
        errands: errand,
        userId: userID,
    };

    await axios.put(`/errand/${id}`, errandEdited);

    showMessages();
}

showMessages();
