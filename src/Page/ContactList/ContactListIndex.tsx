/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from "react";
import {contactListBackground, contentContainer, headerContainer, mainBodyContainer, mainTitle} from "./ContactListStyle";
import { useState, useEffect  } from 'react';
import { ContactListItem } from '../../Components/ContactItem/ContactItem';
import { dummyData } from '../../ContactListDUMMY';

export function ContactListPage(){   
   const [width, setWidth] = useState(0);
   const [isAPhone, setIsAPhone] = useState(false);
   const [contactData, setContactData] = useState(dummyData.data.contact);

   useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth)
         if (window.innerWidth < 550){
            setIsAPhone(true);
         } else {
            setIsAPhone(false);
         }
      }
      window.addEventListener("resize", handleResize)
      handleResize()
      if (window.innerWidth < 550){
         setIsAPhone(true);
      } 
      return () => { 
        window.removeEventListener("resize", handleResize)
      }
    }, [setWidth, width])
  
   return (
      <div css={contactListBackground}>      
         <div css={mainBodyContainer}>
            <div css={headerContainer}>
               <div css={mainTitle}>Contact List</div>
            </div>
            <div css={contentContainer}>
               {contactData.map(val => 
                  <ContactListItem 
                     id={val.id} 
                     firstName={val.first_name} 
                     lastName={val.last_name} 
                     createdAt={val.created_at} 
                     phones={val.phones}
                  ></ContactListItem>
                  )}
            </div>
         </div>
      </div>
   );
}