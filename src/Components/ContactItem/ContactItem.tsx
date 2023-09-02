/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from "react";
import { contactItemNameContainer, editButtonIcon, iconContainer, listItemContainer, listItemLowerContainer, listItemUpperContainer } from './ContactItemStyle';
import { ContactItemPropType } from './ContactItemTypes';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

export function ContactListItem({id, firstName, lastName, createdAt, phones}: ContactItemPropType){   
   return(
      <div css={listItemContainer}>
         <div css={listItemUpperContainer}>
            <div css={contactItemNameContainer}>{firstName} {lastName}</div>
            <div>{createdAt.substring(0,10)}</div>
         </div>
         <div css={listItemLowerContainer}>
            <div>
               {phones.map(val => <div>{val.number}</div>)}
            </div>
            <div css={iconContainer}>
               <FontAwesomeIcon icon={faPencil} css={editButtonIcon}/>
               <FontAwesomeIcon icon={faHeart} css={editButtonIcon}/>
               <FontAwesomeIcon icon={faTrash} css={editButtonIcon}/>
            </div>
         </div>
      </div>
   );
}