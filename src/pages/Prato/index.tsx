import styles from "./Prato.module.scss"
import { useParams, useNavigate, Routes, Route } from "react-router-dom"
import cardapio from "data/cardapio.json"
import TagsPrato from "components/TagsPrato"
import NotFound from "pages/NotFound"
import PaginaPadrao from "components/PaginaPadrao"
import { useEffect, useState } from "react"

export default function Prato() {
    const { id } = useParams()
    const navigate = useNavigate()

    function contaRedirecionamento() {
        const [contador, setContador] = useState(5)

        useEffect(() => {
            while (contador!== 0) {
                const intervalo = setInterval(() => {
                    setContador(contador => contador - 1)
                }, 1000)
                return () => clearInterval(intervalo)
            }
        }, [])

        if(contador === 0) navigate("/cardapio")
        
        return <h1 className={styles.redirecionamento}>Você será redirecionado em {contador} segundos</h1>
    }

    const prato = cardapio.find(item => item.id === Number(id))

    if (!prato) {
        return (
            <>
                <NotFound />
                {contaRedirecionamento()}
            </>
        )
    }

    return (
        <Routes>
            <Route path="*" element={<PaginaPadrao />}>
                <Route index element={
                    <>
                        <button className={styles.voltar} onClick={() => navigate(-1)}>
                            {"< Voltar"}
                        </button>

                        <section className={styles.container}>
                            <h1 className={styles.titulo}>
                                {prato.title}
                            </h1>

                            <div className={styles.imagem}>
                                <img src={prato.photo} alt={prato.title} />
                            </div>

                            <div className={styles.conteudo}>
                                <p className={styles.conteudo__descricao}>
                                    {prato.description}
                                </p>

                                <TagsPrato {...prato} />
                            </div>
                        </section>
                    </>
                } />
            </Route>
        </Routes>
    )
}