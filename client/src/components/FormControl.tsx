import React from 'react';
import styles from '../styles/FormControl/FormControl.module.css'

interface formProps {
    onNameChange: (e: string) => void;
    onAgeChange: (e: number) => void;
    onAddNewFriend: (e: React.FormEvent) => void
}

const FormControl = (props: formProps) => {
    return(
        <form className={styles.form} onSubmit={(e) => props.onAddNewFriend(e)}>
            <h2> Add New Friend </h2>
           <div className={styles.FormControl}>
                <label>Name</label>
                <input type="text" onChange={(e) => props.onNameChange(e.currentTarget.value)} />
           </div>
           <div className={styles.FormControl}>
                <label>Age</label>
                <input type="number" onChange={(e) => {
                    const age = e.currentTarget.value
                    const ageNumber = Number(age)
                    props.onAgeChange(ageNumber)
                }}/>
           </div>
           <button> Add </button>
        </form>
    )
}

export default FormControl