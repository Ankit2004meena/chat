
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import Logout from "./Logout";


const Sidebar = () => {
  return (
    <>

    <div className=" border-r-2 border-dashed  border-red-800 p-4 flex flex-col  ">
      <SearchInput/>
      <Conversations/>
      <Logout/>
    </div>
    </>
  )
}

export default Sidebar

