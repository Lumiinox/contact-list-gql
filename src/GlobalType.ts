export interface ContactDataType {
   index?: number,
   createdAt: string,
   firstName: string,
   id: number,
   lastName: string,
   phones: Array<PhoneTypes>,
   isFavorite: boolean,
};

export interface PhoneTypes {
   number: string;
}