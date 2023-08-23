
export const getSponsorByPhoneQueryText = /* GraphQL */ `
  query GetSponsorByPhoneQuery($phone: phoneNum!) {
    getSponsorByPhone(filter: {Phone: {eq: $phone}}) {
        items {
        id
        Phone
        } 
    }
  }
`;