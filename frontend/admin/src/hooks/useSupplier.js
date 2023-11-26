import { useState, useEffect } from 'react'
import SupplierRepository from '../services/SupplierRepository '

const useProvider = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const supplierRepository = new SupplierRepository()

  const getAll = async () => {
    try {
      setData(await supplierRepository.getAll())
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return { data, loading, getAll }
}


export default useProvider
