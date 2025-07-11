"use client";
// import {getHelloFromBooks} from "../../api/book";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HeaderPanel() {
  // const [action, setAction] = useState<string | null>(null);

  const router = useRouter();
  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHelloFromBooks();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); */

  const navigate = useRouter();
  useEffect(() => {
    const token = 
    sessionStorage.getItem("token");
    if (!token) {
      navigate.push("/login");
    } else {
      console.log("Token:", token);
      
    }
  }, []);

  return (
    <header className="font-mono p-5 bg-gray-800">
      <div className="grid grid-cols-1 gap-4 py-1 md:grid-cols-3 md:gap-0 lg:grid-cols-3 lg:gap-0 m-auto w-full">
        <div className="flex space-x-2">
          <button 
            onClick={() => {router.push("/add_book")}}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >Add book</button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >Readed books</button>
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Button 3</button> */}
        </div>
        <div className="m-auto">
          <h1 className="text-white text-4xl font-bold cursor-pointer" onClick={(() => {router.push('/')})}>G-BOOKS</h1>
        </div>
        <div className="text-white ml-auto mr-0 flex flex-row gap-2">
          <div>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => {router.push("/login")}}
              >Login</button>
          </div>
          <div>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => {router.push("/register")}}>
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}