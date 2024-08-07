"use client";
import React, { useState } from 'react';
import ActionButton from '../ActionButton';

interface Column {
  Header: string;
  accessor: string;
}

interface DataRow {
  [key: string]: any;
}

interface TableProps {
  columns: Column[];
  data: DataRow[];
  buttonText?:string,
  buttonCallback?:any
}

const Table: React.FC<TableProps> = ({ columns, data,buttonText,buttonCallback=()=>{} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredData = data.filter(row =>
    columns.some(column =>
      row[column.accessor]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleClickPageNumber = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClickPageNumber(i)}
          className={`px-3 py-1 border rounded ${currentPage === i ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleEdit = (id: string) => {
    console.log(`Edit ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete ${id}`);
  };

  const handleView = (id: string) => {
    console.log(`View ${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <input
            type="text"
            className="border rounded px-4 py-2 mr-2 mb-2"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {buttonText ? <button className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700' onClick={buttonCallback}>{buttonText}</button> : ''}
        </div>
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-green-700 to-green-500">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.accessor}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        {column.Header}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition duration-150">
                      {columns.map((column) => (
                        <td key={column.accessor} className="px-6 py-4 whitespace-nowrap">
                          {column.accessor === 'image' ? (
                            <img className="h-20 w-20" src={row[column.accessor]} alt={row.name} />
                          ) : (
                            <div className="text-sm text-gray-900">{row[column.accessor]}</div>
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ActionButton
                          onEdit={() => handleEdit(row.id)}
                          onDelete={() => handleDelete(row.id)}
                          onView={() => handleView(row.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center py-2" style={{justifyContent:'end'}}>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
