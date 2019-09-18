import React, { Component } from "react";
import './style/ChatTemplate.css';
import $ from 'jquery';

class ChatTemplate extends Component {
    roomn;
    user;
    room_message;
    rooid;

    constructor() {
        super();
        this.state ={
            messages : [],
            InputMessage : null,
            user: null
        };
        this.setMessage = this.setMessage.bind(this);
    }

    componentDidMount() {
        var messageEnd = this.refs.messageEnd;
        // console.log(scrollToDiv);
    }

    handleSender = () => {
        if(this.refs.messageInput.value !== '') {
            // console.log(this.props.roomname);
            this.props.OnSelectMessage(this.state.InputMessage, this.props.roomname);
            this.refs.messageInput.value = '';
            this.setState({
                InputMessage: ''
            });
        }
    }

    handleKeySender = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleSender();
        }
    }

    setMessage = (message) => {
        this.setState({
            InputMessage: message
        });
    }

    closeButton = () => {
        console.log(this.user, this.room, this.roomid);
        this.props.leaveRoom(this.user, this.room, this.roomid);
    }

    render() {

        this.roomid = this.props.roomid;
        this.room = this.props.roomname;
        this.user = this.props.username;
        
        let ChatHistoryTemp = this.props.message;
        // console.log(ChatHistoryTemp);
        for (var i = 0; i < ChatHistoryTemp.length; i++) {
            if (ChatHistoryTemp[i].roomname === this.props.roomname) {
              this.room_message = ChatHistoryTemp[i].message;
              break;
            }
        }

        // console.log(this.room, this.user, this.room_message, this.roomid);

        return (
                <div className="chat-template">
                    <div className='ui raised segment chatbox'>
                    <div className='chat-header'>
                        <h3 className="ui header"><strong>{this.props.roomname}</strong></h3>
                        <button style={{cursor:'pointer', border:'none', background:'none'}} onClick={(e) => {this.closeButton()}}><i className="fa fa-close" style={{fontSize:'24px'}}></i></button>
                    </div>

                    <div id="chat-content" className="ui feed">
                        <ul>
                            {   
                                this.room_message.map((msg, index) => {
                                    if(msg.type === 1) {
                                        return <li key={ index }>
                                                    {
                                                        (msg.username == this.props.username) ?
                                                            <div id="left-box">
                                                                <p><span id="username">{msg.username}</span></p>
                                                                <div id="message-box"><p id="message">{msg.message}</p><p id="date">{msg.postedOn}</p></div>
                                                            </div>
                                                            :
                                                            <div id="right-box">
                                                                <p id="username"><span>{msg.username}</span></p>
                                                                <div id="message-box"><p id="message">{msg.message}</p><p id="date">{msg.postedOn}</p></div>
                                                            </div>
                                                    }
                                                </li>;
                                    }
                                    else {
                                        return <li key={index}>
                                            <p id="type-2">{msg.message}</p>
                                        </li>
                                    }
                                })
                            }
                            </ul>  
                            <div ref="messageEnd" style={{height:'2px',width:'100%'}}></div>
                    </div>
                    <div className="ui-form">
                        <div className="ui field msg-area">
                            <textarea id="post-message" className='' name="post-message" rows="1" onInput={(e) => this.setMessage(e.target.value)} onKeyDown={(e) => this.handleKeySender(e)} ref="messageInput" style={{height:'36px'}}></textarea>
                            <div id="post-btn" className="ui primary submit button" onClick={e => this.handleSender()}><i className="fas fa-paper-plane"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ChatTemplate;