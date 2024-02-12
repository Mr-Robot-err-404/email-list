import { Card } from "./Card"
import { profiles } from '../../lib/profiles'

export interface Item {
    email: string
    username: string
    userId: string
    createdAt: number
}

interface Props {
    items: Item[], 
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

export function List({ items, setItems }: Props) {
    return (
        <>
            {items.map((item, idx) => {
                const imgIdx = idx % 4
                const img = profiles[imgIdx]
                return <Card key={idx} img={img} email={item.email} username={item.username} id={item.userId} idx={idx} items={items} setItems={setItems}/>
            })}
        </>
    )
}