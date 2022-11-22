import styles from "./Cardapio.module.scss"
import Buscador from "./Buscador"
import { useState } from "react"
import Filtros from "./Filtros"
import Ordenador from "./Ordenador"
import Itens from "./Itens"
import { TipoOpcoes } from "./Ordenador/types/TipoOpcoes"
import BotaoOrdenador from "./Ordenador/BotaoOrdenador"
import stylesTema from "styles/Tema.module.scss"

export default function Cardapio() {
    const [busca, setBusca] = useState("")
    const [filtro, setFiltro] = useState<number | null>(null)
    const [ordenador, setOrdenador] = useState<TipoOpcoes>("")
    const [ordem, setOrdem] = useState(true)

    return (
        <section className={styles.cardapio}>
            <h3 className={stylesTema.cardapio__titulo}>Cardápio</h3>
            <Buscador busca={busca} setBusca={setBusca} />
            <div className={styles.cardapio__filtros}>
                <Filtros filtro={filtro} setFiltro={setFiltro} />
                <Ordenador ordenador={ordenador} setOrdenador={setOrdenador} />
                <BotaoOrdenador ordem={ordem} setOrdem={setOrdem} />
            </div>
            <Itens busca={busca} filtro={filtro} ordenador={ordenador} ordem={ordem} />
        </section>
    )
}