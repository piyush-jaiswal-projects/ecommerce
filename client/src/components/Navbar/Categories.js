import { useDispatch } from "react-redux"
import { changeCategory } from "../../reducers/productReducer";

export default function Categories(props) {
    const dispatch = useDispatch();

    function handleCategoryChange(item) {
        dispatch(changeCategory({categoryName: item}))
    }

    return (
        <div className="flex">
                {props.links.map((item)=> {return <p onClick={()=>handleCategoryChange(item)} className="cursor-pointer mx-4 text-center font-bold hover:text-secondary" key={item+"large"} >{item}</p>})}
        </div>
    )
}