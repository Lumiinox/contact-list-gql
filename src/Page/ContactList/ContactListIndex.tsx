/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react'
import React from "react";
import {contactFormMainContainer, contactListBackground, contactListContainer, contentContainer, favoriteContactTitle, favoriteListContainer, formButtonStyle, formButtonWrapper, formSubtitleStyle, formTitleStyle, formWrapper, headerContainer, mainBodyContainer, mainTitle, newContactButtonStyle, paginationPageButton, paginationPageContainer, textFieldStyle} from "./ContactListStyle";
import { useState, useEffect  } from 'react';
import { ContactListItem } from '../../Components/ContactItem/ContactItem';
import { dummyData } from '../../ContactListDUMMY';
import { ContactDataType } from '../../GlobalType';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export function ContactListPage(){   
   const contactDataDef = {
      index: 0,
      createdAt: '',
      firstName: '',
      id: 0,
      lastName: '',
      phones:[{
         number: ''
      }],
      isFavorite: false
   }

   const [contactDataMaster, setContactDataMaster] = useState<Array<ContactDataType>>([contactDataDef]);
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [contactData, setContactData] = useState<Array<ContactDataType>>([contactDataDef]);
   const [contactDataDisplay, setContactDataDisplay] = useState<ContactDataType[][]>([[contactDataDef]])
   const [showContactForm, setShowContactForm] = useState(false);
   const [paginationPageElement, setPaginationPageElement] = useState<Array<EmotionJSX.Element>>();
   const [selectedPaginationPage, setSelectedPaginationPage] = useState(0);
   const [favoriteList, setFavoriteList] = useState<Array<number>>([]);
   const [favoriteDisplayedData, setFavoriteDisplayedData] = useState<Array<ContactDataType>>([contactDataDef]);
  
   useEffect(() =>{
      const favListLocal: Array<number> = [];
      console.log('useEffect is running')
      if(dummyData.data.contact.length > 0){
         var normalizedData: Array<ContactDataType> = [];
         var contactDataTemp: Array<ContactDataType> = [];
         var favoriteDataTemp: Array<ContactDataType> = [];
         var favoriteListTemp: Array<number> = favListLocal;
         for (let i = 0; i < dummyData.data.contact.length; i++) {
            normalizedData[i] = {
               createdAt   : dummyData.data.contact[i].created_at,
               firstName   : dummyData.data.contact[i].first_name,
               id          : dummyData.data.contact[i].id,
               lastName    : dummyData.data.contact[i].last_name,
               phones      : dummyData.data.contact[i].phones,
               index       : i,
               isFavorite  : false,
            }
         }
         if(favoriteListTemp){
            for (let i = 0; i < normalizedData.length; i++) {
               if(!favoriteListTemp.includes(normalizedData[i].id)){
                  contactDataTemp.push(normalizedData[i]);
               } else {
                  normalizedData[i].isFavorite = true;
                  favoriteDataTemp.push(normalizedData[i]);
               }
            }
         }

         let paginatedDataTemp = [];
         const chunkSize = 10;
         let y = 0;
         for (let i = 0; i < contactDataTemp.length; i += chunkSize) {
            const chunk = contactDataTemp.slice(i, i + chunkSize);
            paginatedDataTemp[y] = chunk;
            y++;
         }
         const pageNumber = Math.ceil(contactDataTemp.length/chunkSize)
         const paginationPage = () => {
            let pageNumberElement = [];
            for (var i = 0; i < pageNumber; i++) {
               let buttonValue = i + 1;
               pageNumberElement.push(<button css={paginationPageButton} key={i} onClick={() => handlePaginationPageClick(buttonValue)}>{i+1}</button>);
            }
            return pageNumberElement;
         }
         paginationPage();
         setContactDataMaster(normalizedData);
         setContactData(contactDataTemp);
         setFavoriteDisplayedData(favoriteDataTemp);
         setContactDataDisplay(paginatedDataTemp);
         setFavoriteList(favoriteListTemp);
         setPaginationPageElement(paginationPage);
      };
   }, [])

   const handleNewContactButton = () => {
      setShowContactForm(true);
   }

   const handlePaginationPageClick = (pageNum: number) => {
      setSelectedPaginationPage(pageNum - 1);
   }

   const handleCancelFormButton = () => {
      setShowContactForm(false);
   }

   const refreshDisplayedData = () => {
      const contactDataTemp = contactDataMaster;
      const newContactData: Array<ContactDataType> = [];
      const favoriteDataTemp: Array<ContactDataType> = [];
      const dataLength = contactDataTemp.length
      for (let i = 0; i < dataLength; i++) {
         if(!favoriteList.includes(contactDataTemp[i].id)){
            contactDataTemp[i].isFavorite = false;
            newContactData.push(contactDataTemp[i]);
         } else {
            contactDataTemp[i].isFavorite = true;
            favoriteDataTemp.push(contactDataTemp[i]);
         }
      }
      setFavoriteDisplayedData(favoriteDataTemp);
      setContactData(newContactData);
      console.log('contact data from refresh display')
      console.log(newContactData);

      console.log('contact data from refresh pagination')
      console.log(contactDataTemp);
      let paginatedDataTemp = [];
      const chunkSize = 10;
      let y = 0;
      for (let i = 0; i < newContactData.length; i += chunkSize) {
         const chunk = newContactData.slice(i, i + chunkSize);
         paginatedDataTemp[y] = chunk;
         y++;
      }
      const pageNumber = Math.ceil(newContactData.length/chunkSize)
      const paginationPage = () => {
         let pageNumberElement = [];
         for (var i = 0; i < pageNumber; i++) {
            let buttonValue = i + 1;
            pageNumberElement.push(<button css={paginationPageButton} key={i} onClick={() => handlePaginationPageClick(buttonValue)}>{i+1}</button>);
         }
         return pageNumberElement;
      }
      paginationPage();
      setContactDataDisplay(paginatedDataTemp);
      setPaginationPageElement(paginationPage);
   }

   const handleFavoriteButtonPress = async (selectedId: number, isFavoriteStatus: boolean) => {
      const tempFavoriteList = favoriteList;
      if(isFavoriteStatus){
         tempFavoriteList.splice((tempFavoriteList.indexOf(selectedId)),1)
      } else {
         tempFavoriteList.push(selectedId);
      }
      localStorage.setItem('favoriteListLocal', JSON.stringify(tempFavoriteList));
      setFavoriteList(tempFavoriteList);
      refreshDisplayedData();
   }

   const contactForm = () => {
      return(
         <div css={contactFormMainContainer}>
            <div css={formTitleStyle}>Contact Form</div>
            <div css={formSubtitleStyle}>Create Contact</div>
            <div css={formWrapper}>
               <div>First Name</div>
               <input type="text" css={textFieldStyle}></input>

               <div>Last Name</div>
               <input type="text" css={textFieldStyle}></input>

               <div>Phone 1</div>
               <input type="text" css={textFieldStyle}></input>

               <div>Phone 2</div>
               <input type="text" css={textFieldStyle}></input>

               <div>Phone 3</div>
               <input type="text" css={textFieldStyle}></input>
            </div>

            <div css={formButtonWrapper}>
               <button css={formButtonStyle}>Submit</button>
               <button css={formButtonStyle} onClick={handleCancelFormButton}>Cancel</button>
            </div>

         </div>
      )
   }

   return (
      <div css={contactListBackground}>      
         <div css={mainBodyContainer}>
            <div css={headerContainer}>
               <div css={mainTitle}>Contacts</div>
            </div>
            {showContactForm && contactForm()}
            <div css={contentContainer}>
               <div css={favoriteListContainer}>
                  <div css={favoriteContactTitle}>Favorite Contacts</div>
                  <div>
                     {favoriteDisplayedData ? favoriteDisplayedData.map((val, index) => 
                        <ContactListItem 
                        key={index}
                           index={index}
                           id={val.id} 
                           firstName={val.firstName} 
                           lastName={val.lastName} 
                           createdAt={val.createdAt} 
                           phones={val.phones}
                           isFavorite={val.isFavorite}
                           favoriteButtonHandler={() => handleFavoriteButtonPress(val.id, val.isFavorite)}
                        ></ContactListItem>
                     ) : <div>Empty</div>}
                  </div>
               </div>
               <div css={contactListContainer}>
                  <button css={newContactButtonStyle} onClick={handleNewContactButton}>New Contact</button>
                  {contactDataDisplay.length > 0 && contactDataDisplay && contactDataDisplay[selectedPaginationPage].map((val, index) => 
                     <ContactListItem 
                        key={index}
                        index={index}
                        id={val.id} 
                        firstName={val.firstName} 
                        lastName={val.lastName} 
                        createdAt={val.createdAt} 
                        phones={val.phones}
                        isFavorite={val.isFavorite}
                        favoriteButtonHandler={() => handleFavoriteButtonPress(val.id, val.isFavorite)}
                     ></ContactListItem>
                  )}
               </div>
            </div>
            <div css={paginationPageContainer}>
               {paginationPageElement}
            </div>
         </div>
      </div>
   );
}