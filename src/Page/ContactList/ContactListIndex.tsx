/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from "react";
import {contactFormMainContainer, contactListBackground, contactListContainer, contentContainer, favoriteContactTitle, favoriteListContainer, formButtonStyle, formButtonWrapper, formSubtitleStyle, formTitleStyle, formWrapper, headerContainer, mainBodyContainer, mainTitle, newContactButtonStyle, paginationPageButton, paginationPageContainer, textFieldStyle} from "./ContactListStyle";
import { useState, useEffect  } from 'react';
import { ContactListItem } from '../../Components/ContactItem/ContactItem';
import { ContactDataType, PhoneTypes } from '../../GlobalType';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import swal from 'sweetalert';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CONTACT_WITH_PHONE, ADD_NUMBER_TO_CONTACT, DELETE_CONTACT_PHONE, EDIT_CONTACT, EDIT_PHONE_NUMBER } from '../../GraphQL/Mutation';
import { GET_ALL_CONTACTS } from '../../GraphQL/Queries';
import { EditedDataType } from './ContactListTypes';

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
   const [contactDataDisplay, setContactDataDisplay] = useState<Array<Array<ContactDataType>>>([[contactDataDef]])
   const [currEditedData, setCurrEditedData] = useState<EditedDataType>()
   const [paginationPageElement, setPaginationPageElement] = useState<Array<EmotionJSX.Element>>();
   const [favoriteList, setFavoriteList] = useState<Array<number>>([]);
   const [favoriteDisplayedData, setFavoriteDisplayedData] = useState<Array<ContactDataType>>([contactDataDef]);
   const [firstNameArray, setFirstNameArray] = useState<Array<string>>();
   const [lastNameArray, setLastNameArray] = useState<Array<string>>();
   const [showContactForm, setShowContactForm] = useState(false);
   const [selectedPaginationPage, setSelectedPaginationPage] = useState(0);
   const [isEditMode, setIsEditMode] = useState(false);
   const [firstNameInput, setFirstNameInput] = useState('');
   const [lastNameInput, setLastNameInput] = useState('');
   const [phone1Input, setPhone1Input] = useState('');
   const [phone2Input, setPhone2Input] = useState('');
   const [phone3Input, setPhone3Input] = useState('');

   const {loading, data} = useQuery(GET_ALL_CONTACTS)
   const [createNewContact, {error}] = useMutation(ADD_CONTACT_WITH_PHONE);
   const [addNumberToContact] = useMutation(ADD_NUMBER_TO_CONTACT);
   const [editContactById] = useMutation(EDIT_CONTACT);
   const [editPhoneNumber] = useMutation(EDIT_PHONE_NUMBER);
   const [deleteContact] = useMutation(DELETE_CONTACT_PHONE);

   const specialCharaRegex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

   useEffect(() =>{
      const favListLocal = JSON.parse(localStorage.getItem('favoriteListLocal') || '{}');
      if(!loading){
         const contactDataApi = data;
         console.log(contactDataApi);
         var normalizedData: Array<ContactDataType> = [];
         var contactDataTemp: Array<ContactDataType> = [];
         var favoriteDataTemp: Array<ContactDataType> = [];
         var firstNametemp = [];
         var lastNameTemp = [];
         var favoriteListTemp: Array<number> = favListLocal;
         for (let i = 0; i < contactDataApi.contact.length; i++) {
            normalizedData[i] = {
               createdAt   : contactDataApi.contact[i].created_at,
               firstName   : contactDataApi.contact[i].first_name,
               id          : contactDataApi.contact[i].id,
               lastName    : contactDataApi.contact[i].last_name,
               phones      : contactDataApi.contact[i].phones,
               index       : i,
               isFavorite  : false,
            }
            firstNametemp.push(contactDataApi.contact[i].first_name);
            lastNameTemp.push(contactDataApi.contact[i].last_name);
         }

         setFirstNameArray(firstNametemp);
         setLastNameArray(lastNameTemp);

         if(favoriteListTemp && normalizedData){
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

         setFavoriteDisplayedData(favoriteDataTemp);
         setContactDataDisplay(paginatedDataTemp);
         setFavoriteList(favoriteListTemp);
         setPaginationPageElement(paginationPage);
      }

   }, [data, loading])

   function refreshPage() {
      window.location.reload();
   }

   const handleNewContactButton = () => {
      setIsEditMode(false);
      setShowContactForm(true);
   }

   const handlePaginationPageClick = (pageNum: number) => {
      setSelectedPaginationPage(pageNum - 1);
   }

   const handleCancelFormButton = () => {
      setFirstNameInput('');
      setLastNameInput('');
      setPhone1Input('');
      setPhone2Input('');
      setPhone3Input('');
      if (isEditMode){
         refreshPage();
      } else {
         setShowContactForm(false);
      }
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

   const handleSubmitFormCreate = () => {
      const firstNameTemp = firstNameInput;
      const lastNameTemp = lastNameInput;
      const Phone1Temp = phone1Input;
      const Phone2Temp = phone2Input;
      const Phone3Temp = phone3Input;
      if(!firstNameArray?.includes(firstNameTemp) && !lastNameArray?.includes(lastNameTemp) && !specialCharaRegex.test(firstNameTemp) && !specialCharaRegex.test(lastNameTemp) && firstNameTemp !== '' && lastNameTemp !== '' && Phone1Temp !== ''){
         const phoneArrayInput: Array<PhoneTypes> = [{
            number: Phone1Temp,
         }];

         if(phone1Input && phone2Input !== ''){
            phoneArrayInput.push({
               number: Phone2Temp,
            })
         }
         if(phone1Input && phone3Input !== ''){
            phoneArrayInput.push({
               number: Phone3Temp,
            })
         }
         createNewContact({
            variables: {
               first_name: firstNameTemp,
               last_name: lastNameTemp,
               phones: phoneArrayInput,
            }
         });

         if(error){
            console.log(error);
         } else {
            swal('data inserted');
            setShowContactForm(false);
            setContactDataMaster(data);
            refreshDisplayedData();
            refreshPage();
         }

      } else {
         swal('Input bad');
      }
   }

   const handleEditSubmit = () => {
      const firstNameTemp = firstNameInput;
      const lastNameTemp = lastNameInput;
      const phone1Temp = phone1Input;
      const phone2Temp = phone2Input;
      const phone3Temp = phone3Input;
      const oldDataTemp = currEditedData;
      console.log(firstNameTemp !== oldDataTemp?.firstName);
      console.log(lastNameTemp !== oldDataTemp?.lastName);
      if (firstNameTemp !== oldDataTemp?.firstName || lastNameTemp !== oldDataTemp?.lastName){
         if(!specialCharaRegex.test(firstNameTemp) && !specialCharaRegex.test(lastNameTemp) && firstNameTemp !== '' && lastNameTemp !== ''){
            editContactById({
               variables: {
                  id: oldDataTemp?.id,
                  _set: {
                     first_name: firstNameTemp,
                     last_name: lastNameTemp
                  },
               }
            });
         } else {
            swal('Name already exist or have special characters');
         }
      }
      console.log('testtest1');
      if(oldDataTemp && oldDataTemp.phones.length >= 1){
         if(phone1Temp !== oldDataTemp.phones[0].number){
            console.log('testtest1.1');
            editPhoneNumber({
               variables: {
                  pk_columns:{
                     number: oldDataTemp.phones[0].number,
                     contact_id: oldDataTemp?.id,
                  },
                  new_phone_number: phone1Temp
               }
            });
         }
      } else {
         addNumberToContact({
            variables:{
               contact_id: oldDataTemp?.id,
               phone_number: phone1Temp,
            },
         })
      }

      console.log('testtest2');
      if(oldDataTemp && oldDataTemp.phones.length >= 2){
         if(phone2Temp !== oldDataTemp?.phones[1].number){
            console.log('testtest2.1');
            editPhoneNumber({
               variables: {
                  pk_columns:{
                     number: oldDataTemp?.phones[1].number || '',
                     contact_id: oldDataTemp?.id,
                  },
                  new_phone_number: phone2Temp
               }
            });
         }
      } else {
         addNumberToContact({
            variables:{
               contact_id: oldDataTemp?.id,
               phone_number: phone2Temp,
            },
         })
      }

      console.log('testtest3');
      if(oldDataTemp && oldDataTemp.phones.length >= 3){
         if(phone3Temp !== oldDataTemp?.phones[2].number){
            console.log('testtest3.1');
            editPhoneNumber({
               variables: {
                  pk_columns:{
                     number: oldDataTemp?.phones[2].number || '',
                     contact_id: oldDataTemp?.id,
                  },
                  new_phone_number: phone3Temp
               }
            });
         }
      } else {
         addNumberToContact({
            variables:{
               contact_id: oldDataTemp?.id,
               phone_number: phone3Temp,
            },
         })
      }
   }

   const handleDeleteButton = (selectedId: number) => {
      deleteContact({
         variables: {
            id: selectedId,
         }
      });
      refreshPage();
   }

   const handleEditForm = (oldFirstName: string, oldLastName: string, oldPhones: Array<PhoneTypes>, id: number) => {
      const currSelectedDataTemp = {
         firstName: oldFirstName,
         lastName: oldLastName,
         phones: oldPhones,
         id: id
      }
      setFirstNameInput(oldFirstName);
      setLastNameInput(oldLastName);
      setPhone1Input(oldPhones[0] ? oldPhones[0].number : '');
      setPhone2Input(oldPhones[1] ? oldPhones[1].number : '');
      setPhone3Input(oldPhones[2] ? oldPhones[2].number : '');
      setCurrEditedData(currSelectedDataTemp);
      setIsEditMode(true);
      setShowContactForm(true);
   }

   const createContact = () => {
      return(
         <div css={contactFormMainContainer}>
            <div css={formTitleStyle}>Contact Form</div>
            <div css={formSubtitleStyle}>{isEditMode ? "Edit Contact" : "Create Contact"}</div>
            <div css={formWrapper}>
               <div>First Name</div>
               <input type="text" css={textFieldStyle} name="firstName" value={firstNameInput} onChange={(e) => {setFirstNameInput(e.target.value)}}></input>

               <div>Last Name</div>
               <input type="text" css={textFieldStyle} name="lastName" value={lastNameInput} onChange={(e) => {setLastNameInput(e.target.value)}}></input>

               <div>Phone 1</div>
               <input type="text" css={textFieldStyle} name="phone1"  value={phone1Input}onChange={(e) => {setPhone1Input(e.target.value)}}></input>

               <div>Phone 2</div>
               <input type="text" css={textFieldStyle} name="phone2"  value={phone2Input} onChange={(e) => {setPhone2Input(e.target.value)}}></input>

               <div>Phone 3</div>
               <input type="text" css={textFieldStyle} name="phone3" value={phone3Input} onChange={(e) => {setPhone3Input(e.target.value)}}></input>
            </div>

            <div css={formButtonWrapper}>
               {isEditMode ? 
                  <button css={formButtonStyle} onClick={handleEditSubmit }>Edit</button> 
                  : 
                  <button css={formButtonStyle} onClick={handleSubmitFormCreate}>Submit</button>
               }
               <button css={formButtonStyle} onClick={handleCancelFormButton}>{isEditMode ? 'Done' : 'Close'}</button>
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
            {showContactForm && createContact()}
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
                           trashButtonHandler={() => handleDeleteButton(val.id)}
                           editButtonHandler={() => handleEditForm(val.firstName, val.lastName, val.phones, val.id)}
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
                        trashButtonHandler={() => handleDeleteButton(val.id)}
                        editButtonHandler={() => handleEditForm(val.firstName, val.lastName, val.phones, val.id)}
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