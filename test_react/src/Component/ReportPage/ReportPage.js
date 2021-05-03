import React, { useMemo,useState,useEffect } from 'react'
// import productApi from '../../api/productApi'
import { useTable, usePagination } from 'react-table'
import axios from 'axios'
import { COLUMNS } from './Columns'
import './Report.css'

export const ReportPage = () => {

  const [reportList, setReportList] = useState([])

  useEffect(() => {
    const getReport = async () => {
      try {
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/comments/'
        )
        console.log(res.data)
        setReportList(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    getReport()
  }, [])
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => reportList, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: {pageSize:15, pageIndex: 0 }
    },
    usePagination
  )

  const { pageIndex} = state

  return (
    <>
    <div  >
      <table className='report' {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="positionbar">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        {/* <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}>
          {[20, 15, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
      </div>
    </>
  )
}
export default ReportPage