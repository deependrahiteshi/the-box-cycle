import Layout from "@/components/PageLayout/Layout";
import Table from "@/components/Common/Table";
import React from "react";

const Users=()=>{
    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Role', accessor: 'role' }
      ];
    
      const data = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        // Add more rows as needed
      ];
    
    return(<Layout>
        <div className="max-w-sm">
            <div className="py-4">
                <div className="font-bold text-[25px] mb-2">Users</div>
            </div>
        </div>
        <div className="h-full overflow-y-auto w-[100%] bg-[white] rounded overflow-hidden shadow-lg p-5">
            <Table columns={columns} data={data} />
        </div>
      </Layout>);
}
    
export default Users;