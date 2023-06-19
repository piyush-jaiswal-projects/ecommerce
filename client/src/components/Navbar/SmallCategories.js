import NavLink from "../Links/NavLinks"

export default function SmallCategories(props) {
    return (
        <div id='CategoriesBar' className="hidden fixed top-1 right-2 z-50 rounded-md text-center bg-primary p-4 mt-14  w-[300px]">
                {props.links.map((item)=> {return <div className='my-2' key={item + "small"}><NavLink key={item+"small"} text={item} url="/" /></div>})}
        </div>
    )
}