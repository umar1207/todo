function navbar1() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbarContainer').innerHTML = data;
        })
        .catch(error => console.error('Error fetching navbar:', error));
}

function controlViewTasks(){
    document.addEventListener("DOMContentLoaded", function(){
        const alltasksbtn = document.getElementById('all-tasks-btn');
        const duetodaybtn = document.getElementById('due-today-btn');
        const dueatbtn = document.getElementById('due-at-btn');

        alltasksbtn.addEventListener("click", function(event){
            alltasks.classList.remove("hidden");
            duetoday.classList.add("hidden");
            dueAt.classList.add("hidden");

            event.preventDefault();
            fetch('/s/viewAll') // Fetch data asynchronously
                .then(response => response.text()) // Convert response to text
                .then(html => {
                    document.getElementById('alltasksPlaceholder').innerHTML = html; // Update content
                })
                .catch(error => console.error('Error fetching data:', error));

        });
    
        duetodaybtn.addEventListener("click", function(event){
            alltasks.classList.add("hidden");
            duetoday.classList.remove("hidden");
            dueAt.classList.add("hidden");

            event.preventDefault();
            fetch('/s/viewToday') // Fetch data asynchronously
                .then(response => response.text()) // Convert response to text
                .then(html => {
                    document.getElementById('duetodayPlaceholder').innerHTML = html; // Update content
                })
                .catch(error => console.error('Error fetching data:', error));
        });
    
        dueatbtn.addEventListener("click", function(event){
            alltasks.classList.add("hidden");
            duetoday.classList.add("hidden");
            dueAt.classList.remove("hidden");

            event.preventDefault();
        });
        
        const getDueAtBtn = document.getElementById('getTasks');

        getDueAtBtn.addEventListener("click", function(event){
            event.preventDefault();
            let date = document.getElementById('dueDate').value;
            console.log(date);
            fetch(`/s/viewDueAt/${date}`) // Fetch data asynchronously
                .then(response => response.text()) // Convert response to text
                .then(html => {
                    document.getElementById('dueAtPlaceholder').innerHTML = html; // Update content
                })
                .catch(error => console.error('Error fetching data:', error));
        });
    });
}

function controlManageTasks(){
    document.addEventListener("DOMContentLoaded", function(){
        const addtaskbtn = document.getElementById('add-tasks-btn');
        const edittaskbtn = document.getElementById('edit-tasks-btn');
        const deletetaskbtn = document.getElementById('delete-tasks-btn');

        addtaskbtn.addEventListener("click", function(){
            addtasks.classList.remove("hidden");
            edittasks.classList.add("hidden");
            deletetasks.classList.add("hidden");
        });
    
        edittaskbtn.addEventListener("click", function(){
            addtasks.classList.add("hidden");
            edittasks.classList.remove("hidden");
            deletetasks.classList.add("hidden");
        });
    
        deletetaskbtn.addEventListener("click", function(){
            addtasks.classList.add("hidden");
            edittasks.classList.add("hidden");
            deletetasks.classList.remove("hidden");
        });
    });
}