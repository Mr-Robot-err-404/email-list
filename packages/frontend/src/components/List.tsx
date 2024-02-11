import { Card } from "./Card"

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
                return <Card key={idx} email={item.email} username={item.username} id={item.userId} idx={idx} items={items} setItems={setItems}/>
            })}
        </>
    )
}