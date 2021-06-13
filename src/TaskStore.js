import {computed, makeObservable, observable, action} from "mobx"

class TaskStore {

    tasks = []
    currentTaskID = null



    constructor() {
        makeObservable(this, {
            tasks: observable,
            currentTaskID: observable,
            totalTime: computed,
            //totalTimeFormatted: computed,
            addTask: action,
            updateTaskTime: action,
            updateTaskId: action,
        });
    }


    addTask (name) {
        console.log('addTask', this)
        this.tasks.push({
            name: name,
            time: 0
        });
    }

    // set currentTaskID(id){
    //     this.setCurrentTaskID=id;
    // }
    // get currentTaskID(){
    //     return this.currentTaskID;
    // }

    updateTaskId = (id) => {
        if(id===this.currentTaskID){
            this.currentTaskID=null;
        }else{
            this.currentTaskID=id;
        }

    }

    updateTaskTime = () => {
        const activeTaskIndex = this.currentTaskID;
        this.tasks[activeTaskIndex].time++;
    }

    get totalTime() {
        let totalTime = 0;
        this.tasks.forEach(task => {
            totalTime += task.time;
        })

        const date = new Date(0);
        date.setSeconds(totalTime);
        totalTime = date.toISOString();
        totalTime = totalTime.substr(14, 5);
        return totalTime;
    }


}

const store = new TaskStore();


export default store;
