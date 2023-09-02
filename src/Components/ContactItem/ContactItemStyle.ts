import { css } from '@emotion/react';

export const listItemContainer = css({  
      background: '#8c8c8c',
      color: '#ffffff',
      width: '40vh',
      margin: '16px 0',
      padding: '4px',
      borderRadius: '10px',
      fontSize: '16px',
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
   width: '35%',
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