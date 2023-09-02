export interface ContactItemPropType {
   createdAt: string,
   firstName: string,
   id: number,
   lastName: string,
   phones: Array<PhoneTypes>,
};

export interface PhoneTypes {
   number: string;
}