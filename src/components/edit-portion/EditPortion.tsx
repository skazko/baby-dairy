import React from "react";
import {useStore} from "effector-react";
import {$editingPortion, setAmount, setTime, addPortion, setCurrentPortionId} from "../../store/portions";

function EditPortion() {
    const portion = useStore($editingPortion);

    return portion ? (<div style={{width: "100%"}}>
            <div>
                <input
                    type="number"
                    value={portion.amount}
                    onChange={(e) => setAmount({
                        id: portion.id,
                        amount: Number(e.target.value),
                    })}/>
            </div>
            <div>
                <input
                    type="datetime-local"
                    value={portion.datetime.localISOString}
                    onChange={(e) => setTime({
                        id: portion.id,
                        datetime: e.target.value,
                    })}/>
            </div>
            <div style={{width: "100%", textAlign: "right"}}>
                <button onClick={() => setCurrentPortionId('')}>Done</button>
            </div>
        </div>) :
        (<div style={{width: "100%", textAlign: "right"}}>
            <button onClick={() => addPortion()}>Add</button>
        </div>)
}

export default EditPortion;
