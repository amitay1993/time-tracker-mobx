import React, {useEffect} from 'react';
import styled from "styled-components";
import {PlayArrow, Pause} from '@styled-icons/material'
import {observer} from "mobx-react-lite";
import store from "./TaskStore";


const Task = observer(({id, name, time}) => {

    let {updateTaskTime, updateTaskId, currentTaskID} = store;

    const handleClick = () => {
        updateTaskId(id);
    }
    useEffect(() => {
        let intervalId = null;
        if (currentTaskID !== id) {
            return;
        }
        intervalId = setInterval(() => {
            updateTaskTime();
        }, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [currentTaskID])


    const formatTime = (time) => {
        const date = new Date(0);
        console.log(time);
        date.setSeconds(time);
        time = date.toISOString();
        time = time.substr(14, 5);
        return time;
    }

    return (
        <TaskDiv>
            {name}
            <label>{formatTime(time)}</label>
            <StartTaskButton className="btn" onClick={handleClick}>
                {currentTaskID === id ? <Pause fontSize="20"/> :
                    <PlayArrow fontSize="20"/>}
            </StartTaskButton>
        </TaskDiv>
    );
});

const TaskDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: whitesmoke;
  border: dimgray solid 1px;
  font-size: 20px;
  border-radius: 3px;
  margin-bottom: 0.2rem;



`;

const StartTaskButton = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 0;
  color: white;
  margin: 1rem;
  padding: 0.5rem;
  background-image: linear-gradient(to bottom right, #5877dc, #00c4ff);


  :hover {
    background-image: linear-gradient(to bottom right, #5877dc, #a2f1ff);
  }
`;

export default Task;

