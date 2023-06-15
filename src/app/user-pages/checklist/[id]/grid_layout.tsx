import Message from "./message"


interface userMessage {
    user: string;
    message: string;
}

const GridLayout = ({item_list}: any) => {



    return (
        <div className='grid grid-cols-3 gap-5 m-3'>
            <div className='flex flex-col space-y-3'>
                {item_list.slice(0, item_list.length/3).map((elem: userMessage, index: number) => {
                    return <Message user={elem.user} message={elem.message} key={index}/>
                })}
            </div>
            <div className='flex flex-col space-y-3'>
                {item_list.slice(item_list.length/3, 2*(item_list.length/3)).map((elem: userMessage, index: number) => {
                    return <Message user={elem.user} message={elem.message} key={index}/>
                })}
            </div>
            <div className='flex flex-col space-y-3'>
                {item_list.slice(2*item_list.length/3).map((elem: userMessage, index: number) => {
                    return <Message user={elem.user} message={elem.message} key={index}/>
                })}
            </div>
            
        </div>
    )
}

export default GridLayout;