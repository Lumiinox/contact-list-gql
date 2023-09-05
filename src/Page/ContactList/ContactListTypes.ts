import { ContactDataType, PhoneTypes } from "../../GlobalType";

export interface ItemTypes{
   currentItems: Array<ContactDataType>,
}

export interface PaginatedItemProps{
   itemsPerPage: number,
}

export interface EditedDataType{
   firstName: string,
   lastName: string,
   phones: Array<PhoneTypes>,
   id: number,
}
