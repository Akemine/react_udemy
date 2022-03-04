import React, {FunctionComponent, useState} from 'react'
import Pokemon from '../models/pokemon'
import './pokemon-card.css'
import formatDate from '../helpers/format-date'
import formatType from '../helpers/format-type'
import { useNavigate } from 'react-router-dom'

type Props = {
    pokemon: Pokemon
    borderColor?: string
}

const PokemonCard: FunctionComponent<Props>= ({pokemon, borderColor}) => {

    const [color, setcolor] = useState<string>();
    const navigate = useNavigate()

    const showBorder = () => {
        setcolor(borderColor)
    }

    const hideBorder = () => {
        setcolor('#f5f5f5')
    }

    const goToPokemon = (id : number) => {
        navigate(`/pokemons/${id}`)
    }

    return (
        <div>
            <div onClick={() => goToPokemon(pokemon.id)} className='col s6 m4' onMouseEnter={showBorder} onMouseLeave={hideBorder} key={pokemon.id}>
                <div className='card horizontal' style={{ borderColor: color, borderRadius: 20}}>
                    <div className='card-image'>
                        <img src={pokemon.picture} alt={pokemon.name}/>
                    </div>
                    <div className='card-stacked'>
                        <div className='card-content'>
                            <p>{pokemon.name}</p>
                            <p><small>{formatDate(pokemon.created)}</small></p>
                            {pokemon.types.map(type => (
                                <span key={type} className={formatType(type)}>{type}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;