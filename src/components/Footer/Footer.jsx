import styled from "styled-components"

export const Footer = ({ setAmount }) => {
     function handleClick() {
          setAmount(prevAmount => prevAmount + 5)
     }

     return (
          <FooterStyle>
               <button
                    style={{
                         cursor: 'pointer',
                         backgroundColor: '#242424',
                         color: '#ffffff',
                         borderRadius: '30px',
                         padding: '5px 15px'
                    }}
                    onClick={handleClick}
               >Load More</button>
          </FooterStyle>
     )
}

const FooterStyle = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  border: 1px solid black;
`;
