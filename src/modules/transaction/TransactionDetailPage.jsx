import { useParams } from 'react-router-dom'

const TransactionDetailPage = () => {
  const { code } = useParams()
  console.log(code)
  return (
    <div>Detail transaksi untuk ID: {code}</div>
  )
}

export default TransactionDetailPage