import CustomerDetailPage from '../CustomerDetailPage.js'

import './styleCustomerListPage.css'

function CustomerPageList(props) {
  const { CustomerData } = props

  const renderCustomerHeader = () => (
    <li className='CustomerHeader'>
      <h1 className='firstNam'>firstName</h1>
      <h1 className='lastName'>lastName</h1>
      <h1 className='phoneNumber'>Phone Number</h1>
    </li>
  )

  return (
    <ul className='CustomerTableContainer'>
      {renderCustomerHeader()}
      {CustomerData.map(eachCustomer => (
        <CustomerDetailPage key={eachCustomer.id} userDetails={eachCustomer} />
      ))}
    </ul>
  )
}
export default CustomerPageList