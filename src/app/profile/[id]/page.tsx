export default function UserProfile({params}:any){
    return(
        <>
        <div className="h-screen w-screen flex justify-center items-center bg-black text-white">
            <h1>profile page of id {params.id}</h1>
            <div></div>
        </div>
        </>
    )
}