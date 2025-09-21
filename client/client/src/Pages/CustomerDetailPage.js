
import {
CustomerRowContainer,
 FirstName,
 LastName,
 PhoneNum,
} from './styledCustomerDetailPage.js'

const CustomerDetailPage = props => {
  const {userDetails} = props
  const { firstName,lastName,PhoneNumber} = userDetails

  
  return (
    <CustomerRowContainer>
     <FirstName>{firstName}</FirstName>
     <LastName>{lastName}</LastName>
     <PhoneNum>{PhoneNumber}</PhoneNum>
    </CustomerRowContainer>
  )
}

export default CustomerDetailPage