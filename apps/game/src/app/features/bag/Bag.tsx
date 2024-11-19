import { useDispatch, useStore } from "react-redux"
import { useAppSelector } from "../../hooks"
import styles from "./bagStyle.module.css";
import { useRef } from 'react';
import { purchasePokeballs } from "./bagSlice";

export const Bag = () => {
    const { coins, pokeBalls, caught } = useAppSelector(store => store.bag);
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const caughtList = () => <dialog id='list' ref={modalRef}>
        <h3>Caught list</h3>
        <ul>
            {caught.map(p => <li key={`${p.id}-${caught.length}`}>{p.species.name}</li>)}
        </ul>
        <button onClick={() => modalRef.current?.close()}>Close</button>
    </dialog>

    return <div className={styles.bag}>
        <div className={styles.coins}>
            coins: {coins}
        </div>
        <div className={styles.balls}>
            balls: {pokeBalls}
            <button onClick={() => { dispatch(purchasePokeballs()) }}>Buy More</button>
        </div>
        <div className={styles.caught}>
            <button onClick={() => modalRef.current?.showModal()}>Caught: {caught.length}</button>
        </div>
        {caughtList()}
    </div>
}