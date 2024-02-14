import { Item } from '../src/components/List'

export function isItem(items: Item[], email: string): boolean {
    for(let i = 0; i < items.length; i++) {
        const curr = items[i]

        if(email === curr.email) {
            return true
        }
    }
    return false
}