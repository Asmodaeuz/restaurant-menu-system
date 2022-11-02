import { ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im"
import styles from "./BotaoOrdenador.module.scss"

interface Props {
    ordem: boolean,
    setOrdem: React.Dispatch<React.SetStateAction<boolean>>

}

export default function BotaoOrdenador(props: Props) {
    const { ordem, setOrdem } = props

    function alteraOrdem() {
        setOrdem(!ordem)
    }

    return (
        <div>
            <button
                className={styles["botao-ordenador"]}
                onClick={alteraOrdem}
            >
                {ordem ? "Crescente" : "Decrescente"}
                {ordem ?
                <ImSortAmountAsc size={20} /> :
                <ImSortAmountDesc size={20} />
            }
            </button>
        </div>
    )
}