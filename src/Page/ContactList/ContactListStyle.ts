import { css } from '@emotion/react';
import { responsiveStyle } from '../../Constants';

export const contactListBackground = css({  
      background: '#000000',
      color: "#ffffff",
      width: '100%',
      height: '100%',
      minHeight: '100vh',
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
   height: '95%',
   margin: '16px auto 0 auto',
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

export const contactFormMainContainer = css({
   background: '#000000',
   height: '520px',
   width: '95%',
   position: 'absolute',
   bottom: '10%', 
   left: '0',
   color: '#ffffff',
   fontSize: '16px',
   display: 'flex',
   flexDirection: 'column',
   border: '2px solid #FFFFFF'
})

export const formWrapper = css({
   padding: '16px',
   margin: '0 auto',
   width: '80%',
})

export const textFieldStyle = css({
   borderRadius: '5px',
   border: '2px solid #FFFFFF',
   color: '#ffffff',
   width: '100%',
   height: '24px',
   padding: '2px 4px',
   margin: '4px auto 16px auto',
   background: '#000000',
})

export const formTitleStyle = css({
   textAlign: 'center',
   fontSize: '24px',
   paddingTop: '8px',
}) 

export const formSubtitleStyle = css({
   textAlign: 'center',
   fontSize: '16px',
}) 

export const formButtonWrapper = css({
   display: 'flex',
   justifyContent: 'center',
   margin: '0 20%'
})

export const formButtonStyle = css({
   background: '#000000',
   color: '#FFFFFF',
   fontSize: '16px',
   padding: '4px 16px',
   margin: '0 8px',
   border: '2px solid #ffffff',
   borderRadius: '10px'
})

export const paginationPageContainer = css({
   display: 'flex',
   justifyContent: 'flex-start',
   padding: '',
   width: '96%',
   margin: '0 auto',
   overflow: 'auto',
})

export const paginationPageButton = css({
   background: '#000000',
   color: '#FFFFFF',
   border: '2px solid #FFFFFF',
   padding: '8px 12px',
   margin: '0 8px 8px 8px',
   fontSize: '16px',
})

export const contactListContainer = css({
   borderLeft: '2px solid #FFFFFF',
   borderRight: '2px solid #FFFFFF',
   padding: '0 24px',
   margin: '16px 0',
})

export const favoriteContactTitle = css({
   textAlign: 'center',
   fontSize: '24px'
})

export const favoriteListContainer = css({
   borderLeft: '2px solid #FFD500',
   borderRight: '2px solid #FFD500',
   padding: '0 24px',
   margin: '16px 0',
   color: '#FFD500',
   height: '400px',
   overflow: 'auto',
})

export const newContactButtonStyle = css({
   width: '100%',
   border: '2px solid #FFFFFF',
   background: '#000000',
   color: '#FFFFFF',
   fontSize: '16px',
   padding: '8px 0'
})