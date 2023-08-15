/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSponsor = /* GraphQL */ `
  mutation CreateSponsor(
    $input: CreateSponsorInput!
    $condition: ModelSponsorConditionInput
  ) {
    createSponsor(input: $input, condition: $condition) {
      id
      FirstName
      LastName
      Phone
      Email
      Address
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          Sponsor {
            id
            FirstName
            LastName
            Phone
            Email
            Address
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSponsor = /* GraphQL */ `
  mutation UpdateSponsor(
    $input: UpdateSponsorInput!
    $condition: ModelSponsorConditionInput
  ) {
    updateSponsor(input: $input, condition: $condition) {
      id
      FirstName
      LastName
      Phone
      Email
      Address
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          Sponsor {
            id
            FirstName
            LastName
            Phone
            Email
            Address
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSponsor = /* GraphQL */ `
  mutation DeleteSponsor(
    $input: DeleteSponsorInput!
    $condition: ModelSponsorConditionInput
  ) {
    deleteSponsor(input: $input, condition: $condition) {
      id
      FirstName
      LastName
      Phone
      Email
      Address
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          Sponsor {
            id
            FirstName
            LastName
            Phone
            Email
            Address
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createRBL = /* GraphQL */ `
  mutation CreateRBL(
    $input: CreateRBLInput!
    $condition: ModelRBLConditionInput
  ) {
    createRBL(input: $input, condition: $condition) {
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          Sponsor {
            id
            FirstName
            LastName
            Phone
            Email
            Address
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateRBL = /* GraphQL */ `
  mutation UpdateRBL(
    $input: UpdateRBLInput!
    $condition: ModelRBLConditionInput
  ) {
    updateRBL(input: $input, condition: $condition) {
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          Sponsor {
            id
            FirstName
            LastName
            Phone
            Email
            Address
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteRBL = /* GraphQL */ `
  mutation DeleteRBL(
    $input: DeleteRBLInput!
    $condition: ModelRBLConditionInput
  ) {
    deleteRBL(input: $input, condition: $condition) {
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          Sponsor {
            id
            FirstName
            LastName
            Phone
            Email
            Address
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
                }
                Sponsor {
                  id
                  FirstName
                  LastName
                  Phone
                  Email
                  Address
                  YearsActive
                  Institution
                  createdAt
                  updatedAt
                }
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChild = /* GraphQL */ `
  mutation CreateChild(
    $input: CreateChildInput!
    $condition: ModelChildConditionInput
  ) {
    createChild(input: $input, condition: $condition) {
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            Sponsor {
              id
              FirstName
              LastName
              Phone
              Email
              Address
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      Sponsor {
        id
        FirstName
        LastName
        Phone
        Email
        Address
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            Sponsor {
              id
              FirstName
              LastName
              Phone
              Email
              Address
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChild = /* GraphQL */ `
  mutation UpdateChild(
    $input: UpdateChildInput!
    $condition: ModelChildConditionInput
  ) {
    updateChild(input: $input, condition: $condition) {
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            Sponsor {
              id
              FirstName
              LastName
              Phone
              Email
              Address
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      Sponsor {
        id
        FirstName
        LastName
        Phone
        Email
        Address
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            Sponsor {
              id
              FirstName
              LastName
              Phone
              Email
              Address
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChild = /* GraphQL */ `
  mutation DeleteChild(
    $input: DeleteChildInput!
    $condition: ModelChildConditionInput
  ) {
    deleteChild(input: $input, condition: $condition) {
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            Sponsor {
              id
              FirstName
              LastName
              Phone
              Email
              Address
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      Sponsor {
        id
        FirstName
        LastName
        Phone
        Email
        Address
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            Sponsor {
              id
              FirstName
              LastName
              Phone
              Email
              Address
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
