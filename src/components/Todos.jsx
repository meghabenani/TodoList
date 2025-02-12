import { useState,useEffect } from "react"
import {v4} from "uuid"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

let Todos=()=>{
    let [val,setVal]=useState("")
    let [showCompleted,setshowCompleted]=useState(true)
    let [todo,setTodo]=useState([])

    let localStorageFunc=()=>{
        localStorage.setItem("todos",JSON.stringify(todo))
    }

    useEffect(()=>{
        let x=JSON.parse(localStorage.getItem("todos"))
        setTodo(x)
    },[])

    let addFunc=()=>{
        val!=="" && setTodo([...todo,{id:v4(),todo:val,completed:false}])
        setVal("")
        localStorageFunc()
    }
    let updateFunc=(id)=>{
        let x=todo.filter((i)=>{
            setVal(i.todo)
            return i.id!==id
        })
        setTodo(x)
        localStorageFunc()
    }

    let delFunc=(id)=>{
        let x=todo.filter((i)=>{
            return i.id!==id
        })
        setTodo(x)
        localStorageFunc()
    }

    let toggleFunc=(id)=>{
        let x=todo.map((i)=>{
            if(i.id==id){
                return {...i,completed:!i.completed}
            }
            else{
                return i
            }
        })
        setTodo(x)
        localStorageFunc()
    }

    return(
        <>
            <div className="my-4 p-2 bg-slate-200 container min-h-[80vh] md:w-1/2 md:container m-auto p-auto">
                <h1 className="text-xl py-4 font-bold text-center">iTask - Manage Your Todos at one Place</h1>
                <h2 className="text-lg p-4 mt-2 font-bold">Add a todo</h2>
                <div className="input flex col-1">
                    <input value={val} onChange={(e)=>{
                        setVal(e.target.value)
                    }} type="text" className="bg-slate-100 rounded-2xl hover:border-1 border-black w-full m-2 p-2"/>
                    <button type="submit" onClick={()=>{
                        addFunc()
                    }} className="bg-violet-900 rounded-full px-4 py-1 m-2 text-white">Add</button>
                </div>
                <input className="m-4" type="checkbox" checked={showCompleted} onChange={(e)=>{
                        setshowCompleted(!showCompleted)
                    }} id="c1"/>
                <label htmlFor="c1">Show Completed</label>
                <div className="border-1 opacity-10 mx-4 my-2"></div>
                <h2 className="text-lg p-4 mt-2 font-bold">Yours Todos</h2>
                <div className="todo">
                    {todo.length==0 && <p className="m-5 text-xl">No todos to display</p>}
                    {todo.map((i)=>{
                        return (!i.completed || showCompleted) && (
                        <div key={i.id} className="flex justify-between m-5 ">
                            <div className="text flex">
                                <input type="checkbox" className="mx-2" checked={i.completed} onChange={()=>{toggleFunc(i.id)}}/>
                                <div className="text-lg text-wrap" style={i.completed?{textDecorationLine:"line-through"}:{textDecorationLine:"none"}}>{i.todo}</div>
                            </div>
                            <div className="btn flex h-full">
                                <button className="bg-violet-900 px-4 py-2 mx-1 rounded-full text-white" onClick={()=>{
                                    updateFunc(i.id)
                                }}><FaEdit /></button>
                                <button onClick={()=>{
                                    delFunc(i.id)
                                }} className="bg-violet-900 px-4 py-2 mx-1 rounded-full text-white"><MdDelete/></button>
                            </div>
                        </div>
                        )
                    })}
                </div>
               
            </div>
        </>
    )
}

export default Todos