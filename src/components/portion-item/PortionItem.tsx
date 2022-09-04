import React, {useContext} from 'react';
import cn from "classnames";
import './Portion.css';
import {Portion, setCurrentPortionId, $editingPortionId} from "../../store/portions";
import {ScaleContext} from "../../context/ScaleContext";
import {useStore} from "effector-react";

function PortionItem(portion: Portion) {
    const scale = useContext(ScaleContext);
    const activeId = useStore($editingPortionId);
    const barClassName = cn({
        "Portion-bar": true,
        "Portion-active": activeId === portion.id,
    });
    const barWidth = scale * portion.amount;

    return (
        <div className="Portion mb-2" onClick={() => setCurrentPortionId(portion.id)}>
            <span className="Portion-time">{portion.datetime.time}</span>
            <div className={barClassName}
                 style={{width: barWidth}}
            />
            <span className="Portion-amount">{portion.amount}</span>
        </div>
    );
}

export default PortionItem;
