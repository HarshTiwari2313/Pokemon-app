import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";
export const Pokemon = ()=>{
    const[pokemon,setPokemon] = useState([]);
    const[loading,setLoading] = useState(true);
    const[search,setSearch] = useState("")
    const[error,setError] = useState(null);
    const API = "https://pokeapi.co/api/v2/pokemon/?limit=240";
     const  fetchingApi = async()=>{
          try {
            const rawData = await fetch(API);
            const data = await rawData.json();
            const detaildData = data.results.map(async (curPokemon)=>{
                // console.log(curPokemon.url)
                const data = await fetch(curPokemon.url)
                const res = await data.json()
                return res;
            })  
        //   console.log(detaildData) //promise

      // get All promise data jab tak sare na mil jaye tab tak wait kro
          
         const detailedResponse = await Promise.all(detaildData);
        //  console.log(detailedResponse)

        setPokemon(detailedResponse)
        setLoading(false)

          } catch (error) {
            console.log(error)
            setError(error)
            setLoading(false)
          }
                

     }

    useEffect(()=>{
          fetchingApi();

    },[])
if(loading){
    return(
        <div>
            <h1>Loading.....</h1>
        </div>
    )
}
//search fnctionality
const searchData = pokemon.filter((curPokemon)=>{
       return(
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
       )
       
});
if(error){
    return(
        <div><h1>Error:{error.message}</h1></div>
    )
}
    return(
        <section className="container">


            <header>
                <h1>Lets Catch Pokemon</h1>
            </header>
            <div className="pokemon-search">
                <input
                
                type="text"
                placeholder="search Pokemon"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                />

            </div>
            <div>
                <ul className="cards">
                    {searchData.map((curPokemon)=>{
                          
                          return(
                            <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
                          )

                    })}

                </ul>
            </div>
        </section>
    )
}