
export default function CardTop(props) {

    function OpenProductPage() {
        window.open("/product/" + props.props.product.id, '_blank')
    }

    return (
        <>
            <div
                className='cursor-pointer h-[300px] w-[300px] rounded-t-lg absolute -z-10 p-1'
                onClick={OpenProductPage}>
                <img
                    onClick={OpenProductPage}
                    className='skeleton h-[100%] w-[100%] object-cover rounded-t-lg'
                    src={props.props.product.images[0]}
                    alt=""
                    loading="lazy"
                />
            </div>
        </>
    )
}