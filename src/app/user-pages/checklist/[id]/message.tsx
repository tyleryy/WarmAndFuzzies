import React from 'react';

interface MessageInterface {
    user: string;
    message: any;
}

const Message : React.FC<MessageInterface> = ({user, message}) => {

    return (
        <div className=' bg-yellow-400 bg-opacity-50 border border-yellow-400
            flex flex-col space-y-8 p-5'>
            <div className="overflow-hidden">
                <p className=' break-words'>&quot;{message}&quot;</p>
            </div>
            <div>
                {"-"+user}
            </div>
            
        </div>
    )
}


export default Message;