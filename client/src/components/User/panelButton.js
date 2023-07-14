
export default function PanelButton(props) {
    return (
        <div className='bg-secondary my-2 w-[80%] lg:w-[100%] rounded-xl lg:rounded-e-none p-4'>
            <button
                onClick={props.function}
                className='mx-4 font-bold hover:text-primary'>
                {props.text}
            </button>
        </div>
    )
}