/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSponsor = /* GraphQL */ `
  query GetSponsor($id: ID!) {
    getSponsor(id: $id) {
      id
      FirstName
      LastName
      Phone
      Email
      Address
      AddressStreet
      AddressCity
      AddressState
      AddressZip
      YearsActive
      Institution
      Children {
        items {
          id
          Firstname
          ChildID
          Gender
          Race
          Age
          Siblings
          ShirtSize
          PantSize
          ShoeSize
          Wishlist
          Info
          Bike
          rblID
          sponsorID
          RBL {
            id
            LastName
            FirstName
            Phone
            Email
            Color
            createdAt
            updatedAt
            __typename
          }
          Sponsor {
            id
            FirstName
            LastName
            Phone
            Email
            Address
            AddressStreet
            AddressCity
            AddressState
            AddressZip
            YearsActive
            Institution
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSponsors = /* GraphQL */ `
  query ListSponsors(
    $filter: ModelSponsorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSponsors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        FirstName
        LastName
        Phone
        Email
        Address
        AddressStreet
        AddressCity
        AddressState
        AddressZip
        YearsActive
        Institution
        Children {
          items {
            id
            Firstname
            ChildID
            Gender
            Race
            Age
            Siblings
            ShirtSize
            PantSize
            ShoeSize
            Wishlist
            Info
            Bike
            rblID
            sponsorID
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRBL = /* GraphQL */ `
  query GetRBL($id: ID!) {
    getRBL(id: $id) {
      id
      LastName
      FirstName
      Phone
      Email
      Color
      Children {
        items {
          id
          Firstname
          ChildID
          Gender
          Race
          Age
          Siblings
          ShirtSize
          PantSize
          ShoeSize
          Wishlist
          Info
          Bike
          rblID
          sponsorID
          RBL {
            id
            LastName
            FirstName
            Phone
            Email
            Color
            createdAt
            updatedAt
            __typename
          }
          Sponsor {
            id
            FirstName
            LastName
            Phone
            Email
            Address
            AddressStreet
            AddressCity
            AddressState
            AddressZip
            YearsActive
            Institution
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRBLS = /* GraphQL */ `
  query ListRBLS(
    $filter: ModelRBLFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRBLS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        LastName
        FirstName
        Phone
        Email
        Color
        Children {
          items {
            id
            Firstname
            ChildID
            Gender
            Race
            Age
            Siblings
            ShirtSize
            PantSize
            ShoeSize
            Wishlist
            Info
            Bike
            rblID
            sponsorID
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getChild = /* GraphQL */ `
  query GetChild($id: ID!) {
    getChild(id: $id) {
      id
      Firstname
      ChildID
      Gender
      Race
      Age
      Siblings
      ShirtSize
      PantSize
      ShoeSize
      Wishlist
      Info
      Bike
      rblID
      sponsorID
      RBL {
        id
        LastName
        FirstName
        Phone
        Email
        Color
        Children {
          items {
            id
            Firstname
            ChildID
            Gender
            Race
            Age
            Siblings
            ShirtSize
            PantSize
            ShoeSize
            Wishlist
            Info
            Bike
            rblID
            sponsorID
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      Sponsor {
        id
        FirstName
        LastName
        Phone
        Email
        Address
        AddressStreet
        AddressCity
        AddressState
        AddressZip
        YearsActive
        Institution
        Children {
          items {
            id
            Firstname
            ChildID
            Gender
            Race
            Age
            Siblings
            ShirtSize
            PantSize
            ShoeSize
            Wishlist
            Info
            Bike
            rblID
            sponsorID
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listChildren = /* GraphQL */ `
  query ListChildren(
    $filter: ModelChildFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChildren(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Firstname
        ChildID
        Gender
        Race
        Age
        Siblings
        ShirtSize
        PantSize
        ShoeSize
        Wishlist
        Info
        Bike
        rblID
        sponsorID
        RBL {
          id
          LastName
          FirstName
          Phone
          Email
          Color
          Children {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        Sponsor {
          id
          FirstName
          LastName
          Phone
          Email
          Address
          AddressStreet
          AddressCity
          AddressState
          AddressZip
          YearsActive
          Institution
          Children {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const childrenByRblID = /* GraphQL */ `
  query ChildrenByRblID(
    $rblID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelChildFilterInput
    $limit: Int
    $nextToken: String
  ) {
    childrenByRblID(
      rblID: $rblID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Firstname
        ChildID
        Gender
        Race
        Age
        Siblings
        ShirtSize
        PantSize
        ShoeSize
        Wishlist
        Info
        Bike
        rblID
        sponsorID
        RBL {
          id
          LastName
          FirstName
          Phone
          Email
          Color
          Children {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        Sponsor {
          id
          FirstName
          LastName
          Phone
          Email
          Address
          AddressStreet
          AddressCity
          AddressState
          AddressZip
          YearsActive
          Institution
          Children {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const childrenBySponsorID = /* GraphQL */ `
  query ChildrenBySponsorID(
    $sponsorID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelChildFilterInput
    $limit: Int
    $nextToken: String
  ) {
    childrenBySponsorID(
      sponsorID: $sponsorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Firstname
        ChildID
        Gender
        Race
        Age
        Siblings
        ShirtSize
        PantSize
        ShoeSize
        Wishlist
        Info
        Bike
        rblID
        sponsorID
        RBL {
          id
          LastName
          FirstName
          Phone
          Email
          Color
          Children {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        Sponsor {
          id
          FirstName
          LastName
          Phone
          Email
          Address
          AddressStreet
          AddressCity
          AddressState
          AddressZip
          YearsActive
          Institution
          Children {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
