const Btn = document.querySelector("#add");
let expenseArray = JSON.parse(localStorage.getItem('expenses')) || [];
let editIndex = null; 

Btn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const amount = document.querySelector("#amount").value;
    const category = document.querySelector("#category").value;
    const date = document.querySelector("#date").value;

    if (amount <= 0 || category === "" || name === "" || date === "") {
        alert("Please fill in all required fields correctly.");
        return;
    }

    const expense = {
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    if (editIndex !== null) {
        expenseArray[editIndex] = expense;
        editIndex = null;
    } else {
        expenseArray.push(expense);
    }

    localStorage.setItem('expenses', JSON.stringify(expenseArray));
    displayExpenses();
    document.querySelector("#expense-form").reset();
    updateTotalExpenses();
});

const displayExpenses = () => {
    const main = document.querySelector(".main");
    main.innerHTML = ""; 

    expenseArray.forEach((expense, index) => {
        let templateCard = document.querySelector("#template");
        let clone = templateCard.content.cloneNode(true);
        makeCard(clone, expense.name, expense.amount, expense.category, expense.date, index);
        main.appendChild(clone);
    });
    updateTotalExpenses(); 
};

const makeCard = (clone, name, amount, category, date, index) => {
    clone.querySelector(".add-groceries span").innerHTML = name;
    clone.querySelector(".add-date span").innerHTML = date;
    clone.querySelector(".add-category span").innerHTML = category;
    clone.querySelector(".add-amount span").innerHTML = `₹${amount}`;

   
    const editButton = clone.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
        document.querySelector("#name").value = name;
        document.querySelector("#amount").value = amount;
        document.querySelector("#category").value = category;
        document.querySelector("#date").value = date;

        editIndex = index;
    });

    const deleteButton = clone.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
        expenseArray.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenseArray));
        displayExpenses();
        updateTotalExpenses();
    });
};
document.querySelector("#reset-btn").addEventListener("click", () => {
    localStorage.removeItem('expenses'); 
    expenseArray = []; 
    displayExpenses(); 
    updateTotalExpenses();
});

const updateTotalExpenses = () => {
    const totalAmount = expenseArray.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    document.getElementById("total-amount").innerText = totalAmount.toFixed(2);
};

displayExpenses();
