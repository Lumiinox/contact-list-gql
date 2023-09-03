/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@emotion/react'
import React from "react";
import { contactItemNameContainer, editButtonIcon, iconContainer, listItemContainer, listItemLowerContainer, listItemUpperContainer } from './ContactItemStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faPencil } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { ContactItemPropsType } from '../ContactItemTypes';

export function ContactListItem({index, id = 0, firstName = '', lastName = '', createdAt = '', phones, isFavorite = false, favoriteButtonHandler}: ContactItemPropsType){   
   return(
      <div css={listItemContainer(isFavorite)}>
         <div css={listItemUpperContainer}>
            <div css={contactItemNameContainer}>{firstName} {lastName}</div>
            <div>{createdAt.substring(0,10)}</div>
         </div>
         <div css={listItemLowerContainer}>
            <div>
               {phones ? phones.map((val) => <div>{val.number}</div>) : 'N/A'}
            </div>
            <div css={iconContainer}>
               {isFavorite ? <FontAwesomeIcon icon={faHeartSolid} css={editButtonIcon} onClick={() => favoriteButtonHandler(id, isFavorite)}/> : <FontAwesomeIcon icon={faHeartRegular} css={editButtonIcon} onClick={() => favoriteButtonHandler(id, isFavorite)}/>}
               <FontAwesomeIcon icon={faPencil} css={editButtonIcon}/>
            </div>
         </div>
      </div>
   );
}