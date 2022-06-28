import { useEffect } from 'react';
import styles from './WordList.module.css';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
    selectAllWordList, allWordListAsync, deleteWordListAsync
} from '../redux/reducer/WordListSlice';
import { handleRememberStatusAsync } from '../redux/reducer/CheckRememberSlice';
import { ReactComponent as ForgetIcon }  from '../assets/forget.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg'
import { useToast } from '../components/Toast';

export default function WordList() {
    // const [word, setWord] = useState("")
    const { updateToast } = useToast()
    const allWordList = useAppSelector(selectAllWordList);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(allWordListAsync())
    }, [dispatch])
    function handleDelete(word: string) {
        dispatch(deleteWordListAsync(word)).then(() => {
            dispatch(allWordListAsync())
        }).then((ok) => {
            updateToast({type: "success", text: "successfully!", display: true})
        })
    }
    function handleForget(word: string) {
        dispatch(handleRememberStatusAsync({
            query: word,
            status: "no"
        })).then((ok) => {
            updateToast({type: "success", text: "successfully!", display: true})
        })
    }

    return (
        <div className={styles.WordListWrapper}>
            {allWordList.map((v: any, i: number) =>
                <div className={styles.wordItem} key={i}>
                    <h3>{v.query} </h3>
                    <div className={styles.explains}> {`:  ${v.explains.join(" ")}`}</div>
                   <DeleteIcon onClick={() => handleDelete(v.query)} />
                  <ForgetIcon  onClick={() => handleForget(v.query)}/>
                </div>)}
        </div>
    )
}