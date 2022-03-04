import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

type Props = {
	pokemon: Pokemon
};

type Field = {
	value?: any,
	error?: string,
	isValid?: boolean
}

type Form = {
	name : Field,
	hp : Field,
	cp : Field,
	types : Field
}

const PokemonForm: FunctionComponent<Props> = ({pokemon}) => {


	const navigate = useNavigate()
	
	const [form, setForm] = useState<Form>({
		name: {value: pokemon.name, isValid: true},
		hp: {value: pokemon.hp, isValid: true},
		cp: {value: pokemon.cp, isValid: true},
		types: {value: pokemon.types, isValid: true},
	})
	
	const types: string[] = [
		'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
		'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
	];
	
	const hasType = (type : string) : boolean => {
		return form.types.value.includes(type)
	}
	
	const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>): void => {
		const fieldName: string = e.target.name;
		const fieldValue: string = e.target.value;
		const newField: Field = {[fieldName] : {value: fieldValue}}
		
		setForm({...form, ...newField})
	}

	const selectType = (type : string, e : React.ChangeEvent<HTMLInputElement>): void => {

		const checked = e.target.checked
		let newField: Field;
		
		if (checked) {
			// j'ajoute à la liste
			const newTypes: string[] = form.types.value.concat([type])
			newField = {value: newTypes}
		}
		else {
			// je retire à la liste
			const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type)
			newField = {value: newTypes}
		}

		setForm({...form, ...{types : newField}})
	}


	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isFormValid = validateForm()
		
		if (isFormValid){
			navigate(`/pokemons/${pokemon.id}`)
		}
		
	}

	const validateForm = () => {
    let newForm: Form = form;
    
	const numberOfLengthMinimumName = 3
	const numberOfLengthMaximumName = 25
    if(!/^[a-zA-Zàéè ]{numberOfLengthMinimumName, numberOfLengthMaximumName}$/.test(form.name.value)) {
      const errorMsg: string = `Le nom du pokémon est requis (${numberOfLengthMinimumName}-${numberOfLengthMaximumName}).`;
      const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: Field = { value: form.name.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ name: newField } };
    }

	const numberOfLengthMinimumHp = 0
	const numberOfLengthMaximumHp = 999
    // Validator hp
    if(!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string = `Les points de vie du pokémon sont compris entre ${numberOfLengthMinimumHp} et ${numberOfLengthMaximumHp}.`;
      const newField: Field = {value: form.hp.value, error: errorMsg, isValid: false};
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField: Field = { value: form.hp.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ hp: newField } };
    }

	const numberOfLengthMinimumCp = 0
	const numberOfLengthMaximumCp = 99
    // Validator cp
    if(!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg: string = `Les dégâts du pokémon sont compris entre ${numberOfLengthMinimumCp} et ${numberOfLengthMaximumCp}`;
      const newField: Field = {value: form.cp.value, error: errorMsg, isValid: false};
      newForm = { ...newForm, ...{ cp: newField } };
    } else {
      const newField: Field = { value: form.cp.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ cp: newField } };
    }

    setForm(newForm);
    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
  }

  const isTypesValid = (type: string): boolean => {

	if (form.types.value.length === 1 && hasType(type)){
		return false
	}

	if (form.types.value.length >= 3 && !hasType(type)){
		return false
	}
	console.log(form)
	return true
  }

	const checkValue = () => {
		console.log(form)
	}


	return (
		<form onSubmit={e => handleSubmit(e)}>
		<div className="row">
		<div className="col s12 m8 offset-m2">
		<div className="card hoverable"> 
		<div className="card-image">
		<img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
		</div>
		<div className="card-stacked">
		<div className="card-content">
		{/* Pokemon name */}
		<div className="form-group">
		<label htmlFor="name">Nom</label>
		<input id="name" type="text" name="name" className="form-control" value={form.name.value} onChange={(e) => handleInputChange(e)}></input>
		{form.name.error &&
		<div className='card-panel red accent-1'>
			{form.name.error}
		</div>
		}
		</div>
		{/* Pokemon hp */}
		<div className="form-group">
		<label htmlFor="hp">Point de vie</label>
		<input id="hp" type="number" name="hp" className="form-control" value={form.hp.value} onChange={(e) => handleInputChange(e)}></input>
		{form.hp.error &&
		<div className='card-panel red accent-1'>
			{form.hp.error}
		</div>
		}
		</div>
		{/* Pokemon cp */}
		<div className="form-group">
		<label htmlFor="cp">Dégâts</label>
		<input id="cp" type="number" name="cp" className="form-control" value={form.cp.value} onChange={(e) => handleInputChange(e)}></input>
		{form.cp.error &&
		<div className='card-panel red accent-1'>
			{form.cp.error}
		</div>
		}
		</div>
		<span className="btn orange" onClick={checkValue}>test button</span>
		{/* Pokemon types */}
		<div className="form-group">
		<label>Types</label>
		{types.map(type => (
			<div key={type} style={{marginBottom: '10px'}}>
			<label>
			<input id={type} type="checkbox" className="filled-in" disabled={!isTypesValid(type)} checked={hasType(type)} onChange={(e) => selectType(type, e)}></input>
			<span>
			<p className={formatType(type)}>{ type }</p>
			</span>
			</label>
			</div>
			))}
			</div>
			</div>
			<div className="card-action center">
			{/* Submit button */}
			<button type="submit" className="btn">Valider</button>
			<Link to={`/pokemons/${pokemon.id}`} className='left'>Retour</Link>
			</div>
			</div>
			</div>
			</div>
			</div>
			</form>
			);
		};
		
		export default PokemonForm;