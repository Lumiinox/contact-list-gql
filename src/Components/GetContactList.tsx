/* eslint-disable */
import React, { useEffect } from "react";
/* eslint-disable */
import { useQuery, gql } from '@apollo/client';
import {LOAD_CONTACTS} from '../GraphQL/Queries';

export function GetContactList(){
/* eslint-disable */
   const {error, loading, data} = useQuery(LOAD_CONTACTS);

   useEffect(() => {
      console.log(data);
   }, [data])

   return <div></div>
}