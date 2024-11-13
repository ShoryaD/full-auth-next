import React from "react"

export default function UserProfile ({params}: any) {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-950">
        <p>Profile Page -
            <span className="ml-3 p-2 rounded bg-orange-600 text-black">
            {params.id}
            </span>
        </p>
    </div>
  )
}
