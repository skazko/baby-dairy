import React from 'react';
import './App.css';
import EditPortion from "./components/edit-portion/EditPortion";
import {useList, useStore} from "effector-react";
import {$portionsList, $todayAmount} from "./store/portions";
import PortionItem from "./components/portion-item/PortionItem";



function App() {
    const portions = useList(
        $portionsList,
        (portion) => (
            <PortionItem datetime={portion.datetime} amount={portion.amount} id={portion.id} />
        ));
    const todayAmount = useStore($todayAmount);
  return (
    <div className="App">
        <header>Today: {todayAmount}</header>
        <main>{portions}</main>
        <footer>
            <EditPortion />
        </footer>
    </div>
  );
}

export default App;
