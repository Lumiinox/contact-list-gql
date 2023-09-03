import { css } from '@emotion/react';

export const listItemContainer = (isFavorite: boolean) => css({  
      background: '#00000',
      color: isFavorite ? '#FFD500' : '#ffffff',
      width: '40vh',
      margin: '16px 0',
      padding: '4px',
      fontSize: '16px',
      borderTop: isFavorite ? '2px solid #FFD500' : '#2px solid #FFFFFF',
   })
;

export const listItemUpperContainer = css({
   display: 'flex',
   justifyContent: 'space-between',
   marginBottom: '8px',
   padding: '8px 8px 0 8px',
})

export const listItemLowerContainer = css({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 8px 8px 8px',
   alignItems: 'flex-end'
})

export const iconContainer = css({
   display: 'flex',
   justifyContent: 'space-between',
   width: '25%',
})


export const editButtonIcon = css({
   color: '#fffffff',
})

export const contactItemNameContainer = css({
   width: '50%',
   overflow: 'hidden',
   whiteSpace: 'nowrap',
   textOverflow: 'ellipsis',
})