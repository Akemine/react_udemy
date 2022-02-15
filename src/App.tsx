import React, { FunctionComponent} from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/page-not-found';
import PokemonsDetail from './pages/pokemon-detail';
import PokemonEdit from './pages/pokemon-edit';
import PokemonList from './pages/pokemon-list'
  
const App: FunctionComponent = () => {

 return (
 <Router>
   {/* Navbar soon */}
      <nav>
         <div className='nav-wrapper teal'>
            <Link to="/" className='brand-logo center'>Pokédex</Link>
         </div>
      </nav>
      {/* Le système de route */}

      <Routes>
         {/*  */}
         <Route path ="*" element={<PageNotFound/>}/>
         <Route path="/" element={<PokemonList />}/>
         <Route path="pokemons" element={<PokemonList/>}/>
         <Route path="/pokemons/:id" element={<PokemonsDetail/>}/>
         <Route path="/pokemons/edit/:id" element={<PokemonEdit/>}/>
      </Routes>
 </Router>
 )
}
  
export default App;