import React, { Component } from "react";
import ReactDOM from 'react-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from 'jquery';

import { logoutUser } from "../../actions/authActions";
import './style/Dashboard.css';
import image from "./components/style/images/image.png";

import AuthNavbar from "./components/AuthNavbar";
import ChatTemplate from "./components/ChatTemplate";
import MaximizedLiveRooms from "./components/MaximizedLiveRooms";
import MinimizedLiveRooms from "./components/MinimizedLiveRooms"

import socket from './socket';
// import 'webrtc-adapter';

class Dashboard extends Component {
  username;
  roomname;
  
  roomname1;
  roomname2;
  roomname3;
  roomname4;

  roomMessage = [];

  constructor() {
    super();
    this.state = {
      isLoaded:false,
      dashboard: false,
      username: null,

      client: socket(),

      //Generalize for multiple rooms
  
      roomMessage : [],
      roomMessage1 : [],
      roomMessage2 : [],
      roomCount: null,

      chatroom1 : false,
      chatroom2 : false,
      chatroom3 : false,
      chatroom4 : false,

      roomname1: null,
      roomname2: null,
      roomname3: null,
      roomname4: null,

      liverooms: [],
      liveroomsCount: 0,
      isMaximized: true
    }

    this.CreateRoom = this.CreateRoom.bind(this);
    this.JoinRoom = this.JoinRoom.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  componentDidMount() {
      /**
       * =======================================================================================================================
       * Socket events for the users
       * =======================================================================================================================
       */
       
      this.state.client.receiveMessage((message, username, roomname) => {
        this.receiveMessage(message, username, roomname);
      });

      this.state.client.newJoinMessage((username, roomname) => {
        // this.newJoinMessage(username, roomname);
        this.updateMessage(`${username} joined room ${roomname}`, this.state.username, roomname, 2);
      });

      this.state.client.getLiveRooms((roomlist) => {
          this.setState({
            liveroomsCount: roomlist.length,
            roomlist: roomlist
          });

      });

      this.state.client.leaveMessage((username, roomname) => {

      });
  }

  


  CreateRoom = () => {

    this.username = this.refs.username.value;
    this.roomname = this.refs.roomname.value;

    // console.log(this.roomname);
    // console.log(this.username, this.roomname);

    this.state.client.create({
      username : this.username,
      roomname: this.roomname,
    }, 
    (message) => {
      console.log('Callback through socket ');
      if(message) {
        alert(message);
      } else {
        // console.log(this.username, this.roomname);
        if(!this.state.chatroom1) {

          console.log("Chatroom1 block");
          // console.log(this.roomname);
          //generalize this for multiple rooms
          let roomTemp = {
            roomname : this.roomname,
            message : []
          }
          this.roomname1 = this.roomname;
          // let roomMessageTemp = this.state.roomMessage1;
          let roomMessageTemp = this.roomMessage;
          // console.log(roomMessageTemp);

          roomMessageTemp.push(roomTemp);

          this.roomMessage = roomMessageTemp;
          //-------------------------------------//

          console.log('Room1 Mount');

          this.setState({
            chatroom1: true,
            roomMessage: this.roomMessage
          }
          , () => {
            // console.log(this.roomname)
            this.updateMessage(`${this.username} created virtual room ${this.roomname}`, this.username, this.roomname, 2);
  
            this.refs.username.value = '';
            this.refs.roomname.value = '';
            
            console.log("Room1 build");
          }
          );

          console.log('Room1 Mounted');

          return true;
        }

        else if(!this.state.chatroom2) {

          console.log("Chatroom2 block");
          // console.log(this.roomname);
          //generalize this for multiple rooms
          let roomTemp = {
            roomname : this.roomname,
            message : []
          }
          console.log("Generating room block 2: ",roomTemp);
          // console.log(this.roomname);

          this.roomname2 = this.roomname;
          // let roomMessageTemp = this.state.roomMessage2;
          let roomMessageTemp = this.roomMessage;
          // console.log(roomMessageTemp);

          roomMessageTemp.push(roomTemp);

          this.roomMessage = roomMessageTemp;
          //-------------------------------//

          console.log('Room2 Mount');

          this.setState({
            chatroom2: true,
            // roomname2: this.roomname,
            roomMessage2: this.roomMessage
          }
          , () => {
            // console.log(this.roomname)
            this.updateMessage(`${this.username} created virtual room ${this.roomname}`, this.username, this.roomname, 2);
  
            this.refs.username.value = '';
            this.refs.roomname.value = '';

            console.log("Room2 build");
          }
          );

          console.log('room2 mounted');
          return true;
        }

        else if(!this.state.chatroom3) {

          console.log("Chatroom3 block");
          // console.log(this.roomname);
          //generalize this for multiple rooms
          let roomTemp = {
            roomname : this.roomname,
            message : []
          }

          console.log("Generating room block 3: ",roomTemp);
          // console.log(this.roomname);

          this.roomname3 = this.roomname;
          // let roomMessageTemp = this.state.roomMessage3;
          let roomMessageTemp = this.roomMessage;
          // console.log(roomMessageTemp);

          roomMessageTemp.push(roomTemp);

          this.roomMessage = roomMessageTemp;
          //-------------------------------//

          console.log('Room3 Mount');

          this.setState({
            chatroom3: true,
            // roomname3: this.roomname,
            roomMessage: this.roomMessage
          }
          , () => {
            // console.log(this.roomname)
            this.updateMessage(`${this.username} created virtual room ${this.roomname}`, this.username, this.roomname, 2);
  
            this.refs.username.value = '';
            this.refs.roomname.value = '';

            console.log("Room3 build");
          }
          );

          console.log('room3 mounted');
          return true;
        }

        else if(!this.state.chatroom4) {

          console.log("Chatroom4 block");
          // console.log(this.roomname);
          //generalize this for multiple rooms
          let roomTemp = {
            roomname : this.roomname,
            message : []
          }

          this.roomname4 = this.roomname;

          let roomMessageTemp = this.roomMessage;
          // console.log(roomMessageTemp);

          roomMessageTemp.push(roomTemp);
          //-------------------------------//

          this.roomMessage = roomMessageTemp;

          this.setState({
            chatroom4: true,
            // roomname4: this.roomname,
            roomMessage: this.roomMessage
          }, () => {
            // console.log(this.roomname)
            this.updateMessage(`${this.username} created virtual room ${this.roomname}`, this.username, this.roomname, 2);
  
            this.refs.username.value = '';
            this.refs.roomname.value = '';

            console.log("Room4 build");
          });
        }
      }
    
    });
  }

  JoinRoom = () => {

    if(this.refs.username.value !== '' && this.refs.username.value !== '')
    {
      this.username = this.refs.username.value;
      this.roomname = this.refs.roomname.value;
    }

    console.log(this.username, this.roomname);

    return this.state.client.join({
        username : this.username,
        roomname: this.roomname
    },
    (username, roomname) => {

      if(!this.state.chatroom1) {
        //generalize this for multiple rooms
        let roomTemp = {
          roomname : this.roomname,
          message : []
        }

        let roomMessageTemp = this.roomMessage;
        console.log(roomMessageTemp);

        roomMessageTemp.push(roomTemp);

        this.roomMessage = roomMessageTemp;
        this.roomname1 = this.roomname;

        this.setState({
          chatroom1: true,
          // roomname1: this.roomname,
          roomMessage: this.roomMessage
        }, () => {
          this.updateMessage(`${this.username} joined virtual room ${this.roomname}`, this.username, this.roomname, 2);
  
          this.refs.username.value = '';
          this.refs.roomname.value = '';
          
          console.log("Room1 Join");
        });
        //-------------------------------------//
        // this.newJoinMessage(username, roomname);

        this.refs.username.value = '';
        this.refs.roomname.value = '';

      } else if(!this.state.chatroom2) {
        //generalize this for multiple rooms
        let roomTemp = {
          roomname : this.roomname,
          message : []
        }

        let roomMessageTemp = this.roomMessage;
        console.log(roomMessageTemp);

        roomMessageTemp.push(roomTemp);

        this.roomMessage = roomMessageTemp;
        this.roomname2 = this.roomname;

        this.setState({
          chatroom2: true,
          // roomname1: this.roomname,
          roomMessage: this.roomMessage
        }, () => {
          this.updateMessage(`${this.username} joined virtual room ${this.roomname}`, this.username, this.roomname, 2);
  
          this.refs.username.value = '';
          this.refs.roomname.value = '';
          
          console.log("Room2 Join");
        });
        //-------------------------------------//
        // this.newJoinMessage(username, roomname);

        this.refs.username.value = '';
        this.refs.roomname.value = '';

      //-------------------------------------//
      }

      else if(!this.state.chatroom3) {
        //generalize this for multiple rooms
        let roomTemp = {
          roomname : this.roomname,
          message : []
        }

        let roomMessageTemp = this.roomMessage;
        console.log(roomMessageTemp);

        roomMessageTemp.push(roomTemp);

        this.roomMessage = roomMessageTemp;
        this.roomname3 = this.roomname;
        
        this.setState({
          chatroom3: true,
          // roomname1: this.roomname,
          roomMessage: this.roomMessage
        }, () => {
          this.updateMessage(`${this.username} joined virtual room ${this.roomname}`, this.username, this.roomname, 2);
  
          this.refs.username.value = '';
          this.refs.roomname.value = '';
          
          console.log("Room3 Join");
        });
        //-------------------------------------//
        // this.newJoinMessage(username, roomname);

        this.refs.username.value = '';
        this.refs.roomname.value = '';

      //-------------------------------------//
      }

      else if(!this.state.chatroom4) {
        //generalize this for multiple rooms
        let roomTemp = {
          roomname : this.roomname,
          message : []
        }

        let roomMessageTemp = this.roomMessage;
        console.log(roomMessageTemp);

        roomMessageTemp.push(roomTemp);

        this.roomMessage = roomMessageTemp;
        this.roomname4 = this.roomname;

        this.setState({
          chatroom4: true,
          // roomname1: this.roomname,
          roomMessage: this.roomMessage
        }, () => {
          this.updateMessage(`${this.username} joined virtual room ${this.roomname}`, this.username, this.roomname, 2);
  
          this.refs.username.value = '';
          this.refs.roomname.value = '';
          
          console.log("Room4 Join");
        });
        //-------------------------------------//
        // this.newJoinMessage(username, roomname);

        this.refs.username.value = '';
        this.refs.roomname.value = '';

      //-------------------------------------//
      }

      // this.newJoinMessage(username); 
    });

    

  }

  handleUsername = (username) => {
    // check for username validation against logged in user

    // console.log(username.target.value);
    // this.setState({
    //   username: username.target.value
    // });
  }

  handleRoomname = (roomname) => {
    // console.log(roomname.target.value);
  }

  /**
   * ====================================================================================================================================
   * MESSAGE CHAT HANDLERS
   * ====================================================================================================================================
   */

  receiveMessage = (message, username, roomname) => {
    // let ChatHistory = this.state.meesage;
    // ChatHistory.push(message);

    // this.setState({
    //   message: ChatHistory
    // });

    // console.log(this.state.message);

    let ChatHistory = this.state.roomMessage;

    let RoomHistory = {};

    for (var i = 0; i < ChatHistory.length; i++) {
      if (ChatHistory[i].roomname === roomname) {
        RoomHistory = ChatHistory[i];
        break;
      }
    }

    RoomHistory.message.push(message);

    let historyPacket = {
      roomname: roomname,
      message: RoomHistory.message
    };

    for (var i = 0; i < ChatHistory.length; i++) {
      if (ChatHistory[i].roomname === roomname) {
        ChatHistory[i].message = RoomHistory.message;
        break;
      }
    }

    console.log(ChatHistory);

    this.setState({
      roomMessage: ChatHistory
    });




  }

  handleMessagePacket = (message, username, type) => {
    let d = new Date();
    return {
      type: type,
      username: username,
      message: message,
      postedOn: `${d.getHours()}:${d.getMinutes()}`
    }
  }

  updateMessage = (message, username, roomname, type=1) => {

    var ChatHistoryTemp = this.roomMessage;

    let RoomHistory = {};

    for (var i = 0; i < ChatHistoryTemp.length; i++) {
      if (ChatHistoryTemp[i].roomname === roomname) {
        RoomHistory = ChatHistoryTemp[i];
        break;
      }
    }

    // console.log(RoomHistory);

    let messagePacket = this.handleMessagePacket(message, username, type);
    // ChatHistory.push(messagePacket);

    RoomHistory.message.push(messagePacket);

    let historyPacket = {
      roomname: roomname,
      message: RoomHistory.message
    };

    for (var i = 0; i < ChatHistoryTemp.length; i++) {
      if (ChatHistoryTemp[i].roomname === roomname) {
        ChatHistoryTemp[i].message = RoomHistory.message;
        break;
      }
    }

    // this.roomMessage1 = ChatHistoryTemp;
    // console.log(ChatHistoryTemp);

    this.setState({
      // messages : ChatHistory,
      roomMessage: ChatHistoryTemp
    });

    this.state.client.onMessage(messagePacket, this.state.username, roomname);
  }

  handleMessage = (message, roomname) => {
    console.log(roomname);
    this.updateMessage(message, this.username, roomname);
  }

  onJoin = (roomname) => {
    console.log(roomname);
    console.log(this.state.username);
    
    this.roomname = roomname;

    if(this.state.username == null) {
      this.setState({
        username: this.props.auth.user.username
      }, () => {
        this.username = this.state.username;
        console.log(this.props.auth.user.username);
        console.log(this.state.username);
        this.JoinRoom();
      });
    } else {
      this.JoinRoom();
    }

    // this.refs.username.value = this.state.username;
    // this.refs.roomname.value = roomname;

    
    

    
  }

  leaveRoom = (username, roomname, roomid) => {
    console.log(username,roomname, roomid);
    this.state.client.leaveRoom(username, roomname, () => {
      if(roomid == '1') {
        this.setState({
          chatroom1: false
        });
      } else if (roomid == '2') {
        this.setState({
          chatroom2: false
        });
      } else if (roomid == '3') {
        this.setState({
          chatroom3: false
        });
      } else if (roomid == '4') {
        this.setState({
          chatroom4: false
        });
      }
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    return (
      <div>
        {
          this.props.auth.isAuthenticated ? 
            <AuthNavbar user = {this.props.auth.user.first_name}
            logout = {this.onLogoutClick} /> 
            :
            console.log()
        }
        <div className="app-container">
            <div className="ui three column stackable grid page-container">
              <div className='row half-view'>
                  <div className="column form-column">
                      <div className="ui raised segment">
                          <div className="ui form">
                            <div className="fields">
                                <div className="field">
                                    <label>Username</label>
                                    <input type="text" placeholder="Username" id="username" name="username" onInput={(e) => this.handleUsername(e)} ref='username'/>
                                </div>
                                <div className="field">
                                    <label>Room</label>
                                    <input type="text" placeholder="Room" id="roomname" name="roomname" onInput={(e) => this.handleRoomname(e)} ref='roomname'/>
                                </div>
                            </div>
                            <br/>
                            <div className="ui buttons">
                                <div id="create-btn" className="ui submit orange button" onClick={() => this.CreateRoom()}>
                                    Create Room
                                </div>
                                <div className="or">or</div>
                                <div id="join-btn" className="ui submit green button" onClick={() => this.JoinRoom(this.state.username,this.state.roomname)}>
                                    Join Room
                                </div>
                            </div>
                        </div>
                      </div>
                  </div>
                  {
                    this.state.chatroom1 ?
                      <div className='column'>
                              <ChatTemplate roomid='1'
                                            roomname={this.roomname1}
                                            username={this.username}
                                            message={this.state.roomMessage}
                                            OnSelectMessage={(e,f) => this.handleMessage(e,f)} 
                                            leaveRoom={(e,f,g) => this.leaveRoom(e,f,g)}/> 

                      </div>
                      :
                      console.log()
                  }
                  {
                    this.state.chatroom2 ?
                      <div className='column'>
                              <ChatTemplate roomid='2'
                                            roomname={this.roomname2}
                                            username={this.username}
                                            message={this.state.roomMessage}
                                            OnSelectMessage={(e,f) => this.handleMessage(e,f)}
                                            leaveRoom={(e,f,g) => this.leaveRoom(e,f,g)}/> 
                      </div>
                      :
                      console.log()
                  }
              </div>

              <div className='row half-view'>
                  <div className='column liveroom-column'>
                    { 
                      this.state.roomlist ?
                            <MaximizedLiveRooms roomlist={this.state.roomlist}
                                                onJoin={(e) => this.onJoin(e)} /> 
                        :
                        console.log()
                      }
                  </div>
                  {
                    this.state.chatroom3 ?
                      <div className='column'>
                              <ChatTemplate roomid='3'
                                            roomname={this.roomname3}
                                            username={this.username}
                                            message={this.state.roomMessage}
                                            OnSelectMessage={(e,f) => this.handleMessage(e,f)}
                                            leaveRoom={(e,f,g) => this.leaveRoom(e,f,g)}/> 
                      </div>
                      :
                      console.log()
                  }

                  {
                    this.state.chatroom4 ?
                      <div className='column'>
                              <ChatTemplate roomid='4' 
                                            roomname={this.roomname4}
                                            username={this.username}
                                            message={this.state.roomMessage}
                                            OnSelectMessage={(e,f) => this.handleMessage(e,f)}
                                            leaveRoom={(e,f,g) => this.leaveRoom(e,f,g)}/> 
                      </div>
                      :
                      console.log()
                  }
              </div>
            </div>
        </div>
      </div>
    ); 
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);