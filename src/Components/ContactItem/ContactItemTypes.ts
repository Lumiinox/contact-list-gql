import { PhoneTypes } from "../../GlobalType";

export interface ContactItemPropsType{
   index?: number,
   createdAt: string,
   firstName: string,
   id: number,
   lastName: string,
   phones: Array<PhoneTypes>,
   isFavorite: boolean,
   favoriteButtonHandler: (selectedId: number, isFavorite: boolean) => void,
   trashButtonHandler: (selectedId: number) => void,
   editButtonHandler: (oldFirstName: string, oldLastName: string, oldPhones: Array<PhoneTypes>, id: number) => void,
}