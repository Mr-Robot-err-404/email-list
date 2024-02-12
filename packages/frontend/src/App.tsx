import './App.css'
import { Item, List } from './components/List'
import { CreateUser } from './components/Create'
import { useEffect, useState } from 'react'
import { get } from 'aws-amplify/api'
import { Loading } from './components/Loading'
import { Toaster } from 'react-hot-toast'
import { IoIosMail } from "react-icons/io";

function App() {
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Item[]>([])

  async function fetchUsers() {
    const restOperation = get({
      apiName: 'Api',
      path: '/emails',
    })

    const { body } = await restOperation.response
    return await body.json()
  }

  useEffect(() => {
    async function onLoad() {
      try {
        const res = await fetchUsers()
        setItems(res as any)

      } catch (error) {
        console.log("error occurred: ", error)
      }
      setLoading(false)
    }
    onLoad()
  }, [])

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex h-auto min-h-80 w-full flex-col space-y-2 rounded-lg bg-slate-800 sm:w-1/3 min-w-96 relative">
          <div className="flex space-x-2 w-full justify-center items-center py-3">
            <IoIosMail color='#e2e8f0' size={25}/>
            <h2 className="text-lg text-slate-200">Mailing List</h2>
          </div>
          {!loading && 
            <>
              <List items={items} setItems={setItems}/>
              <CreateUser toggle={toggle} setToggle={setToggle} setItems={setItems}/>
            </>
          }
          {loading && 
            <div className='flex h-16 w-full justify-center items-center'>
              <Loading width={50} height={50}/>
            </div>
          }
        </div>
      </div>
      <Toaster position='top-center'/>
    </>
  )
}

export default App
