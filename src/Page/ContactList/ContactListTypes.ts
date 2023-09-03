import { ContactDataType } from "../../GlobalType";

export interface ItemTypes{
   currentItems: Array<ContactDataType>,
}

export interface PaginatedItemProps{
   itemsPerPage: number,
}