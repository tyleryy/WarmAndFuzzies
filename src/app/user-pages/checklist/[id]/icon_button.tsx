const Icon_Button = (props: any) => {

    return(
        <button className="hover:bg-white p-3 hover:bg-opacity-20 rounded-full 
        active:bg-opacity-30">
            {props.children}
        </button>
    )
}

export default Icon_Button;