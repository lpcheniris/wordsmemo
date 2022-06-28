import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getCheckRememnerListAsync, selectCheckRememberList, handleRememberStatusAsync } from "../redux/reducer/CheckRememberSlice"
import { isEmpty } from "../utils"
import styles from "./ChekRemember.module.css"

export default function CheckRemember() {
    const checkRememberList:any = useAppSelector(selectCheckRememberList)
    const dispatch =useAppDispatch()

    const [index, setIndex] = useState(0)
    const currentCheckRemember = checkRememberList[index]
    console.log(currentCheckRemember)
    useEffect(() => {
        dispatch(getCheckRememnerListAsync())
    }, [dispatch])

    const handleRemember =() => {
      dispatch(handleRememberStatusAsync({query: currentCheckRemember.query, status: 'yes'})) 
      setTimeout(() => {
        setIndex(index + 1)
    }, 500)

    }
    const handleDoNotRemember = () => {
      dispatch(handleRememberStatusAsync({query: currentCheckRemember.query, status: 'no'}))
      setTimeout(() => {
        setIndex(index + 1)
    }, 500)
    }
    return <div className={styles.wrapper}>{
        currentCheckRemember && !isEmpty(currentCheckRemember) ? 
        (index === currentCheckRemember.length ? 
        <div>No word</div> : 
        <div>
            <div className={styles.queryText}>{currentCheckRemember.query }</div>
            <section className={styles.buttonWrapper}>
                <button onClick={handleRemember}>记住</button>
            <button onClick={handleDoNotRemember}>没记住</button>
            </section>
            </div>
        ) 
        : <div className={styles.congratulations}> Congratulations, you have memorized all the words. </div>
        }</div>
}