import NavLink from "../Links/NavLinks"

export default function Categories(props) {
    return (
        <div className="">
                {props.links.map((item)=> {return <NavLink key={item+"large"} text={item} url="/" />})}
        </div>
    )
}