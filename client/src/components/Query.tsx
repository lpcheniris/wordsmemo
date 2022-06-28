import styles from './Query.module.css'
import { getAudioUrl } from "../utils"
import { ReactComponent as AudioIcon } from '../assets/audio.svg';

export default function Query(props: any) {
    
    const data = props.data
    const phoneticAudio = new Audio(getAudioUrl(data.query))
    function handleClick() {
        phoneticAudio.play()
    }
    return (data.isWord === true ?
        <div className={styles.queryWrapper}>
            <div className={styles.query}>{data.query}</div>
            <div className={styles.sound}  onClick={handleClick}>
                <AudioIcon className='icon' /> 
            </div>
            <div>/{data.phonetic}/</div>
            {data.explains.map((v: string, i:number) => <div key={i}>{ v }</div>)}
        </div>
        :
        <div>It is not word</div>
    )
}

