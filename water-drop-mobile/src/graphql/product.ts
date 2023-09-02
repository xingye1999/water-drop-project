import { gql } from "@apollo/client"

export const GET_PRODUCT_TYPES = gql`
  query getProductTypes {
    getProductTypes {
      data {
        key
        title
      }
    }
  }
`

export const GET_PRODUCTS = gql`
  query getProductsForH5(
    $page: PageInput!
    $latitude: Float!
    $longitude: Float!
    $name: String
    $type: String
  ) {
    getProductsForH5(
      page: $page
      latitude: $latitude
      longitude: $longitude
      name: $name
      type: $type
    ) {
      code
      message
      page {
        total
        pageNum
        pageSize
      }
      data {
        id
        limitBuyNumber
        name
        coverUrl
        bannerUrl
        desc
        originalPrice
        stock
        curStock
        buyNumber
        status
        distance
        preferentialPrice
        org {
          id
          name
        }
      }
    }
  }
`

export const GET_PRODUCTS_BY_ORG_ID = gql`
  query getProductsByOrgIdForH5($orgId: String!) {
    getProductsByOrgIdForH5(orgId: $orgId) {
      code
      message
      data {
        id
        name
        coverUrl
        desc
        originalPrice
        preferentialPrice
        buyNumber
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query getProductInfo($id: String!) {
    getProductInfo(id: $id) {
      code
      message
      data {
        id
        limitBuyNumber
        name
        type
        coverUrl
        bannerUrl
        desc
        status
        originalPrice
        stock
        curStock
        buyNumber
        preferentialPrice
        org {
          logo
          name
          tel
        }
        cards {
          id
          name
          type
          time
          validityDay
          course {
            id
            name
            desc
            group
            baseAbility
            limitNumber
            duration
            reserveInfo
            refundInfo
            otherInfo
          }
        }
      }
    }
  }
`
