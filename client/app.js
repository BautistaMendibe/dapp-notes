App = {
    
    web3Provider: "",

    contracts: {},

    init: async () => {
        console.log("Loaded");
        await App.loadEthereum();
        await App.loadAccounts();
        await App.loadContracts();
        App.render();
        await App.renderTasks();
    },

    loadEthereum: async () => {
        if(window.ethereum){
            App.web3Provider = window.ethereum;
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else if(window.web3){
            web3 = new Web3(window.web3.currentProvider);         
        } 
        else {
            console.log("No Ethereum Brawser is istalled. Try install Metamask");
        }
    },

    loadAccounts: async () => {
        result = await window.ethereum.request({ method: 'eth_requestAccounts' });
        App.account = result[0];
    },

    loadContracts: async () => {
        const res = await fetch("TasksContract.json");
        const tasksContractJSON = await res.json();
        
        App.contracts.tasksContract = TruffleContract(tasksContractJSON);
        App.contracts.tasksContract.setProvider(App.web3Provider);
        App.tasksContract = await App.contracts.tasksContract.deployed();
    },

    createTask: async (title, description) => {
        const result = await App.tasksContract.createTask(title, description, {
            from: App.account
        });
        window.location.reload();
    },

    render: () => {
        document.getElementById("account").innerText = App.account;
    },

    renderTasks: async () => {
        const taskCounter = await App.tasksContract.taskCounter();
        const taskCounterNumber = taskCounter.toNumber();
        
        let html = "";

        for (let index = 1; index <= taskCounterNumber; index++) {
            const task = await App.tasksContract.tasks(index);
            const taskId = task[0];
            const taskTitle = task[1];
            const taskDescription = task[2];
            const taskDone = task[3];
            const taskCreated = task[4];

            let taskElement = `
                <div class="card bg-white rounder-0 mb-2">
                    <div class="card-header d-flex justify-content-between aling-items-center">
                        <span id="titleTask">${taskTitle}</span>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" ${taskDone && "checked"} onchange="App.toggleDone(${taskId})"/>
                        </div>
                    </div>
                    <div class="card-body d-flex justify-content-between aling-items-center mb-4">
                        <span>${taskDescription}</span>
                        <p class="text-muted">${new Date(taskCreated * 1000).toLocaleString()}</p>
                    </div>
                </div>
            `;

            html += taskElement;
        }
        document.getElementById("taskList").innerHTML = html;
    },

    toggleDone: async (taskId) => {
        await App.tasksContract.toggleDone(taskId, {
            from: App.account
        });
    }

}

