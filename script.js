document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("person-list")) {
        loadPersonList();
    }
    if (document.getElementById("person-details")) {
        loadPersonDetails();
    }
    if (document.getElementById("add-person-form")) {
        document.getElementById("add-person-form").addEventListener("submit", addPerson);
    }
});

function loadPersonList() {
    fetch("get-persons.php")
        .then(response => response.json())
        .then(data => {
            const personList = document.getElementById("person-list");
            personList.innerHTML = ""; // Clear the list before appending new items
            data.forEach(person => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="person-detail.html?id=${person.id}">${person.name}</a>`;
                personList.appendChild(li);
            });
        })
        .catch(error => console.error("Erreur lors du chargement de la liste des personnes:", error));
}

function loadPersonDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const personId = urlParams.get("id");

    fetch(`get-person.php?id=${personId}`)
        .then(response => response.json())
        .then(person => {
            const details = document.getElementById("person-details");
            if (person) {
                details.innerHTML = `
                    <h2>${person.name}</h2>
                    <p><strong>Age:</strong> ${person.age}</p>
                    <p><strong>Email:</strong> ${person.email}</p>
                    <p><strong>Biographie:</strong> ${person.biography}</p>
                `;
            } else {
                details.innerHTML = "<p>Personne non trouvée.</p>";
            }
        })
        .catch(error => console.error("Erreur lors du chargement des détails de la personne:", error));
}

function addPerson(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPerson = {
        name: formData.get("name"),
        age: formData.get("age"),
        email: formData.get("email"),
        biography: formData.get("biography")
    };

    fetch("save-person.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPerson)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            window.location.href = "index.html"; // Redirect to the index page to see the updated list
        } else {
            console.error("Erreur lors de l'ajout de la personne:", result.message);
        }
    })
    .catch(error => console.error("Erreur lors de l'ajout de la personne:", error));
}
