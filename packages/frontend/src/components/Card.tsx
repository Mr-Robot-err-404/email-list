import { MdModeEdit } from "react-icons/md"
import { FaRegTrashAlt } from "react-icons/fa"
import { RxCross1 } from "react-icons/rx"
import { TiTick } from "react-icons/ti"
import { useState } from "react"
import { del } from "aws-amplify/api"
import { Loading } from "./Loading"
import toast from "react-hot-toast"
import { Item } from "./List"

interface Props {
    idx: number
    username: string
    email: string
    id: string
    items: Item[]
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

export function Card({ idx, username, email, id, items, setItems, }: Props) {
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)

    async function deleteUser() {
        const restOperation = del({
            apiName: 'Api',
            path: `/emails/${id}`,
          })
      
        return await restOperation.response
    }

    async function handleConfirm() {
        if(loading) {
            return 
        }
        setLoading(true)
        setToggle(false)

        try {
            await deleteUser()
            
            const arr = items.filter((_, i) => i !== idx)
            setItems(arr)
            
            toast.success("user removed")
        } 
        catch (error) {
            toast.error("something went wrong...")
        }
        setLoading(false)
    }

    return (
        <div className="flex h-16 w-full justify-between items-center bg-slate-700 px-5 cursor-default">
            <div className="h-12 w-12 rounded-full bg-slate-500">
                <img className="rounded-full" src="/WALL-E.jpg"></img>
            </div>
            <div className="flex flex-col items-center justify-center ml-5">
                <h2 className="text-slate-200 text-md">{username}</h2>
                <h2 className="text-xs text-slate-300">{email}</h2>
            </div>
            <div className="flex space-x-1 items-center">
                {!toggle && !loading &&
                    <>
                        <div className="flex justify-center items-center hover:bg-slate-500 rounded-full cursor-pointer w-10 h-10">
                            <MdModeEdit color="#e2e8f0"/>
                        </div>
                        <div onClick={() => setToggle(true)} className="flex justify-center items-center hover:bg-slate-500 rounded-full cursor-pointer w-10 h-10">
                            <FaRegTrashAlt color="#e2e8f0"/>
                        </div>
                    </>
                }
                {toggle && !loading && 
                    <>
                        <div onClick={() => setToggle(false)} className="flex justify-center items-center hover:bg-slate-500 rounded-full cursor-pointer w-10 h-10">
                            <RxCross1 color="#dc2626"/>
                        </div>
                        <div onClick={handleConfirm} className="flex justify-center items-center hover:bg-slate-500 rounded-full cursor-pointer w-10 h-10">
                            <TiTick color="#22c55e" size={25}/>
                        </div>
                    </>
                }
                {loading && 
                    <Loading width={30} height={30}/>
                }
            </div>
        </div>
    )
} 