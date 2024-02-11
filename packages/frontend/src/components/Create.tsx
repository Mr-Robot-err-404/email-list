import { useRef, useState } from "react"
import { IoAddOutline } from "react-icons/io5"
import { post } from "aws-amplify/api"
import { Item } from "./List"
import { Loading } from "./Loading"
import toast from "react-hot-toast"

interface Props {
    toggle: boolean
    setToggle: (bool: boolean) => void
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

export function CreateUser({ toggle, setToggle, setItems }: Props) {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const emailRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)

    function validate() {
        if(!email.length || !username.length) {
            return false
        }
        return true
    }

    async function createUser() {
        const restOperation = post({
            apiName: 'Api',
            path: '/emails',
            options: {
              body: {
                email: email, 
                
                username: username
              }
            }, 
          })
      
        const { body } = await restOperation.response
        return body.json() 
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        setLoading(true)

        try {
            const res = await createUser() 
            setItems((prev: Item[]) => [...prev, res as any])
            setToggle(false)

            if(emailRef.current && usernameRef.current) {
                emailRef.current.value = ""
                usernameRef.current.value = ""
            }
            toast.success("user created... check your inbox!")
        } 
        catch (error) {
            toast.error("something went wrong...")
        }
        setLoading(false)
    }

    return (
        <div className="pb-5">
            {!toggle && 
                <div className="flex h-16 w-full justify-center items-center">
                    <div onClick={() => setToggle(true)} className="flex justify-center items-center hover:bg-slate-500 rounded-full cursor-pointer w-10 h-10">
                        <IoAddOutline color="#e2e8f0" size={23}/>
                    </div>
                </div>
            } 
            {toggle && 
                <div className="flex h-auto w-full justify-between items-center bg-slate-700 relative">
                    <div className="flex flex-col space-y-2 py-2 px-5">
                        <input 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="bg-transparent border rounded w-full py-1 px-5 text-slate-200 focus:outline-none" 
                            id="username" 
                            type="text" 
                            ref={usernameRef}
                            placeholder="Username">
                        </input>

                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="bg-transparent border rounded w-full py-1 px-5 text-slate-200 focus:outline-none" 
                            id="email" 
                            type="text" 
                            ref={emailRef}
                            placeholder="Email">
                        </input>
                    </div>
                    <div className="px-5">
                        <button 
                        onClick={handleSubmit} 
                        disabled={!validate() || loading} 
                        className="py-1 px-2 text-slate-200 border-2 min-w-10 border-slate-400 rounded-md hover:border-slate-300">
                            {loading  
                                ? <Loading width={25} height={25}/>
                                : "Submit"
                            }
                        </button>
                    </div>
                </div>
            }
        </div>     
    )
}