/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSponsor = /* GraphQL */ `
  subscription OnCreateSponsor($filter: ModelSubscriptionSponsorFilterInput) {
    onCreateSponsor(filter: $filter) {
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
export const onUpdateSponsor = /* GraphQL */ `
  subscription OnUpdateSponsor($filter: ModelSubscriptionSponsorFilterInput) {
    onUpdateSponsor(filter: $filter) {
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
export const onDeleteSponsor = /* GraphQL */ `
  subscription OnDeleteSponsor($filter: ModelSubscriptionSponsorFilterInput) {
    onDeleteSponsor(filter: $filter) {
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
export const onCreateRBL = /* GraphQL */ `
  subscription OnCreateRBL($filter: ModelSubscriptionRBLFilterInput) {
    onCreateRBL(filter: $filter) {
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
export const onUpdateRBL = /* GraphQL */ `
  subscription OnUpdateRBL($filter: ModelSubscriptionRBLFilterInput) {
    onUpdateRBL(filter: $filter) {
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
export const onDeleteRBL = /* GraphQL */ `
  subscription OnDeleteRBL($filter: ModelSubscriptionRBLFilterInput) {
    onDeleteRBL(filter: $filter) {
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
export const onCreateChild = /* GraphQL */ `
  subscription OnCreateChild($filter: ModelSubscriptionChildFilterInput) {
    onCreateChild(filter: $filter) {
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
export const onUpdateChild = /* GraphQL */ `
  subscription OnUpdateChild($filter: ModelSubscriptionChildFilterInput) {
    onUpdateChild(filter: $filter) {
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
export const onDeleteChild = /* GraphQL */ `
  subscription OnDeleteChild($filter: ModelSubscriptionChildFilterInput) {
    onDeleteChild(filter: $filter) {
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
