import React, { Component } from 'react';
import './style/ChatSlide.css';

import ChatTemplate from './ChatTemplate';

var closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};

class ChatSlide extends Component {

    componentDidMount() {
        
    }

    render () {
        return (
            <div>
                <header>
                    <div className='container'>
                        <p>{this.props.roomname}</p>
                        <span>
                            <div>
                                <button id="minimize-button"></button>
                            </div>
                            <div>
                                <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' style={closeImg}/>
                            </div>
                        </span>
                    </div>
                </header>
                
                <ChatTemplate room={this.state.room}
                              username={this.state.username}
                              message={this.state.messages}
                              OnSelectMessage={e => this.handleMessage(e)} /> 
            </div>
        )
    }
}

export default ChatSlide;