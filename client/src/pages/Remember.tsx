import { useEffect, useState } from "react"
import RememberItem from "../components/RememberItem"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { wordListAsync, selectRememberList, updateWordStatusAsync } from "../redux/reducer/WordSlice"
import { isEmpty } from "../utils"
import styles from './Remember.module.css'

export default function Remember() {
    
    const dispatch = useAppDispatch()
    const rememberList = useAppSelector(selectRememberList);
    const [index, setIndex] = useState(0)
    const currentRemember = rememberList[index]
    useEffect(() => {
        dispatch(wordListAsync())
    }, [dispatch])
    function handleSelectRight(status: object) {
        dispatch(updateWordStatusAsync(status))
        if (index < rememberList.length) {
            setIndex(index + 1)
        }
    }
    return <div>
        {currentRemember && !isEmpty(currentRemember) ?
            <RememberItem data={currentRemember} handleSelectRight={handleSelectRight} />
            : (index === rememberList.length &&
                <div className={styles.congratulations} >Congratulations, you have memorized all the words. </div>
            )
        }
    </div>
}
