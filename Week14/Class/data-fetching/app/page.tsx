import axios from "axios";


async function getUserDetails(){
  // await new Promise((r)=> setTimeout(r,5000))s
  const response = await axios.get("http://localhost:3000/api/user ")
  return response.data;
}

export default async function Home() {
  const userDetails = await getUserDetails()  
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border border-gray-800 p-8 rounded-md">
          <div>
            {userDetails.email}
          </div>
          <div>
            {userDetails.name}
          </div>
        </div>
      </div>
    </div>
  );
}
