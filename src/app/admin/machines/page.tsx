"use client"
import Layout from "@/components/PageLayout/Layout";
import Table from "@/components/Common/Table";
import React from "react";

const Machines=()=>{
    const columns = [
        { Header: 'Image', accessor: 'image' },
        { Header: 'ID', accessor: 'id' },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Machine Number', accessor: 'machineNumber' }
      ];
    
      const data = [
        { id: '1', title: 'Machine A', machineNumber: '123', image: 'https://via.placeholder.com/200' },
        { id: '2', title: 'Machine B', machineNumber: '456', image: 'https://via.placeholder.com/200' },
        // Add more rows as needed
      ];
    return(<Layout>
        <div className="max-w-sm">
            <div className="py-4">
                <div className="font-bold text-[25px] mb-2">Machine</div>
            </div>
        </div>
        <div className="h-full overflow-y-auto w-[100%] bg-[white] rounded overflow-hidden shadow-lg p-5">
            <Table columns={columns} data={data} buttonText="Add Machine" buttonCallback={()=>{}} />
        </div>
      </Layout>)
}

export default Machines;