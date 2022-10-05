
import { useEffect, useState } from "react"

const MiApi = ()=> {

    
    const [allData, setAllData] = useState([])
    
    const [data, setData] = useState([])
    
    const [value, setValue] = useState("")
   
    const [order, setOrder] = useState("asc")

   
    useEffect(()=> {
        getData()
    }, 
    
    [])

    
    useEffect(()=>{
        filterData()
    }, [value])

    
    useEffect(()=>{
        const sorted = sortData(data)
        setData(sorted)
    }, [order])

    
    const getData = ()=>{
        const url = 'https://api.openbrewerydb.org/breweries?by_state=new_york&per_page=20'
        fetch(url)
            
            .then((res)=> res.json())
            
            .then((json)=> {
                 
                const sorted = sortData(json)

                setAllData(sorted)
                setData(sorted)
            })
            
            .catch((e)=> console.log(e))
    }

    
    const filterData = ()=> {
        
        const search = value.toLowerCase()
        
        const filtered = allData.filter((user)=>{
            const name = user.name.toLowerCase()
            const city = user.city.toLowerCase()

            
            return name.includes(search) || city.includes(search)
        })

        const sorted = sortData(filtered)
        
        setData(filtered)
    }

    
    const sortData = (data)=>{
        const sortedData = [...data]
        
        if(order === 'asc'){
            
            sortedData.sort((a, b)=> a.name.localeCompare(b.name))

        } else {
            sortedData.sort((a, b)=> b.name.localeCompare(a.name))
        }

        
        return sortedData
    }

    return (
        <main>
            <div className="inputs">
                <input type="text" placeholder="Buscar info de cervezerias" onChange={(e)=> setValue(e.target.value)}/>
                <select onChange={(e)=> setOrder(e.target.value)}>
                    <option value="asc">Orden Ascendente</option>
                    <option value="desc">Orden Descendente</option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Ciudad</th>
                        <th>Pagina web</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((user)=> {
                        return(
                            
                            <tr key={ user.id }>
                                <td>{ user.name}</td>
                                <td>{ user.city}</td>
                                <td>{ user.website_url}</td>
                
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </main>
    )
}

export default MiApi