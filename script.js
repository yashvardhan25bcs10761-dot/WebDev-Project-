const btnShowAdd = document.getElementById('btn-show-add');
const btnShowList = document.getElementById('btn-show-list');
const btnSave = document.getElementById('btn-save');
const btnDeleteAll = document.getElementById('btn-delete-all');

const addSection = document.getElementById('add-section');
const listSection = document.getElementById('list-section');

const inputAuthor = document.getElementById('input-author');
const inputQuote = document.getElementById('input-quote');
const listContainer = document.getElementById('my-list');

let allQuotes = JSON.parse(localStorage.getItem("quotes")) || [];


btnShowAdd.addEventListener('click', function() {
    addSection.style.display = "block";
    listSection.style.display = "none";
});

btnShowList.addEventListener('click', function() {
    addSection.style.display = "none";
    listSection.style.display = "block";
    renderList();
});

btnSave.addEventListener('click', saveQuote);


btnDeleteAll.addEventListener('click', deleteAll);


listContainer.addEventListener('click', function(event) {
    const target = event.target;
    
    const index = target.getAttribute('data-index');

    if (target.classList.contains('btn-copy')) {
        copyQuote(index);
    } 
    else if (target.classList.contains('btn-edit')) {
        editQuote(index);
    } 
    else if (target.classList.contains('btn-delete')) {
        deleteQuote(index);
    }
});



function saveQuote() {
    const authorText = inputAuthor.value;
    const quoteText = inputQuote.value;

    if(quoteText === "") {
        alert("Please write a quote!");
        return;
    }

    const newQuote = {
        author: authorText === "" ? "Unknown" : authorText,
        text: quoteText
    };

    allQuotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(allQuotes));

    inputAuthor.value = "";
    inputQuote.value = "";
    alert("Saved!");
}

function renderList() {
    listContainer.innerHTML = "";

    allQuotes.forEach((q, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="author-text">Author: ${q.author}</span>
            <span class="quote-text">"${q.text}"</span>
            <div class="btn-group">
                <button class="action-btn btn-copy" data-index="${index}">Copy</button>
                <button class="action-btn btn-edit" data-index="${index}">Edit</button>
                <button class="action-btn btn-delete" data-index="${index}">Delete</button>
            </div>
        `;

        listContainer.appendChild(li);
    });
}

function deleteQuote(index) {
    allQuotes.splice(index, 1);
    localStorage.setItem("quotes", JSON.stringify(allQuotes));
    renderList();
}

function editQuote(index) {
    const currentQuote = allQuotes[index];
    const newText = prompt("Edit your quote:", currentQuote.text);
    
    if(newText !== null) {
        allQuotes[index].text = newText;
        localStorage.setItem("quotes", JSON.stringify(allQuotes));
        renderList();
    }
}

function copyQuote(index) {
    const text = allQuotes[index].text;
    navigator.clipboard.writeText(text);
    alert("Copied!");
}

function deleteAll() {
    if (confirm("Delete everything?")) {
        allQuotes = [];
        localStorage.setItem("quotes", JSON.stringify(allQuotes));
        renderList();
    }
}
