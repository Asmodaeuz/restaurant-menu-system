import cardapio from "data/cardapio.json"
import Item from "./Item"
import styles from "./Itens.module.scss"
import { useEffect, useState } from "react"
import { Cardapio } from "types/Prato"

interface Props {
    busca: string,
    filtro: number | null,
    ordenador: string,
    ordem: boolean
}

export default function Itens(props: Props) {
    const [lista, setLista] = useState(cardapio)
    const { busca, filtro, ordenador, ordem } = props

    function testaBusca(title: string) {
        const regex = new RegExp(busca, "i")
        return regex.test(title)
    }

    function testaFiltro(id: number) {
        if(filtro !== null) return filtro === id
        return true
    }

    function ordenar(novaLista: Cardapio) {
        const ordenaPropriedadeCrescente = (
            lista: Cardapio,
            propriedade: "size" | "serving" | "price"
        ) => {
            if(ordem) return lista.sort((a, b) => a[propriedade] > b[propriedade] ? 1 : -1)
            return lista.sort((a, b) => a[propriedade] < b[propriedade] ? 1 : -1)
        }

        switch(ordenador) {
        case "porcao":
            return ordenaPropriedadeCrescente(novaLista, "size")
        case "qtd_pessoas":
            return ordenaPropriedadeCrescente(novaLista, "serving")
        case "preco":
            return ordenaPropriedadeCrescente(novaLista, "price")
        default: 
            return novaLista
        }
    }

    useEffect(() => {
        const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id))
        setLista(ordenar(novaLista))
    }, [busca, filtro, ordenador, ordem])

    return (
        <div className={styles.itens}>
            {lista.map(item => (
                <Item
                    key={item.id}
                    {...item}
                />
            ))}
        </div>
    )
}