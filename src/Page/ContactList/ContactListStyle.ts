import { css } from '@emotion/react';
import { responsiveStyle } from '../../Constants';

export const contactListBackground = css({  
      background: '#404040',
      color: "#ffffff",
      width: '100%',
      height: '100vh',
   })
;

export const mainBodyContainer = css({ 
   height: '90%', 
   padding: '20px',
   display: 'grid',
   gridRow: '20% 80%',
})
;

export const headerContainer = css({
   margin: '0 auto',
})

export const contentContainer = css({
   height: '100%',
   overflow: 'scroll',
   margin: '0 auto',
})

export const mainTitle = css(
   {  
   color: '#ffffff',
   margin: '0 auto',
   },
      
   responsiveStyle({
         fontSize: ['32px', '46px', '56px', '64px'],
      })
   )
;