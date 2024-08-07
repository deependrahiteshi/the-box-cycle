import Layout from "@/components/PageLayout/Layout";
import React from "react";

const Dashboard=()=>{
    return(<Layout>
        <div className="max-w-sm">
            <div className="py-4">
                <div className="font-bold text-[25px] mb-2">Dashboard</div>
            </div>
        </div>
        <div className="h-full overflow-y-auto w-[100%] bg-[white] rounded overflow-hidden shadow-lg p-5">
                    Dashboard
        </div>
      </Layout>)
}

export default Dashboard;