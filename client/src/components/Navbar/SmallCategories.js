import NavLink from "../Links/NavLinks"
import { useDispatch } from "react-redux"
import { changeCategory } from "../../reducers/productReducer";

export default function SmallCategories(props) {
    const dispatch = useDispatch();

    function handleCategoryChange(item) {
        dispatch(changeCategory({categoryName: item}))
    }

    return (
        <div id='CategoriesBar' className="hidden fixed top-1 right-2 z-50 rounded-md text-center bg-primary p-4 mt-14  w-[300px]">
            {props.links.map((item)=> {return <p onClick={()=>handleCategoryChange(item)} className="cursor-pointer mx-4 text-center font-bold hover:text-secondary" key={item+"large"} >{item}</p>})}
        </div>
    )
}