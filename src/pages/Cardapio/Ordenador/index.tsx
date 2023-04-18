import styles from "./Ordenador.module.scss"
import opcoes from "./opcoes.json"
import { useState } from "react"
import classNames from "classnames"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"
import { TipoOpcoes } from "./types/TipoOpcoes"

interface IOrdenador {
    ordenador: TipoOpcoes,
    setOrdenador: React.Dispatch<React.SetStateAction<TipoOpcoes>>
}

export default function Ordenador({ ordenador, setOrdenador }: IOrdenador) {
    const [aberto, setAberto] = useState(false)
    const opcoesTipadas: {nome: string, value: TipoOpcoes}[] = opcoes as {nome: string, value: TipoOpcoes}[]
    const nomeOrdenador = ordenador && opcoes.find(opcao => opcao.value === ordenador)?.nome


    return (
        <button
            className={classNames({
                [styles.ordenador]: true,
                [styles["ordenador--ativo"]]: ordenador !== ""
            })}
            onClick={() => setAberto(!aberto)}
            onBlur={() => setAberto(false)}
        >
            <span> {`Ordenar por: ${nomeOrdenador}`} </span>
            {aberto ?
                <MdKeyboardArrowUp size={20} /> :
                <MdKeyboardArrowDown size={20} />
            }
            <div className={classNames({
                [styles.ordenador__options]: true,
                [styles["ordenador__options--ativo"]]: aberto
            })}>
                {opcoesTipadas.map((opcao: {nome: string, value: TipoOpcoes}) => (
                    <div
                        className={styles.ordenador__option}
                        key={opcao.value}
                        onClick={() => setOrdenador(opcao.value)}
                    >
                        {opcao.nome}
                    </div>
                ))}
            </div>
        </button>
    )
}