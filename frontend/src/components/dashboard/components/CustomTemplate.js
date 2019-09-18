import React, { Component } from "react";
import { ThemeProvider, MessageGroup, Message } from '@livechat/ui-kit';

class CustomTemplate extends Component {
    constructor() {
        super();
        this.state ={
            messages : [],
            InputMessage : null
        };
    }



    render () {
        // let message = this.props.message;
        // let username = this.props.username;
        return (
            <ThemeProvider>
                <div style={{maxWidth: '80%', height: '400'}}>
                    <MessageGroup onlyFirstWithMeta>
                        <Message date="10:20" isOwn={true} authorName='Jon Smith'>
                            Live Testing
                        </Message>
                    </MessageGroup>
                </div>
            </ThemeProvider>
        );
    }
}

export default CustomTemplate;