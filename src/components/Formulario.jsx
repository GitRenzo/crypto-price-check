import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../Hooks/useSelectMonedas'

import Error from './Error'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%; 
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px; 
    margin-top: 30px;
    padding: 10px;
    transition: background-color .3s ease ;
    &:hover{
        background-color: #7d7dfe;
        cursor: pointer
    }

`
const Formulario = ({ setMonedas }) => {

    const monedas = [
        { id: 'USD', nombre: 'Dolar de estados unidos' },
        { id: 'MXN', nombre: 'Pesos mexicanos' },
        { id: 'EUR', nombre: 'Euros' },
        { id: 'GBP', nombre: 'Libra esterlina ' },
    ]


    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
    const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas('Elige tu criptomoneda', criptos)

    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto;
            })
            setCriptos(arrayCriptos)
        }
        console.log(criptos);
        consultarApi()
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(`${moneda} y cripto: ${criptoMoneda}`);
        if ([moneda, criptoMoneda].includes(undefined) || [moneda, criptoMoneda].includes('')) {
            console.log('error');
            setError(true)
            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptoMoneda,
        })
    }

    return (

        <>

            {error && <Error>Todos los campos son obligatorios</Error>}
            <form
                action=""
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCriptoMoneda />
                <InputSubmit
                    type="submit"
                    value="Cotizar"
                />
            </form>
        </>
    )
}

export default Formulario