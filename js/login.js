const username = document.getElementById("name");
const userpassword = document.getElementById("password");
const message = document.getElementById("message");

axios.defaults.baseURL = 'http://localhost:8080';

function setToken(token) {
    localStorage.setItem("Token", token);
}

function login(event) {
    event.preventDefault();
    
    const user = {
        name: username.value,
        password: userpassword.value,
    };
    
    axios.post("/auth", user).then((response) => {
        message.style.display = "block";
        message.style.backgroundColor = "#28ff5e65";
        message.innerHTML = response.data.message;
        setTimeout(() => (window.location.href = "./errands.html"), 750);
        setToken(response.data.token);
    })
        .catch((error) => {
            message.style.display = "block";
            message.style.backgroundColor = "#ff282865";
            message.innerHTML = error.response.data.message;
        });
}
