import React, { useEffect } from "react";
import { useQuery, gql } from '@apollo/client';
import {LOAD_CONTACTS} from '../GraphQL/Queries';

export function GetContactList(){

   const {error, loading, data} = useQuery(LOAD_CONTACTS);

   useEffect(() => {
      console.log(data);
   }, [data])

   return <div></div>
}