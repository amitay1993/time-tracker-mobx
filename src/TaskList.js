import styled, {css} from "styled-components";
import './App.css';
import store from "./TaskStore";
import {observer} from "mobx-react-lite"
import Task from "./Task";
import {useState} from "react";


const TaskList = observer(() => {


        let {tasks, totalTime} = store;
        console.log({store})
        const [taskName, setTaskName] = useState("");


        const handleChange = (event) => {
            setTaskName(event.target.value);
        }
        const handleClick = () => {
            store.addTask(taskName);
            setTaskName("");
        }



        return (
            <div>
                <TitleDiv>
                    <h1>Time Tracker</h1>
                </TitleDiv>
                <TaskContainer>
                    <div className="container">
                        <InputDiv>
                            <input onChange={handleChange} placeholder="Add new task" value={taskName}/>
                        </InputDiv>
                    </div>
                    <TaskListDiv>
                        {tasks?.map((task, index) =>
                            <Task time={task.time} key={index} id={index} name={task.name}/>)}
                    </TaskListDiv>
                    <TotalTimeDiv>
                        Total:{totalTime}
                    </TotalTimeDiv>
                    <AddTaskBtn disabled={taskName.trim().length <= 0} isEnabled={taskName.trim().length > 0}
                                onClick={handleClick}>New Task</AddTaskBtn>
                </TaskContainer>
            </div>
        )
    }
)


const InputDiv = styled.div`
  display: flex;

  flex-direction: column;
  background-color: whitesmoke;
  margin: 1rem;


  input {
    padding: 0.4rem;
  }
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 500px;
  background-color: #ffffff;
  justify-content: space-between;
  align-items: center;

`;

const AddTaskBtn = styled.button`

  cursor: pointer;
  border: 0;
  color: white;
  height: 50px;
  margin: 1rem;
  padding: 0.5rem;
  width: 100px;
  border-radius: 10px;


  ${({isEnabled}) => !isEnabled && css`
    background-image: initial;
    cursor: initial;
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  `}

  ${({isEnabled}) => isEnabled && css`
    background-image: linear-gradient(to bottom right, #5877dc, #00c4ff);

    :hover {
      background-image: linear-gradient(to bottom right, #5877dc, #a2f1ff);
    }
  `}
`;

const TitleDiv = styled.div`
  background-color: black;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  background-image: linear-gradient(to bottom right, white, #00c4ff, #80fff9, white);
  border-radius: 2px;
  text-align: center;

  h1 {
    color: black;
  }

`;


const TotalTimeDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  padding: 1rem;
`;

const TaskListDiv = styled.div`
  width: 400px;
  height: 400px;
  overflow: auto;
`;


export default TaskList;
