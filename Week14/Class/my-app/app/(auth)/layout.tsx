import React from "react";

export default function siginLayout({children}: {children: React.ReactNode}){
    return(
        <div>
            <div className="border-b text-center p-4">
                20% off for the next 3 days
            </div>
            {children}
        </div>
    )
}