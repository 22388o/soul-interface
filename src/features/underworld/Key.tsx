import React from "react";
import styled from "styled-components";

// const HideOnSmall = styled.div`
// @media screen and (max-width: 900px) {
//   display: none;
// }
// `

const HideOnMobile = styled.div`
@media screen and (max-width: 600px) {
  display: none;
}
`

const FarmItemBox = styled.div`
  width: 100px;
  display: grid;
  justify-content: center;
  align-items: center;
`

const FarmContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
`

const FarmContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0rem 0 0;

  &:last-child {
    justify-content: space-between;
  }

  @media screen and (max-width: 720px) {
    padding: 0;
  }
`

const Text = styled.p`
  padding: ${({ padding }) => (padding ? `${padding}` : "0 0rem")};
  margin: ${({ margin }) => (margin ? `${margin}` : "0 0")};
  color: ${({ color }) => (color ? `${color}` : `white`)};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}` : `1rem`)};
  font-weight: ${({ fontWeight }) => (fontWeight ? `${fontWeight}` : ``)};
  text-align: ${({ textAlign }) => (textAlign ? `${textAlign}` : `center`)};
`;

export function Underworld() {
  return (
    <div className="justify-center">
        <FarmContainer>
          {/* <div className="grid grid-cols-5 ml-24 mr-6 sm:ml-0 bg-dark-1000"> */}
          <div className="grid grid-cols-1 bg-dark-1200 font-bold mb-2 mr-2 ml-2 border border-dark-1000">
            <FarmContentWrapper>
              
              <FarmItemBox>
                  <Text padding="0" fontSize=".9rem" color="#FFFFFF">
                  MARKET
                  </Text>
              </FarmItemBox>

              <FarmItemBox>
                <Text padding="0" fontSize=".9rem" color="#FFFFFF">
                SUPPLIED
                </Text>
              </FarmItemBox>

              <FarmItemBox>
                <Text padding="0" fontSize=".9rem" color="#FFFFFF">
                BORROWED
                </Text>
              </FarmItemBox>
              
              <HideOnMobile>
              <FarmItemBox>
                <Text padding="0" fontSize=".9rem" color="#FFFFFF">
                COLLATERAL
                </Text>
              </FarmItemBox>
              </HideOnMobile>

              <HideOnMobile>
              <FarmItemBox>
                <Text padding="0" fontSize=".9rem" color="#FFFFFF">
                UTILIZED
                </Text>
              </FarmItemBox>
              </HideOnMobile>

              {/* <FarmItemBox>
                <Text padding="0" fontSize="1" color="#FFFFFF">
                % APR
                </Text>
              </FarmItemBox> */}

            {/* <HideOnSmall>
              <FarmItemBox>
                <Text padding="0" fontSize="1" color="#FFFFFF">
                 TVL
                </Text>
              </FarmItemBox>
            </HideOnSmall> */}

            </FarmContentWrapper>
            </div>
        </FarmContainer>
      </div>
  )
}

// export function Farms() {
//   return (
//     <div className="justify-center">
//         <FarmContainer>
//           {/* <div className="grid grid-cols-5 ml-24 mr-6 sm:ml-0 bg-dark-1000"> */}
//           <div className="grid grid-cols-1 bg-dark-1200 font-bold mb-2 mr-4 ml-2 border border-dark-1000 hover:border-dark-600">
//             <FarmContentWrapper>
              
//             {/* <HideOnMobile> */}
//               <FarmItemBox>
//                   <Text fontSize=".8" color="#FFFFFF">
//                   ASSET
//                   </Text>
//               </FarmItemBox>
//             {/* </HideOnMobile> */}

//             <HideOnMobile>
//               <FarmItemBox>
//                 <Text padding="0" fontSize=".8" color="#FFFFFF">
//                 COLLATERAL
//                 </Text>
//               </FarmItemBox>
//             </HideOnMobile>

//             <FarmItemBox>
//                 <Text padding="0" fontSize=".8" color="#FFFFFF">
//                 BORROWED
//                 </Text>
//             </FarmItemBox>

//             <FarmItemBox>
//                 <Text padding="0" fontSize=".8" color="#FFFFFF">
//                 % FEE
//                 </Text>
//             </FarmItemBox>

//             </FarmContentWrapper>
//             </div>
//         </FarmContainer>
//       </div>
//   )
// }