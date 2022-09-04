import {createStore, createEvent, forward, combine, createApi} from "effector";
import {v4} from "uuid";
import {LocalDateTime} from "../utils/time";

function createNewPortion(): Portion {
    return {
        id: v4(),
        datetime: LocalDateTime.now(),
        amount: 125,
    }
}

const addPortionEvent = createEvent<Portion>();
export const setCurrentPortionId = createEvent<string>();
const idOfAddedPortion = addPortionEvent.map(({id}) => id);
export const addPortion = addPortionEvent.prepend(createNewPortion);

export type Portion = {
    datetime: LocalDateTime;
    amount: number;
    id: string;
}

type Portions = {
    [key: string]: Portion;
};

const $portions = createStore<Portions>({})
    .on(addPortionEvent, (portions, portion) => ({...portions, [portion.id]: portion}));
export const $editingPortionId = createStore('');

forward({
    from: idOfAddedPortion,
    to: $editingPortionId,
})

forward({
    from: setCurrentPortionId,
    to: $editingPortionId,
})

type SetTimeArgs = {
    id: string;
    datetime: string;
}


type SetAmountArgs = {
    id: string;
    amount: number;
}

export const $editingPortion = combine([$portions, $editingPortionId],
    ([portions, id]) => id !== '' ? portions[id] : null)

$editingPortion.watch((state => {
    console.log('editing portion: ', state)
}));
export const {setTime, setAmount} = createApi($portions, {
    setTime: (portions: Portions, args: SetTimeArgs) => ({
        ...portions,
        [args.id]: {
            ...portions[args.id],
            datetime: LocalDateTime.fromString(args.datetime),
        }
    }),
    setAmount: (portions: Portions, args: SetAmountArgs) => ({
        ...portions, [args.id]: {
            ...portions[args.id],
            amount: args.amount,
        },
    }),
});
export const $portionsList = $portions.map((portions) => Object.values(portions))
export const $todayAmount = $portionsList.map((portions) => portions.reduce(
    (amount, portion) => portion.datetime.isToday ? portion.amount + amount : amount,
    0,
));

